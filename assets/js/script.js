
document.addEventListener("DOMContentLoaded", function () {
    const burger = document.querySelector(".burger");
    const menu = document.querySelector(".menu");
    const logo = document.querySelector(".logo");
    const menuLinks = document.querySelectorAll(".menu ul li a");
    const body = document.body;

    burger.addEventListener("click", () => {
        const isActive = menu.classList.toggle("active");
        burger.classList.toggle("active");
        logo.classList.toggle("active");


        if (isActive) {
            body.style.overflow = "hidden";
        }
        else {
            body.style.overflow = "";
        }
    });

    // Close menu when clicking a link
    menuLinks.forEach(link => {
        link.addEventListener("click", () => {
            menu.classList.remove("active");
            burger.classList.remove("active");
            logo.classList.remove("active");
        });
    });
});
