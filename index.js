var tag = document.createElement('script');

tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);


const divActivity = document.getElementById('divActivity');

let divChangeUrl = document.createElement('div');
divChangeUrl.style.width = "100%";
divChangeUrl.style.height = "10%";
divChangeUrl.style.float = "right";

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
divVideo.style.float = "left";
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


divActivity.style.position = "relative";

let divSetting = document.createElement('div');
divSetting.style.width = "40%";
divSetting.style.height = "40%";
divSetting.style.position = "absolute";
divSetting.style.top = "30%";
divSetting.style.left = "30%";
divSetting.style.backgroundColor = "black";
divSetting.style.opacity = "0.77";
divSetting.style.display = "none";

var divSettingShow = false;
settingsButton.onclick = function () {
    console.log("Setting button");
    settingsButton.blur();

    if (divSettingShow == false) {
        divSetting.style.display = "block";
        divSettingShow = true;
    } else {
        divSetting.style.display = "none";
        divSettingShow = false;
    }
}





// Quality section
let divQuality = document.createElement('div');
divQuality.style.width = "100%";
divQuality.style.height = "30px";
divSetting.appendChild(divQuality);

let textQuality = document.createElement('div');
textQuality.style.width = "50%";
textQuality.style.height = "100%";
textQuality.innerHTML = "Quality"
textQuality.style.fontWeight = "bold";
textQuality.style.fontFamily = "Arial";
textQuality.style.color = "white";
textQuality.style.float = "left";
textQuality.style.display = "flex";
textQuality.style.justifyContent = "center";
textQuality.style.alignItems = "center";
divQuality.appendChild(textQuality);

let selectQuality = document.createElement('select');
selectQuality.style.width = "40%";
selectQuality.style.height = "80%";
selectQuality.style.float = "right";
selectQuality.style.marginTop = "1.5%";
selectQuality.style.marginRight = "5%";
divQuality.appendChild(selectQuality);

let qualities = ["hd1080", "hd720", "large", "medium", "small", "tiny", "auto"];
let qualityNames = ["1080p", "720p", "480p", "360p", "240p", "144p", "Auto"];
for (let i = 0; i < qualities.length; i++) {
    let optionQuality = document.createElement('option');
    optionQuality.innerText = qualityNames[i];
    selectQuality.appendChild(optionQuality);
}

selectQuality.value = "Auto";

selectQuality.addEventListener('change', function(event) {
    let indexQuality = qualityNames.indexOf(this.value);
    console.log('You selected: ', qualities[indexQuality]);
    event.target.player.setPlaybackQuality("small");
    console.log(player.getPlaybackQuality());
});




// Speed section
let divSpeed = document.createElement('div');
divSpeed.style.width = "100%";
divSpeed.style.height = "30px";
divSetting.appendChild(divSpeed);

let textSpeed = document.createElement('div');
textSpeed.style.width = "50%";
textSpeed.style.height = "100%";
textSpeed.innerHTML = "Speed"
textSpeed.style.fontWeight = "bold";
textSpeed.style.fontFamily = "Arial";
textSpeed.style.color = "white";
textSpeed.style.float = "left";
textSpeed.style.display = "flex";
textSpeed.style.justifyContent = "center";
textSpeed.style.alignItems = "center";
divSpeed.appendChild(textSpeed);

let selectSpeed = document.createElement('select');
selectSpeed.style.width = "40%";
selectSpeed.style.height = "80%";
selectSpeed.style.float = "right";
selectSpeed.style.marginTop = "1.5%";
selectSpeed.style.marginRight = "5%";
divSpeed.appendChild(selectSpeed);

let speeds = [0.25, 0.5, 0.75, 1, 1.25, 1.5, 2];
for (let i = 0; i < speeds.length; i++) {
    let option = document.createElement('option');
    option.innerText = speeds[i];
    selectSpeed.appendChild(option);
}

selectSpeed.value = 1;

selectSpeed.addEventListener('change', function() {
    console.log('You selected: ', this.value);
    player.setPlaybackRate(this.value);
    console.log(player.getPlaybackRate())
});






