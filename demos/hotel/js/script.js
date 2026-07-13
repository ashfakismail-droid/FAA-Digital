/* =========================================================
   AURORA GRAND RESORT — Interactive Features
   Vanilla JavaScript, no dependencies
   ========================================================= */
(function () {
    'use strict';

    /* ---------- Loader ---------- */
    window.addEventListener('load', function () {
        var loader = document.getElementById('loader');
        if (loader) {
            setTimeout(function () {
                loader.classList.add('hidden');
            }, 900);
        }
    });

    /* ---------- Sticky Header ---------- */
    var header = document.getElementById('header');
    function onScrollHeader() {
        if (window.scrollY > 60) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }

    /* ---------- Back to Top ---------- */
    var backToTop = document.getElementById('backToTop');
    function onScrollBackToTop() {
        if (window.scrollY > 500) {
            backToTop.classList.add('show');
        } else {
            backToTop.classList.remove('show');
        }
    }
    backToTop.addEventListener('click', function () {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    /* ---------- Mobile Hamburger Menu ---------- */
    var hamburger = document.getElementById('hamburger');
    var nav = document.getElementById('nav');
    hamburger.addEventListener('click', function () {
        var open = nav.classList.toggle('open');
        hamburger.classList.toggle('active', open);
        hamburger.setAttribute('aria-expanded', String(open));
    });
    // Close menu when a nav link is clicked
    nav.querySelectorAll('.nav__link').forEach(function (link) {
        link.addEventListener('click', function () {
            nav.classList.remove('open');
            hamburger.classList.remove('active');
            hamburger.setAttribute('aria-expanded', 'false');
        });
    });

    /* ---------- Active Navigation Highlight ---------- */
    var sections = document.querySelectorAll('section[id]');
    var navLinks = document.querySelectorAll('.nav__link');
    function onScrollSpy() {
        var scrollPos = window.scrollY + 120;
        var currentId = '';
        sections.forEach(function (sec) {
            if (sec.offsetTop <= scrollPos) {
                currentId = sec.getAttribute('id');
            }
        });
        navLinks.forEach(function (link) {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + currentId) {
                link.classList.add('active');
            }
        });
    }

    /* ---------- Scroll Reveal Animations ---------- */
    var revealEls = document.querySelectorAll('.reveal');
    if ('IntersectionObserver' in window) {
        var revealObserver = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    revealObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
        revealEls.forEach(function (el) { revealObserver.observe(el); });
    } else {
        revealEls.forEach(function (el) { el.classList.add('visible'); });
    }

    /* ---------- Animated Counters ---------- */
    var statNums = document.querySelectorAll('.stat__num');
    function animateCounter(el) {
        var target = parseInt(el.getAttribute('data-target'), 10);
        var duration = 1600;
        var start = null;
        function step(timestamp) {
            if (!start) start = timestamp;
            var progress = Math.min((timestamp - start) / duration, 1);
            var eased = 1 - Math.pow(1 - progress, 3); // easeOutCubic
            el.textContent = Math.floor(eased * target);
            if (progress < 1) {
                requestAnimationFrame(step);
            } else {
                el.textContent = target;
            }
        }
        requestAnimationFrame(step);
    }
    if ('IntersectionObserver' in window && statNums.length) {
        var counterObserver = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    animateCounter(entry.target);
                    counterObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        statNums.forEach(function (el) { counterObserver.observe(el); });
    } else {
        statNums.forEach(function (el) { el.textContent = el.getAttribute('data-target'); });
    }

    /* ---------- FAQ Accordion ---------- */
    var accordionItems = document.querySelectorAll('.accordion__item');
    accordionItems.forEach(function (item) {
        var trigger = item.querySelector('.accordion__trigger');
        var content = item.querySelector('.accordion__content');
        trigger.addEventListener('click', function () {
            var isOpen = item.classList.contains('open');
            // Close all
            accordionItems.forEach(function (other) {
                other.classList.remove('open');
                other.querySelector('.accordion__content').style.maxHeight = null;
                other.querySelector('.accordion__trigger').setAttribute('aria-expanded', 'false');
            });
            // Open clicked if it was closed
            if (!isOpen) {
                item.classList.add('open');
                content.style.maxHeight = content.scrollHeight + 'px';
                trigger.setAttribute('aria-expanded', 'true');
            }
        });
    });

    /* ---------- Gallery Lightbox ---------- */
    var lightbox = document.getElementById('lightbox');
    var lightboxImg = document.getElementById('lightboxImg');
    var lightboxClose = document.getElementById('lightboxClose');
    document.querySelectorAll('[data-lightbox]').forEach(function (item) {
        item.addEventListener('click', function (e) {
            e.preventDefault();
            lightboxImg.src = item.getAttribute('href');
            lightbox.classList.add('open');
            lightbox.setAttribute('aria-hidden', 'false');
            document.body.style.overflow = 'hidden';
        });
    });
    function closeLightbox() {
        lightbox.classList.remove('open');
        lightbox.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
    }
    lightboxClose.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', function (e) {
        if (e.target === lightbox) closeLightbox();
    });
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && lightbox.classList.contains('open')) closeLightbox();
    });

    /* ---------- Booking Form Validation ---------- */
    var bookingForm = document.getElementById('bookingForm');
    var bookingSuccess = document.getElementById('bookingSuccess');

    function setError(fieldName, message) {
        var field = bookingForm.querySelector('[name="' + fieldName + '"]').closest('.field');
        var errEl = bookingForm.querySelector('[data-error="' + fieldName + '"]');
        field.classList.add('invalid');
        errEl.textContent = message;
    }
    function clearError(fieldName) {
        var field = bookingForm.querySelector('[name="' + fieldName + '"]').closest('.field');
        var errEl = bookingForm.querySelector('[data-error="' + fieldName + '"]');
        field.classList.remove('invalid');
        errEl.textContent = '';
    }

    // Set min date for check-in to today
    var checkin = document.getElementById('checkin');
    var checkout = document.getElementById('checkout');
    var today = new Date().toISOString().split('T')[0];
    checkin.min = today;

    checkin.addEventListener('change', function () {
        checkout.min = checkin.value;
        if (checkout.value && checkout.value <= checkin.value) {
            checkout.value = '';
        }
    });

    bookingForm.addEventListener('submit', function (e) {
        e.preventDefault();
        var valid = true;
        bookingSuccess.hidden = true;

        if (!checkin.value) { setError('checkin', 'Please select a check-in date.'); valid = false; }
        else { clearError('checkin'); }

        if (!checkout.value) { setError('checkout', 'Please select a check-out date.'); valid = false; }
        else if (checkin.value && checkout.value <= checkin.value) { setError('checkout', 'Check-out must be after check-in.'); valid = false; }
        else { clearError('checkout'); }

        if (!bookingForm.adults.value) { setError('adults', 'Please select number of adults.'); valid = false; }
        else { clearError('adults'); }

        if (bookingForm.children.value === '') { setError('children', 'Please select.'); valid = false; }
        else { clearError('children'); }

        if (!bookingForm.roomType.value) { setError('roomType', 'Please choose a room type.'); valid = false; }
        else { clearError('roomType'); }

        if (valid) {
            bookingSuccess.hidden = false;
            bookingForm.reset();
            checkout.min = today;
        }
    });

    /* ---------- Newsletter Form ---------- */
    var newsletterForm = document.getElementById('newsletterForm');
    var newsletterMsg = document.getElementById('newsletterMsg');
    var newsletterEmail = document.getElementById('newsletterEmail');
    newsletterForm.addEventListener('submit', function (e) {
        e.preventDefault();
        var re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!re.test(newsletterEmail.value)) {
            newsletterEmail.focus();
            newsletterEmail.style.borderColor = '#e05656';
            return;
        }
        newsletterEmail.style.borderColor = '';
        newsletterMsg.hidden = false;
        newsletterForm.reset();
        setTimeout(function () { newsletterMsg.hidden = true; }, 4000);
    });

    /* ---------- Footer Year ---------- */
    var yearEl = document.getElementById('year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();

    /* ---------- Unified Scroll Handler ---------- */
    function onScroll() {
        onScrollHeader();
        onScrollBackToTop();
        onScrollSpy();
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll(); // init
})();
