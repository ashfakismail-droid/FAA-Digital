/* PUB SOCIAL CLUB/js/script.js */

document.addEventListener('DOMContentLoaded', () => {
    // Structural Core Init System
    initLoaderEngine();
    initCustomPointerEngine();
    initParticleBackground();
    initNavigationCore();
    initScrollObserverEngine();
    initMetricsCounter();
    initGalleryLightbox();
    initCardPerspectiveGyros();
    initAccordionSystem();
    initFormSanitization();
    initMenuTabs();
});

/**
 * Loading Performance Bar Controller
 */
function initLoaderEngine() {
    const loader = document.getElementById('loader');
    const progressBar = document.querySelector('.loader-progress-bar');
    if (!loader) return;

    let progressRatio = 0;
    const mechanicalClock = setInterval(() => {
        progressRatio += Math.floor(Math.random() * 12) + 4;
        if (progressRatio >= 100) {
            progressRatio = 100;
            clearInterval(mechanicalClock);
            setTimeout(() => {
                loader.style.opacity = '0';
                loader.style.transform = 'scale(1.02)';
                setTimeout(() => loader.style.display = 'none', 800);
            }, 300);
        }
        if (progressBar) progressBar.style.width = `${progressRatio}%`;
    }, 40);
}

/**
 * High-Fidelity Pointer Tracker & Mouse-Follow Soft Ambient Light
 */
function initCustomPointerEngine() {
    const cursorOut = document.querySelector('.custom-cursor');
    const cursorDot = document.querySelector('.custom-cursor-dot');
    const mouseGlow = document.getElementById('mouseGlow');
    
    if (window.matchMedia('(max-width: 992px)').matches) {
        if (cursorOut) cursorOut.style.display = 'none';
        if (cursorDot) cursorDot.style.display = 'none';
        if (mouseGlow) mouseGlow.style.display = 'none';
        return;
    }

    let positionX = 0, positionY = 0;
    let targetX = 0, targetY = 0;

    document.addEventListener('mousemove', (event) => {
        targetX = event.clientX;
        targetY = event.clientY;
        if (cursorDot) {
            cursorDot.style.left = `${targetX}px`;
            cursorDot.style.top = `${targetY}px`;
        }
        if (mouseGlow) {
            mouseGlow.style.left = `${targetX}px`;
            mouseGlow.style.top = `${targetY}px`;
        }
    });

    // Smooth continuous structural interpolation for outer loop pointer frame
    function renderCursorLoop() {
        positionX += (targetX - positionX) * 0.15;
        positionY += (targetY - positionY) * 0.15;
        if (cursorOut) {
            cursorOut.style.left = `${positionX}px`;
            cursorOut.style.top = `${positionY}px`;
        }
        requestAnimationFrame(renderCursorLoop);
    }
    requestAnimationFrame(renderCursorLoop);

    // Track active tags to shift structural layout of cursor sizing
    const targetInteractiveTags = document.querySelectorAll('a, button, input, select, textarea, .gallery-brick, .accordion-toggle-trigger');
    targetInteractiveTags.forEach(node => {
        node.addEventListener('mouseenter', () => document.body.classList.add('interactive-hovered'));
        node.addEventListener('mouseleave', () => document.body.classList.remove('interactive-hovered'));
    });
}

/**
 * HTML5 Canvas Background Subtle Floating Particle Engine
 */
