/**
 * lightbox.js — full-size viewer for a gallery piece.
 *
 * Steps only through the currently visible (filtered) cards. Handles Escape,
 * arrow keys, a focus trap, and returns focus to the card that opened it.
 */
(function (Paradox) {
  "use strict";

  Paradox.initLightbox = function initLightbox() {
    const root = document.getElementById("lightbox");
    const grid = document.querySelector("[data-gallery]");

    if (!root || !grid) {
      return;
    }

    const stage = root.querySelector("[data-lightbox-stage]");
    const titleEl = root.querySelector("[data-lightbox-title]");
    const creditEl = root.querySelector("[data-lightbox-credit]");
    const counterEl = root.querySelector("[data-lightbox-counter]");
    const closeButton = root.querySelector("[data-lightbox-close]");
    const prevButton = root.querySelector("[data-lightbox-prev]");
    const nextButton = root.querySelector("[data-lightbox-next]");

    if (!stage || !closeButton || !prevButton || !nextButton) {
      return;
    }

    const image = document.createElement("img");
    image.className = "lightbox__image";
    image.alt = "";

    let items = [];
    let index = 0;
    let lastFocused = null;

    function text(node) {
      return node ? node.textContent.replace(/\s+/g, " ").trim() : "";
    }

    function render() {
      const card = items[index];
      if (!card) {
        return;
      }

      const source = card.querySelector(".card__image");
      if (!source) {
        return;
      }

      image.src = source.getAttribute("src");
      image.alt = source.getAttribute("alt") || "";

      if (image.parentNode !== stage) {
        stage.appendChild(image);
      }

      if (titleEl) {
        titleEl.textContent = text(card.querySelector(".card__title"));
      }
      if (creditEl) {
        creditEl.textContent = text(card.querySelector(".card__credit"));
      }
      if (counterEl) {
        counterEl.textContent = index + 1 + " / " + items.length;
      }

      prevButton.disabled = items.length < 2;
      nextButton.disabled = items.length < 2;
    }

    function open(card) {
      items = Array.from(grid.querySelectorAll(".card")).filter(function (node) {
        return !node.hidden;
      });
      index = items.indexOf(card);

      if (index < 0) {
        return;
      }

      lastFocused = document.activeElement;
      render();
      root.hidden = false;
      Paradox.scrollLock.acquire();
      closeButton.focus();
    }

    function close() {
      if (root.hidden) {
        return;
      }

      root.hidden = true;
      if (image.parentNode === stage) {
        stage.removeChild(image);
      }
      Paradox.scrollLock.release();

      if (lastFocused && document.contains(lastFocused)) {
        lastFocused.focus();
      }
    }

    function step(delta) {
      if (items.length < 2) {
        return;
      }
      index = (index + delta + items.length) % items.length;
      render();
    }

    function trapFocus(event) {
      const focusable = Array.from(
        root.querySelectorAll("button:not([disabled])")
      );

      if (!focusable.length) {
        return;
      }

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    grid.addEventListener("click", function (event) {
      const trigger = event.target.closest("[data-lightbox-open]");
      if (!trigger) {
        return;
      }

      const card = trigger.closest(".card");
      if (card) {
        open(card);
      }
    });

    closeButton.addEventListener("click", close);

    prevButton.addEventListener("click", function () {
      step(-1);
    });

    nextButton.addEventListener("click", function () {
      step(1);
    });

    root.addEventListener("click", function (event) {
      if (
        event.target === root ||
        event.target.classList.contains("lightbox__stage")
      ) {
        close();
      }
    });

    document.addEventListener("keydown", function (event) {
      if (root.hidden) {
        return;
      }

      if (event.key === "Escape") {
        close();
      } else if (event.key === "ArrowLeft") {
        event.preventDefault();
        step(-1);
      } else if (event.key === "ArrowRight") {
        event.preventDefault();
        step(1);
      } else if (event.key === "Tab") {
        trapFocus(event);
      }
    });
  };
})((window.Paradox = window.Paradox || {}));
