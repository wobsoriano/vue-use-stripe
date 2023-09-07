<script setup lang="ts">
import { StripeElement, useStripe } from '../../src'

const { elements: [cardElement] } = useStripe({
  elements: [{ type: 'card', options: {} }],
})

// eslint-disable-next-line no-console
console.log('cardElement', cardElement)
</script>

<template>
  <StripeElement :element="cardElement" />
</template>
