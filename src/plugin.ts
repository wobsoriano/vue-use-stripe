import type { Stripe } from '@stripe/stripe-js'
import type { InjectionKey, Plugin, ShallowRef } from 'vue'
import { inject, readonly, shallowRef } from 'vue'

function isPromise(x: unknown): x is Promise<unknown> {
  return x instanceof Promise
}

const StripeKey: InjectionKey<ShallowRef<Stripe | null>> = Symbol('stripe')

export function StripePlugin(stripeInstanceOrPromise: Stripe | Promise<Stripe | null>): Plugin {
  return {
    install: (app) => {
      const stripe = shallowRef<Stripe | null>(null)

      if (isPromise(stripeInstanceOrPromise)) {
        stripeInstanceOrPromise.then((result) => {
          stripe.value = result
        })
      }
      else {
        stripe.value = stripeInstanceOrPromise
      }

      app.provide(StripeKey, stripe)
    },
  }
}

export function useStripeInstance() {
  const stripe = inject(StripeKey)
  if (!stripe)
    throw new Error('You must call `useStripe()` inside the `setup()` function.')

  return readonly(stripe)
}
