const correctUsername = "amir";
const correctPassword = "1324";

let songs = JSON.parse(localStorage.getItem("songs")) || [];

window.onload = function() {
  if(localStorage.getItem("isLoggedIn") === "true") {
    showPanel();
  }
};

function login() {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  if(username === correctUsername && password === correctPassword) {
    localStorage.setItem("isLoggedIn", "true");
    showPanel();
  } else {
    document.getElementById("error").innerText = "اطلاعات اشتباهه ❌";
  }
}

function showPanel() {
  document.getElementById("loginBox").style.display = "none";
  document.getElementById("adminPanel").style.display = "block";
  renderSongs();
}

function logout() {
  localStorage.removeItem("isLoggedIn");
  location.reload();
}

function addSong() {
  const title = document.getElementById("songTitle").value;
  const artist = document.getElementById("songArtist").value;
  const url = document.getElementById("songURL").value;

  if(!title || !artist || !url) return alert("همه فیلدها رو پر کن");

  songs.push({ title, artist, url });
  localStorage.setItem("songs", JSON.stringify(songs));
  renderSongs();
}

function deleteSong(index) {
  songs.splice(index, 1);
  localStorage.setItem("songs", JSON.stringify(songs));
  renderSongs();
}

function renderSongs() {
  const list = document.getElementById("songList");
  list.innerHTML = "";

  songs.forEach((song, index) => {
    const div = document.createElement("div");
    div.innerHTML = `
      ${song.title} - ${song.artist}
      <button onclick="deleteSong(${index})">❌</button>
    `;
    list.appendChild(div);
  });
}
