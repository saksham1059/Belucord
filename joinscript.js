// Firebase SDK initialization
var firebaseConfig = {
    apiKey: "AIzaSyBh_KLsFRlEGw2HK28uQUtNL61iUbmZzTQ",
    authDomain: "belucord-e65bc.firebaseapp.com",
    projectId: "belucord-e65bc",
    storageBucket: "belucord-e65bc.appspot.com",
    messagingSenderId: "632415625584",
    appId: "1:632415625584:web:23de67a7b380f7b73c6fb5",
    measurementId: "G-NTWZNFGVF1"
};

firebase.initializeApp(firebaseConfig);

function joinChat() {
    let currentUsername = document.getElementById('username').value;
    if (currentUsername) {
        localStorage.setItem('currentUsername', currentUsername);
        window.location.href = "chat.html";
    }
}