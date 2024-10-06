document.addEventListener('DOMContentLoaded', function() {
  const audioPlayers = document.querySelectorAll('.audio-player');
  const playButtons = document.querySelectorAll('.play-button');
  const pauseButtons = document.querySelectorAll('.pause-button');
  const stopButtons = document.querySelectorAll('.stop-button');
  const muteButtons = document.querySelectorAll('.mute-button');
  const progressBars = document.querySelectorAll('.progress-bar');
  const progressContainers = document.querySelectorAll('.progress-container');
  const volumeSliders = document.querySelectorAll('.volume-slider');
  const timestamps = document.querySelectorAll('.timestamp');

  let previousVolumes = []; // To store previous volumes for each player
  
  // Play function
  function playAudio(index) {
    audioPlayers[index].play();
  }

  // Pause function
  function pauseAudio(index) {
    audioPlayers[index].pause();
  }

  // Stop function
  function stopAudio(index) {
    audioPlayers[index].pause();
    audioPlayers[index].currentTime = 0;
    updateProgressBar(index);
  }

  // Mute function
  function toggleMute(index) {
    if (audioPlayers[index].muted) {
      // Restore previous volume
      audioPlayers[index].muted = false;
      audioPlayers[index].volume = previousVolumes[index];
      volumeSliders[index].value = previousVolumes[index]; // Update slider with restored volume
      muteButtons[index].querySelector('img').src = 'images/icons/mute-off.png'; // Change to volume icon
    } else {
      // Save current volume and mute
      previousVolumes[index] = audioPlayers[index].volume;
      audioPlayers[index].muted = true;
      audioPlayers[index].volume = 0;
      volumeSliders[index].value = 0; // Update slider to show muted state
      muteButtons[index].querySelector('img').src = 'images/icons/mute-on.png'; // Change to mute icon
    }
  }

  // Volume slider function
  function setVolume(index, volume) {
    if (!audioPlayers[index].muted) {
      audioPlayers[index].volume = volume;
    } else {
      // Update previous volume, even if muted
      previousVolumes[index] = volume;
    }
    volumeSliders[index].value = volume; // Ensure slider reflects the volume
  }

  // Update progress bar function
  function updateProgressBar(index) {
    const progress = (audioPlayers[index].currentTime / audioPlayers[index].duration) * 100;
    progressBars[index].style.width = `${progress}%`;

    // Update timestamp
    const currentMinutes = Math.floor(audioPlayers[index].currentTime / 60);
    const currentSeconds = Math.floor(audioPlayers[index].currentTime % 60);
    const durationMinutes = Math.floor(audioPlayers[index].duration / 60);
    const durationSeconds = Math.floor(audioPlayers[index].duration % 60);

    timestamps[index].textContent = `${currentMinutes}:${currentSeconds < 10 ? '0' : ''}${currentSeconds} / ${durationMinutes}:${durationSeconds < 10 ? '0' : ''}${durationSeconds}`;
  }

  // Seek audio based on click on progress bar
  function seekAudio(index, event) {
    const progressContainer = progressContainers[index];
    const rect = progressContainer.getBoundingClientRect();
    const clickX = event.clientX - rect.left;
    const width = progressContainer.offsetWidth;
    const newTime = (clickX / width) * audioPlayers[index].duration;
    audioPlayers[index].currentTime = newTime;
  }

  // Event listeners for each player
  playButtons.forEach((button, index) => {
    button.addEventListener('click', () => playAudio(index));
  });

  pauseButtons.forEach((button, index) => {
    button.addEventListener('click', () => pauseAudio(index));
  });

  stopButtons.forEach((button, index) => {
    button.addEventListener('click', () => stopAudio(index));
  });

  muteButtons.forEach((button, index) => {
    button.addEventListener('click', () => toggleMute(index));
  });

  volumeSliders.forEach((slider, index) => {
    slider.addEventListener('input', () => setVolume(index, slider.value));
  });

  audioPlayers.forEach((player, index) => {
    player.addEventListener('timeupdate', () => updateProgressBar(index));
  });

  progressContainers.forEach((container, index) => {
    container.addEventListener('click', (event) => seekAudio(index, event));
  });
});
