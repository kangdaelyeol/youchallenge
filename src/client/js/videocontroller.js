import fetch from "node-fetch";
import regeneratorRuntime from "regenerator-runtime";
const playBtn = document.querySelector('.playbtn');
const muteBtn = document.querySelector('.mutebtn');
const videoTime = document.querySelector('.videotime');
const videoVolume = document.querySelector('.videovolume');
const video = document.querySelector('.video');
const videoSection = document.querySelector('.videosection');
const currentTime = document.querySelector('.currenttime');
const fullTime = document.querySelector('.fulltime');
const fullScreenBtn = document.querySelector(".fullscreenbtn");
const videoViews = document.querySelector(".views");

let videoVolumeValue;
let FullscreenElement = null;
const timeFormat = (time) => {
  return new Date(Math.floor(time * 1000)).toISOString().substr(14, 5);
};

const handlemetadata = () => {
  // setTime
  setTimeout(() => {
    const time = timeFormat(video.duration);
    fullTime.textContent = time;
    videoTime.max = Math.floor(video.duration);
    videoTime.value = 0;
    videoVolumeValue = video.volume;
  }, 100);
};

const handleTimeupdate = () => {
  currentTime.textContent = timeFormat(video.currentTime);
  videoTime.value = video.currentTime;
};

const handlePlay = () => {
  if (video.paused) {
    playBtn.textContent = 'Pause';
    video.play();
  } else {
    playBtn.textContent = 'Play';
    video.pause();
  }
};

const handlevideoTimer = (e) => {
  video.currentTime = e.target.value;
};

const handlevideoVolume = (e) => {
  videoVolumeValue = video.volume = e.target.value;
  if(e.target.value === '0') {
    video.muted = true;
    muteBtn.textContent = 'Unmute';
  } else {
    video.muted = false;
    muteBtn.textContent = 'Mute';
  }
};

const handleMute = () => {
  if (video.muted) {
    video.muted = false;
    muteBtn.textContent = 'Mute';
    videoVolume.value = videoVolumeValue;
  } else {
    video.muted = true;
    muteBtn.textContent = 'Unmute';
    videoVolume.value = 0;
  }
};

const handleFullScreen = () => {
  FullscreenElement = document.fullscreenElement;
  if(!FullscreenElement){
    videoSection.requestFullscreen();
    fullScreenBtn.textContent="ExitFullscreen"
  } else {
    document.exitFullscreen();
    fullScreenBtn.textContent = "Fullscreen"
  }
}

const handleEnded = async () => {
  playBtn.textContent = 'Play';
  const videoID = video.dataset.id;
  // Add views to Video
  try{
    const res = await fetch(`/api/video/${videoID}/addview`,{
      method: "post"
    });
    if(res.status === 201){
      const json = await res.json();
      const view = json.views;
      console.log(view);
      videoViews.textContent = view === 1 ? `1 view` : `${view} views`;  
    }
  } catch(e) {console.log(e)}
}

video.addEventListener('loadedmetadata', handlemetadata);
video.addEventListener('timeupdate', handleTimeupdate);
video.addEventListener("ended", handleEnded);
playBtn.addEventListener('click', handlePlay);
muteBtn.addEventListener('click', handleMute);
videoTime.addEventListener('input', handlevideoTimer);
videoVolume.addEventListener('input', handlevideoVolume);
fullScreenBtn.addEventListener("click", handleFullScreen);