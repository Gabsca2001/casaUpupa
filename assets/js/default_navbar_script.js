// script used to change navbar from desktop to mobile view and vice versa
// and to change the logo from light to dark and vice versa in mobile view when the navbar black is opened


document.addEventListener("DOMContentLoaded", function () {
    const burger = document.querySelector(".burger");
    const menu = document.querySelector(".menu");
    const menuLinks = document.querySelectorAll(".menu ul li a");
    const body = document.body;
    const navbarBlack = document.querySelector(".navbar_1.black");
    const logoImg = document.querySelector("#logo img");
    const logoSources = document.querySelectorAll("#logo source");

    // Define logo paths for light and dark modes
    const logoLight = {
        "1024px": "assets/images/logos/logo_light.png",
        "768px": "assets/images/logos/logo_light_medium.png",
        "360px": "assets/images/logos/logo_light_medium.png",
        "0px": "assets/images/logos/logo_light_small.png"
    };

    const logoDark = {
        "1024px": "assets/images/logos/logo_dark.png",
        "768px": "assets/images/logos/logo_dark_medium.png",
        "360px": "assets/images/logos/logo_dark_medium.png",
        "0px": "assets/images/logos/logo_dark_small.png"
    };

    burger.addEventListener("click", () => {
        const isActive = menu.classList.toggle("active");
        burger.classList.toggle("active");

        if (navbarBlack) {
            if (isActive) {
                console.log('Switching to light logo');
                updateLogo(logoLight);
            } else {
                console.log('Switching to dark logo');
                updateLogo(logoDark);
            }
        }

        // Prevent body scrolling when menu is open
        body.style.overflow = isActive ? "hidden" : "";
    });

    // Function to update `<source>` elements while keeping responsiveness
    function updateLogo(logoSet) {
        const mediaSizes = Object.keys(logoSet).sort((a, b) => parseInt(b) - parseInt(a)); // Sort from largest to smallest
        logoSources.forEach((source, index) => {
            const mediaSize = mediaSizes[index];
            source.srcset = logoSet[mediaSize];
        });

        // Update the fallback <img> for browsers that don’t support <picture>
        logoImg.src = logoSet["1024px"]; 
    }

    // Close menu when clicking a link
    menuLinks.forEach(link => {
        link.addEventListener("click", () => {
            menu.classList.remove("active");
            burger.classList.remove("active");
            updateLogo(logoDark); // Revert to dark logo when menu closes
            body.style.overflow = "";
        });
    });
});
