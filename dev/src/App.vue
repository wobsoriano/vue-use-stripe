<script setup lang="ts">
import type { StripeCardElement } from '@stripe/stripe-js'
import { StripeElement, useStripe } from '../../src'

const {
  stripe,
  elements: [cardNumber, cardExpiry, cardCvc],
} = useStripe({
  elements: [{ type: 'cardNumber' }, { type: 'cardExpiry' }, { type: 'cardCvc' }],
})

async function submit() {
  const result = await stripe.value?.confirmCardPayment('{{CLIENT_SECRET}}', {
    payment_method: {
      card: cardNumber.value as StripeCardElement,
    },
  })

  if (result?.error) {
    // Show error to your customer
  }
  else {
    // The payment has been processed!
  }
}
</script>

<template>
  <form @submit.prevent="submit">
    <StripeElement :element="cardNumber" />
    <StripeElement :element="cardExpiry" />
    <StripeElement :element="cardCvc" />
    <button>Pay</button>
  </form>
</template>
