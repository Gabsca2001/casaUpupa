document.addEventListener("DOMContentLoaded", () => {
    const navbar = document.querySelector(".navbar_1");

    window.addEventListener("scroll", () => {
        if (window.scrollY > 50) {
            navbar.classList.add("black");
            //change img
            document.getElementById("logo").src = "./assets/images/logo_dark.png";
        } else {
            navbar.classList.remove("black");
            //change img
            document.getElementById("logo").src = "./assets/images/logo_light.png";
        }
    });
});
