// --- GAME STATE VARIABLES ---
let gameOver = false;
let isAnimating = false; // Prevents clicking during animations
const totalCards = 21;
const cards = Array.from({ length: totalCards }, (_, i) => `${i + 1}%282%29.png`);
let remainingCards = [...cards];
let currentPair = [remainingCards[0], remainingCards[1]];

// --- DOM ELEMENT REFERENCES ---
const card1El = document.getElementById("card1");
const card2El = document.getElementById("card2");
const progressBar = document.getElementById("progressBar");
const instructions = document.getElementById("instructions");
const revealMessage = document.getElementById("reveal");
const endGameButtons = document.getElementById("endGameButtons");
const playAgainBtn = document.getElementById("play-again");

// --- FUNCTIONS ---
function updateProgressBar() {
    const cardsPlayed = totalCards - remainingCards.length;
    const progressPercent = (cardsPlayed / (totalCards - 1)) * 100;
    progressBar.style.width = `${progressPercent}%`;
}

function showPair() {
    card1El.src = `cards/${currentPair[0]}`;
    card2El.src = `cards/${currentPair[1]}`;
}

function chooseCard(chosenIndex) {
    if (gameOver || isAnimating) return;
    isAnimating = true;

    const chosenCardEl = chosenIndex === 0 ? card1El : card2El;
    const discardedCardEl = chosenIndex === 0 ? card2El : card1El;

    chosenCardEl.classList.add("card-chosen");
    discardedCardEl.classList.add("card-discarded");

    setTimeout(() => {
        const chosen = currentPair[chosenIndex];
        const nextCard = remainingCards.find(c => !currentPair.includes(c));
        remainingCards = remainingCards.filter(c => c === chosen || !currentPair.includes(c));

        updateProgressBar();

        chosenCardEl.classList.remove("card-chosen");
        discardedCardEl.classList.remove("card-discarded");

        if (!nextCard) {
            gameOver = true;
            const finalFront = chosen.replace("%282%29.png", "%281%29.png");
            card1El.src = `cards/${finalFront}`;
            card1El.classList.add("final-card");
            card2El.style.display = "none";
            instructions.style.display = "none";
            revealMessage.style.display = "block";
            endGameButtons.style.display = "flex";
        } else {
            currentPair[chosenIndex] = chosen;
            currentPair[1 - chosenIndex] = nextCard;

            discardedCardEl.classList.add('card-fade-in');
            showPair();

            setTimeout(() => {
                discardedCardEl.classList.remove('card-fade-in');
                isAnimating = false;
            }, 400);
        }
    }, 500);
}

function resetGame() {
    gameOver = false;
    isAnimating = false;
    remainingCards = [...cards];
    currentPair = [remainingCards[0], remainingCards[1]];

    card1El.style.display = "block";
    card2El.style.display = "block";
    card1El.classList.remove("final-card");
    revealMessage.style.display = "none";
    endGameButtons.style.display = "none";
    instructions.style.display = "block";

    updateProgressBar();
    showPair();
}

// --- EVENT LISTENERS ---
card1El.addEventListener("click", () => chooseCard(0));
card2El.addEventListener("click", () => chooseCard(1));
playAgainBtn.addEventListener("click", resetGame);

// --- INITIALIZE GAME ---
updateProgressBar();
showPair();