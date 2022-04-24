from typing import Optional
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware


from rapyd import make_request
from tinydb import TinyDB, Query

from card_map import get_best_card
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
    results = make_request(method="post",
                       path="/v1/checkout",
                       body=data)
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
    user = _find_customer(data['email'])
    if user:
        return user

    # https://docs.rapyd.net/build-with-rapyd/reference/wallet-object#create-wallet
    # TODO: create new wallet.
    data = {
        **data,
        "ewallet": "ewallet_ebfe4c4f4d36b076a21369fb0d055f3e",
        "invoice_prefix": "JD-",
        "metadata": {
            "merchant_defined": True
        },
    }
    print('post', data)
    result = make_request(method="post",
                       path="/v1/customers",
                       body=data)
    if result['status'] != 'SUCCESS':
        return result['status']

    user_table.insert(result['data'])
    return result

@app.get("/customer")
def get_customer_by_email(data: dict):
    user = _find_customer(data['email'])
    if not user:
        return Exception('Not found')

    results = make_request(method="get",
                       path="/v1/customers/" + user['id'])
    return results

@app.get("/recommend")
def recommend_payment_method(data: dict):
    user = _find_customer(data['email'])
    if not user:
        return Exception('Not found')

    return get_best_card(data['category'], [])

@app.get("/save-card")
def save_card_page(data: dict):
    user = _find_customer(data['email'])
    if not user:
        return Exception('Not found')

    body = {
        'customer': user['id'],
        'country': 'US'
    }
    results = make_request(method="post",
                    path="/v1/hosted/collect/card",
                    body=body)
    return results
