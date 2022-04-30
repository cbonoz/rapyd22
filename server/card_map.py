

# map of card name to best categories.
# usa_mastercard: ['gas', 'clothes', ...]
CARD_MAP = {

}


def get_best_card(category, supported_cards):
    # TODO: returns the best card(s) to use based on the provided category
    # supported cards is a restricted list of cards based on the current user.
    return None



# python card_map.py <- this command should run the below code.
if __name__ == '__main__':

    # test case 1 example
    best_card = get_best_card("restaurants", ['usa_mastercard', 'usa_chase', 'usa_amex'])
    print('card', best_card)