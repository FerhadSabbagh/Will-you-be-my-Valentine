// Elements
const envelope = document.getElementById("envelope-container");
const letter = document.getElementById("letter-container");
const noBtn = document.querySelector(".no-btn");
const yesBtn = document.querySelector(".yes-btn");

const title = document.getElementById("letter-title");
const catImg = document.getElementById("letter-cat");
const buttons = document.getElementById("letter-buttons");
const finalText = document.getElementById("final-text");

// Click Envelope
envelope.addEventListener("click", () => {
    envelope.style.display = "none";
    letter.style.display = "flex";

    // Small delay for the pop-up animation
    setTimeout(() => {
        document.querySelector(".letter-window").classList.add("open");
    }, 50);
});

// Logic to move the NO btn
// Only move if not on mobile (hover) or on click/touch for both
const moveNoButton = (e) => {
    // Determine screen boundaries with safety margin
    const padding = 20; // 20px padding from edges
    const maxX = window.innerWidth - noBtn.offsetWidth - padding;
    const maxY = window.innerHeight - noBtn.offsetHeight - padding;

    // Generate random position
    const randomX = Math.random() * maxX;
    const randomY = Math.random() * maxY;

    // Make sure button is direct child of body so it can floats freely over everything
    // (escapes the transform context of the letter-window)
    if (noBtn.parentNode !== document.body) {
        document.body.appendChild(noBtn);
    }

    // Apply new position fixed to screen to ensure it never disappears
    noBtn.style.position = "fixed";
    noBtn.style.left = Math.max(padding, randomX) + "px";
    noBtn.style.top = Math.max(padding, randomY) + "px";
};

// Add events for both desktop (mouseover) and mobile (touchstart)
noBtn.addEventListener("mouseover", moveNoButton);
noBtn.addEventListener("click", (e) => {
    e.preventDefault(); // Prevent clicking
    moveNoButton();
});


// YES is clicked
yesBtn.addEventListener("click", () => {
    title.textContent = "Yayyy Vian!! ❤️";

    catImg.src = "cat_dance.gif";

    document.querySelector(".letter-window").classList.add("final");

    buttons.style.display = "none";
    noBtn.style.display = "none";
    finalText.style.display = "block";

    // Trigger Confetti
    fireConfetti();
});


function fireConfetti() {
    const duration = 15 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    function randomInRange(min, max) {
        return Math.random() * (max - min) + min;
    }

    const interval = setInterval(function () {
        const timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
            return clearInterval(interval);
        }

        const particleCount = 50 * (timeLeft / duration);
        // since particles fall down, start a bit higher than random
        confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } }));
        confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } }));
    }, 250);
}

// Background Floating Hearts Effect
function createFloatingHeart() {
    const heart = document.createElement("div");
    heart.innerHTML = "❤️";
    heart.style.position = "fixed";
    heart.style.left = Math.random() * 100 + "vw";
    heart.style.bottom = "-10px";
    heart.style.fontSize = Math.random() * 20 + 10 + "px";
    heart.style.opacity = Math.random() * 0.5 + 0.3;
    heart.style.animation = `floatUp ${Math.random() * 3 + 4}s linear`;
    heart.style.zIndex = "-1"; // Behind everything

    document.getElementById("hearts-bg").appendChild(heart);

    setTimeout(() => {
        heart.remove();
    }, 8000);
}

// Spawn a heart every 300ms
setInterval(createFloatingHeart, 300);
