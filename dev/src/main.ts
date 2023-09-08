import { createApp } from 'vue'

// Using import aliases in Vite
import { loadStripe } from '@stripe/stripe-js'
import { StripePlugin } from '../../src'
import App from './App.vue'

const app = createApp(App)

const stripePromise = loadStripe('')

app.use(StripePlugin(stripePromise))

app.mount('#app')
