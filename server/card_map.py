
import json

# map of card name to best categories.
# usa_mastercard: ['gas', 'clothes', ...]
CARD_MAP = {
	"Blue Cash Preferred® Card from American Express": {
		"link": "https://www.americanexpress.com/us/credit-cards/card/blue-cash-preferred/",
		"image": "https://cdn.prodstatic.com/shared/images/cards/336x211/4f675c90-7268-11e9-8bc5-4d4394516d65.png?auto=webp&fit=crop&quality=90",
		"details": "https://www.americanexpress.com/us/credit-cards/card-application/apply/prospect/terms/blue-cash-preferred-credit-card/26129-10-0/",
		"rewards": {
			"supermarkets": {
				"percentage": 6,
				"limit": 6000,
				"duration": "year",
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
	"Wells Fargo Active Cash® Card": {
		"link": "https://creditcards.wellsfargo.com/cards/active-cash-credit-card",
		"image": "https://cdn.prodstatic.com/shared/images/cards/336x211/5ecc0ed0-577e-11ec-9716-87183df373f6.png?auto=webp&fit=crop&quality=90",
		"details": "https://click.linksynergy.com/fs-bin/click?id=27pXCeFyR/A&offerid=1056968.527&type=3&subid=0&u1=[TRANS_ID]",
		"rewards": {
			"all": {
				"percentage": 2
			}
		}
	},
	"Discover it® Cash Back": {
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
	"Discover it® Cash Back": {
		"link": "https://citicards.citi.com/usc/LPACA/Citi/Cards/CustomCash/External_HC2/index.html",
		"image": "https://cdn.prodstatic.com/shared/images/cards/336x211/9aedd300-bfe7-11eb-a48f-65ac0bb53c5b.png?auto=webp&fit=crop&quality=90",
		"rewards": {
			"discover": {
				"percentage": 5
			},
			"all": {
				"percentage": 1
			}
		}
	},
	"Citi Custom Cash℠ Card": {
		"link": "https://citicards.citi.com/usc/LPACA/Citi/Cards/CustomCash/External_HC2/index.html",
		"image": "https://cdn.prodstatic.com/shared/images/cards/336x211/9aedd300-bfe7-11eb-a48f-65ac0bb53c5b.png?auto=webp&fit=crop&quality=90",
		"rewards": {
			"category": {
				"percentage": 5,
				"limit": 500,
				"duration": "month",
			},
			"all": {
				"percentage": 1
			}
		}
	},
	"Capital One Venture Rewards Credit Card": {
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
	"Capital One Quicksilver Cash Rewards Credit Card": {
		"link": "https://applynow.capitalone.com/?irgwc=1&display1=&display2=&productId=16030",
		"image": "https://cdn.prodstatic.com/shared/images/cards/336x211/capital-one-quicksilver-cash-rewards-credit-card-041217.png?auto=webp&fit=crop&quality=90",
		"rewards": {
			"all": {
				"percentage": 1.5
			}
		}
	},
	"American Express® Gold Card": {
		"link": "https://www.americanexpress.com/us/credit-cards/card/gold-card/?eep=26129",
		"image": "https://cdn.prodstatic.com/shared/images/cards/336x211/dce1c3a0-6706-11eb-84e8-4d1313fc3187.png?auto=webp&fit=crop&quality=90",
		"details": "https://www.americanexpress.com/us/credit-cards/card-application/apply/prospect/terms/gold-card/26129-10-0/?print#terms-details",
		"rewards": {
			"restaurants": {
				"points": 4
			},
			"supermarkets": {
				"points": 4,
				"limit": 2500,
				"duration": "year",			
			},
			"flights": {
				"points": 4
			}
		}
	}
}


def get_best_card(category, amount, supported_cards):
    # TODO: returns the best card(s) to use based on the provided category
    # supported cards is a restricted list of cards based on the current user.

    return None



# python card_map.py <- this command should run the below code.
if __name__ == '__main__':

    # test case 1 example
    best_card = get_best_card("restaurants", ['usa_mastercard', 'usa_chase', 'usa_amex'])
    print('card', best_card)