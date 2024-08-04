document.addEventListener('DOMContentLoaded', function() {
    const audioPlayers = document.querySelectorAll('.audio-player');
    const playButtons = document.querySelectorAll('.play-button');
    const pauseButtons = document.querySelectorAll('.pause-button');
    const stopButtons = document.querySelectorAll('.stop-button');
    const progressBars = document.querySelectorAll('.progress-bar');
    const volumeSliders = document.querySelectorAll('.volume-slider');
    const timestamps = document.querySelectorAll('.timestamp');
  
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
    }
  
    // Volume slider function
    function setVolume(index, volume) {
      audioPlayers[index].volume = volume;
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
  
    volumeSliders.forEach((slider, index) => {
      slider.addEventListener('input', () => setVolume(index, slider.value));
    });
  
    audioPlayers.forEach((player, index) => {
      player.addEventListener('timeupdate', () => updateProgressBar(index));
    });
  });
  