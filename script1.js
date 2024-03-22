let startTime;
let running = false;
let laps = [];

function startTimer() {
  if (!running) {
    startTime = Date.now() - (laps.length > 0 ? laps.reduce((acc, lap) => acc + lap, 0) : 0);
    running = true;
    updateDisplay();
  }
}

function toggleTimer() {
  if (running) {
    running = false;
  } else {
    startTimer();
  }
}

function resetTimer() {
  startTime = null;
  running = false;
  laps = [];
  document.querySelector('.display').textContent = '00:00:00';
  document.querySelector('.laps').innerHTML = '';
}

function lapTimer() {
  if (running) {
    const lapTime = Date.now() - startTime - (laps.length > 0 ? laps.reduce((acc, lap) => acc + lap, 0) : 0);
    laps.push(lapTime);
    const lapDisplay = document.createElement('li');
    lapDisplay.textContent = formatTime(lapTime);
    document.querySelector('.laps').appendChild(lapDisplay);
  }
}

function updateDisplay() {
  const currentTime = running ? Date.now() - startTime - (laps.length > 0 ? laps.reduce((acc, lap) => acc + lap, 0) : 0) : 0;
  document.querySelector('.display').textContent = formatTime(currentTime);
}

function formatTime(time) {
  const date = new Date(time);
  const hours = date.getUTCHours().toString().padStart(2, '0');
  const minutes = date.getUTCMinutes().toString().padStart(2, '0');
  const seconds = date.getUTCSeconds().toString().padStart(2, '0');
  const milliseconds = Math.floor(date.getUTCMilliseconds() / 10).toString().padStart(2, '0');
  return `${hours}:${minutes}:${seconds}:${milliseconds}`;
}

setInterval(updateDisplay, 10);
