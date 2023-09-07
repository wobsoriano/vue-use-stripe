import { createApp } from 'vue'

// Using import aliases in Vite
import { StripePlugin } from '../../src'
import App from './App.vue'
import { loadStripe } from '@stripe/stripe-js'

const app = createApp(App)

const stripePromise = loadStripe('')

app.use(StripePlugin(stripePromise))

app.mount('#app')
