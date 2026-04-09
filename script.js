const beforeAudio = new Audio("audio/song1-before.mp3");
const afterAudio = new Audio("audio/song1-after.mp3");

const playPauseBtn = document.getElementById("playPauseBtn");
const beforeBtn = document.getElementById("beforeBtn");
const afterBtn = document.getElementById("afterBtn");
const seekBar = document.getElementById("seekBar");
const currentTimeEl = document.getElementById("currentTime");
const durationEl = document.getElementById("duration");

let activeAudio = beforeAudio;
let isSwitching = false;

beforeAudio.preload = "metadata";
afterAudio.preload = "metadata";

function formatTime(time) {
  if (isNaN(time)) return "0:00";
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60).toString().padStart(2, "0");
  return `${minutes}:${seconds}`;
}

function syncAudioPosition(fromAudio, toAudio) {
  isSwitching = true;

  const wasPlaying = !fromAudio.paused;
  const currentTime = fromAudio.currentTime;

  fromAudio.pause();
  toAudio.currentTime = currentTime;

  if (wasPlaying) {
    toAudio.play();
    playPauseBtn.textContent = "❚❚";
  } else {
    playPauseBtn.textContent = "▶";
  }

  activeAudio = toAudio;
  updateProgress();

  beforeBtn.classList.toggle("active", activeAudio === beforeAudio);
  afterBtn.classList.toggle("active", activeAudio === afterAudio);

  isSwitching = false;
}

function updateProgress() {
  if (!activeAudio.duration) return;

  const progress = (activeAudio.currentTime / activeAudio.duration) * 100;
  seekBar.value = progress;
  currentTimeEl.textContent = formatTime(activeAudio.currentTime);
  durationEl.textContent = formatTime(activeAudio.duration);
}

playPauseBtn.addEventListener("click", () => {
  if (activeAudio.paused) {
    activeAudio.play();
    playPauseBtn.textContent = "❚❚";
  } else {
    activeAudio.pause();
    playPauseBtn.textContent = "▶";
  }
});

beforeBtn.addEventListener("click", () => {
  if (activeAudio !== beforeAudio) {
    syncAudioPosition(activeAudio, beforeAudio);
  }
});

afterBtn.addEventListener("click", () => {
  if (activeAudio !== afterAudio) {
    syncAudioPosition(activeAudio, afterAudio);
  }
});

seekBar.addEventListener("input", () => {
  if (!activeAudio.duration) return;

  const newTime = (seekBar.value / 100) * activeAudio.duration;
  beforeAudio.currentTime = newTime;
  afterAudio.currentTime = newTime;

  updateProgress();
});

beforeAudio.addEventListener("timeupdate", () => {
  if (activeAudio === beforeAudio && !isSwitching) {
    updateProgress();
  }
});

afterAudio.addEventListener("timeupdate", () => {
  if (activeAudio === afterAudio && !isSwitching) {
    updateProgress();
  }
});
