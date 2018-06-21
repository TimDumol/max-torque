# -*- coding: utf-8 -*-
from __future__ import absolute_import, division, print_function, unicode_literals

from sqlalchemy import CheckConstraint, Column, DateTime, ForeignKey, Integer
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func

from .meta import Base


class PlayerTeam(Base):
    __tablename__ = "player_teams"
    id = Column(Integer, primary_key=True)
    player_id = Column(
        Integer,
        ForeignKey("players.id", ondelete="cascade", onupdate="cascade"),
        nullable=False,
    )
    round_id = Column(
        Integer,
        ForeignKey("rounds.id", ondelete="cascade", onupdate="cascade"),
        nullable=False,
    )
    sequence = Column(Integer, nullable=False)

    created_at = Column(
        DateTime(timezone=True), server_default=func.now(), nullable=False
    )

    player = relationship("Player")
    round = relationship("Round")

    __table_args__ = CheckConstraint(sequence.in_([1, 2]))
