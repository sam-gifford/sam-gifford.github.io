// This script handles the fade-out transition on the index page play button.
const playBtn = document.querySelector('.play-btn');

if (playBtn) {
    playBtn.addEventListener('click', function(e) {
        e.preventDefault(); // Prevent the link from navigating immediately
        document.body.classList.add('fade-out'); // Add the fade-out class to the body

        // Wait for the animation to finish (500ms), then change the page
        setTimeout(() => {
            window.location.href = this.href;
        }, 500); 
    });
}
// --- INTERACTIVE ARCHETYPE MODAL ---

// 1. Get references to all the necessary elements
const archetypeCards = document.querySelectorAll('.archetype-card');
const modal = document.getElementById('archetypeModal');
const modalOverlay = document.querySelector('.modal-overlay');
const modalCloseBtn = document.querySelector('.modal-close');
const modalImage = document.getElementById('modalImage');
const modalTitle = document.getElementById('modalTitle');
const modalDescription = document.getElementById('modalDescription');

// 2. Placeholder descriptions for each card.
// IMPORTANT: You will need to replace these with the real descriptions for each superpower.
const archetypeDescriptions = [
];

// 3. Add a click listener to every archetype card
archetypeCards.forEach((card, index) => {
    card.addEventListener('click', () => {
        // Get the image and title from the clicked card
        const imageSrc = card.querySelector('img').src;
        const titleText = card.querySelector('h3').textContent;

        // Populate the modal with the card's data
        modalImage.src = imageSrc;
        modalTitle.textContent = titleText;
        modalDescription.textContent = archetypeDescriptions[index]; // Use the description from our array

        // Show the modal
        modal.classList.add('is-visible');
    });
});

// 4. Function to close the modal
function closeModal() {
    modal.classList.remove('is-visible');
}

// 5. Add event listeners to close the modal
modalCloseBtn.addEventListener('click', closeModal);
modalOverlay.addEventListener('click', closeModal);

// Optional: Also close the modal when the 'Escape' key is pressed
document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
        closeModal();
    }
});
// --- PRELOADER SCRIPT ---

window.addEventListener('load', () => {
    const preloader = document.querySelector('.preloader');
    if (preloader) {
        preloader.classList.add('is-hidden');
    }
});
// --- BACK TO TOP BUTTON SCRIPT ---

const backToTopBtn = document.querySelector('.back-to-top-btn');

window.addEventListener('scroll', () => {
    // Show the button if the user has scrolled down more than 400 pixels
    if (window.scrollY > 400) {
        if (backToTopBtn) {
            backToTopBtn.classList.add('is-visible');
        }
    } else {
        if (backToTopBtn) {
            backToTopBtn.classList.remove('is-visible');
        }
    }
});