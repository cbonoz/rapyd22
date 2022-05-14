from fastapi import HTTPException
import os


def require_env(key):
    val = os.getenv(key)
    if not val:
        raise Exception(key + " env variable is required")

    return val

def check_keys_in_object(keys, obj):
    missing_keys = list(filter(lambda k: k not in obj, keys))
    if len(missing_keys) > 0:
        err = "Validation Failed: {} not present in object".format(', '.join(missing_keys))
        raise HTTPException(status_code=400, detail=err)

def create_checkout_payload():
    return {
        "amount": 100,
        "complete_checkout_url": "https://hackthegalaxy.devpost.com/",
        # "country": "US",
        # "currency": "USD",  
        "country": "US",
        "currency": "USD",
        "requested_currency": "USD",
        "payment_method_types_include": [
            "us_visa_card", 
            "us_mastercard_card"
        ]
    }

def create_wallet_payload(first_name, last_name, email):
    # TODO: fill in full data
    name = f"{first_name} {last_name}"
    return {
        "first_name": first_name,
        "last_name": last_name,
        "ewallet_reference_id": f"{first_name}-{last_name}-{email}",
        "metadata": {
            "merchant_defined": True
        },
        "type": "person",
        "name": name,
        "contact": {
            "phone_number": "+14155551234",
            "email": email,
            "first_name": first_name,
            "last_name": last_name,
            "mothers_name": "Jane Smith",
            "contact_type": "personal",
            "address": {
                "name": name,
                "line_1": "123 Main Street",
                "line_2": "",
                "line_3": "",
                "city": "Anytown",
                "state": "NY",
                "country": "US",
                "zip": "12345",
                "phone_number": "+14155551611",
                "metadata": {},
                "canton": "",
                "district": ""
            },
            "identification_type": "DL",
            "identification_number": "1234567890",
            "date_of_birth": "11/22/2000",
            "country": "US",
            "nationality": "US",
            "metadata": {
                "merchant_defined": True
            }
        }
    }