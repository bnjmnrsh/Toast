import { Toast } from '../src/Toast'
import { expect, jest, test, describe } from '@jest/globals'

describe('Toast.create()  will:', () => {
  const toaster = new Toast()
  test('throw when no message was passed.', () => {
    const toaster = new Toast()
    expect(() => toaster.create()).toThrowError(
      'Toast.js requires a message string!'
    )
  })
  test('return the id of a new toast.', () => {
    const toast1 = toaster.create('first toast!')
    const toast2 = toaster.create('second toast!')
    expect(toast1).toBe('body-0')
    expect(toast2).toBe('body-1')

    toaster.destroy(toast1)
    toaster.destroy(toast2)
  })
  test('add a toast to the body element.', () => {
    const myToast = toaster.create('first toast!')
    const toastNode = document.createElement('template')
    toastNode.innerHTML = `<div class="toast" data-toast-id="${myToast}" role="alert">first toast!</div>`
    expect(myToast).toBe(`${myToast}`)
    expect(
      document.querySelector(`[data-toast-id="${myToast}"]`)
    ).toStrictEqual(toastNode.content.firstChild)
    toaster.destroy(myToast)
  })
  test('add a toast with custom classes.', () => {
    const myToast = toaster.create(
      'first toast!',
      0,
      false,
      false,
      ['-is-error', '-is-urgent'],
      'my-unique-ID'
    )
    const toastNode = document.createElement('template')
    toastNode.innerHTML = `<div class="toast -is-error -is-urgent" data-toast-id="my-unique-ID" role="alert">first toast!</div>`
    expect(myToast).toBe(`${myToast}`)
    const body = document.querySelector('body')
    expect(body.querySelector(`[data-toast-id="${myToast}"]`)).toEqual(
      toastNode.content.firstChild
    )
    toaster.destroy(myToast)
  })
  test('create toast with a dismiss button.', () => {
    const myToast = toaster.create('first toast!', 0, true)
    const toastNode = document.createElement('template')
    toastNode.innerHTML = `<div class="toast" data-toast-id="${myToast}" role="alert">first toast! <button class="toast-close" arial-lable="close">✕</button></div>`

    const body = document.querySelector('body')
    // Now you see it
    expect(body.querySelector(`[data-toast-id="${myToast}"]`)).toEqual(
      toastNode.content.firstChild
    )
    toaster.destroy(myToast)
  })
  test('the event listener on toast with dismiss button', () => {
    const myToast = toaster.create('toast!', 0, true)
    const toastNode = document.createElement('template')
    toastNode.innerHTML = `<div class="toast" data-toast-id="${myToast}" role="alert">toast! <button class="toast-close" arial-lable="close">✕</button></div>`

    const body = document.querySelector('body')
    // Now you see it
    const toastEl = body.querySelector(`[data-toast-id="${myToast}"]`)
    expect(toastEl).toEqual(toastNode.content.firstChild)

    // Click on the toast itself does nothing
    toastEl.click()
    expect(body.querySelector(`[data-toast-id="${myToast}"]`)).toEqual(
      toastNode.content.firstChild
    )
    // Dismiss the toast
    const button = toastEl.querySelector(`button.toast-close`)
    button.click()
    // Now its gone
    expect(body.querySelector(`[data-toast-id="${myToast}"]`)).toEqual(null)
  })
  test('create a toast that auto hides.', () => {
    jest.useFakeTimers()
    const myToast = toaster.create('hide toast!', 3000)
    const toastNode = document.createElement('template')
    toastNode.innerHTML = `<div class="toast" data-toast-id="${myToast}" role="alert">hide toast!</div>`
    // Now you see it
    expect(document.querySelector(`[data-toast-id="${myToast}"]`)).toEqual(
      toastNode.content.firstChild
    )
    jest.runAllTimers()
    // Now you don't
    expect(document.querySelector(`[data-toast-id="${myToast}"]`)).toBe(null)
    toaster.destroy(myToast)
  })
  test('prepends to a list of toasts by default', () => {
    expect(document.querySelectorAll(`[data-toast-id]`).length).toBe(0)
    const toast1 = toaster.create('toast1')
    const toast1String = `<div class="toast" data-toast-id="${toast1}" role="alert">toast1</div>`
    const toastTemplate1 = document.createElement('template')
    toastTemplate1.innerHTML = toast1String

    const toast2 = toaster.create('toast2')
    const toast2String = `<div class="toast" data-toast-id="${toast2}" role="alert">toast2</div>`
    const toastTemplate2 = document.createElement('template')
    toastTemplate2.innerHTML = toast2String
    // expect new toasts to be prepend top of node list
    const toastArr = [
      toastTemplate2.content.firstChild,
      toastTemplate1.content.firstChild
    ]

    // querySelectorAll returns the document order, spread to an array for comparion
    const toastsOnDom = [...document.querySelectorAll(`[data-toast-id]`)]
    expect(toastsOnDom).toEqual(toastArr)
    toaster.destroy(toast2).destroy(toast1)
  })
  test('prepend=false flag appends toasts instead', () => {
    expect(document.querySelectorAll(`[data-toast-id]`).length).toBe(0)

    const toast1 = toaster.create('toast1')
    const toast1String = `<div class="toast" data-toast-id="${toast1}" role="alert">toast1</div>`
    const toastTemplate1 = document.createElement('template')
    toastTemplate1.innerHTML = toast1String

    const toast2 = toaster.create('toast2', 0, false, false)
    const toast2String = `<div class="toast" data-toast-id="${toast2}" role="alert">toast2</div>`
    const toastTemplate2 = document.createElement('template')
    toastTemplate2.innerHTML = toast2String

    // expect new toasts to be append to bottom of node list
    const toastArr = [
      toastTemplate1.content.firstChild,
      toastTemplate2.content.firstChild
    ]

    // querySelectorAll returns the document order, spread to an array for comparion
    const toastsOnDom = [...document.querySelectorAll(`[data-toast-id]`)]
    expect(toastsOnDom).toEqual(toastArr)
    toaster.destroy(toast2).destroy(toast1)
  })
})
