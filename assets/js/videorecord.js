/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/client/js/videorecord.js":
/*!**************************************!*\
  !*** ./src/client/js/videorecord.js ***!
  \**************************************/
/***/ (() => {

eval("function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }\n\nfunction _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, \"next\", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, \"throw\", err); } _next(undefined); }); }; }\n\n// import { createFFmpeg, fetchFile } from '@ffmpeg/ffmpeg';\nvar recordVideo = document.querySelector('.recordvideo');\nvar recordBtn = document.querySelector('.recordbtn');\nvar downloadBtn = document.querySelector('.downloadbtn');\nvar recordState = false;\nvar videoStream;\nvar recorder;\nvar videoURL;\n\nvar downloadFile = function downloadFile(URL, FILENAME) {\n  var a = document.createElement('a');\n  a.download = FILENAME;\n  a.href = URL;\n  document.body.appendChild(a);\n  URL.revokeObjectURL(URL);\n  a.click();\n};\n\nvar handleDownload = /*#__PURE__*/function () {\n  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(e) {\n    return regeneratorRuntime.wrap(function _callee$(_context) {\n      while (1) {\n        switch (_context.prev = _context.next) {\n          case 0:\n            // ffmpeg\n            // const ffmpeg = createFFmpeg({ log: true });\n            // await ffmpeg.load();\n            // ffmpeg.FS('writeFile', 'simple.mp4', await fetchFile(videoURL));\n            // await ffmpeg.run(\n            //   '-i',\n            //   'simple.mp4',\n            //   '-ss',\n            //   '00:00:01',\n            //   '-frames:v',\n            //   '1',\n            //   'thumb.jpg',\n            // );\n            // const thumbData = ffmpeg.FS('readFile', 'thumb.jpg');\n            // const thumbBlob = new Blob([thumbData.buffer], { type: 'image/jpg' });\n            // const thumbURL = URL.createObjectURL(thumbBlob);\n            downloadFile(videoURL, 'sample.mp4'); // downloadFile(thumbURL, 'simple.jpg');\n\n            recordBtn.disabled = false;\n            downloadBtn.removeEventListener('click', handleDownload);\n            downloadBtn.disabled = true;\n            recordBtn.textContent = 'StartRecording';\n            init();\n\n          case 6:\n          case \"end\":\n            return _context.stop();\n        }\n      }\n    }, _callee);\n  }));\n\n  return function handleDownload(_x) {\n    return _ref.apply(this, arguments);\n  };\n}();\n\nvar handleRecord = function handleRecord(e) {\n  if (recordState === false) {\n    recordState = true;\n    recordBtn.textContent = 'StopRecording';\n    recorder = new MediaRecorder(videoStream, {\n      MimeType: 'video/mp4'\n    });\n\n    recorder.ondataavailable = function (e) {\n      videoURL = URL.createObjectURL(e.data);\n      recordVideo.srcObject = null;\n      recordVideo.src = videoURL;\n      recordVideo.loop = true;\n      recordVideo.play();\n    };\n\n    recorder.start();\n  } else {\n    recorder.stop();\n    recordState = false;\n    recordBtn.disabled = true;\n    downloadBtn.disabled = false;\n    downloadBtn.addEventListener('click', handleDownload);\n  }\n};\n\nrecordBtn.addEventListener('click', handleRecord);\n\nvar init = /*#__PURE__*/function () {\n  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {\n    return regeneratorRuntime.wrap(function _callee2$(_context2) {\n      while (1) {\n        switch (_context2.prev = _context2.next) {\n          case 0:\n            downloadBtn.disabled = true;\n            _context2.next = 3;\n            return navigator.mediaDevices.getUserMedia({\n              video: true,\n              Audio: true\n            });\n\n          case 3:\n            videoStream = _context2.sent;\n            recordVideo.srcObject = videoStream;\n            recordVideo.play();\n\n          case 6:\n          case \"end\":\n            return _context2.stop();\n        }\n      }\n    }, _callee2);\n  }));\n\n  return function init() {\n    return _ref2.apply(this, arguments);\n  };\n}();\n\ninit();\n\n//# sourceURL=webpack://youchallenge/./src/client/js/videorecord.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/client/js/videorecord.js"]();
/******/ 	
/******/ })()
;