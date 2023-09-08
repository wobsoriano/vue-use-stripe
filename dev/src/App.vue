<script setup lang="ts">
import { StripeElement, useStripe } from '../../src'

const { elements: [paymentElement] } = useStripe({
  elements: [{ type: 'payment' }],
  elementsOptions: {
    clientSecret: '{}',
  },
})
</script>

<template>
  <StripeElement :element="paymentElement" />
</template>
