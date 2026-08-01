/**
 * scroll-lock.js — reference-counted body scroll lock.
 *
 * Shared so that the mobile menu and the lightbox cannot unlock each other
 * while the other one is still open.
 */
(function (Paradox) {
  "use strict";

  let holders = 0;

  Paradox.scrollLock = {
    acquire: function acquire() {
      holders += 1;
      document.body.classList.add("scroll-locked");
    },

    release: function release() {
      holders = Math.max(0, holders - 1);
      if (holders === 0) {
        document.body.classList.remove("scroll-locked");
      }
    },
  };
})((window.Paradox = window.Paradox || {}));
