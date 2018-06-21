# -*- coding: utf-8 -*-
from __future__ import absolute_import, division, print_function, unicode_literals

from sqlalchemy import (
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


class Round(Base):
    __tablename__ = "rounds"
    id = Column(Integer, primary_key=True)
    match_id = Column(
        Integer,
        ForeignKey("matches.id", ondelete="cascade", onupdate="cascade"),
        nullable=False,
    )
    sequence = Column(Integer, nullable=False)
    first_player_sequence = Column(Integer)
    discard = Column(UnicodeText)
    trump = Column(UnicodeText)
    super_trump = Column(UnicodeText)
    points = Column(Integer)
    double_player_sequence = Column(Integer)

    created_at = Column(
        DateTime(timezone=True), server_default=func.now(), nullable=False
    )

    match = relationship("Match")

    __table_args__ = (
        CheckConstraint(sequence >= 1),
        UniqueConstraint(match_id, sequence),
        CheckConstraint(
            discard.in_(
                ["ONE_CARD", "TWO_CARDS", "ONE_EXCEPT_ONE", "PASS_LEFT", "NONE"]
            )
        ),
        CheckConstraint(trump.in_(["R", "G", "B", "Y"])),
        CheckConstraint(super_trump.in_(["R", "G", "B", "Y", "NONE"])),
        CheckConstraint(points.in_([1, 2, 3, 4, -2])),
    )
