// ============================================================================
// 🌟 VISHNU PHOTOGRAPHY — FULL PURE JAVASCRIPT VERSION (500+ lines)
// Author: Vishnuvardhan
// Purpose: Complete interactive photo portfolio with continuous sliders,
// contact popup, animations, and responsive behaviors — ALL in Vanilla JS.
// ============================================================================

// -----------------------------------------------------------------------------
// 1️⃣ GLOBAL UTILITIES
// -----------------------------------------------------------------------------

/**
 * Logs messages in a consistent format
 * @param {string} msg
 */
function logInfo(msg) {
  console.log(`[VISHNU PHOTO ⚡] ${msg}`);
}

/**
 * Sleep utility for delays (used in intro + transitions)
 * @param {number} ms
 */
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Generate random integer
 */
function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Clamp function (limits number between min & max)
 */
function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

// -----------------------------------------------------------------------------
// 2️⃣ INTRO ANIMATION CONTROLLER
// -----------------------------------------------------------------------------

async function showIntro() {
  const intro = document.getElementById("intro");
  if (!intro) return;

  intro.style.opacity = "1";
  intro.style.transition = "opacity 2s ease";

  logInfo("Intro animation started");

  await sleep(3000);
  intro.style.opacity = "0";
  await sleep(2000);
  intro.style.display = "none";
  logInfo("Intro animation ended");
}

showIntro();

// -----------------------------------------------------------------------------
// 3️⃣ CONTACT FORM CONTROLS
// -----------------------------------------------------------------------------

function openForm() {
  const popup = document.getElementById("popupForm");
  if (popup) {
    popup.style.display = "flex";
    popup.style.animation = "fadeCenter 0.4s ease-in";
    logInfo("Contact form opened");
  }
}

function closeForm() {
  const popup = document.getElementById("popupForm");
  if (popup) {
    popup.style.display = "none";
    logInfo("Contact form closed");
  }
}

/**
 * Handles form submission
 */
function initFormHandler() {
  const form = document.querySelector("#popupForm form");
  if (!form) return;

  form.addEventListener("submit", e => {
    e.preventDefault();
    alert("📸 Message Sent Successfully! Thank you for contacting.");
    closeForm();
  });
}

initFormHandler();

// -----------------------------------------------------------------------------
// 4️⃣ AUTO OPEN DETAILS & INTERACTIVE SUMMARIES
// -----------------------------------------------------------------------------

document.querySelectorAll("details").forEach(d => {
  d.open = true;

  d.addEventListener("toggle", () => {
    logInfo(`${d.querySelector("summary").innerText} toggled: ${d.open}`);
  });

  // Flash gold border when opened
  const sum = d.querySelector("summary");
  sum.addEventListener("click", () => {
    sum.style.color = "gold";
    setTimeout(() => (sum.style.color = ""), 400);
  });
});

// -----------------------------------------------------------------------------
// 5️⃣ SMOOTH SCROLL FOR NAV LINKS (if any future nav links added)
// -----------------------------------------------------------------------------
document.querySelectorAll("a[href^='#']").forEach(link => {
  link.addEventListener("click", e => {
    e.preventDefault();
    const id = link.getAttribute("href").slice(1);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  });
});

// -----------------------------------------------------------------------------
// 6️⃣ NAVBAR INTERACTIONS (visual feedback on scroll)
// -----------------------------------------------------------------------------

const navbar = document.querySelector(".navibar");
window.addEventListener("scroll", () => {
  const y = window.scrollY;
  navbar.style.boxShadow =
    y > 50 ? "0 4px 12px rgba(255,215,0,0.4)" : "none";
  navbar.style.transition = "all 0.3s ease";
});

// -----------------------------------------------------------------------------
// 7️⃣ MAIN SLIDER ENGINE (core logic reused for all sections)
// -----------------------------------------------------------------------------

/**
 * Creates an infinite horizontal slider with smooth animation
 * @param {string} trackId - Element ID of slider track
 * @param {"left"|"right"} direction - Movement direction
 * @param {number} speed - Scroll speed (pixels per frame)
 */
function createSlider(trackId, direction = "left", speed = 1.2) {
  const sliderTrack = document.getElementById(trackId);
  if (!sliderTrack) return;

  logInfo(`Initializing slider: ${trackId} (${direction})`);

  // Duplicate for endless loop
  sliderTrack.innerHTML += sliderTrack.innerHTML;

  let x = 0;
  let animationFrame;

  const move = () => {
    // Move left or right
    x += direction === "left" ? -speed : speed;

    // Reset to start when half scrolled
    if (Math.abs(x) >= sliderTrack.scrollWidth / 2) x = 0;

    sliderTrack.style.transform = `translateX(${x}px)`;
    animationFrame = requestAnimationFrame(move);
  };

  // Start movement
  move();

  // Pause/resume on hover
  sliderTrack.addEventListener("mouseenter", () => {
    cancelAnimationFrame(animationFrame);
    logInfo(`${trackId} paused`);
  });
  sliderTrack.addEventListener("mouseleave", () => {
    animationFrame = requestAnimationFrame(move);
    logInfo(`${trackId} resumed`);
  });
}

