// script used to change navbar from transparent to white and vice versa on scroll
// and to change the logo from light to dark and vice versa in mobile view when the navbar black is opened

document.addEventListener("DOMContentLoaded", () => {
    const navbar = document.querySelector(".navbar_1");
    const logo = document.querySelector("#logo");  // Check if the #logo exists
    if (!logo) {
        console.error("Logo element not found!");
        return;  // Stop execution if logo is not found
    }
    const logoImg = logo.querySelector("img");  // Main image tag for fallback
    const logoSources = logo.querySelectorAll("source"); // All source elements inside <picture>
    
    // Define logo sets for light and dark modes
    const logoLight = {
        "1024px": "./assets/images/logos/logo_light.png",
        "768px": "./assets/images/logos/logo_light_medium.png",
        "360px": "./assets/images/logos/logo_light_medium.png",
        "0px": "./assets/images/logos/logo_light_small.png"
    };

    const logoDark = {
        "1024px": "./assets/images/logos/logo_dark.png",
        "768px": "./assets/images/logos/logo_dark_medium.png",
        "360px": "./assets/images/logos/logo_dark_medium.png",
        "0px": "./assets/images/logos/logo_dark_small.png"
    };

    // Function to update logo sources based on the mode (light or dark)
    function updateLogoOnScroll(logoSet) {
        const mediaSizes = Object.keys(logoSet).sort((a, b) => parseInt(b) - parseInt(a)); // Sort media queries from large to small

        // Update each <source> element with the correct srcset
        logoSources.forEach((source, index) => {
            const mediaSize = mediaSizes[index];
            source.srcset = logoSet[mediaSize];
        });

        // Update the fallback <img> tag for browsers that don't support <picture>
        logoImg.src = logoSet["1024px"];
    }

    // Function to check if the mobile menu is open and adjust the logo
    function handleNavbarScroll() {
        const isMobileMenuActive = navbar.querySelector(".menu.active"); // Check if the mobile menu is active

        if (window.scrollY > 50) {
            navbar.classList.add("black");
            if (isMobileMenuActive) {
                updateLogoOnScroll(logoLight);  // Use light logo when the menu is open and scrolled
            } else {
                updateLogoOnScroll(logoDark);   // Default dark logo when scrolled
            }
        } else {
            navbar.classList.remove("black");
            updateLogoOnScroll(logoLight);  // Use light logo when at the top of the page
        }
    }

    // Scroll event to change navbar style and logo
    window.addEventListener("scroll", handleNavbarScroll);

    // Optional: You may also want to update the logo when the mobile menu is toggled
    const burger = document.querySelector(".burger");
    burger.addEventListener("click", handleNavbarScroll); // Update logo when the burger menu is clicked
});
