fetch("songs.json")
  .then(res => res.json())
  .then(data => {
    const container = document.getElementById("musicList");
    const player = document.getElementById("player");

    data.forEach(song => {
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
      container.appendChild(div);
    });
  });
