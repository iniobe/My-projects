let nowplaying = document.querySelector('.now-playing');
let trackart = document.querySelector('.track-art');
let trackname= document.querySelector('.trackname');
let trackartist = document.querySelector('.trackartist');

let playpausebtn = document.querySelector('.playpause-track');
let nextbtn = document.querySelector('.next-track');
let prevbtn = document.querySelector('.prev-track');

let seekslider = document.querySelector('.seekslider');
let volume = document.querySelector('.volume');
let curtime = document.querySelector('.cuurenttime');
let totdu = document.querySelector('.totalduration');
let wave = document.getElementById('wave');
let randomIcon = document.querySelector('.fa-random');
let curtrack = document.createElement('audio');

let trackindex = 0;
let isPlaying = false;
let isRandom = false;
let updateTimer;

let musiclist = [ 
    {
        img : 'images/nasty-c-king-shit-5-1.webp',
        name : 'La Vida Loca',
        artist : 'Nasty C',
        music : 'music/La Vida Loca - Nasty C (128).mp3'
    }, 
    {
        img : 'images/eminem-music-to-be-murdered-by-artwork.png',
        name : 'Gnat',
        artist : 'Eminem',
        music : 'music/1-08 Gnat.m4a'
    },
   
    {
        img : 'images/51fubf1PbkL._SY445_SX342_QL70_ML2_.jpg',
        name : 'Dior(Remix)',
        artist: 'Pop Smoke ft Gunna',
        music : 'music/Meet The Woo 2 (Deluxe) CD 1 TRACK 15 (320).mp3'
    },
    {
        img : 'images/therapysession.jpg',
        name : 'Therapy Session',
        artist: 'NF',
        music : 'music/02. Therapy Session.mp3'
    },
];

loadTrack(trackindex);

function loadTrack(trackindex){
    clearInterval(updateTimer);
    resetValues();
    
    curtrack.src = musiclist[trackindex].music;
    curtrack.load();

    trackart.style.backgroundImage = "url(" + musiclist[trackindex].img + ")";
    trackname.textContent = musiclist[trackindex].name;
    trackartist.textContent = musiclist[trackindex].artist;
    nowplaying.textContent = "Playing music " + (trackindex + 1) + 'of' + musiclist.length;

    updateTimer = setInterval(setUpdate, 1000);

    curtrack.addEventListener('ended', nextTrack);
    randombg_color();
}

function randombg_color(){
    let hex = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e'];
    let a;

    function populate(a){
        for(let i=0; i<6; i++){
            let x = Math.round(Math.random() * 14);
            let y = hex[x];
            a += y;
        }
        return a;
    }
    let color1 = populate('#');
    let color2 = populate('#');
    var angle = 'to right';

    let gradient = 'linear-gradient(' + angle + ',' + color1 + ',' + color2 + ")";
    document.body.style.background = gradient;
}
function resetValues(){
    curtime.textContent = '00:00';
    totdu.textContent = "00:00";
    seekslider.value = 0;
}
function randomTrack(){
    isRandom ? pauseRandom() : playRandom();
}
function playRandom(){
    isRandom = true;
    randomIcon.classList.add('randomActive');
}
function pauseRandom(){
    isRandom = false;
    randomIcon.classList.remove('randomActive');
}
function repeatTrack(){
    let currentindex = trackindex;
    loadTrack(currentindex);
    playTrack();
}
function playpauseTrack(){
    isPlaying ? pauseTrack() : playTrack();
}
function playTrack(){
    curtrack.play();
    isPlaying = true;
    trackart.classList.add('rotate');
    wave.classList.add('loader');
    playpausebtn.innerHTML = '<i class="fa-solid fa-circle-pause fa-4x"></i>';
}
function pauseTrack(){
    curtrack.pause();
    isPlaying = false;
    trackart.classList.remove('rotate');
    wave.classList.remove('loader');
    playpausebtn.innerHTML = '<i class="fa-solid fa-circle-play fa-4x"></i>'
}
function nextTrack(){
    if(trackindex < musiclist.length - 1 && isRandom === false){
        trackindex += 1;
    }else if(trackindex < musiclist.length - 1 && isRandom === true){
        let randomindex = Number.parseInt(Math.random() + musiclist.length);
        trackindex = randomindex;
    }else{
        trackindex =0;
    }
    loadTrack(trackindex);
    playTrack();
}
function prevTrack() {
    if(trackindex > 0){
        trackindex -= 1;
    }else{
        trackindex = musiclist.length -1;
    }
    loadTrack(trackindex);
    playTrack();
}
function seekTo() {
    let seekto = curtrack.duration * (seekslider.value / 100);
    curtrack.curtime = seekto;
}
function setVolume() {
    curtrack.volume = volume.value / 100;
}
function setUpdate() {
    let seekPosition = 0;
    if(!isNaN(curtrack.duration)){
        seekPosition = curtrack.currentTime * (100 / curtrack.duration);
        seekslider.value = seekPosition;
        
        let currentMin = Math.floor(curtrack.curtime /60);
        let currseconds = Math.floor(curtrack.curtime - currentMin * 60);
        let duraMin = Math.floor(curtrack.duration / 60);
        let duraSec = Math.floor(curtrack.duration - duraMin * 60);

        if(currseconds < 10) {currseconds = "0" + currseconds; }
        if(duraSec <10) {duraSec = "0" + duraSec; }
        if(currentMin < 10) {currentMin = "0" + currentMin; }
        if(duraMin < 10) {duraMin = "0" + duraMin; }

        curtime.textContent = currentMin + ':' + currseconds;
        totdu.textContent = duraMin + ':' + duraSec
    }
}