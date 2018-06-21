# -*- coding: utf-8 -*-
from __future__ import absolute_import, division, print_function, unicode_literals

try:
    import simplejson as json
except ImportError:
    import json

from datetime import datetime
import itertools
import pytz
import math
from enum import Enum
from sqlalchemy import inspect
from sqlalchemy.orm import Load
from sqlalchemy.ext.associationproxy import _AssociationList, AssociationProxy


class EncodableObject(object):
    """
    This is a special class that objects should extend if they want ModelDictEncoder to work for them.
    Things that extend BaseModel don't need to do this anymore.

    For objects that implement this, make sure to fill in __properties__.
    """

    __properties__ = []

    def __str__(self):
        return str(ModelDictEncoder().encode(self))

    def __repr__(self):
        return repr(ModelDictEncoder().encode(self))


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
        """
        Creates eager load options (subqueryload, to be precise) for SQLAlchemy ORM,
        based on the provided options, starting from the given `root_class`.
        """

        def _eagerload_relationship(base_load_opt, descr):
            # TODO: `key` is an undocumented attribute
            return (descr.mapper.class_, base_load_opt.subqueryload(descr.key))

        def _eagerload_association_proxy(base_load_opt, descr):
            local_attr, remote_attr = descr.attr
            return (
                remote_attr.mapper.class_,
                base_load_opt.subqueryload(local_attr.key).subqueryload(
                    remote_attr.key
                ),
            )

        def _make_load_options(cls, base_load_opt):
            opts = self.options.get(cls, {})
            expanded_attrs = opts.get("expand", getattr(cls, "__default_expand__", []))

            mapper = inspect(cls)
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
        opts = self.options.get(type(obj), {})
        if opts == {}:
            match = None
            for key in self.options:
                if isinstance(obj, key):
                    if match is None or issubclass(key, match):
                        opts = self.options[key]
                        match = key
        return opts

    def encode(self, obj):
        from abelian.models.base import BaseModel, SoftBaseModel
        from kb_candidate.models.base import BaseModel as CandidateBaseModel

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
            return {self.encode(k): self.encode(v) for k, v in obj.items()}

        if (
            isinstance(obj, list)
            or isinstance(obj, set)
            or isinstance(obj, tuple)
            or isinstance(obj, _AssociationList)
        ):
            return [self.encode(x) for x in obj]

        if isinstance(obj, datetime):
            try:
                return pytz.utc.localize(obj).isoformat()
            except ValueError:
                return obj.astimezone(pytz.utc).isoformat()

        if isinstance(obj, Enum):
            return obj.value

        try:
            return self.encode(obj.__json__(**self.options.get(type(obj), {})))
        except TypeError:
            return self.encode(obj.__json__())
        except AttributeError:
            pass

        if (
            isinstance(obj, BaseModel)
            or isinstance(obj, SoftBaseModel)
            or isinstance(obj, CandidateBaseModel)
        ):
            mapper = obj.__mapper__
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

        if isinstance(obj, datetime):
            return str(obj)

        return obj


class ModelJSONEncoder(json.JSONEncoder):
    def __init__(self, options=None, **kwargs):
        self.dict_encoder = ModelDictEncoder(options)
        super(ModelJSONEncoder, self).__init__(kwargs)

    def default(self, obj):
        encoded = self.dict_encoder.encode(obj)
        if id(encoded) == id(obj):
            return super(ModelJSONEncoder, self).default(obj)
        else:
            return encoded
