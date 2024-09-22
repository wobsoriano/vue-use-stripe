import type { StripeElement, StripeElementChangeEvent } from '@stripe/stripe-js'
import type { PropType } from 'vue'

import { defineComponent, h, ref, watchEffect } from 'vue'

const emits = ['change', 'focus', 'blur', 'click', 'ready', 'escape', 'loadError', 'loaderStart', 'networksChange', 'confirm', 'cancel', 'shippingAddressChange', 'shippingRateChange']

export type ElementChangeEvent = StripeElementChangeEvent & {
  value?: string
  bankName?: string
  branchName?: string
  brand?: string
  country?: string
}

export default defineComponent({
  name: 'StripeElement',
  props: {
    element: {
      type: Object as PropType<StripeElement>,
      default: null,
    },
  },
  emits,
  setup(props, { emit }) {
    const domRef = ref<HTMLElement | null>(null)

    const setupElement = (element: StripeElement) => {
      for (const key of emits) {
        // @ts-expect-error: TODO
        element.on(key, () => emit(key))
      }
    }

    watchEffect((onInvalidate) => {
      if (!props.element || !domRef.value)
        return

      setupElement(props.element)
      props.element.mount(domRef.value)

      onInvalidate(() => {
        props.element.unmount()
      })
    })

    return () => h('div', { ref: domRef })
  },
})