function initParticleBackground() {
    const canvas = document.getElementById('particleCanvas');
    if (!canvas) return;
    const context = canvas.getContext('2d');
    let dynamicArray = [];

    function resizeContextWindow() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resizeContextWindow();
    window.addEventListener('resize', resizeContextWindow);

    class AmbientParticleNode {
        constructor() {
            this.resetNodeProperties();
        }
        resetNodeProperties() {
            this.coordinateX = Math.random() * canvas.width;
            this.coordinateY = Math.random() * canvas.height + canvas.height;
            this.nodeRadius = Math.random() * 1.5 + 0.5;
            this.speedVectorY = -(Math.random() * 0.4 + 0.1);
            this.oscillationSpeed = Math.random() * 0.02;
            this.angleTheta = Math.random() * Math.PI * 2;
            this.alphaOpacity = Math.random() * 0.25 + 0.05;
        }
        updateMovement() {
            this.coordinateY += this.speedVectorY;
            this.angleTheta += this.oscillationSpeed;
            this.coordinateX += Math.sin(this.angleTheta) * 0.15;

            if (this.coordinateY < -10) {
                this.resetNodeProperties();
                this.coordinateY = canvas.height + 10;
            }
        }
        drawGraphic() {
            context.beginPath();
            context.arc(this.coordinateX, this.coordinateY, this.nodeRadius, 0, Math.PI * 2);
            context.fillStyle = `rgba(214, 175, 55, ${this.alphaOpacity})`;
            context.fill();
        }
    }

    const maximumNodeDensity = window.innerWidth < 768 ? 25 : 70;
    for (let index = 0; index < maximumNodeDensity; index++) {
        dynamicArray.push(new AmbientParticleNode());
    }

    function animateEngineLoop() {
        context.clearRect(0, 0, canvas.width, canvas.height);
        for (let index = 0; index < dynamicArray.length; index++) {
            dynamicArray[index].updateMovement();
            dynamicArray[index].drawGraphic();
        }
        requestAnimationFrame(animateEngineLoop);
    }
    requestAnimationFrame(animateEngineLoop);
}

/**
 * Transparent Glassmorphism Navbar Track, Back-to-Top, & ScrollSpy Highlight
 */
function initNavigationCore() {
    const navBarNode = document.querySelector('.navbar');
    const scrollButton = document.getElementById('scrollTopBtn');
    const sections = document.querySelectorAll('section[id]');
    const navigationLinks = document.querySelectorAll('.nav-link-item');
    const mobileToggle = document.getElementById('mobileToggle');
    const mobileDrawer = document.getElementById('mobileDrawer');
    const mobileLinks = document.querySelectorAll('.mobile-link');

    window.addEventListener('scroll', () => {
        const structuralScrollPos = window.scrollY;

        // Navbar State Modifiers
        if (structuralScrollPos > 60) {
            navBarNode.classList.add('scrolled-nav');
        } else {
            navBarNode.classList.remove('scrolled-nav');
        }

        // Back To Top Display Matrix
        if (structuralScrollPos > 700) {
            scrollButton.classList.add('visible-trigger');
        } else {
            scrollButton.classList.remove('visible-trigger');
        }

        // Active Segment Navigation ScrollSpy Logic
        sections.forEach(currentSection => {
            const sectionHeight = currentSection.offsetHeight;
            const sectionTop = currentSection.offsetTop - 140;
            const targetId = currentSection.getAttribute('id');

            if (structuralScrollPos > sectionTop && structuralScrollPos <= sectionTop + sectionHeight) {
                navigationLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${targetId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    });

    if (scrollButton) {
        scrollButton.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
}

/**
 * Hamburger Slide Menu Control System
 */
function initMobileNavigation() {
    const mobileToggle = document.getElementById('mobileToggle');
    const mobileDrawer = document.getElementById('mobileDrawer');
    const mobileLinks = document.querySelectorAll('.mobile-link');

    if (!mobileToggle || !mobileDrawer) return;

    function dismantleDrawerState() {
        mobileToggle.classList.remove('open-active');
        mobileDrawer.classList.remove('active-drawer');
        document.body.style.overflowY = 'auto';
    }

    mobileToggle.addEventListener('click', () => {
        const isCurrentlyOpen = mobileDrawer.classList.contains('active-drawer');
        if (isCurrentlyOpen) {
            dismantleDrawerState();
        } else {
            mobileToggle.classList.add('open-active');
            mobileDrawer.classList.add('active-drawer');
            document.body.style.overflowY = 'hidden';
        }
    });

    mobileLinks.forEach(anchor => {
        anchor.addEventListener('click', () => dismantleDrawerState());
    });
}
// Run Mobile Menu Initialization independently to safeguard bindings
initMobileNavigation();

/**
 * Scroll Reveal Pipeline & Hero Parallax Mathematical Interpolation
 */
function initScrollObserverEngine() {
    const targetNodes = document.querySelectorAll('.scroll-reveal-up');
    if (targetNodes.length === 0) return;

    const structuralObserverOptions = {
        threshold: 0.05,
        rootMargin: '0px 0px -30px 0px'
    };

    const trackingObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('reveal-active');
                observer.unobserve(entry.target);
            }
        });
    }, structuralObserverOptions);

    targetNodes.forEach(node => trackingObserver.observe(node));

    // Hardware Accelerated Linear Matrix Hero Scaling Parallax
    const targetHeroImage = document.querySelector('.hero-parallax-img');
    if (targetHeroImage) {
        window.addEventListener('scroll', () => {
            const currentOffset = window.scrollY;
            if (currentOffset <= window.innerHeight) {
                targetHeroImage.style.transform = `scale(1.05) translateY(${currentOffset * 0.35}px) translateZ(0)`;
            }
        }, { passive: true });
    }
}

