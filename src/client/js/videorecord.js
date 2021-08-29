// import { createFFmpeg, fetchFile } from '@ffmpeg/ffmpeg';

const recordVideo = document.querySelector('.recordvideo');
const recordBtn = document.querySelector('.recordbtn');
const downloadBtn = document.querySelector('.downloadbtn');

let recordState = false;
let videoStream;
let recorder;
let videoURL;
const downloadFile = (URL, FILENAME) => {
  const a = document.createElement('a');
  a.download = FILENAME;
  a.href = URL;
  document.body.appendChild(a);
  URL.revokeObjectURL(URL);
  a.click();
};
const handleDownload = async (e) => {
  // ffmpeg
  // const ffmpeg = createFFmpeg({ log: true });
  // await ffmpeg.load();
  // ffmpeg.FS('writeFile', 'simple.mp4', await fetchFile(videoURL));
  // await ffmpeg.run(
  //   '-i',
  //   'simple.mp4',
  //   '-ss',
  //   '00:00:01',
  //   '-frames:v',
  //   '1',
  //   'thumb.jpg',
  // );
  // const thumbData = ffmpeg.FS('readFile', 'thumb.jpg');
  // const thumbBlob = new Blob([thumbData.buffer], { type: 'image/jpg' });
  // const thumbURL = URL.createObjectURL(thumbBlob);
  downloadFile(videoURL, 'sample.mp4');
  // downloadFile(thumbURL, 'simple.jpg');
  recordBtn.disabled = false;
  downloadBtn.removeEventListener('click', handleDownload);
  downloadBtn.disabled = true;
  recordBtn.textContent = 'StartRecording';
  init();
};
const handleRecord = (e) => {
  if (recordState === false) {
    recordState = true;
    recordBtn.textContent = 'StopRecording';
    recorder = new MediaRecorder(videoStream, {
      MimeType: 'video/mp4',
    });
    recorder.ondataavailable = (e) => {
      videoURL = URL.createObjectURL(e.data);
      recordVideo.srcObject = null;
      recordVideo.src = videoURL;
      recordVideo.loop = true;
      recordVideo.play();
    };
    recorder.start();
  } else {
    recorder.stop();
    recordState = false;
    recordBtn.disabled = true;
    downloadBtn.disabled = false;
    downloadBtn.addEventListener('click', handleDownload);
  }
};

recordBtn.addEventListener('click', handleRecord);

const init = async () => {
  downloadBtn.disabled = true;
  videoStream = await navigator.mediaDevices.getUserMedia({
    video: true,
    Audio: true,
  });
  recordVideo.srcObject = videoStream;
  recordVideo.play();
};

init();
