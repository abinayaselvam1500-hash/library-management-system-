const userName = localStorage.getItem("userName");

// Login இல்லையென்றால் Login page-க்கு அனுப்பு
if (!userName) {
    window.location.href = "login.html";
}

// User name காட்டுதல்
else {
    document.getElementById("welcomeMessage").textContent =
        "Welcome, " + userName + "!";
}

// Logout
const logoutButton = document.getElementById("logoutButton");

logoutButton.addEventListener("click", function () {
    localStorage.removeItem("userName");
    window.location.href = "login.html";
});