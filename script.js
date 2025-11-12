// ============================================================================
// 🌟 VISHNU PHOTOGRAPHY — PURE JAVASCRIPT PORTFOLIO
// Author: Vishnuvardhan
// Description: Fully interactive photography showcase using only Vanilla JS.
// Features: Sliders, Popup, Animations, Theme Toggle, Keyboard Shortcuts.
// ============================================================================

// -----------------------------------------------------------------------------
// 1️⃣ GLOBAL UTILITIES
// -----------------------------------------------------------------------------
function logInfo(msg) {
  console.log(`[VISHNU PHOTO ⚡] ${msg}`);
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

// -----------------------------------------------------------------------------
// 2️⃣ INTRO ANIMATION CONTROLLER (Smooth Fade Out)
// -----------------------------------------------------------------------------
window.addEventListener("load", () => {
  setTimeout(() => {
    const intro = document.getElementById("intro");
    if (intro) {
      intro.style.transition = "opacity 0.5s ease";
      intro.style.opacity = "0";
      setTimeout(() => (intro.style.display = "none"), 500);
      logInfo("Intro animation completed");
    }
  }, 3000);
});
// ============================================================================
// 🌟 CONTACT POPUP + SLIDERS (Final Polished Version)
// Author: Vishnuvardhan
// ============================================================================

// Global log helper (safe in production)
function logInfo(msg) {
  if (typeof console !== "undefined") console.log(`[VISHNU ⚡] ${msg}`);
}
// -----------------------------------------------------------------------------
// CONTACT FORM POPUP — Google Form Version (Unlimited open/close)
// -----------------------------------------------------------------------------
function openForm() {
  const popup = document.getElementById("popupForm");
  if (!popup) return;

  // Reset any previous transition states
  popup.style.display = "flex";
  popup.style.opacity = "0";
  popup.style.transition = "opacity 0.3s ease";

  // Trigger reflow (forces browser to apply display before opacity)
  void popup.offsetWidth;

  popup.style.opacity = "1";

  // Pause sliders while open
  document.querySelectorAll(".slider-track").forEach(track => {
    track.style.animationPlayState = "paused";
  });

  console.log("📸 Contact form opened");
}

function closeForm() {
  const popup = document.getElementById("popupForm");
  if (!popup) return;

  popup.style.opacity = "0";
  popup.style.transition = "opacity 0.3s ease";

  // Wait for fade-out before hiding
  setTimeout(() => {
    popup.style.display = "none";
  }, 300);

  // Resume sliders when closed
  document.querySelectorAll(".slider-track").forEach(track => {
    track.style.animationPlayState = "running";
  });

  console.log("📩 Contact form closed");
}

// Close popup when clicking outside the box
document.addEventListener("click", e => {
  const popup = document.getElementById("popupForm");
  if (popup && e.target === popup && popup.style.display === "flex") {
    closeForm();
  }
});

// Close with Esc key
document.addEventListener("keydown", e => {
  if (e.key === "Escape") closeForm();
});

// Auto close after Google Form click
document.addEventListener("DOMContentLoaded", () => {
  const googleFormLink = document.getElementById("googleFormLink");
  if (googleFormLink) {
    googleFormLink.addEventListener("click", () => {
      setTimeout(closeForm, 200);
    });
  }
});

// -----------------------------------------------------------------------------
// 4️⃣ AUTO OPEN DETAILS + INTERACTIVE SUMMARIES
// -----------------------------------------------------------------------------
document.querySelectorAll("details").forEach(details => {
  details.open = true;

  details.addEventListener("toggle", () => {
    logInfo(`${details.querySelector("summary").innerText} toggled: ${details.open}`);
  });

  const summary = details.querySelector("summary");
  summary.addEventListener("click", () => {
    summary.style.color = "gold";
    setTimeout(() => (summary.style.color = ""), 400);
  });
});

// -----------------------------------------------------------------------------
// 5️⃣ SMOOTH SCROLL FOR NAV LINKS
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
// 6️⃣ NAVBAR SCROLL EFFECT
// -----------------------------------------------------------------------------
const navbar = document.querySelector(".navibar");
window.addEventListener("scroll", () => {
  const y = window.scrollY;
  navbar.style.boxShadow = y > 50 ? "0 4px 12px rgba(255,215,0,0.4)" : "none";
  navbar.style.transition = "all 0.3s ease";
});

// -----------------------------------------------------------------------------
// 7️⃣ MAIN SLIDER ENGINE (Reusable + Safe)
// -----------------------------------------------------------------------------
const initializedSliders = new Set();

function createSlider(trackId, direction = "left", speed = 1.2) {
  if (initializedSliders.has(trackId)) return;
  initializedSliders.add(trackId);

  const sliderTrack = document.getElementById(trackId);
  if (!sliderTrack) return;

  logInfo(`Initializing slider: ${trackId} (${direction})`);
  sliderTrack.innerHTML += sliderTrack.innerHTML;

  let x = 0;
  let animationFrame;

  function move() {
    x += direction === "left" ? -speed : speed;
    if (Math.abs(x) >= sliderTrack.scrollWidth / 2) x = 0;
    sliderTrack.style.transform = `translateX(${x}px)`;
    animationFrame = requestAnimationFrame(move);
  }

  move();

  // Hover pause/resume
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
// 9️⃣ RESPONSIVE HANDLER — SPEED ADJUSTMENT
// -----------------------------------------------------------------------------
window.addEventListener("resize", () => {
  const width = window.innerWidth;
  const speed = width < 600 ? 0.8 : width < 1000 ? 1.1 : 1.3;
  document.querySelectorAll(".slider-track").forEach(track => {
    track.dataset.speed = speed;
  });
  logInfo(`Speed adjusted to ${speed} (width: ${width}px)`);
});

// -----------------------------------------------------------------------------
// 🔟 RANDOM IMAGE HIGHLIGHTER (Fun Glow Effect)
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
// 11️⃣ KEYBOARD SHORTCUTS
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
// 12️⃣ DARK/LIGHT MODE TOGGLE (Smooth Transition)
// -----------------------------------------------------------------------------
let darkMode = true;
function toggleTheme() {
  darkMode = !darkMode;
  document.body.style.transition = "background 0.4s, color 0.4s";
  document.body.style.background = darkMode ? "black" : "white";
  document.body.style.color = darkMode ? "gold" : "black";
  logInfo(`Theme switched to ${darkMode ? "Dark" : "Light"}`);
}
document.body.addEventListener("dblclick", toggleTheme);

// -----------------------------------------------------------------------------
// 13️⃣ IDLE DETECTION (Auto Dim + Resume)
// -----------------------------------------------------------------------------
let idleTimer;
function resetIdle() {
  clearTimeout(idleTimer);
  document.querySelectorAll(".slider-track").forEach(track => {
    track.style.opacity = "1"; // restore when active
  });
  idleTimer = setTimeout(() => {
    logInfo("User inactive — sliders dimmed");
    document.querySelectorAll(".slider-track").forEach(track => {
      track.style.opacity = "0.5";
    });
  }, 20000);
}
["mousemove", "keydown", "scroll", "click"].forEach(ev =>
  window.addEventListener(ev, resetIdle)
);
resetIdle();

// -----------------------------------------------------------------------------
// 14️⃣ RANDOM FACT POPUP (Clean Version)
// -----------------------------------------------------------------------------
const facts = [
  "📸 Vishnu Photography has covered more than 200 events!",
  "💡 Designed and developed by Yashwanth Gupta."
];

function showRandomFact() {
  const randomIndex = Math.floor(Math.random() * facts.length);
  const factText = facts[randomIndex];

  const popup = document.createElement("div");
  popup.className = "fact-popup";
  popup.innerText = factText;

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

  document.body.appendChild(popup);

  setTimeout(() => (popup.style.opacity = "0"), 4000);
  setTimeout(() => popup.remove(), 6000);
}
setInterval(showRandomFact, 20000);

// -----------------------------------------------------------------------------
// 15️⃣ FINAL CONSOLE CREDITS
// -----------------------------------------------------------------------------
console.log(`
======================================================
🟡 VISHNU PHOTOGRAPHY — Pure JavaScript Project
✨ Developer: Vishnuvardhan
🧠 Features:
   - Infinite sliders (left/right directions)
   - Contact popup with smooth fade
   - Intro animation
   - Responsive dynamic speed
   - Random highlights
   - Idle detection with resume
   - Theme toggle (double-click)
   - Keyboard controls
======================================================
`);
