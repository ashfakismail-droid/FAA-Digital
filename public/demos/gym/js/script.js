/* =========================================================
   TITAN FITNESS — Interactions
   ========================================================= */
(function () {
  "use strict";

  document.addEventListener("DOMContentLoaded", function () {
    /* ---------- Loader ---------- */
    const loader = document.getElementById("loader");
    window.addEventListener("load", function () {
      setTimeout(function () {
        loader.classList.add("hidden");
      }, 600);
    });

    /* ---------- Current Year ---------- */
    const yearEl = document.getElementById("year");
    if (yearEl) yearEl.textContent = new Date().getFullYear();

    /* ---------- Navbar scroll state ---------- */
    const navbar = document.getElementById("navbar");
    const backToTop = document.getElementById("backToTop");
    const scrollProgress = document.getElementById("scrollProgress");

    function onScroll() {
      const y = window.scrollY;
      navbar.classList.toggle("scrolled", y > 40);
      backToTop.classList.toggle("show", y > 500);

      const docH = document.documentElement.scrollHeight - window.innerHeight;
      const pct = docH > 0 ? (y / docH) * 100 : 0;
      scrollProgress.style.width = pct + "%";
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    /* ---------- Mobile Menu ---------- */
    const hamburger = document.getElementById("hamburger");
    const navLinks = document.getElementById("navLinks");

    function closeMenu() {
      hamburger.classList.remove("active");
      navLinks.classList.remove("open");
      hamburger.setAttribute("aria-expanded", "false");
    }
    hamburger.addEventListener("click", function () {
      const isOpen = navLinks.classList.toggle("open");
      hamburger.classList.toggle("active", isOpen);
      hamburger.setAttribute("aria-expanded", String(isOpen));
    });
    navLinks.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", closeMenu);
    });

    /* ---------- Back to top ---------- */
    backToTop.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });

    /* ---------- Active nav highlight (scroll spy) ---------- */
    const sections = document.querySelectorAll("section[id]");
    const navAnchors = navLinks.querySelectorAll(".nav__link");

    function spy() {
      const pos = window.scrollY + 120;
      let current = "";
      sections.forEach(function (sec) {
        if (pos >= sec.offsetTop) current = sec.getAttribute("id");
      });
      navAnchors.forEach(function (a) {
        a.classList.toggle("active", a.getAttribute("href") === "#" + current);
      });
    }
    window.addEventListener("scroll", spy, { passive: true });
    spy();

    /* ---------- Scroll Reveal ---------- */
    const revealEls = document.querySelectorAll(".reveal");
    if ("IntersectionObserver" in window) {
      const io = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              entry.target.classList.add("visible");
              io.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.15 }
      );
      revealEls.forEach(function (el) { io.observe(el); });
    } else {
      revealEls.forEach(function (el) { el.classList.add("visible"); });
    }

    /* ---------- Animated Counters ---------- */
    const counters = document.querySelectorAll(".stat__num[data-count]");
    function animateCount(el) {
      const target = parseFloat(el.getAttribute("data-count"));
      const suffix = el.getAttribute("data-suffix") || "";
      const duration = 1800;
      const start = performance.now();
      function tick(now) {
        const p = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - p, 3); // easeOutCubic
        const val = Math.floor(eased * target);
        el.textContent = val.toLocaleString() + suffix;
        if (p < 1) requestAnimationFrame(tick);
        else el.textContent = target.toLocaleString() + suffix;
      }
      requestAnimationFrame(tick);
    }
    if ("IntersectionObserver" in window && counters.length) {
      const cio = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              animateCount(entry.target);
              cio.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.5 }
      );
      counters.forEach(function (c) { cio.observe(c); });
    } else {
      counters.forEach(animateCount);
    }

    /* ---------- BMI Calculator ---------- */
    const bmiForm = document.getElementById("bmiForm");
    const bmiResult = document.getElementById("bmiResult");
    const bmiNum = document.getElementById("bmiNum");
    const bmiCategory = document.getElementById("bmiCategory");
    const bmiMarker = document.getElementById("bmiMarker");

    function bmiInfo(bmi) {
      if (bmi < 18.5) return { label: "Underweight", color: "#38bdf8", pct: (bmi / 40) * 100 };
      if (bmi < 25) return { label: "Normal", color: "#22c55e", pct: (bmi / 40) * 100 };
      if (bmi < 30) return { label: "Overweight", color: "#f59e0b", pct: (bmi / 40) * 100 };
      return { label: "Obese", color: "#ff3b3b", pct: (bmi / 40) * 100 };
    }

    if (bmiForm) {
      bmiForm.addEventListener("submit", function (e) {
        e.preventDefault();
        const h = parseFloat(document.getElementById("height").value);
        const w = parseFloat(document.getElementById("weight").value);

        if (!h || !w || h < 50 || h > 260 || w < 20 || w > 400) {
          bmiResult.hidden = false;
          bmiNum.textContent = "—";
          bmiCategory.textContent = "Enter valid height & weight";
          bmiCategory.style.background = "var(--gray)";
          bmiMarker.style.left = "0%";
          return;
        }

        const meters = h / 100;
        const bmi = w / (meters * meters);
        const info = bmiInfo(bmi);

        bmiResult.hidden = false;
        bmiNum.textContent = bmi.toFixed(1);
        bmiCategory.textContent = info.label;
        bmiCategory.style.background = info.color;
        bmiMarker.style.left = Math.max(2, Math.min(98, info.pct)) + "%";
      });
    }

    /* ---------- Contact Form ---------- */
    const contactForm = document.getElementById("contactForm");
    const formStatus = document.getElementById("formStatus");
    if (contactForm) {
      contactForm.addEventListener("submit", function (e) {
        e.preventDefault();
        const name = document.getElementById("cName").value.trim();
        const email = document.getElementById("cEmail").value.trim();
        const message = document.getElementById("cMessage").value.trim();
        const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

        if (!name || !emailOk || !message) {
          formStatus.style.color = "#ff6b6b";
          formStatus.textContent = "Please provide a valid name, email, and message.";
          return;
        }
        formStatus.style.color = "#22c55e";
        formStatus.textContent = "Thanks, " + name + "! Our team will reach out within 24 hours.";
        contactForm.reset();
      });
    }
  });
})();
