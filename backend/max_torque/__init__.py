# -*- coding: utf-8 -*-
from pyramid.config import Configurator
from pyramid.renderers import JSON

from max_torque.services.encoding import ModelJSONEncoder


def main(global_config, **settings):
    """ This function returns a Pyramid WSGI application.
    """
    config = Configurator(settings=settings)
    json_renderer = JSON(cls=ModelJSONEncoder)
    config.add_renderer("json", json_renderer)

    config.include("pyramid_jinja2")
    config.include(".models")
    config.include(".routes")
    config.scan()
    return config.make_wsgi_app()
