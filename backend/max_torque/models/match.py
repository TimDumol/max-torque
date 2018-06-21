# -*- coding: utf-8 -*-
from __future__ import absolute_import, division, print_function, unicode_literals

from sqlalchemy import Column, DateTime, Integer, UnicodeText
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func

from .meta import Base


class Match(Base):
    __tablename__ = "matches"
    id = Column(Integer, primary_key=True)
    code = Column(UnicodeText, unique=True)

    created_at = Column(
        DateTime(timezone=True), server_default=func.now(), nullable=False
    )

    players = relationship("Player")
    rounds = relationship("Round")
