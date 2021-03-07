var tag = document.createElement('script');

tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);


const divActivity = document.getElementById('divActivity');

let divChangeUrl = document.createElement('div');
divChangeUrl.style.width = "100%";
divChangeUrl.style.height = "10%";
divChangeUrl.style.float = "left";

let urlInput = document.createElement('input');
urlInput.id = "inputUrlVideo";
urlInput.style.width = "60%";
urlInput.style.height = "80%";
urlInput.style.float = "left"
urlInput.placeholder = "Put the url of the video";

let goVideoButton = document.createElement('button');
goVideoButton.style.width = "25%";
goVideoButton.style.height = "100%";
goVideoButton.style.float = "left";
goVideoButton.style.backgroundColor = "red";
goVideoButton.style.color = "white";
goVideoButton.innerText = "Validate";
goVideoButton.onclick = function () {
    console.log("New video loaded");
    const inputUrlVideo = document.getElementById('inputUrlVideo');
    let videoUrl = inputUrlVideo.value;
    let videoId = youtube_parser(videoUrl);
    player.loadVideoById(videoId);
    player.pauseVideo();
}

let divPlayer = document.createElement('div');
divPlayer.id = 'divPlayer'
divPlayer.style.width = "100%";
divPlayer.style.height = "90%";
divPlayer.style.float = "left";


let divVideo = document.createElement('div');
divVideo.id = 'divVideo'
divVideo.style.width = "100%";
divVideo.style.height = "90%";
divVideo.style.float = "left"
divVideo.style.pointerEvents = "none";

let divProgressBar = document.createElement('div');
divProgressBar.id = 'divProgressBar';
divProgressBar.style.width = "100%";
divProgressBar.style.height = "2%";
divProgressBar.style.backgroundColor = "grey";
divProgressBar.style.float = "left";

let progressBar = document.createElement('progress');
progressBar.id = 'progressBar'
progressBar.style.width = "100%";
progressBar.style.height = "100%";
progressBar.value = "0";
progressBar.max = "1";
progressBar.style.backgroundColor = "green";
progressBar.style.float = "left"

let divControls = document.createElement('div');
divControls.id = 'divControls'
divControls.style.width = "100%";
divControls.style.height = "10%";
divControls.style.backgroundColor = "#262626";
divControls.style.float = "left";

let playButton = document.createElement('input');
playButton.style.width = "10%";
playButton.style.height = "100%";
playButton.style.float = "left";
playButton.type = "image";
playButton.src = "play.png";
var play = false;
var playBool = false;
var pauseBool = false;

playButton.onclick = function () {

    if (play == false) {
        console.log("Play video");
        player.playVideo();
        playButton.src = "pause.png";
        play = true;
        playBool = true;
    } else {
        console.log("Pause video");
        player.pauseVideo();
        playButton.src = "play.png";
        play = false;
        pauseBool = true;
    }
    playButton.blur();
}




let timeDisplay = document.createElement('button');
timeDisplay.style.width = "30%";
timeDisplay.style.height = "100%";
timeDisplay.style.float = "left";
timeDisplay.style.border = "0";
timeDisplay.style.fontWeight = "bold";
timeDisplay.innerHTML = "00:00:00/00:00:00 ";
timeDisplay.style.fontSize = "2vh";
timeDisplay.style.backgroundColor = "#262626";
timeDisplay.style.color = "white"


let settingsButton = document.createElement('input');
settingsButton.style.width = "10%";
settingsButton.style.height = "100%";
settingsButton.style.float = "right";
settingsButton.type = "image";
settingsButton.src = "settings.png";
settingsButton.onclick = function () {
    console.log("Setting button");
    settingsButton.blur();
}

let volumeButton = document.createElement('input');
volumeButton.style.width = "10%";
volumeButton.style.height = "100%";
volumeButton.style.float = "right";
volumeButton.type = "image";
volumeButton.src = "volume.png";
volumeButton.onclick = function () {
    console.log("Volume button");
    volumeButton.blur();
}

