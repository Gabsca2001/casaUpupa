document.addEventListener("DOMContentLoaded", function () {
    const scrollContainer = document.querySelector(".scroll_container");
    let locoScroll = null; // Store the LocomotiveScroll instance
    let currentMode = null; // Track current mode (desktop or mobile)

    // Function to check if it's a desktop device
    function isDesktop() {
        return window.innerWidth > 768 && !isTouchDevice(); // Adjust the breakpoint as needed and add touch check
    }

    // Function to check if the device supports touch
    function isTouchDevice() {
        return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    }

    // Function to enable LocomotiveScroll (Desktop)
    function enableDesktopScroll() {
        if (!locoScroll) {
            locoScroll = new LocomotiveScroll({
                el: scrollContainer,
                smooth: true,
                direction: 'horizontal'
            });

            // Ensure native vertical scrolling is disabled
            scrollContainer.style.overflow = "hidden";

            // Add custom vertical-to-horizontal scrolling
            window.addEventListener("wheel", horizontalScroll, { passive: false });
        }
    }

    // Function to disable LocomotiveScroll (Mobile)
    function disableDesktopScroll() {
        if (locoScroll) {
            locoScroll.destroy();
            locoScroll = null; // Reset instance

            // Restore normal vertical scrolling
            scrollContainer.style.overflow = "auto"; 
            scrollContainer.style.transform = ''; // Reset any transform styles

            // Remove event listener for custom horizontal scrolling
            window.removeEventListener("wheel", horizontalScroll);
        }
    }

    // Function to handle vertical scroll → horizontal effect
    function horizontalScroll(event) {
        if (locoScroll) {
            const newScrollPosition = locoScroll.scroll.instance.scroll.x + event.deltaY;
            locoScroll.scrollTo(newScrollPosition, {
                duration: 0.8,
                disableLerp: false
            });
            event.preventDefault();
        }
    }

    // Function to handle touch scroll (for touch devices like iPad)
    function touchScroll(event) {
        if (locoScroll) {
            const newScrollPosition = locoScroll.scroll.instance.scroll.x + event.touches[0].clientY;
            locoScroll.scrollTo(newScrollPosition, {
                duration: 0.8,
                disableLerp: false
            });
            event.preventDefault();
        }
    }

    // Function to handle resizing
    function handleResize() {
        if (isDesktop() && currentMode !== "desktop") {
            enableDesktopScroll();
            currentMode = "desktop";
        } else if (!isDesktop() && currentMode !== "mobile") {
            disableDesktopScroll();
            currentMode = "mobile";
        }
    }

    // Initialize on page load
    handleResize();

    // Listen for window resize events
    window.addEventListener('resize', handleResize);

    // Add touch event listener for touch devices
    if (isTouchDevice()) {
        scrollContainer.addEventListener("touchmove", touchScroll, { passive: false });
    }
});
