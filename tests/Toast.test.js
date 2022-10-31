import { Satchel } from '../src/Satchel'
import { expect, jest, test, describe } from '@jest/globals'

describe('Satchel: testing bin method', () => {
  beforeEach(() => {
    sessionStorage.clear()
  })

  test('Satchel: Test bin() to remove an entry from Storage', () => {
    // localStorage
    const tacoLocal = new Satchel('taco', { data: null, expiry: null }, true)
    expect(window.localStorage.length).toEqual(1)
    tacoLocal.bin()
    expect(window.localStorage.length).toEqual(0)
    expect(tacoLocal.get(true)).toBe(null)

    // sessionStorage
    const tacoSession = new Satchel('taco', { data: null, expiry: null }, false)
    expect(window.sessionStorage.length).toEqual(1)
    tacoSession.bin()
    expect(window.sessionStorage.length).toEqual(0)
    expect(tacoSession.get(true)).toBe(null)
  })

  test('Satchel: Test bin() to try and remove a missing record', () => {
    const noTaco = new Satchel('taco')
    noTaco.bin()

    expect(noTaco.bin()).toBe(null)
  })
})
