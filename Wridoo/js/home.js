/* ============================================================
   Wridoo - Travel CRM Landing Page Interactive Scripts (HubSpot)
   ============================================================ */

(function () {
  function initWridoo() {
    /* ---------- Dashboard Tabs Switcher ---------- */
    document.querySelectorAll(".fs-dashboard-nav .nav-link").forEach(function (btn) {
      btn.addEventListener("click", function (e) {
        e.preventDefault();
        var targetTab = btn.getAttribute("data-tab") || (btn.getAttribute("data-bs-target") || "").replace("#", "");
        var nav = btn.closest(".fs-dashboard-nav");
        var wrapper = btn.closest(".fs-dashboard-wrapper");
        if (!wrapper) return;

        nav.querySelectorAll(".nav-link").forEach(function (b) {
          b.classList.remove("active");
        });
        wrapper.querySelectorAll(".fs-dashboard-img-wrap .tab-pane").forEach(function (pane) {
          pane.classList.remove("active", "show");
          pane.style.display = "none";
        });

        btn.classList.add("active");
        var targetPane = wrapper.querySelector("#" + targetTab);
        if (targetPane) {
          targetPane.classList.add("active", "show");
          targetPane.style.display = "block";
        }
      });
    });

    /* ---------- Feature Tabs Switcher ---------- */
    document.querySelectorAll(".tabs .tab-btn[data-feature-tab]").forEach(function (btn) {
      btn.addEventListener("click", function (e) {
        e.preventDefault();
        var mod = btn.getAttribute("data-module");
        var tabIndex = btn.getAttribute("data-feature-tab");
        var tabsContainer = btn.closest(".tabs");
        var section = btn.closest(".section");
        if (!section) return;

        tabsContainer.querySelectorAll(".tab-btn").forEach(function (b) {
          b.classList.remove("is-active");
        });
        btn.classList.add("is-active");

        section.querySelectorAll(".tab-panel").forEach(function (panel) {
          panel.style.display = "none";
          panel.classList.remove("is-entering");
        });

        var activePanel = document.getElementById("feature-panel-" + mod + "-" + tabIndex);
        if (activePanel) {
          activePanel.style.display = "grid";
          void activePanel.offsetWidth;
          activePanel.classList.add("is-entering");
        }
      });
    });

    /* ---------- Testimonials Carousel Navigation ---------- */
    document.querySelectorAll(".testimonial-wrap").forEach(function (wrap) {
      var cards = wrap.querySelectorAll(".testimonial-card");
      if (cards.length <= 1) return;
      var currentIndex = 0;

      var prevBtn = wrap.querySelector(".testimonial-prev");
      var nextBtn = wrap.querySelector(".testimonial-next");

      function showSlide(idx) {
        cards.forEach(function (card, i) {
          card.style.display = i === idx ? "block" : "none";
        });
      }

      if (prevBtn) {
        prevBtn.addEventListener("click", function () {
          currentIndex = currentIndex === 0 ? cards.length - 1 : currentIndex - 1;
          showSlide(currentIndex);
        });
      }

      if (nextBtn) {
        nextBtn.addEventListener("click", function () {
          currentIndex = (currentIndex + 1) % cards.length;
          showSlide(currentIndex);
        });
      }
    });

    /* ---------- Partner Showcase Slider Navigation ---------- */
    document.querySelectorAll(".showcase-viewport").forEach(function (viewport) {
      var section = viewport.closest(".section");
      if (!section) return;
      var track = viewport.querySelector(".showcase-track");
      if (!track) return;
      var cards = track.querySelectorAll(".showcase-card");
      var currentShowcase = 0;
      var maxIndex = Math.max(0, cards.length - 3);

      var prevBtn = section.querySelector(".showcase-prev");
      var nextBtn = section.querySelector(".showcase-next");

      function updateTrack() {
        track.style.transform = "translateX(calc(" + -currentShowcase + " * 25%))";
      }

      if (prevBtn) {
        prevBtn.addEventListener("click", function () {
          currentShowcase = Math.max(0, currentShowcase - 1);
          updateTrack();
        });
      }

      if (nextBtn) {
        nextBtn.addEventListener("click", function () {
          currentShowcase = Math.min(maxIndex, currentShowcase + 1);
          updateTrack();
        });
      }
    });

    /* ---------- Mobile Slide-out Menu Navigation ---------- */
    var navButtons = document.querySelectorAll(".xb-nav-mobile");
    var headerMenus = document.querySelectorAll(".xb-header-menu");
    var backdrops = document.querySelectorAll(".xb-header-menu-backdrop");
    var closeButtons = document.querySelectorAll(".xb-menu-close");

    function closeAllMenus() {
      navButtons.forEach(function (btn) { btn.classList.remove("active"); });
      headerMenus.forEach(function (menu) { menu.classList.remove("active"); });
      backdrops.forEach(function (bd) { bd.classList.remove("active"); });
      document.body.classList.remove("mobile-menu-open");
    }

    navButtons.forEach(function (btn) {
      btn.addEventListener("click", function (e) {
        e.preventDefault();
        btn.classList.toggle("active");
        headerMenus.forEach(function (menu) { menu.classList.toggle("active"); });
        backdrops.forEach(function (bd) { bd.classList.toggle("active"); });
        document.body.classList.toggle("mobile-menu-open");
      });
    });

    closeButtons.forEach(function (btn) {
      btn.addEventListener("click", closeAllMenus);
    });

    backdrops.forEach(function (bd) {
      bd.addEventListener("click", closeAllMenus);
    });

    document.querySelectorAll(".xb-header-nav .menu-item-has-children > a").forEach(function (link) {
      link.addEventListener("click", function (e) {
        var parentLi = link.closest(".menu-item-has-children");
        var subMenu = parentLi.querySelector(".sub-menu");
        if (subMenu) {
          e.preventDefault();
          parentLi.classList.toggle("open");
          subMenu.style.display = subMenu.style.display === "block" ? "none" : "block";
        }
      });
    });

    document.querySelectorAll(".xb-header-nav a[href^='#']").forEach(function (anchor) {
      anchor.addEventListener("click", function () {
        closeAllMenus();
      });
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initWridoo);
  } else {
    initWridoo();
  }
})();
