
export const renderSaveCardPage = (cardPageId) => {
    let toolkit = new window.RapydToolkit({    
        button_text: "Save",
               /* Text that appears on the Save button. 
                  String. Maximum length is 16 characters.
                 Default is "Save". Optional. */
        button_color: "blue",
               /* Color of the 'Save' button. String.
                  Standard CSS color name or hexadecimal code such as #323fff.
                  Default is the color that is returned in the 'merchant_color'
                  field of the response to 'Save Card Details Page'. Optional.*/
        id: cardPageId || "hp_card_bd334669c8a80bc68c124b144c350b7f",
               /* ID of the 'Save Card Details Page' response. String. Required.*/
        close_on_complete: true,
               /* Causes the embedded Rapyd Toolkit window to close
                  when the action is complete. Boolean. Default is 'true'. Optional.*/      
        page_type: "card_token",
              /* Mandatory for save card details page
                 Default is "collection". */
         style: {
               global: {
                 fonts: [
                     "https://fonts.googleapis.com/css2?family=Mulish:wght@200&amp;display=swap",
                      {
                         family: 'myCustomFont',
                         src: '/fonts/myCustomFontRegular.woff2',
                         fontWeight: 400
                      },
                      {
                         family: 'myCustomFont',
                         src: '/fonts/myCustomFontBold.woff2',
                         fontWeight: 700
                      }
                 ]
             },
             save: {
                 base: {
                     backgroundColor: '#0000FF',
                         // If passed for the 'Save' element, it will override the button_color field.
                     fontFamily: 'myCustomFont',
        
                 }
             }  
        }
     });
     toolkit.displayToolkit();

}

// https://docs.rapyd.net/build-with-rapyd/docs/hosted-checkout-page-integration-steps
export const renderCheckoutPage = (checkoutId) => {
    console.log('render', checkoutId)
    let checkout = new window.RapydCheckoutToolkit({
        pay_button_text: "Buy now",
              // Text that appears on the 'Pay' button. 
              // String. Maximum length is 16 characters.
              // Default is "Place Your Order". Optional. 
        pay_button_color: "blue",
              // Color of the 'Pay' button. String.
              // Standard CSS color name or hexadecimal code such as #323fff.
              // Default is the color that is returned in the 'merchant_color'
              // field of the response to 'Create Checkout Page'. Optional.
        id: checkoutId || "checkout_9ebe58dcb9d75e8f972a35350f96c2fa",
              // ID of the 'Create Checkout Page' response. String. Required.
        close_on_complete: true,
              // Causes the embedded Rapyd Checkout Toolkit window to close
              // when the payment is complete. Boolean. Default is 'true'. Optional.           
        page_type: "collection"
             // Default is "collection". Optional.
    });
    checkout.displayCheckout();

}