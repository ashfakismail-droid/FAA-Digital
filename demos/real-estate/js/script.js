/* =========================================================
   PrimeNest Realty — Interactive Script (Vanilla JS)
   ========================================================= */
(function () {
    "use strict";

    /* ---------- Data ---------- */
    const properties = [
        { title: "Skyline Penthouse", addr: "120 Park Ave, New York", price: 2850000, beds: 4, baths: 3, area: 3200, type: "Luxury Home", img: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80" },
        { title: "Marina Bay Villa", addr: "88 Ocean Dr, Miami", price: 4200000, beds: 5, baths: 5, area: 4800, type: "Villa", img: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=800&q=80" },
        { title: "Urban Loft Suite", addr: "45 Tech Blvd, San Francisco", price: 980000, beds: 2, baths: 2, area: 1500, type: "Apartment", img: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=800&q=80" },
        { title: "Garden Estate", addr: "210 Maple Rd, Boston", price: 1750000, beds: 4, baths: 4, area: 3600, type: "Luxury Home", img: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=800&q=80" },
        { title: "Downtown Condo", addr: "9 Lake St, Chicago", price: 640000, beds: 2, baths: 1, area: 1100, type: "Apartment", img: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80" },
        { title: "Hillside Mansion", addr: "500 Summit Way, Los Angeles", price: 5600000, beds: 6, baths: 6, area: 6200, type: "Villa", img: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80" },
        { title: "Riverside Office", addr: "77 Commerce St, New York", price: 2300000, beds: 0, baths: 3, area: 5400, type: "Commercial", img: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80" },
        { title: "Coastal Retreat", addr: "33 Shoreline Ave, Miami", price: 3100000, beds: 4, baths: 3, area: 3400, type: "Luxury Home", img: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=800&q=80" }
    ];

    const agents = [
        { name: "Olivia Bennett", pos: "Senior Property Consultant", exp: "12 yrs experience", phone: "+1 (212) 555-0110", email: "olivia@primenestrealty.com", img: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=600&q=80" },
        { name: "Marcus Reed", pos: "Luxury Homes Specialist", exp: "9 yrs experience", phone: "+1 (212) 555-0124", email: "marcus@primenestrealty.com", img: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=600&q=80" },
        { name: "Sophia Nguyen", pos: "Commercial Director", exp: "14 yrs experience", phone: "+1 (212) 555-0138", email: "sophia@primenestrealty.com", img: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=600&q=80" },
        { name: "James Carter", pos: "Investment Advisor", exp: "8 yrs experience", phone: "+1 (212) 555-0152", email: "james@primenestrealty.com", img: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=600&q=80" }
    ];

    const testimonials = [
        { name: "Emma Wilson", role: "Homeowner, NY", text: "PrimeNest made buying our first home effortless. Their agents were attentive, honest, and incredibly professional.", img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=200&q=80" },
        { name: "David Thompson", role: "Investor, Miami", text: "The verified listings saved me countless hours. I closed on a villa within three weeks at a great price.", img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80" },
        { name: "Aisha Khan", role: "Homeowner, LA", text: "From search to signing, the experience was seamless. Premium support truly lives up to its name.", img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80" }
    ];

    const fmt = (n) => "$" + n.toLocaleString("en-US");

    /* ---------- Render Property Cards ---------- */
    function renderProperties(list) {
        const grid = document.getElementById("propertyGrid");
        if (!grid) return;
        grid.innerHTML = list.map((p) => `
            <article class="property-card reveal">
                <div class="property-card__media">
                    <span class="property-card__tag">${p.type}</span>
                    <button class="property-card__fav" aria-label="Add to favorites" data-fav>♥</button>
                    <img loading="lazy" src="${p.img}" alt="${p.title}" />
                </div>
                <div class="property-card__body">
                    <h3 class="property-card__title">${p.title}</h3>
                    <p class="property-card__addr">📍 ${p.addr}</p>
                    <p class="property-card__price">${fmt(p.price)}</p>
                    <div class="property-card__meta">
                        <span>🛏 ${p.beds} Beds</span>
                        <span>🛁 ${p.baths} Baths</span>
                        <span>📐 ${p.area.toLocaleString()} sq ft</span>
                    </div>
                    <a href="#contact" class="btn btn--gold property-card__btn">View Details</a>
                </div>
            </article>`).join("");
        bindFavorites();
        observeReveals();
    }

    /* ---------- Render Agents ---------- */
    function renderAgents() {
        const grid = document.getElementById("agentGrid");
        if (!grid) return;
        grid.innerHTML = agents.map((a) => `
            <article class="agent-card reveal">
                <div class="agent-card__photo">
                    <img loading="lazy" src="${a.img}" alt="${a.name}" />
                </div>
                <div class="agent-card__body">
                    <h3 class="agent-card__name">${a.name}</h3>
                    <p class="agent-card__pos">${a.pos}</p>
                    <div class="agent-card__meta">
                        <span>⏱ ${a.exp}</span>
                        <span>📞 ${a.phone}</span>
                        <span>✉ ${a.email}</span>
                    </div>
                    <div class="agent-card__socials">
                        <a href="#" aria-label="Facebook">f</a>
                        <a href="#" aria-label="Twitter">t</a>
                        <a href="#" aria-label="LinkedIn">in</a>
                    </div>
                </div>
            </article>`).join("");
    }

    /* ---------- Render Testimonials ---------- */
    function renderTestimonials() {
        const grid = document.getElementById("testimonialGrid");
        if (!grid) return;
        grid.innerHTML = testimonials.map((t) => `
            <article class="testimonial-card reveal">
                <div class="testimonial-card__stars">★★★★★</div>
                <p class="testimonial-card__text">"${t.text}"</p>
                <div class="testimonial-card__person">
                    <img loading="lazy" src="${t.img}" alt="${t.name}" />
                    <div>
                        <div class="testimonial-card__name">${t.name}</div>
                        <div class="testimonial-card__role">${t.role}</div>
                    </div>
                </div>
            </article>`).join("");
    }

    /* ---------- Favorites ---------- */
    function bindFavorites() {
        document.querySelectorAll("[data-fav]").forEach((btn) => {
            btn.addEventListener("click", (e) => {
                e.preventDefault();
                btn.classList.toggle("active");
            });
        });
    }

    /* ---------- Loader ---------- */
    function hideLoader() {
        const loader = document.getElementById("loader");
        if (loader) setTimeout(() => loader.classList.add("hidden"), 600);
    }

    /* ---------- Sticky Header ---------- */
    function initHeader() {
        const header = document.getElementById("header");
        const onScroll = () => header.classList.toggle("scrolled", window.scrollY > 40);
        window.addEventListener("scroll", onScroll, { passive: true });
        onScroll();
    }

    /* ---------- Mobile Menu ---------- */
    function initMenu() {
        const burger = document.getElementById("hamburger");
        const links = document.getElementById("navLinks");
        if (!burger || !links) return;
        const toggle = (open) => {
            burger.classList.toggle("open", open);
            links.classList.toggle("open", open);
            burger.setAttribute("aria-expanded", String(open));
        };
        burger.addEventListener("click", () => toggle(!links.classList.contains("open")));
        links.querySelectorAll("a").forEach((a) => a.addEventListener("click", () => toggle(false)));
    }

    /* ---------- Active Nav Highlight ---------- */
    function initActiveNav() {
        const sections = ["hero", "search", "properties", "why", "agents", "calculator", "contact"]
            .map((id) => document.getElementById(id)).filter(Boolean);
        const navLinks = document.querySelectorAll(".nav__link");
        const obs = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const id = entry.target.id;
                    navLinks.forEach((l) => l.classList.toggle("active", l.getAttribute("href") === "#" + id));
                }
            });
        }, { rootMargin: "-45% 0px -50% 0px" });
        sections.forEach((s) => obs.observe(s));
    }

    /* ---------- Scroll Reveal ---------- */
    let revealObserver;
    function observeReveals() {
        if (!revealObserver) {
            revealObserver = new IntersectionObserver((entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("visible");
                        revealObserver.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.12 });
        }
        document.querySelectorAll(".reveal:not(.visible)").forEach((el) => revealObserver.observe(el));
    }

    /* ---------- Animated Counters ---------- */
    function animateCounters() {
        const nums = document.querySelectorAll(".stat__num");
        const obs = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) return;
                const el = entry.target;
                const target = +el.dataset.target;
                const suffix = el.dataset.suffix || "";
                const duration = 1600;
                const start = performance.now();
                const step = (now) => {
                    const p = Math.min((now - start) / duration, 1);
                    const eased = 1 - Math.pow(1 - p, 3);
                    el.textContent = Math.floor(eased * target).toLocaleString() + suffix;
                    if (p < 1) requestAnimationFrame(step);
                };
                requestAnimationFrame(step);
                obs.unobserve(el);
            });
        }, { threshold: 0.5 });
        nums.forEach((n) => obs.observe(n));
    }

    /* ---------- Back to Top ---------- */
    function initBackToTop() {
        const btn = document.getElementById("backToTop");
        if (!btn) return;
        const onScroll = () => btn.classList.toggle("show", window.scrollY > 500);
        window.addEventListener("scroll", onScroll, { passive: true });
        btn.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
    }

    /* ---------- Accordion ---------- */
    function initAccordion() {
        document.querySelectorAll(".accordion__head").forEach((head) => {
            head.addEventListener("click", () => {
                const item = head.parentElement;
                const body = item.querySelector(".accordion__body");
                const isOpen = item.classList.contains("open");
                document.querySelectorAll(".accordion__item").forEach((i) => {
                    i.classList.remove("open");
                    i.querySelector(".accordion__body").style.maxHeight = null;
                    i.querySelector(".accordion__head").setAttribute("aria-expanded", "false");
                });
                if (!isOpen) {
                    item.classList.add("open");
                    body.style.maxHeight = body.scrollHeight + "px";
                    head.setAttribute("aria-expanded", "true");
                }
            });
        });
    }

    /* ---------- Mortgage Calculator ---------- */
    function initCalculator() {
        const form = document.getElementById("calcForm");
        if (!form) return;
        const price = document.getElementById("c-price");
        const down = document.getElementById("c-down");
        const rate = document.getElementById("c-rate");
        const term = document.getElementById("c-term");
        const rMonthly = document.getElementById("r-monthly");
        const rInterest = document.getElementById("r-interest");
        const rTotal = document.getElementById("r-total");

        const calc = () => {
            const P = Math.max(0, +price.value - +down.value);
            const r = (+rate.value / 100) / 12;
            const n = Math.max(1, +term.value * 12);
            let monthly = 0;
            if (r > 0) {
                monthly = P * (r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
            } else {
                monthly = P / n;
            }
            if (!isFinite(monthly)) monthly = 0;
            const total = monthly * n;
            const interest = total - P;
            rMonthly.textContent = fmt(Math.round(monthly));
            rInterest.textContent = fmt(Math.round(interest));
            rTotal.textContent = fmt(Math.round(total));
        };
        form.addEventListener("input", calc);
        calc();
    }

    /* ---------- Search Filter ---------- */
    function initSearch() {
        const form = document.getElementById("searchForm");
        if (!form) return;
        form.addEventListener("submit", (e) => {
            e.preventDefault();
            const loc = form.location.value.toLowerCase();
            const type = form.type.value.toLowerCase();
            const beds = parseInt((form.beds.value || "0").replace("+", "")) || 0;
            const filtered = properties.filter((p) => {
                const locOk = !loc || p.addr.toLowerCase().includes(loc);
                const typeOk = !type || p.type.toLowerCase() === type;
                const bedsOk = !beds || p.beds >= beds;
                return locOk && typeOk && bedsOk;
            });
            renderProperties(filtered.length ? filtered : properties);
            document.getElementById("properties").scrollIntoView({ behavior: "smooth" });
        });
    }

    /* ---------- Form Validation ---------- */
    function initContactForm() {
        const form = document.getElementById("contactForm");
        if (!form) return;
        const success = document.getElementById("formSuccess");
        const validate = (field, test, msg) => {
            const input = form[field];
            const err = form.querySelector(`.form-error[data-for="${field}"]`);
            if (!test(input.value.trim())) {
                input.classList.add("invalid");
                if (err) err.textContent = msg;
                return false;
            }
            input.classList.remove("invalid");
            if (err) err.textContent = "";
            return true;
        };
        form.addEventListener("submit", (e) => {
            e.preventDefault();
            const okName = validate("name", (v) => v.length >= 2, "Please enter your name.");
            const okEmail = validate("email", (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v), "Enter a valid email.");
            const okMsg = validate("message", (v) => v.length >= 5, "Message is too short.");
            if (okName && okEmail && okMsg) {
                form.reset();
                success.hidden = false;
                setTimeout(() => (success.hidden = true), 4000);
            }
        });
    }

    /* ---------- Newsletter ---------- */
    function initNewsletter() {
        const form = document.getElementById("newsletterForm");
        if (!form) return;
        const success = document.getElementById("newsletterSuccess");
        form.addEventListener("submit", (e) => {
            e.preventDefault();
            if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.newsletter.value.trim())) {
                form.reset();
                success.hidden = false;
                setTimeout(() => (success.hidden = true), 4000);
            }
        });
    }

    /* ---------- Year ---------- */
    function setYear() {
        const el = document.getElementById("year");
        if (el) el.textContent = new Date().getFullYear();
    }

    /* ---------- Init ---------- */
    document.addEventListener("DOMContentLoaded", () => {
        hideLoader();
        renderProperties(properties);
        renderAgents();
        renderTestimonials();
        initHeader();
        initMenu();
        initActiveNav();
        observeReveals();
        animateCounters();
        initBackToTop();
        initAccordion();
        initCalculator();
        initSearch();
        initContactForm();
        initNewsletter();
        setYear();
    });
})();
