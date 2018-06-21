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
        CheckConstraint(sequence >= 1, name="round_sequence_valid_ck"),
        UniqueConstraint(match_id, sequence, name="round_match_id_sequence_unique"),
        CheckConstraint(
            "discard = ANY(ARRAY['ONE_CARD', 'TWO_CARDS', 'ONE_EXCEPT_ONE', 'PASS_LEFT', 'NONE'])",
            name="round_discard_valid_ck",
        ),
        CheckConstraint(
            "trump = ANY(ARRAY['R', 'G', 'B', 'Y'])", name="round_trump_valid_ck"
        ),
        CheckConstraint(
            "super_trump = ANY(ARRAY['R', 'G', 'B', 'Y', 'NONE'])",
            name="round_super_trump_valid_ck",
        ),
        CheckConstraint(
            "points = ANY(ARRAY[1, 2, 3, 4, -2])", name="round_points_valid_ck"
        ),
    )
