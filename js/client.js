
const socket=io("http://127.0.0.1:8000", { withCredentials: true })


const form=document.getElementById('send-container');
const messageinp=document.getElementById('messageinp');
const messagecontainer=document.querySelector(".container");
const user=prompt('Enter your name to join');
 const audio=new Audio('../assets/ring.wav');
const append=(message,position)=>{  
     //POSTION=LEFT,RIGHT
    const messagelement=document.createElement('div');
    messagelement.classList.add('message');
    messagelement.classList.add(position);
    messagelement.textContent=message;
    messagecontainer.append(messagelement);
    if(position=='left')
     audio.play();
}

socket.emit('new_user',user);
socket.on('user-joined',name=>{
        append(`${name} joined the chat`,'right');
});
form.addEventListener('submit',e=>{
    e.preventDefault();
    const message=messageinp.value;
    append(`You:${message}`,'right');
    socket.emit('send',message);
    messageinp.value='';
});
socket.on('receive',data=>{
    append(`${data.name}:${data.message}`,'left');
});

socket.on('user_left',(name)=>{
        append(`${name}:left the chat`,'left');
})