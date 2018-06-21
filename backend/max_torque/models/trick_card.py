# -*- coding: utf-8 -*-
from __future__ import absolute_import, division, print_function, unicode_literals

from sqlalchemy import Boolean, Column, DateTime, ForeignKey, Integer
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func, false

from .meta import Base


class TrickCard(Base):
    __tablename__ = "trick_cards"
    id = Column(Integer, primary_key=True)
    completed = Column(Boolean, server_default=false(), nullable=False)
    card_id = Column(
        Integer,
        ForeignKey("cards.id", ondelete="cascade", onupdate="cascade"),
        nullable=False,
    )
    trick_id = Column(
        Integer,
        ForeignKey("tricks.id", ondelete="cascade", onupdate="cascade"),
        nullable=False,
    )

    created_at = Column(
        DateTime(timezone=True), server_default=func.now(), nullable=False
    )

    card = relationship("Card")
    trick = relationship("Trick")
