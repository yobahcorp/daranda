function displayCards() {
    let cards = document.querySelectorAll('.card-container');

    const observerCallback = (entries, observer) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                // Get this card's index among siblings for staggered delay
                const parent = entry.target.closest('.row, .section-container');
                const siblings = parent
                    ? Array.from(parent.querySelectorAll('.card-container'))
                    : [entry.target];
                const index = siblings.indexOf(entry.target);

                setTimeout(() => {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }, index * 120);
            }
        });
    };

    const observer = new IntersectionObserver(observerCallback, {
        root: null,
        threshold: 0.15
    });

    cards.forEach(card => {
        observer.observe(card);
    });
}

window.onload = () => {
    displayCards();
};
