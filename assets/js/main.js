/**
 * main.js — single entry point.
 *
 * The module files above define their initialisers on the shared Paradox
 * namespace; this runs whichever of them are present. Each initialiser bails
 * out on its own if the markup it needs is not on the page, so the same
 * bundle serves index.html and 404.html.
 */
(function (Paradox) {
  "use strict";

  [Paradox.initNav, Paradox.initGallery, Paradox.initLightbox].forEach(
    function (init) {
      if (typeof init === "function") {
        init();
      }
    }
  );
})(window.Paradox || {});
