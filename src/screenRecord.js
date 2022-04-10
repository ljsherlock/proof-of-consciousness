let start = document.querySelector("#start")
let stop = document.querySelector("#stop")
let player = document.querySelector(".videoPlayer");
let download = document.querySelector(".download-btn");
var mediaRecorder;

start.addEventListener("click", async function () {
  player.style.display = "none";
  download.style.display = "none";
  stream = await navigator.mediaDevices.getDisplayMedia({
    // video: true,
    preferCurrentTab: true
  })

  mediaRecorder = new MediaRecorder(stream, {
    mimeType: "video/webm"
  })

  let chunks = []
  mediaRecorder.addEventListener('dataavailable', function(e) {
    chunks.push(e.data)
  })

  console.log('recording');
  // setTimeout(function() {
    startTimer();
  // }, 1000)

  mediaRecorder.addEventListener('stop', function(){
    stop.style.display = "none";
    let blob = new Blob(chunks, {
        type: chunks[0].type
    })
    let url = URL.createObjectURL(blob)

    let video = document.querySelector("video")
    video.src = url
    player.style.display = "";
    video.play();

    console.log(blob);
    download.href = url
    download.download = 'screenRecord.webm'
    download.style.display = "";
  });

  //we have to start the recorder manually
  mediaRecorder.start();
  // start.style.display = "none";
  stop.style.display = "";
})

function stopRecording() {
  mediaRecorder.stop();
  stream.getTracks().forEach(function(track) {
    track.stop();
  });
  // stop.style.display = "none";
}

stop.addEventListener("click", function () {
  stopRecording();
}, false);

// function close_video(){
//   document.querySelector(".videoPlayer").style.display = "none";
//   start.style.display = "block";
// }