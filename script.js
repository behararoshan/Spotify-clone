console.log("Welcome to Spotify");
// Initialize the Variable
let songIndex=0;
let audioElement=new Audio("songs/manasa.mp3");
let masterPlay = document.getElementById('masterPlay');
let myProgressBar=document.getElementById('myProgressBar');
let gif=document.getElementById('gif');
let masterSongName=document.getElementById('masterSongName');
let songItem =Array.from(document.getElementsByClassName("songItem"));

let songs=[
    {songName:"Manasa malli malli chusya", filePath:"songs/manasa.mp3", coverPath:"covers/1.jpeg"},
    {songName:"Aakaasam", filePath:"songs/Aakaasam.mp3", coverPath:"covers/2.jpeg"},
    {songName:"Ee Hridayam", filePath:"songs/Ee Hridayam.mp3", coverPath:"covers/3.jpg"},
    {songName:"Kundanapu Bomma", filePath:"songs/Kundanapu Bomma.mp3", coverPath:"covers/4.jpeg"},
    {songName:"Swaasye", filePath:"songs/Swaasye.mp3", coverPath:"covers/5.jpg"},
    {songName:"Vintunnavaa", filePath:"songs/Vintunnavaa.mp3", coverPath:"covers/6.jpg"},
    {songName:"Aaromale", filePath:"songs/Aaromale.mp3", coverPath:"covers/7.jpg"},
]
songItem.forEach((element, i) => {
    element.getElementsByTagName("img")[0].src = songs[i].coverPath;
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
});

// audioElement.play();
// Handle play/pause click
masterPlay.addEventListener('click',()=>{
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');
        gif.style.opacity=1;
    }
    else{
        audioElement.pause();
        masterPlay.classList.remove('fa-circle-pause');
        masterPlay.classList.add('fa-circle-play');
        gif.style.opacity=0;
    }
})
// Listen to Events
audioElement.addEventListener('timeupdate',()=>{
    
    // update SeelBar
    let progress = parseInt((audioElement.currentTime/audioElement.duration)*100);
    myProgressBar.value =progress;
})

myProgressBar.addEventListener('change', ()=>{
    audioElement.currentTime = myProgressBar.value * audioElement.duration/100;
})

const makeAllPlays = ()=>{
    Array.from(document.getElementsByClassName("songItemPlay")).forEach((element)=>{
        element.classList.remove("fa-circle-pause");
        element.classList.add("fa-circle-play");
        
    })
}

Array.from(document.getElementsByClassName("songItemPlay")).forEach((element)=>{
    element.addEventListener('click', (e)=>{
        makeAllPlays();
        songIndex =parseInt(e.target.id);
        e.target.classList.remove("fa-circle-play");
        e.target.classList.add("fa-circle-pause");
        masterSongName.innerText = songs[songIndex].songName;
        audioElement.src = songs[songIndex].filePath;
        audioElement.currentTime=0;
        audioElement.play();
        gif.style.opacity=1;
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');

    })
})
document.getElementById('next').addEventListener('click', ()=>{
    if (songIndex >= 7){
        songIndex=0
    }
    else{
        songIndex += 1
    }
    audioElement.src = songs[songIndex].filePath;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime=0;
    audioElement.play();
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');
})

document.getElementById('previous').addEventListener('click', ()=>{
    if (songIndex <= 0){
        songIndex=0
    }
    else{
        songIndex -= 1
    }
    audioElement.src = songs[songIndex].filePath;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime=0;
    audioElement.play();
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');
})