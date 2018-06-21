# -*- coding: utf-8 -*-
import random
import string


def generate_match_code(length=6):
    return "".join(random.choices(string.ascii_uppercase, k=length))
