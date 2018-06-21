# -*- coding: utf-8 -*-
from __future__ import absolute_import, division, print_function, unicode_literals

from sqlalchemy import (
    Boolean,
    CheckConstraint,
    Column,
    DateTime,
    ForeignKey,
    Integer,
    UnicodeText,
)
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func, true

from .meta import Base


class Card(Base):
    __tablename__ = "cards"
    id = Column(Integer, primary_key=True)
    player_id = Column(
        Integer,
        ForeignKey("players.id", ondelete="cascade", onupdate="cascade"),
        nullable=False,
    )
    #: we need this cos could be in trick or discarded
    in_hand = Column(Boolean, nullable=False, server_default=true())
    value = Column(Integer, nullable=False)
    color = Column(UnicodeText, nullable=False)

    created_at = Column(
        DateTime(timezone=True), server_default=func.now(), nullable=False
    )

    player = relationship("Player")

    __table_args__ = (
        CheckConstraint(
            "color = ANY(ARRAY['R', 'G', 'B', 'Y'])", name="card_color_rgby_ck"
        ),
        CheckConstraint((value >= 1) & (value <= 13), name="card_value_valid_ck"),
    )
