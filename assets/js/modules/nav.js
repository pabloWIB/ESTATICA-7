/**
 * nav.js — mobile navigation panel.
 *
 * Opens and closes on the toggle, closes on Escape, on choosing a link, and
 * when the viewport crosses into the desktop layout. Locks background scroll
 * while open.
 */
(function (Paradox) {
  "use strict";

  Paradox.initNav = function initNav() {
    const toggle = document.querySelector("[data-nav-toggle]");
    const nav = document.getElementById("site-nav");

    if (!toggle || !nav) {
      return;
    }

    const desktop = window.matchMedia("(min-width: 768px)");

    function isOpen() {
      return toggle.getAttribute("aria-expanded") === "true";
    }

    function setOpen(open) {
      if (open === isOpen()) {
        return;
      }

      toggle.setAttribute("aria-expanded", String(open));
      toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");

      if (open) {
        nav.setAttribute("data-open", "true");
        Paradox.scrollLock.acquire();
      } else {
        nav.removeAttribute("data-open");
        Paradox.scrollLock.release();
      }
    }

    toggle.addEventListener("click", function () {
      setOpen(!isOpen());
    });

    nav.addEventListener("click", function (event) {
      if (event.target.closest("a")) {
        setOpen(false);
      }
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && isOpen()) {
        setOpen(false);
        toggle.focus();
      }
    });

    desktop.addEventListener("change", function (event) {
      if (event.matches) {
        setOpen(false);
      }
    });
  };
})((window.Paradox = window.Paradox || {}));