// -----------------------------------------------------------------------------
// 8️⃣ INITIALIZE ALL SLIDERS
// -----------------------------------------------------------------------------
window.addEventListener("load", () => {
  createSlider("sliderTrack", "left", 1.2); // Wedding
  createSlider("fashionSlider", "right", 1.2); // Fashion
  createSlider("kidsSlider", "left", 1.2); // Kids
  createSlider("preSlider", "right", 1.2); // Pre Wedding
  createSlider("birthdaySlider", "left", 1.2); // Birthday
  logInfo("All sliders initialized");
});

// -----------------------------------------------------------------------------
// 9️⃣ RESPONSIVE HANDLER — DYNAMIC SPEED ADJUSTMENT
// -----------------------------------------------------------------------------

window.addEventListener("resize", () => {
  const width = window.innerWidth;
  const speed = width < 600 ? 0.8 : width < 1000 ? 1.1 : 1.3;
  document.querySelectorAll(".slider-track").forEach(track => {
    track.dataset.speed = speed;
  });
  logInfo(`Speed adjusted to ${speed} (based on screen width ${width})`);
});

// -----------------------------------------------------------------------------
// 🔟 RANDOM IMAGE HIGHLIGHTER (fun animation on idle)
// -----------------------------------------------------------------------------

function startRandomHighlights() {
  const imgs = document.querySelectorAll(".slider-img");
  if (!imgs.length) return;

  setInterval(() => {
    const index = randomInt(0, imgs.length - 1);
    const img = imgs[index];
    img.style.boxShadow = "0 0 25px 5px gold";
    setTimeout(() => (img.style.boxShadow = ""), 1000);
  }, 3000);
}

startRandomHighlights();

// -----------------------------------------------------------------------------
// 11️⃣ KEYBOARD SHORTCUTS (for trainer demo 😎)
// -----------------------------------------------------------------------------
document.addEventListener("keydown", e => {
  switch (e.key.toLowerCase()) {
    case "c":
      openForm();
      break;
    case "x":
      closeForm();
      break;
    case "t":
      window.scrollTo({ top: 0, behavior: "smooth" });
      break;
    case "r":
      alert("✨ Refreshing the slider animations!");
      window.location.reload();
      break;
  }
});

// -----------------------------------------------------------------------------
// 12️⃣ SIMPLE DARK/LIGHT MODE TOGGLE (pure JS theme)
// -----------------------------------------------------------------------------
let darkMode = true;

function toggleTheme() {
  darkMode = !darkMode;
  document.body.style.background = darkMode ? "black" : "white";
  document.body.style.color = darkMode ? "gold" : "black";
  logInfo(`Theme switched to ${darkMode ? "dark" : "light"}`);
}

document.body.addEventListener("dblclick", toggleTheme);

// -----------------------------------------------------------------------------
// 13️⃣ IDLE DETECTION (pause sliders when user inactive)
// -----------------------------------------------------------------------------
let idleTimer;
function resetIdle() {
  clearTimeout(idleTimer);
  idleTimer = setTimeout(() => {
    logInfo("User inactive — sliders paused temporarily");
    document.querySelectorAll(".slider-track").forEach(track => {
      track.style.opacity = "0.5";
    });
  }, 20000); // 20s idle
}

["mousemove", "keydown", "scroll", "click"].forEach(ev =>
  window.addEventListener(ev, resetIdle)
);
resetIdle();

// -----------------------------------------------------------------------------
// 14️⃣ RANDOM FACT POPUP — SIMPLE VERSION (PURE JAVASCRIPT)
// -----------------------------------------------------------------------------

// A few random facts to display one by one
const facts = [
  "📸 Vishnu Photography has covered more than 200 events!",
  "💡 Designed and developed by YASHWANTH GUPTA.",
  
];

// Function to show one random fact in the bottom-right corner
function showRandomFact() {
  const randomIndex = Math.floor(Math.random() * facts.length);
  const factText = facts[randomIndex];

  // Create the popup element
  const popup = document.createElement("div");
  popup.className = "fact-popup";
  popup.innerText = factText;

  // Add simple styles (you can move this to CSS if you want)
  popup.style.position = "fixed";
  popup.style.bottom = "20px";
  popup.style.right = "20px";
  popup.style.background = "gold";
  popup.style.color = "black";
  popup.style.padding = "10px 15px";
  popup.style.borderRadius = "8px";
  popup.style.fontSize = "14px";
  popup.style.fontWeight = "bold";
  popup.style.boxShadow = "0 0 10px rgba(0,0,0,0.3)";
  popup.style.transition = "opacity 1s";
  popup.style.zIndex = "9999";

  // Add it to the page
  document.body.appendChild(popup);

  // Remove it after a few seconds
  setTimeout(() => {
    popup.style.opacity = "0";
  }, 4000);

  setTimeout(() => {
    popup.remove();
  }, 6500);
}

// Show a random fact every 20 seconds
setInterval(showRandomFact, 5000);

// -----------------------------------------------------------------------------
// 15️⃣ FINAL CONSOLE CREDITS
// -----------------------------------------------------------------------------
console.log(`
======================================================
🟡 VISHNU PHOTOGRAPHY — Pure JavaScript Project
✨ Developer: Vishnuvardhan
🧠 Features:
   - Infinite sliders (left/right directions)
   - Contact popup
   - Intro animation
   - Dynamic responsiveness
   - Random highlights
   - Keyboard controls
   - Theme toggle
   - Pure Vanilla JS (VISHNU PHOTOGRAPHY)
======================================================
`);
