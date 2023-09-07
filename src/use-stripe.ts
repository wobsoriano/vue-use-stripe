import { ref, watchEffect, Ref, onUnmounted } from 'vue'
import {
  StripeElements,
  StripeCardElementOptions,
  StripeCardCvcElementOptions,
  StripeCardNumberElementOptions,
  StripeCardExpiryElementOptions,
  StripeAuBankAccountElementOptions,
  StripeFpxBankElementOptions,
  StripeIbanElementOptions,
  StripeIdealBankElementOptions,
  StripePaymentRequestButtonElementOptions,
  StripeEpsBankElementOptions,
  StripeP24BankElementOptions,
  StripeElementType,
  StripeElement,
  StripeElementsOptionsClientSecret
} from '@stripe/stripe-js'
import { useStripeInstance } from './plugin'

export type ElementType = {
  type: StripeElementType
  options?:
    | StripeCardElementOptions
    | StripeCardCvcElementOptions
    | StripeCardExpiryElementOptions
    | StripeCardNumberElementOptions
    | StripeAuBankAccountElementOptions
    | StripeFpxBankElementOptions
    | StripeIbanElementOptions
    | StripeIdealBankElementOptions
    | StripePaymentRequestButtonElementOptions
    | StripeEpsBankElementOptions
    | StripeP24BankElementOptions
}

export type StripeOptions = {
  elements?: ElementType[]
  elementsOptions?: StripeElementsOptionsClientSecret
}

export const baseStyle = {
  base: {
    color: '#32325d',
    fontFamily: 'Helvetica Neue, Roboto',
    fontSmoothing: 'antialiased',
    fontSize: '16px',
    '::placeholder': {
      color: '#aab7c4'
    }
  },
  invalid: {
    color: '#fa755a',
    iconColor: '#fa755a'
  }
}

export function useStripe({ elements: types = [], elementsOptions }: StripeOptions) {
  const stripe = useStripeInstance()
  const stripeElements = ref<StripeElements | null>(null)
  const elements = types.map(() => ref([])) as unknown as Ref<StripeElement>[]

  const setupStripe = () => {
    if (!stripe.value) {
      return false
    }
    stripeElements.value = stripe.value.elements(elementsOptions)

    types.forEach(({ type, options }, index) => {
      // @ts-ignore
      elements[index].value = stripeElements.value.create(type, {
        style: baseStyle,
        ...options
      })
    })

    return true
  }

  const destroyElement = (element: StripeElement) => {
    if (element) {
      try {
        element.unmount()
        element.destroy()
      } catch {
        // Do nothing
      }
    }
  }

  watchEffect(() => {
    setupStripe()
  })

  onUnmounted(() => {
    elements.forEach((element) => destroyElement(element.value as any))
  })

  return {
    stripe,
    stripeElements,
    elements
  }
}
