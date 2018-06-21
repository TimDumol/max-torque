# -*- coding: utf-8 -*-
from sqlalchemy import Boolean, Column, DateTime, Integer
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func, false

from .meta import Base


class Trick(Base):
    __tablename__ = "tricks"
    id = Column(Integer, primary_key=True)
    completed = Column(Boolean, server_default=false(), nullable=False)
    #: current player sequence
    current_sequence = Column(Integer, nullable=False)

    created_at = Column(
        DateTime(timezone=True), server_default=func.now(), nullable=False
    )

    trick_cards = relationship("TrickCard")
