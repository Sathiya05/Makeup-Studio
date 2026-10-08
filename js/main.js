/* Lumière PMU Studio — general functionality (no navbar/footer markup here) */
(function () {
  "use strict";
  var $ = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };

  /* ---------- Theme ---------- */
  function applyTheme(t) {
    document.documentElement.classList.toggle("dark", t === "dark");
    document.documentElement.style.colorScheme = t === "dark" ? "dark" : "light";
    $$("#icon-sun, .icon-sun-m").forEach(function (el) { el.classList.toggle("hidden", t === "dark"); });
    $$("#icon-moon, .icon-moon-m").forEach(function (el) { el.classList.toggle("hidden", t !== "dark"); });
  }
  function initTheme() {
    var saved = null;
    try { saved = localStorage.getItem("site-theme"); } catch (e) {}
    if (!saved) saved = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    applyTheme(saved);
    document.addEventListener("click", function (e) {
      if (e.target.closest("#theme-toggle, #theme-toggle-m")) {
        var next = document.documentElement.classList.contains("dark") ? "light" : "dark";
        try { localStorage.setItem("site-theme", next); } catch (err) {}
        applyTheme(next);
        toast(next === "dark" ? "Dark theme enabled." : "Light theme enabled.", "success");
      }
    });
  }

  /* ---------- RTL ---------- */
  function applyDir(d) { document.documentElement.dir = d === "rtl" ? "rtl" : "ltr"; }
  function initRTL() {
    var saved = "ltr";
    try { saved = localStorage.getItem("site-direction") || "ltr"; } catch (e) {}
    applyDir(saved);
    document.addEventListener("click", function (e) {
      if (e.target.closest("#rtl-toggle, #rtl-toggle-m")) {
        var next = document.documentElement.dir === "rtl" ? "ltr" : "rtl";
        try { localStorage.setItem("site-direction", next); } catch (err) {}
        applyDir(next);
        toast(next === "rtl" ? "Right-to-left layout enabled." : "Left-to-right layout enabled.", "success");
      }
    });
  }

  /* ---------- Toast ---------- */
  function toast(msg, type) {
    var wrap = $("#toast-container");
    if (!wrap) {
      wrap = document.createElement("div");
      wrap.id = "toast-container";
      wrap.setAttribute("aria-live", "polite");
      document.body.appendChild(wrap);
    }
    var el = document.createElement("div");
    el.className = "toast " + (type || "success");
    el.setAttribute("role", "status");
    el.innerHTML = '<span aria-hidden="true">' + (type === "error" ? "&#9888;" : "&#10003;") + '</span><span></span>';
    el.lastChild.textContent = msg;
    wrap.appendChild(el);
    setTimeout(function () { el.classList.add("out"); setTimeout(function () { el.remove(); }, 350); }, 3200);
  }

  /* ---------- Reveal on scroll ---------- */
  function initReveal() {
    var els = $$(".reveal");
    if (!("IntersectionObserver" in window) || !els.length) { els.forEach(function (el) { el.classList.add("visible"); }); return; }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add("visible"); io.unobserve(en.target); } });
    }, { threshold: 0.12 });
    els.forEach(function (el) { io.observe(el); });
  }

  /* ---------- Back to top ---------- */
  function initBackToTop() {
    var btn = $("#back-to-top");
    if (!btn) {
      btn = document.createElement("button");
      btn.id = "back-to-top";
      btn.setAttribute("aria-label", "Back to top");
      btn.innerHTML = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M12 19V5M5 12l7-7 7 7"/></svg>';
      document.body.appendChild(btn);
      btn.addEventListener("click", function () { window.scrollTo({ top: 0, behavior: "smooth" }); });
    }
    window.addEventListener("scroll", function () { btn.classList.toggle("show", window.scrollY > 600); }, { passive: true });
  }

  /* ---------- FAQ accordion ---------- */
  function initFAQ() {
    $$(".faq-item").forEach(function (item) {
      var btn = $(".faq-q", item), ans = $(".faq-answer", item);
      if (!btn || !ans) return;
      btn.addEventListener("click", function () {
        var open = item.classList.contains("open");
        $$(".faq-item.open").forEach(function (o) { o.classList.remove("open"); $(".faq-answer", o).style.maxHeight = null; $(".faq-q", o).setAttribute("aria-expanded", "false"); });
        if (!open) { item.classList.add("open"); ans.style.maxHeight = ans.scrollHeight + "px"; btn.setAttribute("aria-expanded", "true"); }
      });
      btn.setAttribute("aria-expanded", "false");
    });
  }

  /* ---------- Before/After slider ---------- */
  function initBA() {
    $$("[data-ba]").forEach(function (slider) {
      var after = $("[data-ba-after]", slider), handle = $("[data-ba-handle]", slider);
      if (!after || !handle) return;
      var afterImg = $("[data-ba-after-img]", slider) || $("img", after);
      function syncAfterImg() {
        if (afterImg) afterImg.style.width = slider.clientWidth + "px";
      }
      syncAfterImg();
      setTimeout(syncAfterImg, 100);
      setTimeout(syncAfterImg, 500);
      window.addEventListener("resize", syncAfterImg);
      if (document.fonts && document.fonts.ready) document.fonts.ready.then(syncAfterImg);
      window.addEventListener("load", syncAfterImg);
      var dragging = false;
      function setPos(clientX) {
        var r = slider.getBoundingClientRect();
        var pct = ((clientX - r.left) / r.width) * 100;
        pct = Math.max(4, Math.min(96, pct));
        after.style.width = pct + "%";
        handle.style.left = pct + "%";
      }
      function start(e) { dragging = true; setPos(e.touches ? e.touches[0].clientX : e.clientX); }
      function move(e) { if (dragging) { e.preventDefault(); setPos(e.touches ? e.touches[0].clientX : e.clientX); } }
      function end() { dragging = false; }
      handle.addEventListener("mousedown", start);
      handle.addEventListener("touchstart", start, { passive: true });
      window.addEventListener("mousemove", move);
      window.addEventListener("touchmove", move, { passive: false });
      window.addEventListener("mouseup", end);
      window.addEventListener("touchend", end);
      slider.addEventListener("mousedown", start);
      // default 50%
      after.style.width = "50%"; handle.style.left = "50%";
      slider.setAttribute("tabindex", "0");
      slider.setAttribute("role", "slider");
      slider.setAttribute("aria-label", "Before and after comparison slider");
      slider.addEventListener("keydown", function (e) {
        var cur = parseFloat(handle.style.left) || 50;
        if (e.key === "ArrowLeft") { cur = Math.max(4, cur - 5); after.style.width = cur + "%"; handle.style.left = cur + "%"; e.preventDefault(); }
        if (e.key === "ArrowRight") { cur = Math.min(96, cur + 5); after.style.width = cur + "%"; handle.style.left = cur + "%"; e.preventDefault(); }
      });
    });
  }

  /* ---------- Service tabs ---------- */
  function initServiceTabs() {
    var nav = $("[data-tabs-nav]");
    if (!nav) return;
    var btns = $$("[data-tab-btn]", nav), panels = $$("[data-tab-panel]");
    if (!btns.length || !panels.length) return;
    function show(id) {
      btns.forEach(function (b) {
        var on = b.getAttribute("data-tab-btn") === id;
        b.classList.toggle("active", on);
        b.setAttribute("aria-selected", on ? "true" : "false");
      });
      panels.forEach(function (p) { p.classList.toggle("hidden", p.getAttribute("data-tab-panel") !== id); });
    }
    btns.forEach(function (b) { b.addEventListener("click", function () { show(b.getAttribute("data-tab-btn")); }); });
    show("microblading");
  }

  /* ---------- Gallery + lightbox ---------- */
  function initGallery() {
    var grid = $("[data-gallery]");
    if (!grid) return;
    var items = $$("[data-gallery-item]", grid);
    $$("[data-filter]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        $$("[data-filter]").forEach(function (b) { b.classList.remove("active"); b.setAttribute("aria-pressed", "false"); });
        btn.classList.add("active"); btn.setAttribute("aria-pressed", "true");
        var f = btn.getAttribute("data-filter");
        items.forEach(function (it) {
          var show = f === "all" || (it.getAttribute("data-category") || "").split(" ").indexOf(f) > -1;
          it.style.display = show ? "" : "none";
        });
      });
    });
    var lb = $("#lightbox");
    if (!lb) {
      lb = document.createElement("div");
      lb.id = "lightbox";
      lb.setAttribute("role", "dialog");
      lb.setAttribute("aria-modal", "true");
      lb.setAttribute("aria-label", "Image viewer");
      lb.innerHTML = '<button id="lb-close" aria-label="Close viewer" style="position:absolute;top:1rem;right:1rem;width:44px;height:44px;border-radius:999px;background:#fff;font-size:20px">&times;</button>'
        + '<button id="lb-prev" aria-label="Previous image" style="position:absolute;left:1rem;top:50%;transform:translateY(-50%);width:44px;height:44px;border-radius:999px;background:#fff;font-size:20px">&#8249;</button>'
        + '<img id="lb-img" alt="Gallery result enlarged"/>'
        + '<button id="lb-next" aria-label="Next image" style="position:absolute;right:1rem;top:50%;transform:translateY(-50%);width:44px;height:44px;border-radius:999px;background:#fff;font-size:20px">&#8250;</button>';
      document.body.appendChild(lb);
    }
    var lbImg = $("#lb-img", lb);
    var visible = function () { return items.filter(function (i) { return i.style.display !== "none"; }); };
    var idx = 0;
    function open(i) {
      var list = visible(); if (!list.length) return;
      idx = (i + list.length) % list.length;
      var img = $("img", list[idx]);
      lbImg.src = img.src; lbImg.alt = img.alt;
      lb.classList.add("open");
      $("#lb-close", lb).focus();
    }
    function close() { lb.classList.remove("open"); }
    items.forEach(function (it) { it.addEventListener("click", function () { open(visible().indexOf(it)); }); it.addEventListener("keydown", function (e) { if (e.key === "Enter") open(visible().indexOf(it)); }); });
    $("#lb-close", lb).addEventListener("click", close);
    $("#lb-prev", lb).addEventListener("click", function (e) { e.stopPropagation(); open(idx - 1); });
    $("#lb-next", lb).addEventListener("click", function (e) { e.stopPropagation(); open(idx + 1); });
    lb.addEventListener("click", function (e) { if (e.target === lb) close(); });
    document.addEventListener("keydown", function (e) {
      if (!lb.classList.contains("open")) return;
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") open(idx - 1);
      if (e.key === "ArrowRight") open(idx + 1);
    });
  }

  /* ---------- Validation helpers ---------- */
  function isEmail(v) { return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v); }
  function fieldError(input, msg) {
    input.classList.add("border-red-400");
    var p = input.parentElement.querySelector(".field-err");
    if (!p) { p = document.createElement("p"); p.className = "field-err text-xs text-red-500 mt-1"; input.parentElement.appendChild(p); }
    p.textContent = msg;
  }
  function clearErrors(form) { $$(".field-err", form).forEach(function (e) { e.remove(); }); $$("input,textarea,select", form).forEach(function (i) { i.classList.remove("border-red-400"); }); }

  /* ---------- Login demo ---------- */
  function initLogin() {
    var form = $("#login-form");
    if (!form) return;
    var demoBox = $("#demo-credentials");
    if (demoBox) {
      $$("[data-fill]", demoBox).forEach(function (b) {
        b.addEventListener("click", function () {
          $("#email").value = b.getAttribute("data-email");
          $("#password").value = b.getAttribute("data-pass");
          toast("Demo credentials filled.", "success");
        });
      });
    }
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      clearErrors(form);
      var email = $("#email").value.trim(), pass = $("#password").value;
      var ok = true;
      if (!isEmail(email)) { fieldError($("#email"), "Enter a valid email address."); ok = false; }
      if (pass.length < 6) { fieldError($("#password"), "Password must be at least 6 characters."); ok = false; }
      if (!ok) { toast("Please review the highlighted fields.", "error"); return; }
      // DEMO auth — replace with backend call later: POST /api/auth/login {email,password}
      if (email === "client@lumiere-demo.com" && pass === "demo123") {
        try { localStorage.setItem("lumiere-role", "client"); localStorage.setItem("lumiere-user", email); } catch (err) {}
        toast("Demo login successful. Welcome back!", "success");
        setTimeout(function () { location.href = "dashboard.html"; }, 800);
      } else if (email === "admin@lumiere-demo.com" && pass === "admin123") {
        try { localStorage.setItem("lumiere-role", "admin"); localStorage.setItem("lumiere-user", email); } catch (err) {}
        toast("Demo admin login successful.", "success");
        setTimeout(function () { location.href = "admin-dashboard.html"; }, 800);
      } else { toast("Demo only: use the sample credentials shown on this page.", "error"); }
    });
  }

  /* ---------- Touch-up booking (dashboard) ---------- */
  function initTouchup() {
    var form = $("#touchup-form");
    if (!form) return;
    form.addEventListener("submit", function (e) {
      e.preventDefault(); clearErrors(form);
      var treatment = $("#tu-treatment").value, artist = $("#tu-artist").value,
        date = $("#tu-date").value, time = $("#tu-time").value;
      var ok = true;
      if (!treatment) { fieldError($("#tu-treatment"), "Choose a treatment."); ok = false; }
      if (!artist) { fieldError($("#tu-artist"), "Choose an artist."); ok = false; }
      if (!date) { fieldError($("#tu-date"), "Choose a preferred date."); ok = false; }
      if (!time) { fieldError($("#tu-time"), "Choose a preferred time."); ok = false; }
      if (!ok) { toast("Please complete the required fields.", "error"); return; }
      toast("Touch-up request submitted successfully.", "success");
      var list = $("#tu-upcoming");
      if (list) {
        var card = document.createElement("div");
        card.className = "bg-white border border-[#EAD9D2] rounded-2xl p-5 lift";
        card.innerHTML = "<p class='text-xs uppercase tracking-widest text-[#B77982] font-semibold'>Pending request</p>"
          + "<h4 class='serif text-lg font-semibold mt-1'></h4>"
          + "<p class='text-sm text-gray-600 mt-1'></p>"
          + "<p class='text-sm text-gray-600'></p>"
          + "<span class='badge badge-pending mt-3'>Pending</span>";
        card.querySelector("h4").textContent = treatment;
        card.querySelectorAll("p")[1].textContent = date + " · " + time;
        card.querySelectorAll("p")[2].textContent = "Artist: " + artist;
        list.prepend(card);
      }
      form.reset();
    });
    // min date = today
    var d = $("#tu-date"); if (d) d.min = new Date().toISOString().split("T")[0];
  }

  /* ---------- Generic consultation / contact forms ---------- */
  function initGenericForms() {
    $$("[data-consult-form]").forEach(function (form) {
      form.addEventListener("submit", function (e) {
        e.preventDefault(); clearErrors(form);
        var name = $("[name=name]", form), email = $("[name=email]", form), phone = $("[name=phone]", form),
          agree = $("[name=agree]", form);
        var ok = true;
        if (name && !name.value.trim()) { fieldError(name, "Full name is required."); ok = false; }
        if (email && !isEmail(email.value.trim())) { fieldError(email, "Enter a valid email."); ok = false; }
        if (phone && !/^[+\d][\d\s\-()]{6,}$/.test(phone.value.trim())) { fieldError(phone, "Enter a valid phone number."); ok = false; }
        if (agree && !agree.checked) { toast("Please agree to the studio policies.", "error"); ok = false; }
        if (!ok) { if (agree && agree.checked) toast("Please review the highlighted fields.", "error"); return; }
        toast("Appointment request submitted successfully.", "success");
        form.reset();
      });
    });
  }

  /* ---------- Booking stepper ---------- */
  function initStepper() {
    var root = $("#booking-steps");
    if (!root) return;
    var steps = $$(".book-step", root), dots = $$("[data-step-dot]");
    var current = 0;
    function show(i) {
      current = Math.max(0, Math.min(steps.length - 1, i));
      steps.forEach(function (s, k) { s.classList.toggle("hidden", k !== current); });
      dots.forEach(function (d, k) {
        d.classList.toggle("active", k === current);
        d.classList.toggle("done", k < current);
        d.setAttribute("aria-current", k === current ? "step" : "false");
      });
      var bar = $("#book-progress");
      if (bar) bar.style.width = ((current + 1) / steps.length * 100) + "%";
      root.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    function validStep() {
      var req = $$("[required]", steps[current]);
      for (var k = 0; k < req.length; k++) {
        if (!req[k].value || (req[k].type === "checkbox" && !req[k].checked)) { req[k].focus(); toast("Please complete this step before continuing.", "error"); return false; }
        if (req[k].type === "email" && !isEmail(req[k].value.trim())) { req[k].focus(); toast("Enter a valid email address.", "error"); return false; }
      }
      return true;
    }
    $$("[data-next]", root).forEach(function (b) { b.addEventListener("click", function () { if (validStep()) show(current + 1); }); });
    $$("[data-back]", root).forEach(function (b) { b.addEventListener("click", function () { show(current - 1); }); });
    var form = $("#booking-form");
    if (form) form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (!validStep()) return;
      var sum = $("#booking-summary");
      if (sum) {
        var fd = new FormData(form), html = "";
        ["service", "artist", "date", "time", "name", "email", "phone"].forEach(function (k) {
          var v = fd.get(k); if (v) html += "<div class='flex justify-between py-1.5 border-b border-[#EAD9D2] text-sm'><span class='capitalize text-gray-500'>" + k + "</span><strong>" + String(v).replace(/</g, "&lt;") + "</strong></div>";
        });
        sum.innerHTML = html;
      }
      show(steps.length - 1);
      toast("Consultation request submitted successfully.", "success");
    });
    show(0);
  }

  /* ---------- Sidebar (dashboards) ---------- */
  function initSidebar() {
    var btn = $("#sidebar-toggle"), side = $("#sidebar"), overlay = $("#sidebar-overlay");
    if (!btn || !side) return;
    function set(open) {
      side.classList.toggle("-translate-x-full", !open);
      if (overlay) overlay.classList.toggle("hidden", !open);
      btn.setAttribute("aria-expanded", String(open));
      var close = $("#sidebar-close");
      if (close) close.setAttribute("aria-expanded", String(open));
    }
    // Desktop: visible; mobile: hidden
    if (window.innerWidth >= 1024) set(true); else set(false);
    btn.addEventListener("click", function () { set(side.classList.contains("-translate-x-full")); });
    var closeBtn = $("#sidebar-close");
    if (closeBtn) closeBtn.addEventListener("click", function () { set(false); });
    if (overlay) overlay.addEventListener("click", function () { set(false); });
    var wasDesktop = window.innerWidth >= 1024;
    window.addEventListener("resize", function () {
      var isDesktop = window.innerWidth >= 1024;
      if (isDesktop && !wasDesktop) set(true);
      else if (!isDesktop && wasDesktop) set(false);
      wasDesktop = isDesktop;
    });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape") set(false); });
  }

  /* ---------- Admin table interactions ---------- */
  function initAdmin() {
    var table = $("#appt-table");
    if (table) {
      var search = $("#appt-search"), filter = $("#appt-filter");
      var tbody = $("tbody", table);
      function refresh() {
        var q = (search ? search.value.toLowerCase() : ""), f = filter ? filter.value : "all";
        $$("tr", tbody).forEach(function (tr) {
          var text = tr.textContent.toLowerCase();
          var status = (tr.getAttribute("data-status") || "").toLowerCase();
          var show = (!q || text.indexOf(q) > -1) && (f === "all" || status === f);
          tr.style.display = show ? "" : "none";
        });
      }
      if (search) search.addEventListener("input", refresh);
      if (filter) filter.addEventListener("change", refresh);
      // Sort by date
      var sortBtn = $("#appt-sort");
      if (sortBtn) sortBtn.addEventListener("click", function () {
        var rows = $$("tr", tbody);
        rows.sort(function (a, b) { return (a.getAttribute("data-date") || "").localeCompare(b.getAttribute("data-date") || ""); });
        if (sortBtn.getAttribute("data-order") === "asc") { rows.reverse(); sortBtn.setAttribute("data-order", "desc"); }
        else sortBtn.setAttribute("data-order", "asc");
        rows.forEach(function (r) { tbody.appendChild(r); });
      });
      // Status actions
      tbody.addEventListener("click", function (e) {
        var btn = e.target.closest("[data-status-action]");
        if (!btn) return;
        var tr = btn.closest("tr");
        var next = btn.getAttribute("data-status-action");
        tr.setAttribute("data-status", next);
        var badge = $(".status-badge", tr);
        if (badge) { badge.className = "badge status-badge badge-" + next; badge.textContent = next.charAt(0).toUpperCase() + next.slice(1); }
        toast("Appointment marked as " + next + ".", "success");
      });
    }
    // Logout
    $$("[data-logout]").forEach(function (b) {
      b.addEventListener("click", function (e) {
        e.preventDefault();
        try { localStorage.removeItem("lumiere-role"); localStorage.removeItem("lumiere-user"); } catch (err) {}
        toast("Your preferences have been saved. Signed out.", "success");
        setTimeout(function () { location.href = "login.html"; }, 700);
      });
    });
    // Settings demo
    var sf = $("#admin-settings-form");
    if (sf) sf.addEventListener("submit", function (e) { e.preventDefault(); toast("Your preferences have been saved.", "success"); });
  }

  /* ---------- Dashboard tabs (single-panel view) ---------- */
  function initDashTabs() {
    var links = $$("[data-dtab]");
    var panels = $$(".dtab-panel");
    if (!links.length || !panels.length) return;
    function closeSidebarMobile() {
      if (window.innerWidth < 1024) {
        var side = $("#sidebar");
        if (side) side.classList.add("-translate-x-full");
        var ov = $("#sidebar-overlay"); if (ov) ov.classList.add("hidden");
        var btn = $("#sidebar-toggle"); if (btn) btn.setAttribute("aria-expanded", "false");
      }
    }
    function activate(id, link) {
      links.forEach(function (x) {
        var on = x === link || (!link && x.getAttribute("href") === id);
        x.classList.toggle("active", on);
      });
      panels.forEach(function (p) { p.classList.toggle("hidden", "#" + p.id !== id); });
      var panel = id.charAt(0) === "#" ? $(id) : null;
      if (panel) panel.scrollIntoView({ behavior: "smooth", block: "start" });
      closeSidebarMobile();
    }
    links.forEach(function (l) {
      l.addEventListener("click", function (e) {
        var target = l.getAttribute("href");
        if (target && target.charAt(0) === "#" && $(target)) { e.preventDefault(); activate(target, l); }
      });
    });
    // In-content links that point at a panel also switch to that single view
    $$("main a[href^=\"#\"]").forEach(function (a) {
      if (a.hasAttribute("data-dtab")) return;
      a.addEventListener("click", function (e) {
        var target = a.getAttribute("href");
        var t = target && target.length > 1 ? $(target) : null;
        if (t && t.classList.contains("dtab-panel")) {
          e.preventDefault();
          var link = null;
          links.forEach(function (x) { if (x.getAttribute("href") === target) link = x; });
          activate(target, link);
          try { history.replaceState(null, "", target); } catch (err) {}
        }
      });
    });
    // Initial view: URL hash panel if valid, else first tab — only ONE panel visible
    var start = null;
    try {
      var h = location.hash;
      if (h && $(h) && $(h).classList.contains("dtab-panel")) start = h;
    } catch (err) {}
    if (!start && links.length) start = links[0].getAttribute("href");
    if (start) {
      var firstLink = null;
      links.forEach(function (x) { if (x.getAttribute("href") === start) firstLink = x; });
      links.forEach(function (x) { x.classList.toggle("active", x === firstLink); });
      panels.forEach(function (p) { p.classList.toggle("hidden", "#" + p.id !== start); });
    }
  }

  /* ---------- Smooth anchor scrolling with sticky offset ---------- */
  function initAnchors() {
    $$('a[href^="#"]').forEach(function (a) {
      a.addEventListener("click", function (e) {
        var id = a.getAttribute("href");
        if (id.length > 1) {
          var t = $(id);
          if (t) { e.preventDefault(); t.scrollIntoView({ behavior: "smooth", block: "start" }); }
        }
      });
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    initTheme(); initRTL(); initReveal(); initBackToTop(); initFAQ();
    initBA(); initGallery(); initServiceTabs(); initLogin(); initTouchup(); initGenericForms();
    initStepper(); initSidebar(); initAdmin(); initDashTabs(); initAnchors();
  });
  window.LumiereToast = toast;
})();
