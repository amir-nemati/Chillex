async function upload() {
  const title = document.getElementById("title").value;
  const artist = document.getElementById("artist").value;
  const file = document.getElementById("file").files[0];

  if (!file) return alert("فایل انتخاب کن");

  const reader = new FileReader();
  reader.onload = async function() {

    const base64 = reader.result.split(",")[1];

    const token = "GITHUB_PERSONAL_ACCESS_TOKEN";

    await fetch("https://api.github.com/repos/USERNAME/REPO/contents/songs/" + file.name, {
      method: "PUT",
      headers: {
        "Authorization": "token " + token,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        message: "upload song",
        content: base64
      })
    });

    alert("آپلود شد! حالا songs.json رو دستی آپدیت کن");
  };

  reader.readAsDataURL(file);
}
