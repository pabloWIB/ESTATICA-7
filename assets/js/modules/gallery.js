/**
 * gallery.js — filters the collection by grouping.
 *
 * Every card is present in the HTML, so the full collection is readable with
 * JavaScript disabled; this only hides and shows what is already there.
 * One delegated listener covers all filter buttons.
 */
(function (Paradox) {
  "use strict";

  Paradox.initGallery = function initGallery() {
    const grid = document.querySelector("[data-gallery]");
    const filters = document.querySelector(".filters");

    if (!grid || !filters) {
      return;
    }

    const status = document.querySelector("[data-gallery-status]");
    const cards = Array.from(grid.querySelectorAll(".card"));
    const buttons = Array.from(filters.querySelectorAll("[data-filter]"));

    if (!cards.length || !buttons.length) {
      return;
    }

    function apply(value) {
      let shown = 0;

      cards.forEach(function (card) {
        const match = value === "all" || card.dataset.collection === value;
        card.hidden = !match;
        if (match) {
          shown += 1;
        }
      });

      buttons.forEach(function (button) {
        button.setAttribute(
          "aria-pressed",
          String(button.dataset.filter === value)
        );
      });

      if (status) {
        status.textContent =
          shown === 1 ? "1 piece shown" : shown + " pieces shown";
      }
    }

    filters.addEventListener("click", function (event) {
      const button = event.target.closest("[data-filter]");
      if (button && filters.contains(button)) {
        apply(button.dataset.filter);
      }
    });
  };
})((window.Paradox = window.Paradox || {}));
