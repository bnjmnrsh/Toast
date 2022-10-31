import { Toast } from '../src/Toast'
import { expect, jest, test, describe } from '@jest/globals'

describe('Toast.js test', () => {
  const toaster = new Toast()
  test('new Toast to creat a toast intance', () => {
    expect(toaster.className).toBe('toast')
  })
  test('Toast.create() will thow because no message was passed.', () => {
    const toaster = new Toast()
    expect(() => toaster.create()).toThrowError(
      'Toast.js requires a message string!'
    )
  })
  test('Toast.create() returns an id of a new toast.', () => {
    const toast1 = toaster.create('first toast!')
    const toast2 = toaster.create('second toast!')
    expect(toast1).toBe('body-0')
    expect(toast2).toBe('body-1')

    toaster.destroy(toast1)
    toaster.destroy(toast2)
  })
  test('Toast.create() adds a toast to the body element.', () => {
    const myToast = toaster.create('first toast!')
    const toastNode = document.createElement('template')
    toastNode.innerHTML = `<div class="toast" data-toast-id="${myToast}" role="alert">first toast!</div>`
    expect(myToast).toBe(`${myToast}`)
    const body = document.querySelector('body')
    expect(body.querySelector(`[data-toast-id="${myToast}"]`)).toStrictEqual(
      toastNode.content.firstChild
    )
    toaster.destroy(myToast)
  })
  test('Toast.create() adds a toast with custom toast classes.', () => {
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
  test('Toast.create() with a dismiss button.', () => {
    const myToast = toaster.create('first toast!', 0, true)
    const toastNode = document.createElement('template')
    toastNode.innerHTML = `<div class="toast" data-toast-id="${myToast}" role="alert">first toast! <button class="toast-close" arial-lable="close">✕</button></div>`

    const body = document.querySelector('body')
    // Now you see it
    expect(body.querySelector(`[data-toast-id="${myToast}"]`)).toEqual(
      toastNode.content.firstChild
    )
    const button = document.querySelector(`[data-toast-id="${myToast}"] button`)
    button.click()
    // Now you don't
    expect(body.querySelector(`[data-toast-id="${myToast}"]`)).toEqual(null)
  })
  test('Toast.create() that auto hides.', () => {
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
  test('Toast.destroy() finds and removes toast, and returns Toast() instance.', () => {
    const myToast = toaster.create('a toast!')
    expect(toaster.destroy(myToast).className).toBe('toast')
  })
  test('Toast.destroy() returns false if no string provided.', () => {
    expect(toaster.destroy()).toBe(false)
  })
  test('Toast.destroy() returns false if no data-toast-id ID found.', () => {
    expect(toaster.destroy('no-toast')).toBe(false)
  })
})
