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
const db = firebase.firestore();

// Assuming you're storing the username in local storage or session after join.html
let currentUsername = localStorage.getItem('currentUsername') || "Anonymous";

function sendMessage() {
    const message = document.getElementById('messageInput').value;
    const isSpoiler = document.getElementById('spoilerCheckbox').checked;

    if (message.trim()) {
        db.collection('messages').add({
            username: currentUsername,
            message: message,
            isSpoiler: isSpoiler,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        });
        document.getElementById('messageInput').value = '';
    }
}

// Display messages and handle spoilers
db.collection('messages').orderBy('timestamp').onSnapshot(snapshot => {
    const chatbox = document.querySelector('.chatbox');
    chatbox.innerHTML = '';
    snapshot.forEach(doc => {
        const data = doc.data();
        if (data.isSpoiler) {
            chatbox.innerHTML += `<b>${data.username}:</b>
                                  <span class="spoiler" onclick="revealSpoiler(this)">
                                      Click to reveal spoiler
                                  </span>
                                  <div class="spoiler-content" style="display:none;">
                                      ${data.message}
                                  </div>
                                  <br>`;
        } else {
            chatbox.innerHTML += `<b>${data.username}:</b> ${data.message}<br>`;
        }
    });
    chatbox.scrollTop = chatbox.scrollHeight;
});

function revealSpoiler(spoilerElement) {
    const spoilerContent = spoilerElement.nextElementSibling;
    spoilerContent.style.display = "block";
    spoilerElement.style.display = "none";
}

// Update active users list
db.collection('activeUsers').orderBy('timestamp').onSnapshot(snapshot => {
    const activeUsersList = document.querySelector('.active-users');
    activeUsersList.innerHTML = '';
    snapshot.forEach(doc => {
        const username = doc.id;
        activeUsersList.innerHTML += `<p>${username}</p>`;
    });
});

// Remove active users after they close the window
window.onbeforeunload = function() {
    db.collection('activeUsers').doc(currentUsername).delete();
};