# -*- coding: utf-8 -*-
from __future__ import absolute_import, division, print_function, unicode_literals

from collections import defaultdict
from datetime import datetime
from enum import Enum
import itertools
import json
import math
from typing import (  # noqa typing
    Any,
    Dict,
    Iterable,
    List,
    Mapping,
    MutableMapping,
    Set,
    Tuple,
    Union,
)

import pytz
import six
from sqlalchemy import inspect
from sqlalchemy.ext.associationproxy import AssociationProxy, _AssociationList
from sqlalchemy.orm import Load, Mapper  # noqa used in typing
from sqlalchemy.orm.interfaces import InspectionAttr, MapperOption  # noqa typing


class EncodableObject(object):
    """
    This is a special class that objects should extend if they want ModelDictEncoder to work for them.
    Things that extend BaseModel don't need to do this anymore.

    For objects that implement this, make sure to fill in __properties__.
    """

    __properties__ = []  # type: List[six.text_type]

    def __str__(self):
        return str(ModelDictEncoder().encode(self))

    def __repr__(self):
        return repr(ModelDictEncoder().encode(self))


def recursively_encode(obj, encode=None):
    # type: (Any) -> Any
    """
    Recurseively encode an object into a JSON-compatible dictionary
    """
    if encode is None:
        encode = recursively_encode
    # JSON is stupid and doesn't support NaN or Infinity
    if isinstance(obj, float):
        if math.isnan(obj):
            return "NaN"

        if math.isinf(obj):
            if obj > 0:
                return "Infinity"
            else:
                return "-Infinity"

    if isinstance(obj, dict):
        return {encode(k): encode(v) for k, v in obj.items()}

    if isinstance(obj, (list, set, tuple, _AssociationList)):
        return [encode(x) for x in obj]

    if isinstance(obj, datetime):
        try:
            return pytz.utc.localize(obj).isoformat()
        except ValueError:
            return obj.astimezone(pytz.utc).isoformat()

    if isinstance(obj, Enum):
        return obj.value

    try:
        return encode(obj.__json__())
    except AttributeError:
        pass

    return obj


class ModelDictEncoder(object):
    def __init__(self, options=None, **kwargs):
        """
        Options:

        :param only: Only serialize these attributes (overrides all elsE)
        :param exclude: Do not serialize these attributes
        :param expand: Expand these relations (default: ``[]``)
        """
        if options is None:
            options = {}
        self.options = options

    def make_load_options(self, root_class):
        # type: (type) -> List[MapperOption]
        """
        Creates eager load options (subqueryload, to be precise) for SQLAlchemy ORM,
        based on the provided options, starting from the given `root_class`.
        """

        def _eagerload_relationship(base_load_opt, descr):
            # type: (MapperOption, InspectionAttr) -> Tuple[type, MapperOption]
            # TODO: `key` is an undocumented attribute
            return (descr.mapper.class_, base_load_opt.subqueryload(descr.key))

        def _eagerload_association_proxy(base_load_opt, descr):
            # type: (Load, InspectionAttr) -> Tuple[type, MapperOption]
            local_attr, remote_attr = descr.attr
            return (
                remote_attr.mapper.class_,
                base_load_opt.subqueryload(local_attr.key).subqueryload(
                    remote_attr.key
                ),
            )

        def _make_load_options(cls, base_load_opt):
            # type: (type, dict) -> Iterable[MapperOption]
            opts = self.options.get(cls, {})
            expanded_attrs = opts.get("expand", getattr(cls, "__default_expand__", []))

            mapper = inspect(cls)  # type: Mapper
            rel_load_opts = [
                _eagerload_relationship(base_load_opt, rel)
                for name, rel in mapper.relationships.items()
                if name in expanded_attrs
            ]

            assoc_proxy_load_opts = []
            for name, descr in mapper.all_orm_descriptors.items():
                if name in expanded_attrs and isinstance(descr, AssociationProxy):
                    # The following line is *essential* to initialize the `owning_class` attributes
                    # on the association proxy
                    getattr(cls, name)
                    if hasattr(descr.attr[1], "mapper"):
                        assoc_proxy_load_opts.append(
                            _eagerload_association_proxy(
                                base_load_opt, getattr(cls, name)
                            )
                        )

            all_load_opts = rel_load_opts + assoc_proxy_load_opts

            if not all_load_opts:
                return (base_load_opt,)
            else:
                return itertools.chain.from_iterable(
                    _make_load_options(cls, opt) for cls, opt in all_load_opts
                )

        return list(_make_load_options(root_class, Load(root_class)))

    def _get_encoding_options(self, obj):
        # type: (Any) -> dict
        opts = self.options.get(type(obj), {})
        if opts == {}:
            match = None
            for key in self.options:
                if isinstance(obj, key) and (match is None or issubclass(key, match)):
                    opts = self.options[key]
                    match = key
        return opts

    def encode(self, obj):
        # type: (Any) -> dict
        if hasattr(obj, "__mapper__"):
            mapper = obj.__mapper__  # type: Mapper
            opts = self._get_encoding_options(obj)

            if "only" in opts:
                d = {
                    key: getattr(obj, key) for key in opts["only"] if hasattr(obj, key)
                }
            else:
                d = {}
                try:
                    d.update(obj._data)
                except Exception:
                    pass
                attrs = set(mapper.columns)
                composites = set(mapper.composites)
                for composite in composites:
                    # Elements in composites should be ignored
                    attrs -= set(composite.columns)
                attrs.update(composites)

                exclude = set(
                    opts.get("exclude", getattr(obj, "__default_exclude__", []))
                )
                d.update(
                    {x.key: getattr(obj, x.key) for x in attrs if x.key not in exclude}
                )

                for prop in opts.get("expand", getattr(obj, "__default_expand__", [])):
                    if prop not in exclude:
                        d[prop] = getattr(obj, prop)

            return self.encode(d)

        if isinstance(obj, EncodableObject):
            opts = self._get_encoding_options(obj)
            if "only" in opts:
                d = {
                    key: getattr(obj, key) for key in opts["only"] if hasattr(obj, key)
                }
            else:
                attrs = set(obj.__properties__)
                exclude = set(
                    opts.get("exclude", getattr(obj, "__default_exclude__", []))
                )
                d = {key: getattr(obj, key) for key in attrs if key not in exclude}
            return self.encode(d)

        return recursively_encode(obj, self.encode)


