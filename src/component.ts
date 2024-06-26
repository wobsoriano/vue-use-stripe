import type { PropType } from 'vue'
import { defineComponent, h, onMounted, ref, watchEffect } from 'vue'

import type { StripeElement, StripeElementChangeEvent } from '@stripe/stripe-js'

const emits = ['change', 'focus', 'blur', 'click', 'ready']

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
      const [change, ...eventNames] = emits
      for (const key of eventNames) {
        // @ts-expect-error: Some elements doesn't have this method
        element.on(key, () => emit(key))
      }

      // @ts-expect-error: Some elements doesn't have this method
      props.element.on(change, (event: ElementChangeEvent) => emit(change, event))
    }

    onMounted(() => {
      watchEffect((onInvalidate) => {
        if (!props.element || !domRef.value)
          return

        setupElement(props.element)
        props.element.mount(domRef.value)

        onInvalidate(() => {
          props.element.unmount()
        })
      })
    })

    return () => h('div', { ref: domRef })
  },
})
