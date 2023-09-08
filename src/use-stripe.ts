import type { Ref } from 'vue'
import { onUnmounted, ref, watchEffect } from 'vue'

import type {
  StripeAuBankAccountElementOptions,
  StripeCardCvcElementOptions,
  StripeCardElementOptions,
  StripeCardExpiryElementOptions,
  StripeCardNumberElementOptions,
  StripeElement,
  StripeElementType,
  StripeElements,
  StripeElementsOptions,
  StripeEpsBankElementOptions,
  StripeFpxBankElementOptions,
  StripeIbanElementOptions,
  StripeIdealBankElementOptions,
  StripeP24BankElementOptions,
  StripePaymentRequestButtonElementOptions,
} from '@stripe/stripe-js'

import { useStripeInstance } from './plugin'

export const baseStyle = {
  base: {
    'color': '#32325d',
    'fontFamily': 'Helvetica Neue, Roboto',
    'fontSmoothing': 'antialiased',
    'fontSize': '16px',
    '::placeholder': {
      color: '#aab7c4',
    },
  },
  invalid: {
    color: '#fa755a',
    iconColor: '#fa755a',
  },
}

interface ElementType {
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

export function useStripe({ elements: types = [], elementsOptions }: {
  elements?: ElementType[]
  elementsOptions?: StripeElementsOptions
}) {
  const stripe = useStripeInstance()
  const stripeElements = ref<StripeElements | null>(null)
  const elements = types.map(() => ref([])) as unknown as Ref<StripeElement>[]

  const setupStripe = () => {
    if (!stripe.value)
      return false

    stripeElements.value = stripe.value.elements(elementsOptions as any)

    types.forEach(({ type, options }, index) => {
      // @ts-expect-error: Internal Stripe typings are not compatible
      elements[index].value = stripeElements.value.create(type, {
        style: baseStyle,
        ...options,
      })
    })

    return true
  }

  const destroyElement = (element: StripeElement) => {
    if (element) {
      try {
        element.unmount()
        element.destroy()
      }
      catch {
        // Do nothing
      }
    }
  }

  watchEffect(() => {
    setupStripe()
  })

  onUnmounted(() => {
    elements.forEach(element => destroyElement(element.value as any))
  })

  return {
    stripe,
    stripeElements,
    elements,
  }
}