/**
 * Vetted Statistical Matrix Counter Progression
 */
function initMetricsCounter() {
    const targetCounters = document.querySelectorAll('.counter-val');
    if (targetCounters.length === 0) return;

    const processingObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const innerCounterNode = entry.target;
                const totalTargetValue = parseInt(innerCounterNode.getAttribute('data-target'), 10);
                let iterativeSeed = 0;
                const totalTimingInterval = 1800 / totalTargetValue;

                const logicClock = setInterval(() => {
                    iterativeSeed++;
                    innerCounterNode.textContent = iterativeSeed;
                    if (iterativeSeed >= totalTargetValue) {
                        clearInterval(logicClock);
                    }
                }, totalTimingInterval);

                observer.unobserve(innerCounterNode);
            }
        });
    }, { threshold: 0.7 });

    targetCounters.forEach(counter => processingObserver.observe(counter));
}

/**
 * Premium Interactive Modal Gallery Lightbox Functionality
 */
function initGalleryLightbox() {
    const bricks = document.querySelectorAll('.gallery-brick');
    const lightbox = document.getElementById('galleryLightbox');
    const lightboxImg = document.getElementById('lightboxImage');
    const lightboxCaption = document.getElementById('lightboxCaption');
    const closeTrigger = document.querySelector('.lightbox-close');

    if (!lightbox || bricks.length === 0) return;

    bricks.forEach(brick => {
        brick.addEventListener('click', () => {
            const analyticalImgSource = brick.querySelector('img').getAttribute('src');
            const contextualCaption = brick.querySelector('.brick-caption-overlay span').textContent;
            
            if (lightboxImg) lightboxImg.setAttribute('src', analyticalImgSource);
            if (lightboxCaption) lightboxCaption.textContent = contextualCaption;
            
            lightbox.classList.add('active-lightbox');
            lightbox.setAttribute('aria-hidden', 'false');
            document.body.style.overflow = 'hidden';
        });
    });

    function exitLightboxMode() {
        lightbox.classList.remove('active-lightbox');
        lightbox.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = 'auto';
    }

    if (closeTrigger) closeTrigger.addEventListener('click', exitLightboxMode);
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) exitLightboxMode();
    });
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && lightbox.classList.contains('active-lightbox')) exitLightboxMode();
    });
}

/**
 * Multi-Axis Gyroscopic Card Reflection Math
 */
function initCardPerspectiveGyros() {
    const luxuryCard = document.querySelector('.interactive-luxury-card-3d');
    if (!luxuryCard || window.matchMedia('(max-width: 992px)').matches) return;

    luxuryCard.addEventListener('mousemove', (event) => {
        const geometricBounds = luxuryCard.getBoundingClientRect();
        const coordinateDeltaX = event.clientX - geometricBounds.left;
        const coordinateDeltaY = event.clientY - geometricBounds.top;
        
        const positionalRatioX = coordinateDeltaX / geometricBounds.width;
        const positionalRatioY = coordinateDeltaY / geometricBounds.height;
        
        const computationalRotationY = (positionalRatioX - 0.5) * 28; 
        const computationalRotationX = (0.5 - positionalRatioY) * 28; 

        luxuryCard.style.transform = `rotateX(${computationalRotationX}deg) rotateY(${computationalRotationY}deg)`;
        
        const dynamicSpecularGlare = luxuryCard.querySelector('.card-inner-glare');
        if (dynamicSpecularGlare) {
            dynamicSpecularGlare.style.left = `${(positionalRatioX * 100) - 50}%`;
            dynamicSpecularGlare.style.top = `${(positionalRatioY * 100) - 50}%`;
        }
    });

    luxuryCard.addEventListener('mouseleave', () => {
        luxuryCard.style.transform = 'rotateX(0deg) rotateY(0deg)';
        const dynamicSpecularGlare = luxuryCard.querySelector('.card-inner-glare');
        if (dynamicSpecularGlare) {
            dynamicSpecularGlare.style.left = '-50%';
            dynamicSpecularGlare.style.top = '-50%';
        }
    });
}

