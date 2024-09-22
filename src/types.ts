import type {
  StripeAddressElement,
  StripeAddressElementOptions,
  StripeAffirmMessageElement,
  StripeAffirmMessageElementOptions,
  StripeAfterpayClearpayMessageElement,
  StripeAfterpayClearpayMessageElementOptions,
  StripeAuBankAccountElement,
  StripeAuBankAccountElementOptions,
  StripeCardCvcElement,
  StripeCardCvcElementOptions,
  StripeCardElement,
  StripeCardElementOptions,
  StripeCardExpiryElement,
  StripeCardExpiryElementOptions,
  StripeCardNumberElement,
  StripeCardNumberElementOptions,
  StripeElementType,
  StripeEpsBankElement,
  StripeEpsBankElementOptions,
  StripeExpressCheckoutElement,
  StripeExpressCheckoutElementOptions,
  StripeFpxBankElement,
  StripeFpxBankElementOptions,
  StripeIbanElement,
  StripeIbanElementOptions,
  StripeIdealBankElement,
  StripeIdealBankElementOptions,
  StripeIssuingCardCopyButtonElement,
  StripeIssuingCardCopyButtonElementOptions,
  StripeIssuingCardCvcDisplayElement,
  StripeIssuingCardCvcDisplayElementOptions,
  StripeIssuingCardExpiryDisplayElement,
  StripeIssuingCardExpiryDisplayElementOptions,
  StripeIssuingCardNumberDisplayElement,
  StripeIssuingCardNumberDisplayElementOptions,
  StripeIssuingCardPinDisplayElement,
  StripeIssuingCardPinDisplayElementOptions,
  StripeLinkAuthenticationElement,
  StripeLinkAuthenticationElementOptions,
  StripeP24BankElement,
  StripeP24BankElementOptions,
  StripePaymentElement,
  StripePaymentElementOptions,
  StripePaymentMethodMessagingElement,
  StripePaymentMethodMessagingElementOptions,
  StripePaymentRequestButtonElement,
  StripePaymentRequestButtonElementOptions,
  StripeShippingAddressElement,
  StripeShippingAddressElementOptions,
} from '@stripe/stripe-js'

export interface ElementTypeMap {
  address: StripeAddressElement
  affirmMessage: StripeAffirmMessageElement
  afterpayClearpayMessage: StripeAfterpayClearpayMessageElement
  auBankAccount: StripeAuBankAccountElement
  card: StripeCardElement
  cardNumber: StripeCardNumberElement
  cardExpiry: StripeCardExpiryElement
  cardCvc: StripeCardCvcElement
  epsBank: StripeEpsBankElement
  expressCheckout: StripeExpressCheckoutElement
  fpxBank: StripeFpxBankElement
  iban: StripeIbanElement
  idealBank: StripeIdealBankElement
  p24Bank: StripeP24BankElement
  payment: StripePaymentElement
  paymentMethodMessaging: StripePaymentMethodMessagingElement
  paymentRequestButton: StripePaymentRequestButtonElement
  linkAuthentication: StripeLinkAuthenticationElement
  shippingAddress: StripeShippingAddressElement
  issuingCardNumberDisplay: StripeIssuingCardNumberDisplayElement
  issuingCardCvcDisplay: StripeIssuingCardCvcDisplayElement
  issuingCardExpiryDisplay: StripeIssuingCardExpiryDisplayElement
  issuingCardPinDisplay: StripeIssuingCardPinDisplayElement
  issuingCardCopyButton: StripeIssuingCardCopyButtonElement
}

export interface ElementTypeAndOptions<T extends StripeElementType> {
  type: T
  options?: T extends 'address' ? StripeAddressElementOptions :
    T extends 'affirmMessage' ? StripeAffirmMessageElementOptions :
      T extends 'afterpayClearpayMessage' ? StripeAfterpayClearpayMessageElementOptions :
        T extends 'auBankAccount' ? StripeAuBankAccountElementOptions :
          T extends 'card' ? StripeCardElementOptions :
            T extends 'cardNumber' ? StripeCardNumberElementOptions :
              T extends 'cardExpiry' ? StripeCardExpiryElementOptions :
                T extends 'cardCvc' ? StripeCardCvcElementOptions :
                  T extends 'epsBank' ? StripeEpsBankElementOptions :
                    T extends 'expressCheckout' ? StripeExpressCheckoutElementOptions :
                      T extends 'fpxBank' ? StripeFpxBankElementOptions :
                        T extends 'iban' ? StripeIbanElementOptions :
                          T extends 'idealBank' ? StripeIdealBankElementOptions :
                            T extends 'p24Bank' ? StripeP24BankElementOptions :
                              T extends 'payment' ? StripePaymentElementOptions :
                                T extends 'paymentMethodMessaging' ? StripePaymentMethodMessagingElementOptions :
                                  T extends 'paymentRequestButton' ? StripePaymentRequestButtonElementOptions :
                                    T extends 'linkAuthentication' ? StripeLinkAuthenticationElementOptions :
                                      T extends 'shippingAddress' ? StripeShippingAddressElementOptions :
                                        T extends 'issuingCardNumberDisplay' ? StripeIssuingCardNumberDisplayElementOptions :
                                          T extends 'issuingCardCvcDisplay' ? StripeIssuingCardCvcDisplayElementOptions :
                                            T extends 'issuingCardExpiryDisplay' ? StripeIssuingCardExpiryDisplayElementOptions :
                                              T extends 'issuingCardPinDisplay' ? StripeIssuingCardPinDisplayElementOptions :
                                                T extends 'issuingCardCopyButton' ? StripeIssuingCardCopyButtonElementOptions :
                                                  never
}
