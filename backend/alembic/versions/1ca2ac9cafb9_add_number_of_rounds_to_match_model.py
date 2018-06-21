# -*- coding: utf-8 -*-
"""Add number of rounds to match model

Revision ID: 1ca2ac9cafb9
Revises: d13fc3d75e8c
Create Date: 2018-06-21 17:57:01.402799

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = "1ca2ac9cafb9"
down_revision = "d13fc3d75e8c"
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column(
        "matches",
        sa.Column("number_of_rounds", sa.Integer(), server_default="0", nullable=False),
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column("matches", "number_of_rounds")
    # ### end Alembic commands ###
