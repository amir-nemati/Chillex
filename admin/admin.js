const correctUsername = "amir";
const correctPassword = "1324";

function login() {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  if(username === correctUsername && password === correctPassword) {
    document.getElementById("loginBox").style.display = "none";
    document.getElementById("adminPanel").style.display = "block";
  } else {
    document.getElementById("error").innerText = "اطلاعات اشتباهه ❌";
  }
}
