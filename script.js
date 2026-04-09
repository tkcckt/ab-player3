{\rtf1\ansi\ansicpg1252\cocoartf2822
\cocoatextscaling0\cocoaplatform0{\fonttbl\f0\fswiss\fcharset0 Helvetica;}
{\colortbl;\red255\green255\blue255;}
{\*\expandedcolortbl;;}
\paperw11900\paperh16840\margl1440\margr1440\vieww11520\viewh8400\viewkind0
\pard\tx566\tx1133\tx1700\tx2267\tx2834\tx3401\tx3968\tx4535\tx5102\tx5669\tx6236\tx6803\pardirnatural\partightenfactor0

\f0\fs24 \cf0 const beforeAudio = new Audio("audio/song1-before.mp3");\
const afterAudio = new Audio("audio/song1-after.mp3");\
\
const playPauseBtn = document.getElementById("playPauseBtn");\
const beforeBtn = document.getElementById("beforeBtn");\
const afterBtn = document.getElementById("afterBtn");\
const seekBar = document.getElementById("seekBar");\
const currentTimeEl = document.getElementById("currentTime");\
const durationEl = document.getElementById("duration");\
\
let activeAudio = beforeAudio;\
let isSwitching = false;\
\
beforeAudio.preload = "metadata";\
afterAudio.preload = "metadata";\
\
function formatTime(time) \{\
  if (isNaN(time)) return "0:00";\
  const minutes = Math.floor(time / 60);\
  const seconds = Math.floor(time % 60).toString().padStart(2, "0");\
  return `$\{minutes\}:$\{seconds\}`;\
\}\
\
function syncAudioPosition(fromAudio, toAudio) \{\
  isSwitching = true;\
\
  const wasPlaying = !fromAudio.paused;\
  const currentTime = fromAudio.currentTime;\
\
  fromAudio.pause();\
  toAudio.currentTime = currentTime;\
\
  if (wasPlaying) \{\
    toAudio.play();\
    playPauseBtn.textContent = "\uc0\u10074 \u10074 ";\
  \} else \{\
    playPauseBtn.textContent = "\uc0\u9654 ";\
  \}\
\
  activeAudio = toAudio;\
  updateProgress();\
  isSwitching = false;\
\}\
\
function updateProgress() \{\
  if (!activeAudio.duration) return;\
\
  const progress = (activeAudio.currentTime / activeAudio.duration) * 100;\
  seekBar.value = progress;\
  currentTimeEl.textContent = formatTime(activeAudio.currentTime);\
  durationEl.textContent = formatTime(activeAudio.duration);\
\}\
\
playPauseBtn.addEventListener("click", () => \{\
  if (activeAudio.paused) \{\
    activeAudio.play();\
    playPauseBtn.textContent = "\uc0\u10074 \u10074 ";\
  \} else \{\
    activeAudio.pause();\
    playPauseBtn.textContent = "\uc0\u9654 ";\
  \}\
\});\
\
beforeBtn.addEventListener("click", () => \{\
  if (activeAudio !== beforeAudio) \{\
    syncAudioPosition(activeAudio, beforeAudio);\
    beforeBtn.classList.add("active");\
    afterBtn.classList.remove("active");\
  \}\
\});\
\
afterBtn.addEventListener("click", () => \{\
  if (activeAudio !== afterAudio) \{\
    syncAudioPosition(activeAudio, afterAudio);\
    afterBtn.classList.add("active");\
    beforeBtn.classList.remove("active");\
  \}\
\});\
\
seekBar.addEventListener("input", () => \{\
  if (!activeAudio.duration) return;\
\
  const newTime = (seekBar.value / 100) * activeAudio.duration;\
  beforeAudio.currentTime = newTime;\
  afterAudio.currentTime = newTime;\
  updateProgress();\
\});\
\
beforeAudio.addEventListener("loadedmetadata", () => \{\
  if (activeAudio === beforeAudio) \{\
    durationEl.textContent = formatTime(beforeAudio.duration);\
  \}\
\});\
\
afterAudio.addEventListener("loadedmetadata", () => \{\
  if (activeAudio === afterAudio) \{\
    durationEl.textContent = formatTime(afterAudio.duration);\
  \}\
\});\
\
beforeAudio.addEventListener("timeupdate", () => \{\
  if (activeAudio === beforeAudio && !isSwitching) \{\
    updateProgress();\
  \}\
\});\
\
afterAudio.addEventListener("timeupdate", () => \{\
  if (activeAudio === afterAudio && !isSwitching) \{\
    updateProgress();\
  \}\
\});\
\
beforeAudio.addEventListener("ended", () => \{\
  if (activeAudio === beforeAudio) \{\
    playPauseBtn.textContent = "\uc0\u9654 ";\
    seekBar.value = 0;\
    currentTimeEl.textContent = "0:00";\
  \}\
\});\
\
afterAudio.addEventListener("ended", () => \{\
  if (activeAudio === afterAudio) \{\
    playPauseBtn.textContent = "\uc0\u9654 ";\
    seekBar.value = 0;\
    currentTimeEl.textContent = "0:00";\
  \}\
\});}