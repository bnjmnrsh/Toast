/* ! @preserve @bnjmnrsh/toast v0.0.2 | (c) 2022 bnjmnrsh | ISC | git+https://github.com/bnjmnrsh/Toast.git */
var _bnjmnrsh_toast = (function (exports) {
  'use strict';

  /**
   * A utility for mananging toast like UI messages.
   */
  const Toast = (function (options = {}) {
    const settings = {
      selector: 'body',
      className: 'toast',
      prepend: false
    };

    const Constructor = function (options) {
      let ID = 0;
      const publicAPIs = {};
      publicAPIs.settings = { ...options, ...settings };
      publicAPIs.target = document.querySelector(publicAPIs.settings.selector);
      publicAPIs.className = publicAPIs.settings.className;

      // Private Methods
      /**
       * Simple unique ID generator for toasts.
       * ID's are unique for the current session only.
       *
       * @returns string ID, unique to the current session
       */
      const toastID = function () {
        return `${publicAPIs.settings.selector}-${ID++}`.toString()
      };

      /**
       * Create new toast messages
       *
       * @param {string} message
       * @param {int} autohide default 0 or autohide after specified milliseconds
       * @param {boolean} dismiss outputs a dismiss button
       * @param {boolean} prepend prepend instead of append the toast
       * @param {array} classes an array of suplimental classes
       * @param {string} id pass in your own ID insead of using the internal methods
       * @returns {string|boolean:false} ID for the toast message just created
       */
      publicAPIs.create = function (
        message,
        autohide = 0,
        dismiss = false,
        prepend = false,
        classes = [],
        id = false
      ) {
        if (!message) {
          throw new Error('Toast.js requires a message string!')
        }
        id = id || toastID();
        const toast = document.createElement('div');

        toast.setAttribute('role', 'alert');
        toast.setAttribute('data-toast-id', id);
        toast.classList.add(this.className, ...classes);
        if (autohide) {
          setTimeout(() => toast.remove(), autohide);
        }
        if (dismiss) {
          toast.innerHTML = `${message} <button class="toast-close" arial-lable="close">&#x2715</button>`;

          toast.addEventListener('click', function (e) {
            if (!e.target.matches('.toast-close')) return
            toast.remove();
            toast.removeEventListener('click', close);
          });
        } else {
          toast.innerHTML = `${message}`;
        }
        prepend
          ? publicAPIs.target.prepend(toast)
          : publicAPIs.target.append(toast);

        // append message 1ms later so it will be announced by screen readers, thanks Heydon.
        setTimeout(() => toast.innerHTML, 1);
        return id
      };

      /**
       * Remove toasts from DOM
       *
       * @param {string} id of the toast to be reomved from the DOM
       * @returns
       */
      publicAPIs.destroy = function (id) {
        if (!id) return false
        const target = document.querySelector(`[data-toast-id="${id}"]`);
        if (target) {
          target.remove();
          return publicAPIs
        }
        return false
      };
      return publicAPIs
    };
    return Constructor
  })();

  exports.Toast = Toast;

  Object.defineProperty(exports, '__esModule', { value: true });

  return exports;

})({});
//# sourceMappingURL=Toast.iife.js.map
