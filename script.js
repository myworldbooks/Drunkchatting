const loginButton = document.getElementById('loginButton');
const sendButton = document.getElementById('sendButton');
const messageInput = document.getElementById('messageInput');
const chatMessages = document.getElementById('chatMessages');
const roomButtons = document.querySelectorAll('.roomButton');
const emojiButton = document.getElementById('emojiButton');
let username = '';
let currentRoom = 'general';

// Handle login and register
loginButton.addEventListener('click', () => {
    username = prompt('Enter your username');
    if (username) {
        document.getElementById('username').innerText = `Logged in as: ${username}`;
        document.getElementById('avatar').src = `https://api.adorable.io/avatars/40/${username}.png`;
        loginButton.style.display = 'none';
    }
});

// Handle sending messages
sendButton.addEventListener('click', () => {
    const message = messageInput.value.trim();
    if (message) {
        sendMessage(message, username, currentRoom);
        messageInput.value = '';
    }
});

// Switch chatrooms
roomButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        currentRoom = e.target.getAttribute('data-room');
        chatMessages.innerHTML = ''; // Clear messages
        loadMessages(currentRoom);
    });
});

// Add emojis to messages
emojiButton.addEventListener('click', () => {
    const emoji = prompt('Enter an emoji');
    messageInput.value += emoji;
});

function sendMessage(message, username, room) {
    const messageElement = document.createElement('div');
    messageElement.className = 'message';
    messageElement.innerHTML = `<span>${message}</span><span>${username || 'User'}</span>`;
    chatMessages.appendChild(messageElement);
    chatMessages.scrollTop = chatMessages.scrollHeight;
    // Simulate saving the message to the server
    localStorage.setItem(`${room}-messages`, JSON.stringify([...getMessages(room), { message, username }]));
}

function loadMessages(room) {
    const messages = getMessages(room);
    messages.forEach(msg => {
        const messageElement = document.createElement('div');
        messageElement.className = 'message';
        messageElement.innerHTML = `<span>${msg.message}</span><span>${msg.username || 'User'}</span>`;
        chatMessages.appendChild(messageElement);
    });
}

function getMessages(room) {
    return JSON.parse(localStorage.getItem(`${room}-messages`)) || [];
}

// Initial load
loadMessages(currentRoom);
