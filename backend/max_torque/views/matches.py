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
    number_of_rounds = request.json_body.get("number_of_rounds", 0)
    new_match = Match(
        code=generate_match_code(length=6), number_of_rounds=number_of_rounds
    )

    request.dbsession.add(new_match)
    request.dbsession.commit()
    return ModelDictEncoder().encode(new_match)


@view_config(
    route_name="get_match_from_code",
    request_method="GET",
    renderer="json",
    permission="public",
)
def get_match_from_code(request):
    match_code = request.matchdict["code"]

    match = Match.get_match_from_code(request.dbsession, match_code)
    request.dbsession.add(match)
    request.dbsession.commit()
    return ModelDictEncoder().encode(match)


@view_config(
    route_name="join_match", request_method="PUT", renderer="json", permission="public"
)
def join_match(request):
    match_code = request.matchdict["code"]

    match = Match.get_match_from_code(request.dbsession, match_code)
    print(match.players)
    return ModelDictEncoder().encode(match)
