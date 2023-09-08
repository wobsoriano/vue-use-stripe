# Vue Use Stripe

This is a Vue 3 wrapper for Stripe.js written in TypeScript. It simply provides a function (Vue composable) to create Stripe elements and a component that conveniently emits events.

## Installation

```bash
npm install @stripe/stripe-js vue3-use-stripe
```

## Usage

Install the plugin

```ts
import { loadStripe } from '@stripe/stripe-js'
import { StripePlugin } from 'vue3-use-stripe'

const app = createApp(App)

const stripePromise = loadStripe('{{STRIPE_PUBLISHABLE_KEY}}')

app.use(StripePlugin(stripePromise))
```

Use it like so

```vue
<script setup lang="ts">
import { StripeElement, useStripe } from 'vue3-use-stripe'

const {
  stripe,
  stripeElements,
  elements: [paymentElement],
} = useStripe({
  elements: [{ type: 'payment'}],
  elementsOptions: {
    clientSecret: '{{CLIENT_SECRET}}',
  },
})

async function submit() {
  const result = await stripe.value.confirmPayment({
    elements: stripeElements.value,
    redirect: 'if_required'
  })

  if (result.error) {
    // Handle error
  } else {
    // Handle success
  }
}
</script>

<template>
  <form @submit.prevent="submit">
    <StripeElement :element="paymentElement" />
    <button>Pay</button>
  </form>
</template>
```

## API

```ts
useStripe(options: StripeOptions): {
  // Reactive reference to the Stripe instance
  stripe: ShallowRef<Stripe | null>;

  // Reactive reference to the internal elements instance (Stripe.elements(...)).
  // This allows creating Stripe elements manually (optional):
  // stripeElements.value.create('card', { <options> })
  stripeElements: ShallowRef<StripeElements | null>;

  // Array of elements created out of `StripeOptions.elements` array
  elements: ShallowRef<StripeElement | undefined>[];
}

type StripeOptions = {
  // Array of elements to be created
  // See the following link for possible types and options:
  // https://stripe.com/docs/js/elements_object/create_element?type=card
  // E.g. `[{ type: 'card', options: { hidePostalCode: true } }, { type: 'fpxBank' }, ...]
  elements?: { type: string; options: object }[];

  // Elements constructor options: https://stripe.com/docs/js/elements_object/create
  elementsOptions?: object;
}
```

Note: `StripeOptions.elements` array is optional. Alternatively, create elements manually using the returned `stripeElements`.

The `<StripeElement />` component will emit any event created by the internal element: `change`, `ready`, `click`, `focus`, `blur`.

### Nuxt

Create a client plugin to load Stripe and install the Vue plugin

```ts
// file: plugins/stripe.client.ts
import { loadStripe } from '@stripe/stripe-js'
import { StripePlugin } from 'vue3-use-stripe'

export default defineNuxtPlugin(async (nuxtApp) => {
  const stripe = await loadStripe('{{STRIPE_PUBLISHABLE_KEY}}')

  nuxtApp.vueApp.use(StripePlugin(stripe))
})
```
