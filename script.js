// Wait for DOM to load
document.addEventListener("DOMContentLoaded", () => {
    // Custom Cursor logic removed

    // 2. Drawer Menu Toggle
    const menuToggle = document.getElementById('menu-toggle');
    const menuDrawer = document.getElementById('menu-drawer');
    const menuBackdrop = document.getElementById('menu-backdrop');
    const burger = menuToggle.querySelector('.burger');
    const spans = burger.querySelectorAll('span');
    const toggleText = menuToggle.querySelector('.toggle-text');
    const menuLinks = document.querySelectorAll('.menu-link');

    let isMenuOpen = false;

    function toggleMenu() {
        isMenuOpen = !isMenuOpen;
        if(isMenuOpen) {
            menuDrawer.classList.add('open');
            menuBackdrop.classList.add('open');
            toggleText.innerText = 'CLOSE';
            spans[0].style.transform = 'translateY(4.5px) rotate(45deg)';
            spans[1].style.transform = 'translateY(-4.5px) rotate(-45deg)';
        } else {
            menuDrawer.classList.remove('open');
            menuBackdrop.classList.remove('open');
            toggleText.innerText = 'MENU';
            spans[0].style.transform = 'none';
            spans[1].style.transform = 'none';
        }
    }

    menuToggle.addEventListener('click', toggleMenu);
    if(menuBackdrop) {
        menuBackdrop.addEventListener('click', () => {
            if(isMenuOpen) toggleMenu();
        });
    }
    menuLinks.forEach(link => {
        link.addEventListener('click', toggleMenu);
    });

    // 3. Accordion Logic
    const accordions = document.querySelectorAll('.accordion-item');
    accordions.forEach(acc => {
        const header = acc.querySelector('.accordion-header');
        header.addEventListener('click', () => {
            // Close others
            accordions.forEach(item => {
                if(item !== acc) item.classList.remove('active');
            });
            // Toggle current
            acc.classList.toggle('active');
        });
    });

    // 4. Background Reveal on Hover for Offerings
    const serviceBgs = document.querySelectorAll('.service-bg');
    const hoverTriggers = document.querySelectorAll('.hover-trigger');

    hoverTriggers.forEach(trigger => {
        trigger.addEventListener('mouseenter', () => {
            const service = trigger.getAttribute('data-bg');
            serviceBgs.forEach(bg => {
                if(bg.getAttribute('data-service') === service) {
                    bg.classList.add('active');
                } else {
                    bg.classList.remove('active');
                }
            });
        });

        trigger.addEventListener('mouseleave', () => {
            serviceBgs.forEach(bg => bg.classList.remove('active'));
        });
    });

    // GSAP ScrollTrigger Animations (requires GSAP & ScrollTrigger to be loaded)
    if (typeof gsap !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);

        // Standard Reveals
        const revealElements = document.querySelectorAll('.reveal');
        revealElements.forEach(el => {
            gsap.to(el, {
                scrollTrigger: {
                    trigger: el,
                    start: "top 85%", // trigger when top of element hits 85% of viewport
                },
                opacity: 1,
                y: 0,
                duration: 1.2,
                ease: "power3.out"
            });
        });

        // Parallax Image in Philosophy
        gsap.to('.parallax-img', {
            scrollTrigger: {
                trigger: '.philosophy-image-wrapper',
                start: "top bottom",
                end: "bottom top",
                scrub: true
            },
            y: "10%", // move down slightly as you scroll down
            ease: "none"
        });

        // Horizontal Scroll Section
        const horizontalSection = document.querySelector('.horizontal-scroll-section');
        const horizontalTrack = document.getElementById('horizontal-track');
        
        // Calculate total scroll distance
        function getScrollAmount() {
            let trackWidth = horizontalTrack.scrollWidth;
            return -(trackWidth - window.innerWidth);
        }

        const tl = gsap.timeline();
        
        tl.to(horizontalTrack, {
            x: getScrollAmount,
            ease: "none"
        }, 0);

        const progressBar = document.querySelector('.scroll-progress-bar');
        if (progressBar) {
            tl.fromTo(progressBar, 
                { scaleX: 0 },
                { scaleX: 1, ease: "none", transformOrigin: "left center" }, 
                0
            );
        }

        ScrollTrigger.create({
            trigger: horizontalSection,
            start: "top top",
            end: () => `+=${getScrollAmount() * -1}`,
            pin: true,
            animation: tl,
            scrub: 1, // Smooth scrubbing
            invalidateOnRefresh: true // Recalculate on resize
        });

    } else {
        // Fallback for reveals if GSAP fails to load
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if(entry.isIntersecting) {
                    entry.target.style.opacity = 1;
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        });
        document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
    }

    // Custom Select Implementation
    const customSelects = document.getElementsByClassName("custom-select");
    for (let i = 0; i < customSelects.length; i++) {
        const selElmnt = customSelects[i].getElementsByTagName("select")[0];
        
        // Create a new DIV that will act as the selected item
        const a = document.createElement("DIV");
        a.setAttribute("class", "select-selected placeholder-active hover-target");
        a.innerHTML = selElmnt.options[selElmnt.selectedIndex].innerHTML;
        customSelects[i].appendChild(a);
        
        // Create a new DIV that will contain the option list
        const b = document.createElement("DIV");
        b.setAttribute("class", "select-items select-hide");
        
        for (let j = 1; j < selElmnt.length; j++) { // Start from 1 to skip placeholder
            const c = document.createElement("DIV");
            c.innerHTML = selElmnt.options[j].innerHTML;
            c.setAttribute("class", "hover-target");
            c.addEventListener("click", function(e) {
                // When an item is clicked, update the original select box and the selected item
                const s = this.parentNode.parentNode.getElementsByTagName("select")[0];
                const h = this.parentNode.previousSibling;
                for (let k = 0; k < s.length; k++) {
                    if (s.options[k].innerHTML == this.innerHTML) {
                        s.selectedIndex = k;
                        h.innerHTML = this.innerHTML;
                        h.classList.remove("placeholder-active");
                        const y = this.parentNode.getElementsByClassName("same-as-selected");
                        for (let l = 0; l < y.length; l++) {
                            y[l].classList.remove("same-as-selected");
                        }
                        this.setAttribute("class", "same-as-selected");
                        break;
                    }
                }
                h.click();
            });
            b.appendChild(c);
        }
        customSelects[i].appendChild(b);
        
        a.addEventListener("click", function(e) {
            // When the select box is clicked, close any other select boxes and toggle the current one
            e.stopPropagation();
            closeAllSelect(this);
            this.nextSibling.classList.toggle("select-hide");
            this.classList.toggle("select-arrow-active");
        });
    }

    function closeAllSelect(elmnt) {
        // A function that will close all select boxes in the document, except the current select box
        const x = document.getElementsByClassName("select-items");
        const y = document.getElementsByClassName("select-selected");
        const arrNo = [];
        for (let i = 0; i < y.length; i++) {
            if (elmnt == y[i]) {
                arrNo.push(i)
            } else {
                y[i].classList.remove("select-arrow-active");
            }
        }
        for (let i = 0; i < x.length; i++) {
            if (arrNo.indexOf(i) === -1) {
                x[i].classList.add("select-hide");
            }
        }
    }

    document.addEventListener("click", closeAllSelect);

});
