import { mount } from '@vue/test-utils'
import CurrencySelector from '@/components/CurrencySelector.vue'

describe('CurrencySelector', () => {
  test('is a Vue instance', () => {
    const wrapper = mount(CurrencySelector)
    expect(wrapper.vm).toBeTruthy()
  })
})
