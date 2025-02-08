const faqs = document.querySelectorAll(".single_faq");

faqs.forEach((faq) => {
    const question = faq.querySelector(".faq_question");
    const plus = faq.querySelector(".faq_plus");
    const answer = faq.querySelector(".faq_answer");

    question.addEventListener("click", () => {
        // Close all other FAQs
        document.querySelectorAll(".faq_answer").forEach((item) => {
            if (item !== answer) {
                item.classList.remove("active");
            }
        });

        document.querySelectorAll(".faq_plus").forEach((icon) => {
            if (icon !== plus) {
                icon.classList.remove("active");
            }
        });

        // Toggle the clicked FAQ
        plus.classList.toggle("active");
        answer.classList.toggle("active");
    });
});
