// Dark/Light mode toggle
const modeToggleBtn = document.getElementById("modeToggle");
modeToggleBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
});









const playlist = [
  {
    title: "Haan Tu Hain",
    artist: "K K",
    image: "data/car/img/c.png",
    src: "data/car/audio/HaanTuHain.mp3",
  },
];













// Elements
const audioPlayer = document.getElementById("audioPlayer");
const albumCover = document.getElementById("albumCover");
const songTitle = document.getElementById("songTitle");
const songArtist = document.getElementById("songArtist");
const playPauseBtn = document.getElementById("playPauseBtn");
const progress = document.getElementById("progress");
const currentTimeElem = document.getElementById("currentTime");
const durationElem = document.getElementById("duration");
const progressBar = document.getElementById("progressBar");
const playlistContainer = document.getElementById("playlist");

let currentSongIndex = 0;
let isPlaying = false;

// Function to format time (MM:SS)
function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const sec = Math.floor(seconds % 60);
  return `${minutes}:${sec < 10 ? "0" : ""}${sec}`;
}

// Function to play a song
function playSong(index) {
  const song = playlist[index];
  audioPlayer.src = song.src;
  albumCover.src = song.image;
  songTitle.textContent = song.title;
  songArtist.textContent = song.artist;

  audioPlayer
    .play()
    .then(() => {
      isPlaying = true;
      playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
    })
    .catch((error) => {
      console.error("Error playing audio:", error);
      alert("Error playing audio file.");
    });
}

// Function to toggle play/pause
function togglePlayPause() {
  if (isPlaying) {
    audioPlayer.pause();
    playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
    isPlaying = false;
  } else {
    audioPlayer.play();
    playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
    isPlaying = true;
  }
}

// Function to update progress bar
function updateProgress() {
  const currentTime = audioPlayer.currentTime;
  const duration = audioPlayer.duration;
  const progressPercent = (currentTime / duration) * 100;
  progress.style.width = `${progressPercent}%`;

  currentTimeElem.textContent = formatTime(currentTime);
  durationElem.textContent = formatTime(duration);
}

// Event listener for time updates
audioPlayer.addEventListener("timeupdate", updateProgress);

// Event listener for metadata loaded
audioPlayer.addEventListener("loadedmetadata", () => {
  durationElem.textContent = formatTime(audioPlayer.duration);
});

// Event listener for progress bar click (seek functionality)
progressBar.addEventListener("click", (e) => {
  const width = progressBar.clientWidth;
  const clickX = e.offsetX;
  const duration = audioPlayer.duration;
  audioPlayer.currentTime = (clickX / width) * duration;
});

// Event listener for song end, play the next song
audioPlayer.addEventListener("ended", () => {
  currentSongIndex = (currentSongIndex + 1) % playlist.length;
  playSong(currentSongIndex);
});

// Event listeners for play/pause, next, and previous buttons
document
  .getElementById("playPauseBtn")
  .addEventListener("click", togglePlayPause);
document.getElementById("prevBtn").addEventListener("click", () => {
  currentSongIndex = (currentSongIndex - 1 + playlist.length) % playlist.length;
  playSong(currentSongIndex);
});
document.getElementById("nextBtn").addEventListener("click", () => {
  currentSongIndex = (currentSongIndex + 1) % playlist.length;
  playSong(currentSongIndex);
});

// Function to render the playlist
function renderPlaylist() {
  playlistContainer.innerHTML = ""; // Clear existing content
  playlist.forEach((song, index) => {
    const songElement = document.createElement("div");
    songElement.classList.add("song");
    songElement.innerHTML = `
                      <img src="${song.image}" alt="Album Cover">
                      <div class="song-info">
                          <div class="song-title">${song.title}</div>
                          <div class="song-artist">${song.artist}</div>
                      </div>
                  `;

    // Add click event to play the selected song
    songElement.addEventListener("click", () => {
      currentSongIndex = index;
      playSong(index);
    });

    playlistContainer.appendChild(songElement);
  });
}

// Initial rendering of playlist and first song play
renderPlaylist();
playSong(currentSongIndex);
