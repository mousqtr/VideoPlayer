var tag = document.createElement('script');

tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);


const divActivity = document.getElementById('divActivity');

let div1 = document.createElement('div');
div1.style.width = "100%";
div1.style.height = "10%";

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
div2.style.height = "90%";

divActivity.appendChild(div1);
div1.appendChild(urlInput);
div1.appendChild(goVideoButton);

divActivity.appendChild(div2);

var player;
function onYouTubeIframeAPIReady() {
    player = new YT.Player('divPlayer', {
        height: '100%',
        width: '100%',
        videoId: '',
        events: {
        'onReady': onPlayerReady,
        'onStateChange': onPlayerStateChange
        }
    });
}

function onPlayerReady(event) {
   console.log("Video ready");

   let videoUrl = urlVideo.value;
   let videoId = youtube_parser(videoUrl);
   player.loadVideoById(videoId);
   player.pauseVideo();
}

function onPlayerStateChange(event) {
    if (event.data == YT.PlayerState.PLAYING) {
        console.log("Play at : ", player.getCurrentTime());
    }

    if (event.data == YT.PlayerState.PAUSED) {
        console.log("Pause at : ", player.getCurrentTime());
    }

    if (event.data == YT.PlayerState.ENDED) {
        console.log("Video finished");
    }
}



const seekTo = document.getElementById('seekTo');
seekTo.addEventListener('click', function () {  
    player.seekTo(50, true);
    player.playVideo();
});



function youtube_parser(url){
    var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
    var match = url.match(regExp);
    return (match&&match[7].length==11)? match[7] : false;
}
