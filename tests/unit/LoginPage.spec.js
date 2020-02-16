import { shallowMount } from '@vue/test-utils'
import LoginPage from '@/components/LoginPage'
import { DONE, FAILED } from '@/utils/constants'

describe('LoginPage.vue', () => {
  it('renders', () => {
    const wrapper = shallowMount(LoginPage, {
      computed: {
        loginState: () => ({
          status: ''
        })
      }
    })

    expect(wrapper.find('h1').text()).toEqual('Login')
    expect(wrapper.find('button').text()).toEqual('Login')
    // no success or error message
    expect(wrapper.find('.success').exists()).toBeFalsy()
    expect(wrapper.find('.failure').exists()).toBeFalsy()
  })

  it('shows success message', () => {
    const wrapper = shallowMount(LoginPage, {
      computed: {
        loginState: () => ({
          status: DONE,
          user: 'foo'
        })
      }
    })

    // success but no error message
    expect(wrapper.find('.success').text()).toContain('logged in as user foo')
    expect(wrapper.find('.failure').exists()).toBeFalsy()
  })

  it('shows success message', () => {
    const wrapper = shallowMount(LoginPage, {
      computed: {
        loginState: () => ({
          status: FAILED
        })
      }
    })

    // error but no success message
    expect(wrapper.find('.failure').text()).toContain('Login failed')
    expect(wrapper.find('.success').exists()).toBeFalsy()
  })
})
