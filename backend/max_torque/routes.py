# -*- coding: utf-8 -*-
def includeme(config):
    config.add_route("home", "/")

    config.add_route("create_match", "/api/matches")
    config.add_route("join_match", "/api/matches/{code}/join")
    config.add_route("get_match_from_code", "/api/matches/{code}")
