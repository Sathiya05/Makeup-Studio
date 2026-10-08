/* Lumière PMU Studio — NAVBAR ONLY. Injected into #navbar. */
(function () {
  function navbarHTML() {
    return `
<header class="sticky top-0 z-50 bg-[#FBF7F5]/90 dark:bg-[#1c1718]/90 backdrop-blur-md border-b border-[#EAD9D2] dark:border-[#3a2f32]">
  <nav aria-label="Primary navigation" class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="flex items-center justify-between h-[72px] gap-3">
      <a href="index.html" class="flex items-center gap-3 shrink-0" aria-label="Lumière PMU Studio home">
        <span class="w-10 h-10 rounded-full flex items-center justify-center text-white font-serif-d text-lg" style="background:#8B5E6B" aria-hidden="true">L</span>
        <span class="leading-tight">
          <span class="serif block text-[1.15rem] font-semibold tracking-wide text-[#2F2929]">Lumi&egrave;re</span>
          <span class="block text-[.65rem] tracking-[.32em] uppercase text-[#B77982] font-semibold">PMU Studio</span>
        </span>
      </a>
      <div class="hidden xl:flex items-center gap-1 text-[.92rem] font-medium">
        <div class="nav-dropdown">
          <button class="px-4 py-2 rounded-full hover:bg-[#F6ECE7] hover:text-[#8B5E6B] flex items-center gap-1" aria-haspopup="true" aria-expanded="false" data-dropdown-btn>
            Home
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="m6 9 6 6 6-6"/></svg>
          </button>
          <div class="nav-panel p-2" role="menu">
            <a href="index.html" role="menuitem" data-nav="index" class="block px-4 py-2.5 rounded-xl hover:bg-[#FBF7F5] hover:text-[#8B5E6B]">Home 1</a>
            <a href="home2.html" role="menuitem" data-nav="home2" class="block px-4 py-2.5 rounded-xl hover:bg-[#FBF7F5] hover:text-[#8B5E6B]">Home 2</a>
          </div>
        </div>
        <a href="about.html" data-nav="about" class="px-4 py-2 rounded-full hover:bg-[#F6ECE7] hover:text-[#8B5E6B]">About</a>
        <a href="services.html" data-nav="services" class="px-4 py-2 rounded-full hover:bg-[#F6ECE7] hover:text-[#8B5E6B]">Services</a>
        <a href="artists.html" data-nav="artists" class="px-4 py-2 rounded-full hover:bg-[#F6ECE7] hover:text-[#8B5E6B]">Artists</a>
        <a href="contact.html" data-nav="contact" class="px-4 py-2 rounded-full hover:bg-[#F6ECE7] hover:text-[#8B5E6B]">Contact</a>
        <div class="nav-dropdown">
          <button class="px-4 py-2 rounded-full hover:bg-[#F6ECE7] hover:text-[#8B5E6B] flex items-center gap-1" aria-haspopup="true" aria-expanded="false" data-dropdown-btn>
            Dashboard
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="m6 9 6 6 6-6"/></svg>
          </button>
          <div class="nav-panel p-2" role="menu">
            <a href="dashboard.html" role="menuitem" data-nav="dashboard" class="block px-4 py-2.5 rounded-xl hover:bg-[#FBF7F5] hover:text-[#8B5E6B]">User Dashboard</a>
            <a href="admin-dashboard.html" role="menuitem" data-nav="admin" class="block px-4 py-2.5 rounded-xl hover:bg-[#FBF7F5] hover:text-[#8B5E6B]">Admin Dashboard</a>
          </div>
        </div>
      </div>
      <div class="flex items-center gap-1.5 sm:gap-2">
        <button id="theme-toggle" type="button" aria-label="Toggle color theme" title="Toggle light / dark theme" class="hidden xl:flex w-10 h-10 rounded-full border border-[#EAD9D2] bg-white items-center justify-center hover:border-[#8B5E6B] hover:text-[#8B5E6B] transition">
          <svg id="icon-sun" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>
          <svg id="icon-moon" class="hidden" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z"/></svg>
        </button>
        <button id="rtl-toggle" type="button" aria-label="Toggle text direction" title="Toggle LTR / RTL" class="hidden xl:flex w-10 h-10 rounded-full border border-[#EAD9D2] bg-white items-center justify-center hover:border-[#8B5E6B] hover:text-[#8B5E6B] transition">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m16 3 4 4-4 4"/><path d="M20 7H4"/><path d="m8 21-4-4 4-4"/><path d="M4 17h16"/></svg>
        </button>
        <a href="login.html" data-nav="login" class="hidden xl:inline-flex items-center px-5 py-2.5 rounded-full text-sm font-semibold border border-[#8B5E6B] text-[#8B5E6B] hover:bg-[#8B5E6B] hover:text-white transition whitespace-nowrap">Login</a>
        <a href="booking.html" data-nav="booking" class="btn-primary hidden xl:inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold whitespace-nowrap">Book a Consultation</a>
        <button id="hamburger" type="button" aria-label="Open menu" aria-expanded="false" aria-controls="mobile-menu" class="xl:hidden w-10 h-10 rounded-full border border-[#EAD9D2] bg-white flex items-center justify-center">
          <svg id="icon-menu" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M4 7h16M4 12h16M4 17h16"/></svg>
          <svg id="icon-close" class="hidden" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M18 6 6 18M6 6l12 12"/></svg>
        </button>
      </div>
    </div>
    <div id="mobile-menu" class="xl:hidden">
      <div class="py-4 space-y-1 border-t border-[#EAD9D2] mt-1">
        <button class="w-full flex items-center justify-between px-4 py-3 rounded-xl font-semibold hover:bg-[#F6ECE7]" data-mobile-sub="sub-home" aria-expanded="false">Home
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="m6 9 6 6 6-6"/></svg>
        </button>
        <div id="sub-home" class="mobile-sub pl-4">
          <a href="index.html" data-nav="index" class="block px-4 py-2.5 rounded-xl hover:bg-[#F6ECE7]">Home 1</a>
          <a href="home2.html" data-nav="home2" class="block px-4 py-2.5 rounded-xl hover:bg-[#F6ECE7]">Home 2</a>
        </div>
        <a href="about.html" data-nav="about" class="block px-4 py-3 rounded-xl font-semibold hover:bg-[#F6ECE7]">About</a>
        <a href="services.html" data-nav="services" class="block px-4 py-3 rounded-xl font-semibold hover:bg-[#F6ECE7]">Services</a>
        <a href="artists.html" data-nav="artists" class="block px-4 py-3 rounded-xl font-semibold hover:bg-[#F6ECE7]">Artists</a>
        <a href="contact.html" data-nav="contact" class="block px-4 py-3 rounded-xl font-semibold hover:bg-[#F6ECE7]">Contact</a>
        <button class="w-full flex items-center justify-between px-4 py-3 rounded-xl font-semibold hover:bg-[#F6ECE7]" data-mobile-sub="sub-dash" aria-expanded="false">Dashboard
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="m6 9 6 6 6-6"/></svg>
        </button>
        <div id="sub-dash" class="mobile-sub pl-4">
          <a href="dashboard.html" data-nav="dashboard" class="block px-4 py-2.5 rounded-xl hover:bg-[#F6ECE7]">User Dashboard</a>
          <a href="admin-dashboard.html" data-nav="admin" class="block px-4 py-2.5 rounded-xl hover:bg-[#F6ECE7]">Admin Dashboard</a>
        </div>
        <div class="px-4 pt-3 grid grid-cols-2 gap-2" aria-label="Display options">
          <button id="theme-toggle-m" type="button" class="flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl border border-[#EAD9D2] text-xs font-semibold hover:border-[#8B5E6B] hover:text-[#8B5E6B] transition">
            <svg class="icon-sun-m" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><circle cx="12" cy="12" r="4"/><path d="M12 2v2m0 16v2M4.9 4.9l1.4 1.4m11.4 11.4 1.4 1.4M2 12h2m16 0h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>
            <svg class="icon-moon-m hidden" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z"/></svg>
            Theme
          </button>
          <button id="rtl-toggle-m" type="button" class="flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl border border-[#EAD9D2] text-xs font-semibold hover:border-[#8B5E6B] hover:text-[#8B5E6B] transition">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m16 3 4 4-4 4"/><path d="M20 7H4"/><path d="m8 21-4-4 4-4"/><path d="M4 17h16"/></svg>
            Direction
          </button>
        </div>
        <div class="px-4 pt-3 flex flex-col gap-2">
          <a href="login.html" data-nav="login" class="text-center px-5 py-3 rounded-full text-sm font-semibold border border-[#8B5E6B] text-[#8B5E6B]">Login</a>
          <a href="booking.html" data-nav="booking" class="btn-primary text-center px-5 py-3 rounded-full text-sm font-semibold">Book a Consultation</a>
        </div>
      </div>
    </div>
  </nav>
</header>`;
  }

  function initNavbar() {
    var mount = document.getElementById("navbar");
    if (!mount) return;
    mount.innerHTML = navbarHTML();

    // Active link — match by href filename so desktop + mobile stay in sync.
    // Uses a plain-CSS `.nav-active` class (see css/style.css) because the
    // Tailwind Play CDN can't always generate dynamically-injected classes.
    var raw = (location.pathname.split("/").pop() || "index.html").toLowerCase();
    var page = raw.split("?")[0].split("#")[0] || "index.html";
    mount.querySelectorAll('a[data-nav]').forEach(function (a) {
      var href = (a.getAttribute("href") || "").toLowerCase().split("?")[0].split("#")[0];
      if (!href || href.charAt(0) === "#") return;
      var file = href.split("/").pop();
      if (file === page || (page === "" && file === "index.html")) {
        a.classList.add("nav-active", "text-[#8B5E6B]", "bg-[#F6ECE7]");
        a.setAttribute("aria-current", "page");
        var drop = a.closest(".nav-dropdown");
        if (drop) {
          drop.classList.add("nav-active-parent");
          var dbtn = drop.querySelector("[data-dropdown-btn]");
          if (dbtn) dbtn.setAttribute("aria-current", "true");
        }
        var sub = a.closest(".mobile-sub");
        if (sub && sub.id) {
          var toggle = mount.querySelector('[data-mobile-sub="' + sub.id + '"]');
          if (toggle) toggle.classList.add("nav-active");
        }
      }
    });

    // Desktop dropdowns (click support for touch/keyboard)
    mount.querySelectorAll("[data-dropdown-btn]").forEach(function (btn) {
      btn.addEventListener("click", function (e) {
        e.stopPropagation();
        var parent = btn.closest(".nav-dropdown");
        var wasOpen = parent.classList.contains("open");
        mount.querySelectorAll(".nav-dropdown.open").forEach(function (d) {
          d.classList.remove("open");
          var b = d.querySelector("[data-dropdown-btn]");
          if (b) b.setAttribute("aria-expanded", "false");
        });
        if (!wasOpen) { parent.classList.add("open"); btn.setAttribute("aria-expanded", "true"); }
      });
    });
    document.addEventListener("click", function (e) {
      if (!e.target.closest(".nav-dropdown")) {
        mount.querySelectorAll(".nav-dropdown.open").forEach(function (d) {
          d.classList.remove("open");
          var b = d.querySelector("[data-dropdown-btn]");
          if (b) b.setAttribute("aria-expanded", "false");
        });
      }
    });

    // Mobile menu — single hamburger
    var burger = mount.querySelector("#hamburger");
    var menu = mount.querySelector("#mobile-menu");
    var iconMenu = mount.querySelector("#icon-menu");
    var iconClose = mount.querySelector("#icon-close");
    function setMenu(open) {
      menu.classList.toggle("open", open);
      burger.setAttribute("aria-expanded", String(open));
      burger.setAttribute("aria-label", open ? "Close menu" : "Open menu");
      iconMenu.classList.toggle("hidden", open);
      iconClose.classList.toggle("hidden", !open);
    }
    burger.addEventListener("click", function (e) {
      e.stopPropagation();
      setMenu(!menu.classList.contains("open"));
    });
    mount.querySelectorAll("[data-mobile-sub]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var sub = document.getElementById(btn.getAttribute("data-mobile-sub"));
        var open = sub.classList.toggle("open");
        btn.setAttribute("aria-expanded", String(open));
      });
    });
    menu.addEventListener("click", function (e) {
      if (e.target.closest("a")) setMenu(false);
    });
    document.addEventListener("click", function (e) {
      if (menu.classList.contains("open") && !e.target.closest("#navbar")) setMenu(false);
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && menu.classList.contains("open")) { setMenu(false); burger.focus(); }
    });
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", initNavbar);
  else initNavbar();
})();
