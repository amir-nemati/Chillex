const audio = document.getElementById("audio");
const musicList = document.getElementById("musicList");
const nowTitle = document.getElementById("nowTitle");
const cover = document.getElementById("cover");
const progress = document.getElementById("progress");
const currentTimeEl = document.getElementById("currentTime");
const durationEl = document.getElementById("duration");
const playBtn = document.getElementById("playBtn");

let currentIndex = 0;
let isPlaying = false;

const songs = [
  {
    title: "Track One",
    url: "songs/sample.mp3",
    cover: "https://picsum.photos/200?1"
  },
  {
    title: "Track Two",
    url: "songs/sample.mp3",
    cover: "https://picsum.photos/200?2"
  },
  {
    title: "Track Three",
    url: "songs/sample.mp3",
    cover: "https://picsum.photos/200?3"
  }
];

songs.forEach((song, index) => {
  const div = document.createElement("div");
  div.className = "track";
  div.innerHTML = `
    <img src="${song.cover}">
    <div><strong>${song.title}</strong></div>
  `;
  div.onclick = () => playSong(index);
  musicList.appendChild(div);
});

function playSong(index){
  currentIndex = index;
  audio.src = songs[index].url;
  cover.src = songs[index].cover;
  nowTitle.innerText = songs[index].title;
  audio.play();
  isPlaying = true;
  document.body.classList.add("playing");
  playBtn.innerText = "⏸";
}

function playPause(){
  if(isPlaying){
    audio.pause();
    document.body.classList.remove("playing");
    playBtn.innerText = "▶";
  } else {
    audio.play();
    document.body.classList.add("playing");
    playBtn.innerText = "⏸";
  }
  isPlaying = !isPlaying;
}

function next(){
  currentIndex = (currentIndex + 1) % songs.length;
  playSong(currentIndex);
}

function prev(){
  currentIndex = (currentIndex - 1 + songs.length) % songs.length;
  playSong(currentIndex);
}

/* Progress Update */
audio.addEventListener("timeupdate", () => {
  progress.value = (audio.currentTime / audio.duration) * 100 || 0;
  currentTimeEl.innerText = formatTime(audio.currentTime);
});

/* Duration */
audio.addEventListener("loadedmetadata", () => {
  durationEl.innerText = formatTime(audio.duration);
});

/* Drag progress */
progress.addEventListener("input", () => {
  audio.currentTime = (progress.value / 100) * audio.duration;
});

function formatTime(sec){
  if(isNaN(sec)) return "0:00";
  let m = Math.floor(sec / 60);
  let s = Math.floor(sec % 60);
  return m + ":" + (s < 10 ? "0" + s : s);
}
