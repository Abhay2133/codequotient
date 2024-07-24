const $ = (q) => document.querySelector(q);

const timer = $("#time");

const b_reset_lap = $("#reset-lap-btn");
const b_start_stop = $("#start-stop-btn");
const div_laps = $("#laps");

const createLap = (label, time) =>
  `<div class="lap"><div class="lap-label">${label}</div><div class="lap-time">${time}</div></div>`;

var isTimerRunning = false;
var isPaused = false;

var inLapMode = false;
var initTime;
var timerID;

function markLap() {}

b_start_stop.onclick = () => {
  if (isTimerRunning) {
    stopTimer();
  } else {
    startTimer();
    isTimerRunning = true;
  }
  //isTimerRunning != isTimerRunning;
};

b_reset_lap.onclick = () => {
  if (inLapMode) {
    div_laps.innerHTML =
      createLap("LAP " + (div_laps.children.length || 1), timer.textContent) +
      div_laps.innerHTML;
  } else {
    // in reset mode
    reset();
  }
};

function reset() {
  timer.textContent = "00 : 00 : 00";
  div_laps.innerHTML = "";
  b_start_stop.setAttribute("data-mode", "start");
  b_start_stop.textContent = "START";
  isTimerRunning = false;
  isPaused = false;
}

function startTimer() {
  initTime = Date.now();
  startTicking();
  b_start_stop.textContent = "STOP";
  b_reset_lap.textContent = "LAP";

  inLapMode = true;
  b_start_stop.setAttribute("data-mode", "stop"); // for ui update
}

function startTicking() {
  timerID = setInterval(() => {
    let secs = Date.now() - initTime;
    let timeStr = parseTime(secs);
    timer.textContent = timeStr;
  }, 0);
}

var stoppedAt;
function stopTimer() {
  //clearInterval(timerID);

  if (isPaused) {
    // timer is paused
    let timeElased = Date.now() - stoppedAt;
    initTime += timeElased;
    startTicking();
    b_reset_lap.textContent = "LAP";
    inLapMode = true;
    isPaused = false;
    
  } else {
    // timer is ticking
    clearInterval(timerID);
    b_reset_lap.textContent = "RESET";
    inLapMode = false;
    isPaused = true;
    stoppedAt = Date.now();
  }
}

function parseTime(milliseconds) {
  // Get minutes (avoiding floating point issues)
  const minutes = Math.floor(milliseconds / (1000 * 60));
  milliseconds -= minutes * (1000 * 60);

  // Get seconds
  const seconds = Math.floor(milliseconds / 1000);
  milliseconds -= seconds * 1000;

  // Get milliseconds
  const formattedMilliseconds = milliseconds.toString().padStart(3, "0");

  // Return formatted time string
  return `${minutes.toString().padStart(2, "0")} : ${seconds
    .toString()
    .padStart(2, "0")} : ${formattedMilliseconds.slice(0, 2)}`;
}