let fullscreenButton = document.createElement('input');
fullscreenButton.style.width = "10%";
fullscreenButton.style.height = "100%";
fullscreenButton.style.float = "right";
fullscreenButton.type = "image";
fullscreenButton.src = "fullscreen.png";
fullscreenButton.onclick = function () {
    console.log("Fullscreen button");
    fullscreenButton.blur();

    var elem = document.getElementById("divPlayer");
    
    if (elem.requestFullscreen) {
        elem.requestFullscreen();
    } else if (elem.webkitRequestFullscreen) { /* Safari */
        elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) { /* IE11 */
        elem.msRequestFullscreen();
    }
    
}

divActivity.appendChild(divChangeUrl);
divActivity.appendChild(divPlayer);
divPlayer.appendChild(divVideo);
divPlayer.appendChild(divProgressBar);
divPlayer.appendChild(divControls);

divChangeUrl.appendChild(urlInput);
divChangeUrl.appendChild(goVideoButton);

divProgressBar.appendChild(progressBar);

divControls.appendChild(playButton);
divControls.appendChild(timeDisplay);
divControls.appendChild(fullscreenButton);
divControls.appendChild(volumeButton);
divControls.appendChild(settingsButton);


var player;
function onYouTubeIframeAPIReady() {
    player = new YT.Player('divVideo', {
        height: '100%',
        width: '100%',
        videoId: 'BtyHYIpykN0',
        playerVars: { 
        'controls': 0,
        'disablekb' : 1
        },
        events: {
        'onReady': onPlayerReady,
        // 'onStateChange': onPlayerStateChange
        }
    });

    // player.addEventListener('onStateChange', function(event) {
    //     console.log("onStateChange");
    //     onPlayerStateChange(event);
    // });

    // player.addEventListener('onStateChange', function(event) {
    //     onPlayerStateChange(event)
    // });
}




var playerReady = false;
function onPlayerReady(event) {
   console.log("Video ready");
   playerReady = true;
//    let videoUrl = urlVideo.value;
//    let videoId = youtube_parser(videoUrl);
//    player.loadVideoById(videoId);
//    player.pauseVideo();
}

setInterval(function() {
    
    if (playerReady) {
        let time = player.getCurrentTime();
        let timeTotal = player.getDuration();
    
        // Update progress bar
        progressBar.value = time / timeTotal;
    
        // Update time display
        timeDisplay.innerHTML = changeFormatTime(time) + "/" + changeFormatTime(timeTotal);       
    }
}, 1000)

function changeFormatTime(time) {
    time = Math.round(time);
    let minutes = Math.floor(time / 60);
    let seconds = time - minutes * 60;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    seconds = seconds < 10 ? '0' + seconds : seconds;
    return minutes + ":" + seconds;
}

// progressBar.addEventListener('mousedown', event => {
//     var newTime = player.getDuration() * (event.target.value / 100);
//     player.seekTo(newTime);
// });

progressBar.addEventListener('click', function (event) {
    let x = event.pageX - this.offsetLeft; // or e.offsetX (less support, though)
    let clickedValue = x * this.max / this.offsetWidth;

    let newTime = player.getDuration() * clickedValue;
    player.seekTo(newTime);

    if(play){
        player.playVideo();
    } else {
        player.pauseVideo();
    }

    console.log(clickedValue);
});

var done = true;
function onPlayerStateChange(event) {
    if (event.data == YT.PlayerState.PLAYING && done == true) {
        console.log("Play at : ", player.getCurrentTime());
        player.pauseVideo();
        done = false;
    } else if (event.data == YT.PlayerState.PAUSED  && done == true) {
        console.log("Pause at : ", player.getCurrentTime());
        player.playVideo();
        done = false;
    }
    // done = true;

    setTimeout(function(){
        done = true;
    }, 500);
    

}



// const seekTo = document.getElementById('seekTo');
// seekTo.addEventListener('click', function () {  
//     player.seekTo(50, true);
//     player.playVideo();
// });



function youtube_parser(url){
    var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
    var match = url.match(regExp);
    return (match&&match[7].length==11)? match[7] : false;
}
