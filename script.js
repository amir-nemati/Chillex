const audio = document.getElementById("audio");
const musicList = document.getElementById("musicList");
const nowTitle = document.getElementById("nowTitle");
const cover = document.getElementById("cover");
const volume = document.getElementById("volume");

let currentIndex = 0;
let isPlaying = false;

const songs = [
  {
    title: "Track One",
    url: "songs/sample.mp3",
    cover: "https://picsum.photos/100?1"
  },
  {
    title: "Track Two",
    url: "songs/sample.mp3",
    cover: "https://picsum.photos/100?2"
  },
  {
    title: "Track Three",
    url: "songs/sample.mp3",
    cover: "https://picsum.photos/100?3"
  }
];

songs.forEach((song, index) => {
  const div = document.createElement("div");
  div.className = "track";
  div.innerHTML = `
    <img src="${song.cover}">
    <div>
      <strong>${song.title}</strong>
    </div>
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
}

function playPause(){
  if(isPlaying){
    audio.pause();
  } else {
    audio.play();
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

volume.addEventListener("input", () => {
  audio.volume = volume.value;
});
