import { Stripe } from "@stripe/stripe-js";
import { Plugin, ShallowRef, inject, shallowRef } from "vue";

export function StripePlugin(stripePromise: Promise<Stripe | null>): Plugin {
  return {
    install: (app) => {
      const stripe = shallowRef<Stripe | null>(null)
      stripePromise.then((result) => {
        stripe.value = result
      })

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
