(function () {
  function initMobileMenu() {
    var navButtons = document.querySelectorAll(".xb-nav-mobile");
    var headerMenus = document.querySelectorAll(".xb-header-menu");
    var backdrops = document.querySelectorAll(".xb-header-menu-backdrop");
    var closeButtons = document.querySelectorAll(".xb-menu-close");

    navButtons.forEach(function (btn) {
      btn.addEventListener("click", function (e) {
        e.preventDefault();
        btn.classList.toggle("active");
        headerMenus.forEach(function (menu) { menu.classList.toggle("active"); });
        backdrops.forEach(function (bd) { bd.classList.toggle("active"); });
        document.body.classList.toggle("mobile-menu-open");
      });
    });

    function closeAllMenus() {
      navButtons.forEach(function (btn) { btn.classList.remove("active"); });
      headerMenus.forEach(function (menu) { menu.classList.remove("active"); });
      backdrops.forEach(function (bd) { bd.classList.remove("active"); });
      document.body.classList.remove("mobile-menu-open");
    }

    closeButtons.forEach(function (btn) {
      btn.addEventListener("click", closeAllMenus);
    });

    backdrops.forEach(function (bd) {
      bd.addEventListener("click", closeAllMenus);
    });

    // Mobile submenu toggle
    document.querySelectorAll(".xb-header-nav .menu-item-has-children > a").forEach(function (link) {
      link.addEventListener("click", function (e) {
        var parentLi = link.closest(".menu-item-has-children");
        var subMenu = parentLi.querySelector(".sub-menu");
        if (subMenu) {
          e.preventDefault();
          parentLi.classList.toggle("open");
          if (subMenu.style.display === "block") {
            subMenu.style.display = "none";
          } else {
            subMenu.style.display = "block";
          }
        }
      });
    });

    // Close mobile menu when clicking internal anchor links
    document.querySelectorAll(".xb-header-nav a[href^='#']").forEach(function (anchor) {
      anchor.addEventListener("click", function () {
        closeAllMenus();
      });
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initMobileMenu);
  } else {
    initMobileMenu();
  }
})();
