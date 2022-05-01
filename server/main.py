from string import capwords
from typing import Optional

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from tinydb import Query, TinyDB

from rapyd import make_request
from card_map import get_cards, get_categories, get_best_cards
from helpers import check_keys_in_object, create_wallet_payload, create_checkout_payload

NOT_FOUND = HTTPException(status_code=404)
db = TinyDB('./db.json')

user_table = db.table('user')
# card_table = db.table('cards')

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"Hello": "World"}

@app.get("/cards")
def cards():
    return get_cards()

@app.get("/categories")
def categories():
    return get_categories()

# https://github.com/msiemens/tinydb#example-code
def _find_customer(email):
    matches = user_table.search(Query()['email'] == email)
    if not matches:
        return None
    return matches[0] # get first.

# Example request body.
# data = {
#     "amount": 100,
#     "complete_checkout_url": "http://example.com/complete",
#     "country": "SG",
#     "currency": "SGD",
#     "customer": "XXX", (optional)
#     “requested_currency”: “USD”,
#     "merchant_reference_id": "950ae8c6-76",
#     "payment_method_types_include": [
#         "sg_credit_mastercard_card", 
#         "sg_credit_visa_card"
#     ]
# }
@app.post("/checkout")
def post_checkout(data: dict):
    body = create_checkout_payload()
    results = make_request(method="post",
                       path="/v1/checkout",
                       body=body)
    return results

# {
#     "business_vat_id": "123456789",
#     "email": "johndoe@rapyd.net",
#     "ewallet": "ewallet_ebfe4c4f4d36b076a21369fb0d055f3e",
#     "invoice_prefix": "JD-",
#     "metadata": {
#     	"merchant_defined": true
#     },
#     "name": "John Doe",
#     "phone_number": "+14155559993"
# }
@app.post("/customer")
def post_customer(data: dict):
    check_keys_in_object(['email', 'name'], data)
    email = data['email']
    user = _find_customer(email)
    if user:
        return user

    # https://docs.rapyd.net/build-with-rapyd/reference/wallet-object#create-wallet
    # TODO: create new wallet.
    tokens = data['name'].split()
    if len(tokens) != 2:
        raise HTTPException(status_code=400, detail="Need first and last name")

    first_name, last_name = tokens
    data = create_wallet_payload(first_name, last_name, email)
    result = make_request(method="post",
                       path="/v1/user",
                       body=data)

    wallet_id = result['data']['id']
    print('created wallet', wallet_id)

    data = {
        **data,
        "email": email,
        "ewallet": wallet_id,
        "invoice_prefix": "JD-",
        "metadata": {
            "merchant_defined": True
        },
    }
    result = make_request(method="post",
                    path="/v1/customers",
                    body=data)

    print('customer', result)
    user_table.insert(data)
    return data

@app.get("/customer")
def get_customer_by_email(data: dict):
    user = _find_customer(data['email'])
    if not user:
        raise NOT_FOUND

    results = make_request(method="get",
                       path="/v1/customers/" + user['id'])
    return results

@app.post("/cards/recommend")
def recommend_payment_method(data: dict):
    if 'email' in data:
        user = _find_customer(data['email'])
        if not user:
            raise NOT_FOUND

    return get_best_cards(data['category'], 1000, data.get('cards', None))

@app.get("/save-card")
def save_card_page(data: dict):
    user = _find_customer(data['email'])
    if not user:
        return 

    body = {
        'customer': user['id'],
        'country': 'US'
    }
    results = make_request(method="post",
                    path="/v1/hosted/collect/card",
                    body=body)
    return results
