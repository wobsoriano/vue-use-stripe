import type { StripeElement, StripeElements, StripeElementsOptions } from '@stripe/stripe-js'
import type { ElementTypeAndOptions, ElementTypeMap } from './types'
import { readonly, shallowRef, type ShallowRef, watchEffect } from 'vue'
import { useStripeInstance } from './plugin'

interface UnknownOptions { [k: string]: unknown }

export function useStripe<T extends (keyof ElementTypeMap)[]>({ elements: types = [] as unknown as { [K in keyof T]: ElementTypeAndOptions<T[K]> }, elementsOptions }: {
  elements?: { [K in keyof T]: ElementTypeAndOptions<T[K]> }
  elementsOptions?: StripeElementsOptions
}) {
  const stripe = useStripeInstance()
  const stripeElements = shallowRef<StripeElements | null>(null)
  const elements = types.map(() => shallowRef<StripeElement>())

  const setupStripe = () => {
    if (!stripe.value)
      return false

    stripeElements.value = stripe.value.elements(elementsOptions as UnknownOptions)

    types.forEach(({ type, options }, index) => {
      elements[index].value = stripeElements.value!.create(type as any, options as UnknownOptions)
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

  watchEffect((onInvalidate) => {
    setupStripe()

    onInvalidate(() => {
      elements.forEach(element => destroyElement(element.value!))
    })
  })

  return {
    stripe,
    stripeElements: readonly(stripeElements),
    elements: elements as { [K in keyof T]: ShallowRef<ElementTypeMap[T[K]]> },
  }
}
