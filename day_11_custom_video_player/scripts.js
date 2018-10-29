// Get the Elements
const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');
const fullScreen = player.querySelector('.full_screen');

// Define functions

function togglePlay() {
  if (video.paused) {
    video.play();
  } else {
    video.pause();
  }
}

function updateButton() {
  const icon = this.paused ? '►' : '❚ ❚';
  toggle.textContent = icon;
}

function skip() {
  // console.log(this.dataset.skip)
  video.currentTime += parseFloat(this.dataset.skip)
}

function handleRangeUpdate() {
  video[this.name] = this.value;
}

function handleProgress() {
  const percent = (video.currentTime / video.duration) * 100;
  progressBar.style.flexBasis = `${percent}%`;
}

function scrub(e) {
  const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
  video.currentTime = scrubTime;
}

function handleFullScreen() {
  fullScreenOn = !fullScreenOn;
  if (fullScreenOn) {
    player.classList.add('fullscreen');
  } else {
    player.classList.remove('fullscreen');
  }
    // console.log(video.videoWidth)
    // console.log(window.innerWidth)
    // video.webkitRequestFullScreen();
    // // video.videoWidth = window.innerWidth;

}

// Set the Event Listeners

// To play/pause the video
video.addEventListener('click', togglePlay);
toggle.addEventListener('click', togglePlay);

// To change the icon if the video is playing or not
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);

// To make the skip buttons working
skipButtons.forEach(button => button.addEventListener('click', skip));

// Set the listeners for the ranges
ranges.forEach(range => range.addEventListener('change', handleRangeUpdate));
ranges.forEach(range => range.addEventListener('mousemove', handleRangeUpdate));

// To update the progress progress bar
video.addEventListener('timeupdate', handleProgress);

// To jump the video to the 'click time'
progress.addEventListener('click', scrub)

// Set the 'mouse holding' functionality
let mousedown = false;
progress.addEventListener('mousedown', () => mousedown = true)
progress.addEventListener('mouseup', () => mousedown = false)
progress.addEventListener('mousemove', (e) => mousedown && scrub(e))

// Set the fullscreen button
let fullScreenOn = false;
fullScreen.addEventListener('click', handleFullScreen);
