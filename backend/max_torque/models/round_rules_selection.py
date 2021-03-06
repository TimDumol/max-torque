# -*- coding: utf-8 -*-
from __future__ import absolute_import, division, print_function, unicode_literals

from sqlalchemy import (
    CheckConstraint,
    Column,
    DateTime,
    ForeignKey,
    Integer,
    UnicodeText,
)
from sqlalchemy.dialects.postgresql import ARRAY
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func, text

from .meta import Base


class RoundRulesSelection(Base):
    __tablename__ = "round_rules_selections"
    id = Column(Integer, primary_key=True)
    round_id = Column(
        Integer,
        ForeignKey("rounds.id", ondelete="cascade", onupdate="cascade"),
        nullable=False,
    )
    #: sequence number of current selector
    current_selector_sequence = Column(Integer, nullable=False)
    first_player_choices = Column(ARRAY(Integer), nullable=False)
    discard_choices = Column(ARRAY(UnicodeText), nullable=False)
    trump_choices = Column(
        ARRAY(UnicodeText),
        server_default=text("ARRAY['R', 'G', 'B', 'Y']"),
        nullable=False,
    )
    super_trump_choices = Column(
        ARRAY(UnicodeText),
        server_default=text("ARRAY['R', 'G', 'B', 'Y', 'NONE']"),
        nullable=False,
    )
    points_choices = Column(
        ARRAY(Integer), default=lambda: [1, 2, 3, 4, -2], nullable=False
    )

    created_at = Column(
        DateTime(timezone=True), server_default=func.now(), nullable=False
    )

    round = relationship("Round")

    __table_args__ = (
        CheckConstraint(
            current_selector_sequence >= 1,
            name="round_rules_selection_selector_sequence_ck",
        ),
        CheckConstraint(
            "discard_choices @> ARRAY['ONE_CARD', 'TWO_CARDS', 'ONE_EXCEPT_ONE', 'PASS_LEFT', 'NONE']",
            name="round_rules_discard_choices_ck",
        ),
        CheckConstraint(
            "trump_choices @> ARRAY['R', 'G', 'B', 'Y']",
            name="round_rules_trump_choices_ck",
        ),
        CheckConstraint(
            "super_trump_choices @> ARRAY['R', 'G', 'B', 'Y', 'NONE']",
            name="round_rules_super_trump_choices_ck",
        ),
        CheckConstraint(
            "points_choices @> ARRAY[1, 2, 3, 4, -2]",
            name="round_rules__super_trump_choices_ck",
        ),
    )
