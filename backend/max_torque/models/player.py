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
    UniqueConstraint,
)
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func

from .meta import Base


class Player(Base):
    __tablename__ = "players"
    id = Column(Integer, primary_key=True)
    match_id = Column(
        Integer,
        ForeignKey("matches.id", ondelete="cascade", onupdate="cascade"),
        nullable=False,
    )
    name = Column(UnicodeText, nullable=False)
    sequence = Column(Integer, nullable=False)
    is_match_maker = Column(Boolean, server_default=False, nullable=False)

    created_at = Column(
        DateTime(timezone=True), server_default=func.now(), nullable=False
    )

    match = relationship("Match")
    hand = relationship("Card")

    __table_args__ = (
        UniqueConstraint(match_id, name),
        UniqueConstraint(match_id, sequence),
        CheckConstraint(sequence >= 1),
    )