// Volume handle
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




// Fullscreen handle
var fullscreen = false;
let fullscreenButton = document.createElement('input');
fullscreenButton.id = "fullscreenButton";
fullscreenButton.style.width = "10%";
fullscreenButton.style.height = "100%";
fullscreenButton.style.float = "right";
fullscreenButton.type = "image";
fullscreenButton.src = "fullscreen.png";
fullscreenButton.onclick = function () {
    console.log("Fullscreen button");
    fullscreenButton.blur();

    var isInFullScreen = (document.fullscreenElement && document.fullscreenElement !== null) ||
        (document.webkitFullscreenElement && document.webkitFullscreenElement !== null) ||
        (document.mozFullScreenElement && document.mozFullScreenElement !== null) ||
        (document.msFullscreenElement && document.msFullscreenElement !== null);

    let divPlayer = document.getElementById("divPlayer");
    let divVideo = document.getElementById("divVideo");
    let divControls = document.getElementById("divControls");

    if (!isInFullScreen) {

        fullscreenButton.src = "miniscreen.png";
        divVideo.style.height = "93%";
        divControls.style.height = "5%";
        fullscreen = true;

        if (divPlayer.requestFullscreen) {
            divPlayer.requestFullscreen();
        } else if (divPlayer.mozRequestFullScreen) {
            divPlayer.mozRequestFullScreen();
        } else if (divPlayer.webkitRequestFullScreen) {
            divPlayer.webkitRequestFullScreen();
        } else if (divPlayer.msRequestFullscreen) {
            divPlayer.msRequestFullscreen();
        }

    } else {

        fullscreenButton.src = "fullscreen.png";
        divControls.style.height = "10%";
        divVideo.style.height = "90%";
        fullscreen = false;

        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
        } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
        } else if (document.msExitFullscreen) {
            document.msExitFullscreen();
        }
    }   
}

// Change sizes if fullscreen or not
document.onfullscreenchange = function ( event ) {
    if (fullscreen == false) {

        console.log("ok")
        let divVideo = document.getElementById("divVideo");
        let divControls = document.getElementById("divControls");
        let fullscreenButton = document.getElementById("fullscreenButton");

        fullscreenButton.src = "fullscreen.png";
        divControls.style.height = "10%";
        divVideo.style.height = "90%";

        fullscreen = false;
    }

}


divActivity.appendChild(divChangeUrl);
divActivity.appendChild(divPlayer);
divActivity.appendChild(divSetting);

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
        videoId: 'lf_53JgPXr8',
        playerVars: { 
            'controls': 0,
            'disablekb' : 1,
            'rel' : 0,
            'showinfo': 0
        },
        events: {
            'onReady': onPlayerReady
        }

    });

    

}

var playerReady = false;
function onPlayerReady(event) {
   console.log("Video ready");
   playerReady = true;
}


// Update contents (time / progress bar)
setInterval(function() {
    
    if (playerReady) {
        let time = player.getCurrentTime();
        let timeTotal = player.getDuration();
    
        // Update progress bar
        progressBar.value = time / timeTotal;
    
        // Update time display
        timeDisplay.innerHTML = changeFormatTime(time) + "/" + changeFormatTime(timeTotal);   
        
        // console.log(player.getAvailableQualityLevels())
    }
}, 1000)


// Function that change time format (N seconds to 00:00:00)
function changeFormatTime(time) {
    time = Math.round(time);
    let hours = Math.floor(time / 3600);
    let minutes = Math.floor((time - hours * 3600)/60);
    let seconds = time - minutes * 60 - hours * 3600;
    hours = hours < 10 ? '0' + hours : hours;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    seconds = seconds < 10 ? '0' + seconds : seconds;
    return hours + ":" + minutes + ":" + seconds;
}

// Click on progress bar
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



function youtube_parser(url){
    var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
    var match = url.match(regExp);
    return (match&&match[7].length==11)? match[7] : false;
}
