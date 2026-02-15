const musicList = document.getElementById("musicList");
const player = document.getElementById("player");

let songs = JSON.parse(localStorage.getItem("songs")) || [];

function renderSongs() {
  musicList.innerHTML = "";
  songs.forEach((song, index) => {
    const div = document.createElement("div");
    div.className = "card";
    div.innerHTML = `
      <h3>${song.title}</h3>
      <p>${song.artist}</p>
    `;
    div.onclick = () => {
      player.src = song.url;
      player.play();
    };
    musicList.appendChild(div);
  });
}

renderSongs();
