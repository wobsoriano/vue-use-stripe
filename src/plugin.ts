import { Stripe } from '@stripe/stripe-js'
import { Plugin, ShallowRef, inject, shallowRef } from 'vue'

function isPromise(x: unknown): x is Promise<unknown> {
  return x instanceof Promise
}

export function StripePlugin(stripePromise: Stripe | Promise<Stripe | null>): Plugin {
  return {
    install: (app) => {
      const stripe = shallowRef<Stripe | null>(null)

      if (isPromise(stripePromise)) {
        stripePromise.then((result) => {
          stripe.value = result
        })
      } else {
        stripe.value = stripePromise
      }

      app.provide('stripe', stripe)
    }
  }
}

export function useStripeInstance() {
  const stripe = inject('stripe')
  if (!stripe) {
    throw new Error('You must call `useStripe()` inside the `setup()` function.')
  }
  return stripe as ShallowRef<Stripe | null>
}
