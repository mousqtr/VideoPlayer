var tag = document.createElement('script');

tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);


const divActivity = document.getElementById('divActivity');

let div1 = document.createElement('div');
div1.style.width = "100%";
div1.style.height = "10%";
div1.style.float = "left";

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

let div2 = document.createElement('div');
div2.id = 'divPlayer'
div2.style.width = "100%";
div2.style.height = "80%";
div2.style.float = "left"

let div3 = document.createElement('div');
div3.id = 'divProgressBar';
div3.style.width = "100%";
div3.style.height = "8px";
div3.style.backgroundColor = "grey";
div3.style.float = "left";

let progressBar = document.createElement('progress');
progressBar.id = 'progressBar'
progressBar.style.width = "100%";
progressBar.style.height = "100%";
progressBar.value = "0.5";
progressBar.max = "1";
progressBar.style.backgroundColor = "green";
progressBar.style.float = "left"

let div4 = document.createElement('div');
div4.id = 'divControls'
div4.style.width = "100%";
div4.style.height = "8%";
div4.style.backgroundColor = "#565656";
div4.style.float = "left";

let playButton = document.createElement('input');
playButton.style.width = "10%";
playButton.style.height = "100%";
playButton.style.float = "left";
playButton.type = "image";
playButton.src = "play.png";
var play = false;
var actionInProgress = false
playButton.onclick = function () {
    if (play == false) {
        console.log("Play video");
        player.playVideo();
        playButton.src = "pause.png";
        play = true;
        actionInProgress = true;
    } else {
        console.log("Pause video");
        player.pauseVideo();
        playButton.src = "play.png";
        play = false;
        actionInProgress = true;
    }

    setTimeout(function(){
        actionInProgress = false;
    }, 1000);

}

let timeDisplay = document.createElement('button');
timeDisplay.style.width = "30%";
timeDisplay.style.height = "100%";
timeDisplay.style.float = "left";
timeDisplay.innerHTML = "00:00:00/00:00:00 ";
timeDisplay.style.fontSize = "2vh";
timeDisplay.style.backgroundColor = "orange";

let settingsButton = document.createElement('input');
settingsButton.style.width = "10%";
settingsButton.style.height = "100%";
settingsButton.style.float = "right";
settingsButton.type = "image";
settingsButton.src = "settings.png";
settingsButton.onclick = function () {
    console.log("Setting button");
}

let volumeButton = document.createElement('input');
volumeButton.style.width = "10%";
volumeButton.style.height = "100%";
volumeButton.style.float = "right";
volumeButton.type = "image";
volumeButton.src = "volume.png";
volumeButton.onclick = function () {
    console.log("Volume button");
}

divActivity.appendChild(div1);
divActivity.appendChild(div2);
divActivity.appendChild(div3);
divActivity.appendChild(div4);

div1.appendChild(urlInput);
div1.appendChild(goVideoButton);
div3.appendChild(progressBar);
div4.appendChild(playButton);
div4.appendChild(timeDisplay);
div4.appendChild(volumeButton);
div4.appendChild(settingsButton);


var player;
function onYouTubeIframeAPIReady() {
    player = new YT.Player('divPlayer', {
        height: '100%',
        width: '100%',
        videoId: 'BtyHYIpykN0',
        playerVars: { 
        'controls': 0,
        'disablekb' : 1
        },
        events: {
        'onReady': onPlayerReady,
        'onStateChange': onPlayerStateChange
        }
    });
}

function onPlayerReady(event) {
   console.log("Video ready");

//    let videoUrl = urlVideo.value;
//    let videoId = youtube_parser(videoUrl);
//    player.loadVideoById(videoId);
   player.pauseVideo();
}

setInterval(function() {
    let time = player.getCurrentTime();
    let timeTotal = player.getDuration();

    // Update progress bar
    progressBar.value = time / timeTotal;

    // Update time display
    timeDisplay.innerHTML = changeFormatTime(time) + "/" + changeFormatTime(timeTotal);

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

    console.log(clickedValue);
});

var done = true;
function onPlayerStateChange(event) {
    if (actionInProgress == false) {
        if (event.data == YT.PlayerState.PLAYING && done == true) {
            console.log("Play at : ", player.getCurrentTime());
            player.pauseVideo();
            done = false;
    
        }
    
        if (event.data == YT.PlayerState.PAUSED  && done == true) {
            console.log("Pause at : ", player.getCurrentTime());
            player.playVideo();
            done = false;
        }
    
        setTimeout(function(){
            done = true;
        }, 1000);
    }  

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