def get_instance_key_string(instance):
    # type: (Any) -> six.text_type
    return ":".join(six.text_type(x) for x in inspect(instance).identity)


MutableExpansionMapping = MutableMapping[
    six.text_type, MutableMapping[six.text_type, dict]
]


_class_relationships_and_proxies_memo = {}  # type: Dict[type, Set[six.text_type]]


class JsonApiEncoder(object):
    """
    Encodes 1 or more SQLAlchemy models (either as an object or a list) according to the `JSON API 1.0 spec
    <http://jsonapi.org/format/1.0/>`_. In particular, expanded relationships are included
    *beside* the data, rather than inline with the data, reducing data duplication and expended effort.

    .. warning::

        This does not support expansion of @properties that return models, only relationships
        and association proxies.

    .. note::

       Object IDs are typecasted to strings. If it is a compound key, it is joined by colons (":").

    .. warning::

        This encoder diverges slightly from the spec, because the spec requires that relationship keys (e.g.,
        company_id) should not appear in the 'attributes' object, and should only be present in the 'relationships'
        object. This is a PITA to implement, so if we need to strictly follow JSON API for some reason, that's
        the time we'll bother with it.
    """

    def __init__(self, options=None):
        if options is None:
            options = {}
        self.options = options

    def encode(self, obj):
        # type: (Any) -> Dict[six.text_type, Any]
        expansions = self.get_expansions(obj)
        included = []
        for cls in expansions:
            for item in expansions[cls].values():
                if isinstance(item, (list, _AssociationList)):
                    included.extend([self.encode_single(x) for x in item])
                else:
                    included.append(self.encode_single(item))
        return {"data": self.encode_list_or_object(obj), "included": included}

    def encode_list_or_object(self, obj):
        # type: (Any) -> Union[dict, List[dict]]
        if isinstance(obj, (list, _AssociationList)):
            return [self.encode_single(item) for item in obj]
        else:
            return self.encode_single(obj)

    def encode_single(self, obj):
        # type: (Any) -> dict
        """
        Encodes a single SQLAlchemy model without expanding relationships & association proxies
        """
        mapper = obj.__mapper__  # type: Mapper
        opts = self._get_encoding_options(obj)
        relationship_keys = self._get_class_relationships_and_proxies(obj.__class__)

        if "only" in opts:
            d = {
                key: getattr(obj, key)
                for key in opts["only"]
                if key not in relationship_keys and hasattr(obj, key)
            }
        else:
            d = {}
            try:
                d.update(obj._data)
            except Exception:
                pass
            attrs = set(mapper.columns)
            composites = set(mapper.composites)
            for composite in composites:
                # Elements in composites should be ignored
                attrs -= set(composite.columns)
            attrs.update(composites)

            exclude = set(opts.get("exclude", getattr(obj, "__default_exclude__", [])))
            d.update(
                {x.key: getattr(obj, x.key) for x in attrs if x.key not in exclude}
            )

            # still might want to expand @properties (that don't return models) and stuff
            for prop in opts.get("expand", getattr(obj, "__default_expand__", [])):
                if prop not in exclude and prop not in relationship_keys:
                    d[prop] = getattr(obj, prop)

        return {
            "type": obj.__class__.__name__,
            "id": get_instance_key_string(obj),
            "attributes": recursively_encode(d),
            "relationships": self.get_relationships(obj),
        }

    def get_relationships(self, obj):
        # type: (Any) -> dict
        """
        Returns a  JSON API 1.0 relationships object.
        """
        relationship_keys = self._get_class_relationships_and_proxies(obj.__class__)
        expanded_keys = self._get_keys_to_expand(obj)
        relationships = {}
        for key in expanded_keys & relationship_keys:
            val = getattr(obj, key)
            relationships[key] = self._get_relationship_object(val)
        return relationships

    def _get_relationship_object(self, val):
        # type: (Any) -> dict
        """
        Returns a JSON API 1.0 "relationship object".
        """
        if val is None:
            return {"data": None}
        elif isinstance(val, (list, _AssociationList)):
            return {
                "data": [self._get_resource_identifier_object(item) for item in val]
            }
        return {"data": self._get_resource_identifier_object(val)}

    def _get_resource_identifier_object(self, val):
        # type: (Any) -> dict
        """
        Returns a JSON API 1.0 resource identifier object, given the original Python object.
        """
        return {"type": val.__class__.__name__, "id": get_instance_key_string(val)}

    def get_expansions(self, obj, expansions=None):
        # type: (Any, MutableExpansionMapping) -> MutableExpansionMapping
        """
        Returns expanded relationships & association proxies as a {class: id: obj} mapping.
        """
        if expansions is None:
            expansions = defaultdict(dict)
        if not isinstance(obj, list):
            obj = [obj]
        for item in obj:
            expanded_keys = self._get_keys_to_expand(item)
            relationship_keys = self._get_class_relationships_and_proxies(
                item.__class__
            )
            for key in expanded_keys & relationship_keys:
                self._expand_key(item, key, expansions)
        return expansions

    def _expand_key(self, obj, key, expansions):
        # type: (Any, six.text_type, MutableExpansionMapping) -> MutableExpansionMapping
        expansion = getattr(obj, key)
        if expansion is None:
            return expansions
        if not isinstance(expansion, list) and not isinstance(
            expansion, _AssociationList
        ):
            expansion = [expansion]
        for item in expansion:
            expansions[item.__class__.__name__][get_instance_key_string(item)] = item
            expansions = self.get_expansions(item, expansions)
        return expansions

    def _get_keys_to_expand(self, obj):
        # type: (Any) -> Set[six.text_type]
        opts = self._get_encoding_options(obj)
        if "only" in opts:
            return set(opts["only"])
        elif "expand" in opts:
            return set(opts["expand"])
        else:
            return set(getattr(obj, "__default_expand__", []))

    @staticmethod
    def _get_class_relationships_and_proxies(cls):
        # type: (type) -> Set[six.text_type]
        if cls in _class_relationships_and_proxies_memo:
            return _class_relationships_and_proxies_memo[cls]
        mapper = inspect(cls)  # type: Mapper
        keys = set(mapper.relationships.keys())
        for name, descriptor in mapper.all_orm_descriptors.items():
            if isinstance(descriptor, AssociationProxy):
                keys.add(name)
        _class_relationships_and_proxies_memo[cls] = keys
        return keys

    def _get_encoding_options(self, obj):
        # type: (Any) -> dict
        opts = self.options.get(type(obj), {})
        if opts == {}:
            match = None
            for key in self.options:
                if isinstance(obj, key) and (match is None or issubclass(key, match)):
                    opts = self.options[key]
                    match = key
        return opts


class ModelJSONEncoder(json.JSONEncoder):
    def __init__(self, options=None, **kwargs):
        self.dict_encoder = ModelDictEncoder(options)
        super(ModelJSONEncoder, self).__init__(**kwargs)

    def default(self, obj):
        encoded = self.dict_encoder.encode(obj)
        if id(encoded) == id(obj):
            return super(ModelJSONEncoder, self).default(obj)
        else:
            return encoded
