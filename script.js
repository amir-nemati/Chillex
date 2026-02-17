const audio = document.getElementById("audio");
const musicList = document.getElementById("musicList");
const nowTitle = document.getElementById("nowTitle");
const cover = document.getElementById("cover");
const progress = document.getElementById("progress");
const currentTimeEl = document.getElementById("currentTime");
const durationEl = document.getElementById("duration");
const playBtn = document.getElementById("playBtn");
const searchInput = document.getElementById("search");
const volumeSlider = document.getElementById("volume");

let currentIndex = 0;
let isPlaying = false;
let songs = [];
let likedSongs = JSON.parse(localStorage.getItem("liked")) || [];
let recentlyPlayed = JSON.parse(localStorage.getItem("recent")) || [];

/* Load Songs */
fetch("data/song.json")
  .then(res => res.json())
  .then(data => {
    songs = data;
    renderSongs(songs);
  });

/* Render Songs */
function renderSongs(list){
  musicList.innerHTML = "";
  list.forEach((song, index) => {
    const div = document.createElement("div");
    div.className = "track";

    const isLiked = likedSongs.includes(song.url);

    div.innerHTML = `
      <img src="${song.cover}">
      <div class="info">
        <strong>${song.title}</strong>
      </div>
      <div class="actions">
        <button onclick="toggleLike('${song.url}')">
          ${isLiked ? "❤️" : "🤍"}
        </button>
        <a href="${song.url}" download>⬇</a>
      </div>
    `;

    div.querySelector(".info").onclick = () => playSong(index);

    musicList.appendChild(div);
  });
}

/* Play Song */
function playSong(index){
  currentIndex = index;
  audio.src = songs[index].url;
  cover.src = songs[index].cover;
  nowTitle.innerText = songs[index].title;
  audio.play();
  isPlaying = true;
  playBtn.innerText = "⏸";

  addToRecent(songs[index].url);
}

/* Play / Pause */
function playPause(){
  if(!audio.src) return;

  if(isPlaying){
    audio.pause();
    playBtn.innerText = "▶";
  } else {
    audio.play();
    playBtn.innerText = "⏸";
  }
  isPlaying = !isPlaying;
}

/* Next / Prev */
function next(){
  currentIndex = (currentIndex + 1) % songs.length;
  playSong(currentIndex);
}

function prev(){
  currentIndex = (currentIndex - 1 + songs.length) % songs.length;
  playSong(currentIndex);
}

/* Auto Next */
audio.addEventListener("ended", next);

/* Progress */
audio.addEventListener("timeupdate", () => {
  progress.value = (audio.currentTime / audio.duration) * 100 || 0;
  currentTimeEl.innerText = formatTime(audio.currentTime);
});

audio.addEventListener("loadedmetadata", () => {
  durationEl.innerText = formatTime(audio.duration);
});

progress.addEventListener("input", () => {
  audio.currentTime = (progress.value / 100) * audio.duration;
});

/* Like System */
function toggleLike(url){
  if(likedSongs.includes(url)){
    likedSongs = likedSongs.filter(item => item !== url);
  } else {
    likedSongs.push(url);
  }
  localStorage.setItem("liked", JSON.stringify(likedSongs));
  renderSongs(songs);
}

/* Recently Played */
function addToRecent(url){
  recentlyPlayed = recentlyPlayed.filter(item => item !== url);
  recentlyPlayed.unshift(url);
  recentlyPlayed = recentlyPlayed.slice(0,5);
  localStorage.setItem("recent", JSON.stringify(recentlyPlayed));
}

/* Search */
searchInput.addEventListener("input", () => {
  const value = searchInput.value.toLowerCase();
  const filtered = songs.filter(song =>
    song.title.toLowerCase().includes(value)
  );
  renderSongs(filtered);
});

/* Theme Toggle */
function toggleTheme(){
  document.body.classList.toggle("light");
  localStorage.setItem("theme",
    document.body.classList.contains("light") ? "light" : "dark"
  );
}

if(localStorage.getItem("theme") === "light"){
  document.body.classList.add("light");
}

function formatTime(sec){
  if(isNaN(sec)) return "0:00";
  let m = Math.floor(sec / 60);
  let s = Math.floor(sec % 60);
  return m + ":" + (s < 10 ? "0" + s : s);
}

volumeSlider.addEventListener("input", () => {
  audio.volume = volumeSlider.value;
});
