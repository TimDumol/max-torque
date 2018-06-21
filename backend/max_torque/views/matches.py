# -*- coding: utf-8 -*-
from pyramid.view import view_config

from ..models.match import Match
from ..services.encoding import ModelDictEncoder
from ..services.utils import generate_match_code


@view_config(
    route_name="create_match",
    request_method="POST",
    renderer="json",
    permission="public",
)
def create_match(request):
    new_match = Match(code=generate_match_code(length=6))

    request.dbsession.add(new_match)
    request.dbsession.commit()
    return ModelDictEncoder().encode(new_match)
