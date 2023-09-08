console.log("welcome to spoitify");
//initialise the variables
let songIndex = 0;
let audioElement = new Audio("songs/1.mp3");
let masterPlay = document.getElementById('masterPlay');
let myProgressbar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let songItems = Array.from(document.getElementsByClassName('songItem'));

//song list array 
let songs = [
    {songName: "song1", filePath: "songs/1.mp3", coverPath: "cover/1.jpg"},
    {songName: "another song", filePath: "songs/2.mp3", coverPath: "cover/2.jpg"},
    {songName: "another another song", filePath: "songs/3.mp3", coverPath: "cover/3.jpg"},
    {songName: "another another", filePath: "songs/4.mp3", coverPath: "cover/4.jpg"},
    {songName: "sng another another", filePath: "songs/5.mp3", coverPath: "cover/5.jpg"},
]

songItems.forEach((element,i)=>{
    // console.log(element,i); to log the songs and their index in the console
    element.getElementsByTagName("img")[0].src = songs[i].coverPath;
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
})

// audioElement.play();

//handle paly/pause click
masterPlay.addEventListener('click', ()=>{
    if(audioElement.paused || audioElement.currentTime <= 0){
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        gif.style.opacity = 1;
    }
    else{
        audioElement.pause();
        masterPlay.classList.add('fa-play-circle');
        masterPlay.classList.remove('fa-pause-circle');
        gif.style.opacity = 0;
    }
})

//listen to events 
audioElement.addEventListener('timeupdate', ()=>{
    console.log('timeupdate');
    //Update SeekBar
    progress = parseInt((audioElement.currentTime/audioElement.duration) * 100);
    console.log(progress);
    myProgressbar.value = progress;
} )

myProgressbar.addEventListener('change', ()=>{
    audioElement.currentTime = myProgressbar.value * audioElement.duration / 100;

})

//for every song in the list being played seperately
const makeAllPlays = () =>{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
        element.classList.add('fa-play-circle');
        element.classList.remove('fa-pause-circle');
    })
}
Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
    element.addEventListener('click', (e)=>{
        console.log(e.target); //to get the element clicked
        makeAllPlays();
        songIndex = parseInt(e.target.id); //to get the song ID
        e.target.classList.remove('fa-play-circle');
        e.target.classList.add('fa-pause-circle');
        audioElement.src = `songs/${songIndex+1}.mp3`; //use the symbol above tab instead of normal apostrophy
        masterSongName.innerText = songs[songIndex].songName;
        audioElement.currentTime = 0;
        audioElement.play();
        gif.style.opacity = 1;
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
    })
})

//for next button

document.getElementById('next').addEventListener('click',()=>{
    if(songIndex >= 5){ //change as per the number of songs in the list 
        songIndex = 0;
    }
    else {
        songIndex += 1;
    }
    audioElement.src = `songs/${songIndex+1}.mp3`; //use the symbol above tab instead of normal apostrophy
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
})

//for previous button 
document.getElementById('previous').addEventListener('click',()=>{
    if(songIndex <= 0){ //change as per the number of songs in the list 
        songIndex = 0;
    }
    else {
        songIndex -= 1;
    }
    audioElement.src = `songs/${songIndex+1}.mp3`; //use the symbol above tab instead of normal apostrophy
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
})