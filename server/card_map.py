
import json
import itertools

# map of card name to best categories.
# usa_mastercard: ['gas', 'clothes', ...]
CARD_MAP = {
	"cards" : [
		{
			"name": "American Express® Gold Card",
			"link": "https://www.americanexpress.com/us/credit-cards/card/gold-card/?eep=26129",
			"image": "https://cdn.prodstatic.com/shared/images/cards/336x211/dce1c3a0-6706-11eb-84e8-4d1313fc3187.png?auto=webp&fit=crop&quality=90",
			"details": "https://www.americanexpress.com/us/credit-cards/card-application/apply/prospect/terms/gold-card/26129-10-0/?print#terms-details",
			"rewards": {
				"restaurant": {
					"points": 4
				},
				"supermarket": {
					"points": 4,
					"limit": 2500,
					"duration": "year"
				},
				"flight": {
					"points": 4
				}
			}
		},
		{
			"name": "Bank of America® Customized Cash Rewards credit card",
			"link": "https://secure.bankofamerica.com/apply-credit-cards/public/icai-single/#/info/",
			"image": "https://cdn.prodstatic.com/shared/images/cards/336x211/cc2541a0-801e-11eb-84e8-4d1313fc3187.jpg?auto=webp&fit=crop&quality=90",
			"details": "",
			"rewards": {
				"category": {
					"percentage": 3,
					"limit": 2500,
					"duration": "quarter"
				},
				"supermarket": {
					"percentage": 2,
					"limit": 2500,
					"duration": "quarter"
				},
				"wholesale": {
					"percentage": 2,
					"limit": 2500,
					"duration": "quarter"
				},
				"wholesale": {
					"all": 1
				}
			}
		},
		{
			"name": "Blue Cash Everyday® Card from American Express",
			"link": "https://www.americanexpress.com/us/credit-cards/card/blue-cash-everyday/",
			"image": "https://cdn.prodstatic.com/shared/images/cards/336x211/blue-cash-everyday-card-from-american-express-061616.png?auto=webp&fit=crop&quality=90",
			"details": "https://www.americanexpress.com/us/credit-cards/card-application/apply/prospect/terms/blue-cash-everyday-credit-card/26129-10-0/?print#terms-details",
			"rewards": {
				"supermarket": {
					"percentage": 3,
					"limit": 6000,
					"duration": "year"
				},
				"gas": {
					"percentage": 2
				},
				"all": {
					"percentage": 1
				}
			}
		},
		{
			"name": "Blue Cash Preferred® Card from American Express",
			"link": "https://www.americanexpress.com/us/credit-cards/card/blue-cash-preferred/",
			"image": "https://cdn.prodstatic.com/shared/images/cards/336x211/4f675c90-7268-11e9-8bc5-4d4394516d65.png?auto=webp&fit=crop&quality=90",
			"details": "https://www.americanexpress.com/us/credit-cards/card-application/apply/prospect/terms/blue-cash-preferred-credit-card/26129-10-0/",
			"rewards": {
				"supermarket": {
					"percentage": 6,
					"limit": 6000,
					"duration": "year"
				},
				"streaming": {
					"percentage": 6
				},
				"transit": {
					"percentage": 3
				},
				"gas": {
					"percentage": 3
				},
				"all": {
					"percentage": 1
				}
			}
		},
		{
			"name": "Capital One Quicksilver Cash Rewards Credit Card",
			"link": "https://applynow.capitalone.com/?irgwc=1&display1=&display2=&productId=16030",
			"image": "https://cdn.prodstatic.com/shared/images/cards/336x211/capital-one-quicksilver-cash-rewards-credit-card-041217.png?auto=webp&fit=crop&quality=90",
			"rewards": {
				"all": {
					"percentage": 1.5
				}
			}
		},
		{
			"name": "Capital One SavorOne Cash Rewards Credit Card",
			"link": "https://applynow.capitalone.com/?productId=16038",
			"image": "https://cdn.prodstatic.com/shared/images/cards/336x211/247ae730-ff6b-11eb-bb36-9183285abe2c.png?auto=webp&fit=crop&quality=90",
			"rewards": {
				"ticket": {
					"percentage": 8
				},
				"restaurant": {
					"percentage": 3
				},
				"entertainment": {
					"percentage": 3
				},
				"supermarket": {
					"percentage": 3
				},
				"streaming": {
					"percentage": 3
				},
				"all": {
					"percentage": 1
				}
			}
		},
		{
			"name": "Capital One Venture Rewards Credit Card",
			"link": "https://applynow.capitalone.com/?irgwc=1&display1=&display2=&productId=16042",
			"image": "https://cdn.prodstatic.com/shared/images/cards/336x211/ff304640-e963-11eb-a48f-65ac0bb53c5b.png?auto=webp&fit=crop&quality=90",
			"rewards": {
				"hotel": {
					"miles": 5
				},
				"rental": {
					"miles": 5
				},
				"all": {
					"miles": 2
				}
			}
		},
		{
			"name": "Citi Custom Cash℠ Card",
			"link": "https://citicards.citi.com/usc/LPACA/Citi/Cards/CustomCash/External_HC2/index.html",
			"image": "https://cdn.prodstatic.com/shared/images/cards/336x211/9aedd300-bfe7-11eb-a48f-65ac0bb53c5b.png?auto=webp&fit=crop&quality=90",
			"rewards": {
				"category": {
					"percentage": 5,
					"limit": 500,
					"duration": "month"
				},
				"all": {
					"percentage": 1
				}
			}
		},
		{
			"name": "Citi® Double Cash Card",
			"link": "https://citicards.citi.com/usc/LPACA/Citi/Cards/DoubleCash/External_DCN/index.html",
			"image": "https://cdn.prodstatic.com/shared/images/cards/336x211/9ea24330-ae9f-11ec-81f6-95945bae99c9.jpg?auto=webp&fit=crop&quality=90",
			"rewards": {
				"all": {
					"percentage": 2
				}
			}
		},
		{
			"name": "Citi Rewards+® Card",
			"link": "https://citicards.citi.com/usc/LPACA/Citi/Rewards/RewardsPlus/External_R1L/index.html",
			"image": "https://cdn.prodstatic.com/shared/images/cards/336x211/96eb2f40-fb6b-11eb-bb36-9183285abe2c.png?auto=webp&fit=crop&quality=90",
			"rewards": {
				"flight": {
					"points": 5,
					"limit": 6000,
					"duration": "year"
				},
				"hotel": {
					"points": 5,
					"limit": 6000,
					"duration": "year"
				},
				"supermarket": {
					"points": 2,
					"limit": 6000,
					"duration": "year"
				},
				"gas": {
					"points": 2,
					"limit": 6000,
					"duration": "year"
				},
				"all": {
					"points": 1
				}
			}
		},
		{
			"name": "Chase Freedom Unlimited®",
			"link": "https://creditcards.chase.com/a1/freedom-unlimited/affiliates2022",
			"image": "https://cdn.prodstatic.com/shared/images/cards/336x211/da2489c0-bbaf-11ea-bf12-c7437d5726b0.png?auto=webp&fit=crop&quality=90",
			"rewards": {
				"flight": {
					"percentage": 5
				},
				"hotel": {
					"percentage": 5
				},
				"rental": {
					"percentage": 5
				},
				"restaurant": {
					"percentage": 3
				},
				"drugstore": {
					"percentage": 3
				},
				"all": {
					"percentage": 1.5
				}
			}
		},
		{
			"name": "Discover it® Cash Back",
			"link": "https://www.discover.com/products/it-card-af.html",
			"image": "https://cdn.prodstatic.com/shared/images/cards/336x211/discover-it-cashback-match-012518.png?auto=webp&fit=crop&quality=90",
			"details": "https://goto.discover.com/c/1243448/568217/9099?subId1=[TRANS_ID]&sharedid=4117253&prodsku=100&u=https%3A%2F%2Fwww.discovercard.com%2Fapplication%2Fwebsite%2Fratesrewards%3FsrcCde%3DGJVM%261&intsrc=CATF_4272",
			"rewards": {
				"discover": {
					"percentage": 5
				},
				"all": {
					"percentage": 1
				}
			}
		},
		{
			"name": "Discover it® chrome",
			"link": "https://www.discover.com/products/it-chrome-af.html?sc=GJVN&cmpgnid=ls-dca-ir-consumer-chrome-GJVN-dtop-263&irgwc=1&pid=1243448&aid=568217&source=Affiliates&sku=104",
			"image": "https://cdn.prodstatic.com/shared/images/cards/336x211/discover-it-chrome-012518.png?auto=webp&fit=crop&quality=90",
			"details": "https://goto.discover.com/c/1243448/568217/9099?subId1=[TRANS_ID]&sharedid=4117253&prodsku=104&u=https%3A%2F%2Fwww.discovercard.com%2Fapplication%2Fwebsite%2Fratesrewards%3FsrcCde%3DGJVN%263&intsrc=CATF_4272",
			"rewards": {
				"restaurant": {
					"percentage": 2,
					"limit": 1000,
					"duration": "quarter"
				},
				"gas": {
					"percentage": 2,
					"limit": 1000,
					"duration": "quarter"
				},
				"all": {
					"percentage": 1
				}
			}
		},
		{
			"name": "U.S. Bank Cash+® Visa Signature® Card",
			"link": "https://www.usbank.com/credit-cards/affiliate/cash-plus-visa-signature-credit-card.html",
			"image": "https://cdn.prodstatic.com/shared/images/cards/336x211/a1490b70-afab-11ec-81f6-95945bae99c9.jpg?auto=webp&fit=crop&quality=90",
			"details": "https://applications.usbank.com/oad/termsSimpleApply.controller?locationCode=8069&offerId=G6PHR4DV11&sourceCode=43678",
			"rewards": {
				"category": {
					"percentage": 5,
					"limit": 2000,
					"duration": "year"
				},
				"flight": {
					"percentage": 5
				},
				"hotel": {
					"percentage": 5
				},
				"rental": {
					"percentage": 5
				},
				"everyday": {
					"percentage": 2
				},
				"all": {
					"percentage": 1
				}
			}
		},
		{
			"name": "Wells Fargo Active Cash® Card",
			"link": "https://creditcards.wellsfargo.com/cards/active-cash-credit-card",
			"image": "https://cdn.prodstatic.com/shared/images/cards/336x211/5ecc0ed0-577e-11ec-9716-87183df373f6.png?auto=webp&fit=crop&quality=90",
			"details": "https://click.linksynergy.com/fs-bin/click?id=27pXCeFyR/A&offerid=1056968.527&type=3&subid=0&u1=[TRANS_ID]",
			"rewards": {
				"all": {
					"percentage": 2
				}
			}
		}
	]
}

