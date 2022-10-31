import { Toast } from '../src/Toast'
import { expect, jest, test, describe } from '@jest/globals'

describe('Toast.js test', () => {
  test('new Toast to creat a toast intance', () => {
    const toaster = new Toast()
    expect(toaster.className).toBe('toast')
  })
  test('Toast.create() will thow because no message was passed.', () => {
    const toaster = new Toast()
    expect(() => toaster.create()).toThrowError(
      'Toast.js requires a message string!'
    )
  })
  test('Toast.create() returns an id of a new toast.', () => {
    const toaster = new Toast()
    expect(toaster.create('first toast!')).toBe('body-0')
    expect(toaster.create('next toast!')).toBe('body-1')
  })

  test('Toast.create() adds a toast to the body element.', () => {
    const toastNode = document.createElement('template')
    toastNode.innerHTML =
      '<div class="toast" data-toast-id="body-0" role="alert">first toast!</div>'
    const toaster = new Toast()
    expect(toaster.create('first toast!')).toBe('body-0')
    const body = document.querySelector('body')
    expect(body.querySelector('[data-toast-id="body-0"]')).toStrictEqual(
      toastNode.content.firstChild
    )
  })

  test('Toast.destroy() finds and removes toast, and returns Toast() instance.', () => {
    const toaster = new Toast()
    const myToast = toaster.create('a toast!')
    expect(myToast).toBe('body-0')
    expect(toaster.destroy(myToast).className).toBe('toast')
  })
  test('Toast.destroy() retuns false if no data-toast-id ID found.', () => {
    const toaster = new Toast()
    expect(toaster.destroy('no-toast')).toBe(false)
  })
})
