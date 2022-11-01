
[![GitHub package.json version](https://img.shields.io/github/package-json/v/bnjmnrsh/toast)](https://github.com/bnjmnrsh/Toast)
[![GitHub license](https://img.shields.io/github/license/bnjmnrsh/Toast)](https://github.com/bnjmnrsh/Toast/blob/master/LICENSE)
[![GitHub file size in bytes](https://img.shields.io/github/size/bnjmnrsh/toast/dist/Toast.min.js)](https://raw.githubusercontent.com/bnjmnrsh/Toast/main/dist/Toast.min.js)
![GitHub last commit](https://img.shields.io/github/last-commit/bnjmnrsh/Toast)
[![GitHub issues](https://img.shields.io/github/issues/bnjmnrsh/Toast)](https://github.com/bnjmnrsh/Toast/issues)
![GitHub Workflow Status](https://img.shields.io/github/workflow/status/bnjmnrsh/toast/ci-actions)
![Branches](./badges/coverage-branches.svg)
![Functions](./badges/coverage-functions.svg)
![Lines](./badges/coverage-lines.svg)
![Statements](./badges/coverage-statements.svg)
![Jest coverage](./badges/coverage-jest%20coverage.svg)

# @bnjmnrsh/toast.js

 __A utility for managing toast like UI notifications.__


## Table of Contents
 - [Installation](#installation-)
 - [What's this about](#whats-this-about-)
 - [Usage](#usage-)
 - [Targeting](#targeting-)
 - [Classes & IDs](#classes--ids-)
 - [Methods](#methods-)
 - [Styling](#styling-)
 - [Note on a11y](#notes-on-a11y-)
 - [Licence](#licence-isc-)

 ## Installation [↑](#table-of-contents)

Use npm to install the latest version of `Toast.js` from Github.

```javascript
npm i https://github.com/bnjmnrsh/toast
```
 A specific tag can be targeted by appending a hash and the tag name to the URL:

```javascript
npm i https://github.com/bnjmnrsh/toast#v0.0.1
```

 ---

## What's this about [↑](#table-of-contents)

`Toast.js` is a flexible utility to create and manage browser toast type notifications, with basic accessibility baked in. It offers a range of configuration options including custom classes, autohide, and more.

 ---

 ## Usage [↑](#table-of-contents)

```javascript
import {Toast} from '@bnjmnrsh/toast';
const toaster = new Toast({"target":"body", "className":"toast"}); // defaults
toaster.create('Hi I\'m a toast!', 0, false, false, [], false);
```
See notes on [Toast Instantiation](##new-toast----toast-object).

---

## Targeting [↑](#table-of-contents)

Each `Toast()` instance can be attached to a different `target` parent node, allowing you to use multiple areas of your UI to display notifications. Further, subsequent notifications can be prepended or appended within the target. See notes on [Toast Instantiation](#new-toast----toast-object), [Toast.create()](#toastcreate----id-string) for details.

```javascript
const toaster = new Toast({"target": "#my-target"});
```

 ---

## Classes & IDs [↑](#table-of-contents)

`Toast.js` provides a few ways to target notifications on the DOM:
### Custom toast classes
When creating new toasts, you can optionally add an array of classes, allowing for different types of message styling, such as `warnings`.

### `data-toast-id`
  `Toast()` assigns a unique identifier to each notification on a `data-toast-id` attribute. You may optionally pass in your own ID instead when creating new notifications using `Toast().create()`.

```javascript
toaster.create("I'm a toast!",0, false, false, ['-is-warning', '-is-large'], 'awsome-toast-123321')
```
See [Toast.create()](#toastcreate----id-string) for full details.

---

## Methods [↑](#table-of-contents)

### `new Toast()` --> Toast object

Instantiate a new Toast. Accepts an optional object with two properties: `target` and `className`.

```javascript
const toaster = new Toast({
  "target":"#my-target-el", // target El to attach toasts to, defaults to 'body'
  "className":"my-toast",   // base class for all toasts, defaults to 'toast'
 })
```

---

### `Toast.create(...)` --> ID string

Trigger a new notification to be added to the DOM. `Toast.create()` returns the  `id` assigned to the toast's `data-toast-id` attribute as a string.

```javascript
toaster.create(
  message {string}, // toast message string
  autohide {int:0}, // autohide the toast after X millisecond
  dismissible {boolean:false}, // renders close button to dismiss notification
  prepend {boolean:true}, // false will append the toast to the end of any nodes in the target container.
  classes {array}, // An array of classes to add to the toast container
  id {string:false}, // Custom identifier assigned to `data-toast-id`, if empty toast generates its own id.
)
```

---

### `Toast.destroy()` --> Toast object

Removes a toast notification from the DOM by targing the id found on the toast's `data-toast-id` attribute.

```javascript
  Toast.destroy(
    id{string}
  )
```

Useage:
```javascript
const toaster = new Toast()
const myToast = toaster.create("I'm a toast!")
toaster.destroy(myToast)
```

---

## Styling [↑](#table-of-contents)

 `Toast.js` doesn't ship with any CSS styles, the below is a basic toast example.

```CSS
.toast {
  display: flex;
  position: relative;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin: 5px;
  padding: 5px;
  border: 1px solid;
  border-radius: 5px;
  background: lightgrey;
  color: #121111;
}
.toast .toast-close {
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  border: 1px solid;
  border-radius: 100px;
  line-height: 1;
  text-align: center;
}
```

 ---

## Notes on a11y [↑](#table-of-contents)

 There are a few minimum accessibility requirements that `Toast.js` implements. Firstly, all toast messages are given the aria `role="alert"` attribute. By itself however this role is not enough to make screen readers announce a notification, as this role only flags to screen readers that any content in this node should be announced as an alert. To get around this limitation `Toast.js` first appends/prepends the notification to the DOM, and then a millisecond later, populates the toast message inside. This delay wont be noticed by users, but is enough to trigger an announcement by screen readers[^1].

While `Toast.js` puts in place a strong foundation of HTML and basic behaviour, the accessibility of any component is dependant on how it styled and implemented, which are beyond the scope of of this utility. It's best to review your own implementation regularly to understand how it may be effecting your users.

[^1]: Credit here goes to Heydon Pickering, who is the first person I am aware of covering the technique in the book/website [Inclusive Components](https://inclusive-components.design/). Article linked below.

Further Reading:

- [W3C: Aria Authoring Practices: Alert](https://w3c.github.io/aria-practices/#alert)
- [W3C: Notifications and Feedback](https://www.w3.org/WAI/perspective-videos/notifications/)
- [Inclusive Components: Notifications | Heydon Pickering](https://inclusive-components.design/notifications/)

 ---

## LICENCE [ISC](./LICENSE) [↑](#table-of-contents)
Copyright (c) 2022 Benjamin O. Rush ([bnjmnrsh](https://github.com/bnjmnrsh)).