def _get_best_percentage(category, card):
    rewards = card.get('rewards', {})
    matching_reward = rewards.get(category, rewards.get('all', {}))
    return matching_reward.get('percentage', 0)


def get_cards():
    return [card['name'] for card in CARD_MAP['cards']]

def get_categories():
    all_rewards = [card['rewards'] for card in CARD_MAP['cards']]
    categories = itertools.chain(*[list(rewards.keys()) for rewards in all_rewards])
    return set(categories)


def get_best_cards(category, amount=None, supported_cards=None, use_all=True, limit=3):
    print('get_best_cards', category, amount, supported_cards, use_all)
    # category: Active category of purchase
    # amount: reward limit on card
    # supported_cards: restricted list of cards based on the current user.
    cards = CARD_MAP['cards'].copy()

    if supported_cards:
        for c in cards:
            c['missing_card'] = c['name'] not in supported_cards
        if not use_all:
            # Reduce list.
            cards = [c for c in cards if c['name'] in supported_cards]

    # Sort the best card(s) to use based on the provided category.
    sorted_cards = sorted(cards, key=lambda c: _get_best_percentage(category, c), reverse=True)

    return sorted_cards[:limit]



# python card_map.py <- this command should run the below code.
if __name__ == '__main__':

    # test case 1 example
    best_cards = get_best_cards("restaurant", ['usa_mastercard', 'usa_chase', 'usa_amex'])
    print('card', best_cards)