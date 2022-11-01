import { Toast } from '../src/Toast'
import { expect, test, describe } from '@jest/globals'

describe('Toast.destroy() will:', () => {
  const toaster = new Toast()
  test('find and remove a toast, then return a Toast() instance.', () => {
    const myToast = toaster.create('a toast!')
    expect(toaster.destroy(myToast).className).toBe('toast')
  })
  test('return false if no string provided.', () => {
    expect(toaster.destroy()).toBe(false)
  })
  test('return false if `data-toast-id` not found.', () => {
    expect(toaster.destroy('no-toast')).toBe(false)
  })
  test('can be chained to delete mutiple toasts.', () => {
    const toast1 = toaster.create('1 toast!')
    const toast2 = toaster.create('2 toast!')
    // we have two toasts on the DOM
    expect(document.querySelectorAll('[data-toast-id]').length).toBe(2)
    // We are getting the toast object back from .destroy()
    expect(toaster.destroy(toast1).destroy(toast2).className).toBe('toast')
    // All toasts are removed from the DOM
    expect(document.querySelectorAll('[data-toast-id]').length).toBe(0)
  })
})