/**
 * High-Fidelity MaxHeight Accordion Sub-Engine (FAQ)
 */
function initAccordionSystem() {
    const accordionTriggers = document.querySelectorAll('.accordion-toggle-trigger');

    accordionTriggers.forEach(btn => {
        btn.addEventListener('click', function() {
            const componentItemParent = this.parentElement;
            const secondaryContentBody = componentItemParent.querySelector('.accordion-body-content');
            const internallyActive = componentItemParent.classList.contains('active-accordion-item');

            // Dismantle active configuration matches among siblings
            document.querySelectorAll('.accordion-item-glass').forEach(structuralItem => {
                structuralItem.classList.remove('active-accordion-item');
                const structuralButton = structuralItem.querySelector('.accordion-toggle-trigger');
                if (structuralButton) structuralButton.setAttribute('aria-expanded', 'false');
                const coreBody = structuralItem.querySelector('.accordion-body-content');
                if (coreBody) coreBody.style.maxHeight = '0px';
            });

            if (!internallyActive) {
                componentItemParent.classList.add('active-accordion-item');
                this.setAttribute('aria-expanded', 'true');
                secondaryContentBody.style.maxHeight = `${secondaryContentBody.scrollHeight}px`;
            }
        });
    });
}

/**
 * Native Structural Form Interception & Micro-Animation Handling
 */
function initFormSanitization() {
    const secureFormNode = document.getElementById('luxuryForm');
    if (!secureFormNode) return;

    const targetedFields = secureFormNode.querySelectorAll('.premium-input-field[required]');

    function executeFieldVerification(inputNode) {
        const structuralParentBlock = inputNode.parentElement;
        let checksPass = true;

        if (inputNode.type === 'email') {
            const structuralEmailExpression = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            checksPass = structuralEmailExpression.test(inputNode.value.trim());
        } else {
            checksPass = inputNode.value.trim() !== '';
        }

        if (!checksPass) {
            structuralParentBlock.classList.add('validation-failed');
        } else {
            structuralParentBlock.classList.remove('validation-failed');
        }
        return checksPass;
    }

    targetedFields.forEach(elementNode => {
        elementNode.addEventListener('input', () => {
            if (elementNode.parentElement.classList.contains('validation-failed')) {
                executeFieldVerification(elementNode);
            }
        });
        elementNode.addEventListener('blur', () => {
            executeFieldVerification(elementNode);
        });
    });

    secureFormNode.addEventListener('submit', (submissionEvent) => {
        submissionEvent.preventDefault();
        let totalFormValidityState = true;

        targetedFields.forEach(field => {
            const singularFieldResult = executeFieldVerification(field);
            if (!singularFieldResult) totalFormValidityState = false;
        });

        if (totalFormValidityState) {
            const actionableSubmitBtn = secureFormNode.querySelector('.form-submission-btn');
            if (actionableSubmitBtn) {
                actionableSubmitBtn.style.pointerEvents = 'none';
                actionableSubmitBtn.querySelector('span').textContent = 'Transmitting Configuration...';
            }
            
            setTimeout(() => {
                alert('Transmission Received Securely. Your designated concierge will verify availability.');
                secureFormNode.reset();
                if (actionableSubmitBtn) {
                    actionableSubmitBtn.style.pointerEvents = 'auto';
                    actionableSubmitBtn.querySelector('span').textContent = 'Transmit Secure Request';
                }
            }, 1500);
        }
    });
}
/**
 * Dynamic Tab System for Food & Drinks Menu
 */
function initMenuTabs() {
    const tabButtons = document.querySelectorAll('.menu-tab-btn');
    const tabContents = document.querySelectorAll('.menu-tab-content');

    if (tabButtons.length === 0 || tabContents.length === 0) return;

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active state from all buttons and panels
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));

            // Apply active state to target button and panel
            button.classList.add('active');
            const targetId = button.getAttribute('data-target');
            const targetContent = document.getElementById(targetId);
            
            if (targetContent) {
                targetContent.classList.add('active');
            }
        });
    });
}