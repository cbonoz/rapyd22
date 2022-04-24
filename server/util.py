import os

def require_env(key):
    val = os.getenv(key)
    if not val:
        raise Exception(key + " env variable is required")

    return val