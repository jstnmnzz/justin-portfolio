document.addEventListener("DOMContentLoaded", function () {

    // CURSOR GLOW
    const cursorGlow =
        document.getElementById(
            "cursorGlow"
        );


    let mouseX = 0;
    let mouseY = 0;

    let glowX = 0;
    let glowY = 0;


    document.addEventListener(
        "mousemove",
        function (event) {

            mouseX =
                event.clientX;

            mouseY =
                event.clientY;


            if (cursorGlow) {

                cursorGlow.style.opacity =
                    "1";

            }

        }
    );


    document.addEventListener(
        "mouseleave",
        function () {

            if (cursorGlow) {

                cursorGlow.style.opacity =
                    "0";

            }

        }
    );


    function animateGlow() {

        glowX +=
            (mouseX - glowX) * 0.1;

        glowY +=
            (mouseY - glowY) * 0.1;


        if (cursorGlow) {

            cursorGlow.style.left =
                glowX + "px";

            cursorGlow.style.top =
                glowY + "px";

        }


        requestAnimationFrame(
            animateGlow
        );

    }


    animateGlow();


    // THEME
    const themeToggle =
        document.getElementById(
            "themeToggle"
        );


    const savedTheme =
        localStorage.getItem(
            "justinEditorialTheme"
        );


    if (
        savedTheme === "light"
    ) {

        document.body.classList.add(
            "light-mode"
        );


        if (themeToggle) {

            themeToggle.textContent =
                "DARK";

        }

    }


    if (themeToggle) {

        themeToggle.addEventListener(
            "click",
            function () {

                document.body.classList.toggle(
                    "light-mode"
                );


                const light =
                    document.body.classList.contains(
                        "light-mode"
                    );


                themeToggle.textContent =
                    light
                        ? "DARK"
                        : "LIGHT";


                localStorage.setItem(
                    "justinEditorialTheme",
                    light
                        ? "light"
                        : "dark"
                );

            }
        );

    }


    // PROFILE SWITCHER
    const mainProfile =
        document.getElementById(
            "mainProfile"
        );


    const thumbButtons =
        document.querySelectorAll(
            ".thumb-button"
        );


    thumbButtons.forEach(
        function (button) {

            button.addEventListener(
                "click",
                function () {

                    const image =
                        this.querySelector(
                            "img"
                        );


                    if (
                        !image ||
                        !mainProfile
                    ) {
                        return;
                    }


                    mainProfile.src =
                        image.src;


                    thumbButtons.forEach(
                        function (item) {

                            item.classList.remove(
                                "active"
                            );

                        }
                    );


                    this.classList.add(
                        "active"
                    );

                }
            );

        }
    );


    // SMOOTH SCROLL
    document
        .querySelectorAll(
            'a[href^="#"]'
        )
        .forEach(
            function (link) {

                link.addEventListener(
                    "click",
                    function (event) {

                        const href =
                            this.getAttribute(
                                "href"
                            );


                        if (
                            !href ||
                            href === "#"
                        ) {
                            return;
                        }


                        const target =
                            document.querySelector(
                                href
                            );


                        if (target) {

                            event.preventDefault();


                            target.scrollIntoView({
                                behavior:
                                    "smooth"
                            });

                        }

                    }
                );

            }
        );


    // ACTIVE NAVIGATION
    const sections =
        document.querySelectorAll(
            "section[id]"
        );


    const navLinks =
        document.querySelectorAll(
            ".navigation a"
        );


    function updateNavigation() {

        let current =
            "home";


        sections.forEach(
            function (section) {

                if (
                    window.scrollY >=
                    section.offsetTop - 170
                ) {

                    current =
                        section.id;

                }

            }
        );


        navLinks.forEach(
            function (link) {

                link.classList.remove(
                    "active-link"
                );


                if (
                    link.getAttribute(
                        "href"
                    ) ===
                    "#" + current
                ) {

                    link.classList.add(
                        "active-link"
                    );

                }

            }
        );

    }


    window.addEventListener(
        "scroll",
        updateNavigation
    );


    updateNavigation();


    // REVEAL
    const reveals =
        document.querySelectorAll(
            ".reveal"
        );


    const observer =
        new IntersectionObserver(

            function (entries) {

                entries.forEach(
                    function (entry) {

                        if (
                            entry.isIntersecting
                        ) {

                            entry.target.classList.add(
                                "visible"
                            );


                            observer.unobserve(
                                entry.target
                            );

                        }

                    }
                );

            },

            {
                threshold:
                    0.08
            }

        );


    reveals.forEach(
        function (element) {

            observer.observe(
                element
            );

        }
    );


    // BACK TO TOP
    const backToTop =
        document.getElementById(
            "backToTop"
        );


    window.addEventListener(
        "scroll",
        function () {

            if (!backToTop) {
                return;
            }


            backToTop.classList.toggle(
                "show",
                window.scrollY > 600
            );

        }
    );


    if (backToTop) {

        backToTop.addEventListener(
            "click",
            function () {

                window.scrollTo({

                    top: 0,

                    behavior:
                        "smooth"

                });

            }
        );

    }

});