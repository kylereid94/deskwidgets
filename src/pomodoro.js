// Select elements
const focusInput = document.getElementById("focusduration");
const shortBreakInput = document.getElementById("shortduration");
const longBreakInput = document.getElementById("longduration");
const repCountInput = document.getElementById("repcount");
const timerDial = document.getElementById("timerdial");
const timerTime = document.getElementById("timertime");
const timerButton = document.getElementById("timerbutton");

// Variables
let timerInterval = null;
let isPaused = false;
let currentRep = 1;
let isFocus = true; // Tracks whether it's a focus or break session
let remainingTime = 0;

// Helper function to convert minutes to seconds
function minutesToSeconds(minutes) {
  return minutes * 60;
}

// Helper function to format time as MM:SS
function formatTime(seconds) {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
}

// Update radial progress bar
function updateRadialProgress(totalTime, elapsedTime) {
  const progress = (elapsedTime / totalTime) * 100;
  timerDial.setAttribute("style", `--value:${progress}`);
}

// Start the timer
function startTimer(duration) {
  let totalTime = duration; // Save the original duration
  remainingTime = duration;

  timerInterval = setInterval(() => {
    if (!isPaused) {
      remainingTime -= 1;
      timerTime.textContent = formatTime(remainingTime);
      updateRadialProgress(totalTime, totalTime - remainingTime);

      if (remainingTime <= 0) {
        clearInterval(timerInterval);
        switchToNextTimer();
      }
    }
  }, 1000);
}

// Switch to the next timer based on the pattern
function switchToNextTimer() {
  if (isFocus) {
    if (currentRep === parseInt(repCountInput.value)) {
      // Final rep, switch to long break
      startTimer(minutesToSeconds(parseInt(longBreakInput.value)));
    } else {
      // Switch to short break
      startTimer(minutesToSeconds(parseInt(shortBreakInput.value)));
    }
    isFocus = false;
  } else {
    // Return to focus session
    currentRep++;
    if (currentRep > parseInt(repCountInput.value)) {
      resetTimer(); // Reset the timer if all reps are completed
      return;
    }
    startTimer(minutesToSeconds(parseInt(focusInput.value)));
    isFocus = true;
  }
}

// Reset the timer
function resetTimer() {
  clearInterval(timerInterval);
  timerInterval = null;
  currentRep = 1;
  isFocus = true;
  remainingTime = 0;
  timerButton.textContent = "Start";
  timerTime.textContent = "00:00";
  updateRadialProgress(1, 0);
}

// Button click handler
timerButton.addEventListener("click", () => {
  if (timerButton.textContent === "Start") {
    // Start the timer
    const focusDuration = parseInt(focusInput.value);
    if (isNaN(focusDuration) || focusDuration <= 0) {
      alert("Please enter a valid focus duration.");
      return;
    }
    startTimer(minutesToSeconds(focusDuration));
    timerButton.textContent = "Pause";
  } else if (timerButton.textContent === "Pause") {
    // Pause the timer
    isPaused = true;
    timerButton.textContent = "Resume";
  } else if (timerButton.textContent === "Resume") {
    // Resume the timer
    isPaused = false;
    timerButton.textContent = "Pause";
  }
});
