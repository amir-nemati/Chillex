const audio = document.getElementById("audio");
const musicList = document.getElementById("musicList");
const nowTitle = document.getElementById("nowTitle");
const progress = document.getElementById("progress");

let isPlaying = false;

const songs = [
  { title: "Track One", url: "songs/sample.mp3" },
  { title: "Track Two", url: "songs/sample.mp3" },
  { title: "Track Three", url: "songs/sample.mp3" }
];

songs.forEach(song => {
  const div = document.createElement("div");
  div.className = "track";
  div.innerHTML = `<strong>${song.title}</strong>`;
  div.onclick = () => {
    audio.src = song.url;
    audio.play();
    nowTitle.innerText = song.title;
    isPlaying = true;
  };
  musicList.appendChild(div);
});

function playPause(){
  if(isPlaying){
    audio.pause();
    isPlaying = false;
  } else {
    audio.play();
    isPlaying = true;
  }
}

audio.addEventListener("timeupdate", () => {
  progress.value = (audio.currentTime / audio.duration) * 100 || 0;
});
