const socket = io('http://localhost:8000');

// Get DOM elements in respective Js variables
const form = document.getElementById('send-container');
const messageInput = document.getElementById('messageInp');
const messageContainer = document.querySelector(".container");

// Audio that will play on recieving messages
var audio = new Audio('audio&image/ting1.mp3')

// function to append event info to the container
const append = (message, position)=>{
    const messageElement = document.createElement('div');
    messageElement.innerText = message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    messageContainer.append(messageElement);
    if (position == 'left'){
        audio.play();
    }
}

form.addEventListener('submit', (e)=>{
    e.preventDefault();
    const message = messageInput.value;
    append(`You: ${message}`,  `right`)
    socket.emit('send', message);
    messageInput.value = ''
})

const name = prompt("Enter name:")
socket.emit('new-user-joined', name);

socket.on('user-joined', name=>{
    append(`${name} joined the chat`, `right`)
})

socket.on('recieve', data=>{
    append(`${data.name}: ${data.message}`, `left`)
})

socket.on('leave', name=>{
    append(`${name} left the chat`, `right`)
})