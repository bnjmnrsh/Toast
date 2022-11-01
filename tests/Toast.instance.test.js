import { Toast } from '../src/Toast'
import { expect, test, describe } from '@jest/globals'

describe('new Toast() will:', () => {
  test('create a new generic Toast instance', () => {
    const toaster = new Toast()
    expect(toaster.settings.selector).toBe('body')
    expect(toaster.settings.className).toBe('toast')
    expect(toaster.target).toEqual(document.body)
    expect(toaster.className).toEqual(toaster.settings.className)
  })
  test('can creaet a custom Toast instance, on a target with a custom class', () => {
    // Create a div with the id of 'test' on the body
    const testEl = document.createElement('div')
    testEl.setAttribute('id', 'toast-target')
    document.body.appendChild(testEl)

    // Custom Toast instance set up on the #test element.
    const supaToaster = new Toast({
      selector: '#toast-target',
      className: 'supa-toast'
    })
    // expect(toaster.settings.selector).toBe('#test')
    expect(supaToaster.settings.className).toBe('supa-toast')
    expect(supaToaster.target).toEqual(document.getElementById('toast-target'))
    expect(supaToaster.className).toEqual('supa-toast')
  })
  test("throws when it can't find the element it is supposed to add new toasts to.", () => {
    const throws = 'Toast: the target element "#no-toast" could not be found.'
    const noToaster = function () {
      return new Toast({
        selector: '#no-toast'
      })
    }
    expect(() => noToaster()).toThrow(throws)
  })
})
