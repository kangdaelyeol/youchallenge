/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/node-fetch/browser.js":
/*!********************************************!*\
  !*** ./node_modules/node-fetch/browser.js ***!
  \********************************************/
/***/ ((module, exports) => {

eval(" // ref: https://github.com/tc39/proposal-global\n\nvar getGlobal = function getGlobal() {\n  // the only reliable means to get the global object is\n  // `Function('return this')()`\n  // However, this causes CSP violations in Chrome apps.\n  if (typeof self !== 'undefined') {\n    return self;\n  }\n\n  if (typeof window !== 'undefined') {\n    return window;\n  }\n\n  if (typeof global !== 'undefined') {\n    return global;\n  }\n\n  throw new Error('unable to locate global object');\n};\n\nvar global = getGlobal();\nmodule.exports = exports = global.fetch; // Needed for TypeScript and Webpack.\n\nif (global.fetch) {\n  exports.default = global.fetch.bind(global);\n}\n\nexports.Headers = global.Headers;\nexports.Request = global.Request;\nexports.Response = global.Response;\n\n//# sourceURL=webpack://youchallenge/./node_modules/node-fetch/browser.js?");

/***/ }),

/***/ "./src/client/js/videocontroller.js":
/*!******************************************!*\
  !*** ./src/client/js/videocontroller.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var node_fetch__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! node-fetch */ \"./node_modules/node-fetch/browser.js\");\n/* harmony import */ var node_fetch__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(node_fetch__WEBPACK_IMPORTED_MODULE_0__);\nfunction asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }\n\nfunction _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, \"next\", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, \"throw\", err); } _next(undefined); }); }; }\n\n\nvar playBtn = document.querySelector('.playbtn');\nvar muteBtn = document.querySelector('.mutebtn');\nvar videoTime = document.querySelector('.videotime');\nvar videoVolume = document.querySelector('.videovolume');\nvar video = document.querySelector('.video');\nvar videoSection = document.querySelector('.videosection');\nvar currentTime = document.querySelector('.currenttime');\nvar fullTime = document.querySelector('.fulltime');\nvar fullScreenBtn = document.querySelector(\".fullscreenbtn\");\nvar videoViews = document.querySelector(\".views\");\nvar videoVolumeValue;\nvar FullscreenElement = null;\n\nvar timeFormat = function timeFormat(time) {\n  return new Date(Math.floor(time * 1000)).toISOString().substr(14, 5);\n};\n\nvar handlemetadata = function handlemetadata() {\n  // setTime\n  setTimeout(function () {\n    var time = timeFormat(video.duration);\n    fullTime.textContent = time;\n    videoTime.max = Math.floor(video.duration);\n    videoTime.value = 0;\n    videoVolumeValue = video.volume;\n  }, 100);\n};\n\nvar handleTimeupdate = function handleTimeupdate() {\n  currentTime.textContent = timeFormat(video.currentTime);\n  videoTime.value = video.currentTime;\n};\n\nvar handlePlay = function handlePlay() {\n  if (video.paused) {\n    playBtn.textContent = 'Pause';\n    video.play();\n  } else {\n    playBtn.textContent = 'Play';\n    video.pause();\n  }\n};\n\nvar handlevideoTimer = function handlevideoTimer(e) {\n  video.currentTime = e.target.value;\n};\n\nvar handlevideoVolume = function handlevideoVolume(e) {\n  videoVolumeValue = video.volume = e.target.value;\n\n  if (e.target.value === '0') {\n    video.muted = true;\n    muteBtn.textContent = 'Unmute';\n  } else {\n    video.muted = false;\n    muteBtn.textContent = 'Mute';\n  }\n};\n\nvar handleMute = function handleMute() {\n  if (video.muted) {\n    video.muted = false;\n    muteBtn.textContent = 'Mute';\n    videoVolume.value = videoVolumeValue;\n  } else {\n    video.muted = true;\n    muteBtn.textContent = 'Unmute';\n    videoVolume.value = 0;\n  }\n};\n\nvar handleFullScreen = function handleFullScreen() {\n  FullscreenElement = document.fullscreenElement;\n\n  if (!FullscreenElement) {\n    videoSection.requestFullscreen();\n    fullScreenBtn.textContent = \"ExitFullscreen\";\n  } else {\n    document.exitFullscreen();\n    fullScreenBtn.textContent = \"Fullscreen\";\n  }\n};\n\nvar handleEnded = /*#__PURE__*/function () {\n  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {\n    var videoID, res, json, view;\n    return regeneratorRuntime.wrap(function _callee$(_context) {\n      while (1) {\n        switch (_context.prev = _context.next) {\n          case 0:\n            playBtn.textContent = 'Play';\n            videoID = video.dataset.id; // Add views to Video\n\n            _context.next = 4;\n            return node_fetch__WEBPACK_IMPORTED_MODULE_0___default()(\"/api/video/\".concat(videoID, \"/addview\"), {\n              method: \"post\"\n            });\n\n          case 4:\n            res = _context.sent;\n\n            if (!(res.status === 201)) {\n              _context.next = 12;\n              break;\n            }\n\n            _context.next = 8;\n            return res.json();\n\n          case 8:\n            json = _context.sent;\n            view = json.views;\n            console.log(view);\n            videoViews.textContent = view === 1 ? \"1 view\" : \"\".concat(view, \" views\");\n\n          case 12:\n          case \"end\":\n            return _context.stop();\n        }\n      }\n    }, _callee);\n  }));\n\n  return function handleEnded() {\n    return _ref.apply(this, arguments);\n  };\n}();\n\nvideo.addEventListener('loadedmetadata', handlemetadata);\nvideo.addEventListener('timeupdate', handleTimeupdate);\nvideo.addEventListener(\"ended\", handleEnded);\nplayBtn.addEventListener('click', handlePlay);\nmuteBtn.addEventListener('click', handleMute);\nvideoTime.addEventListener('input', handlevideoTimer);\nvideoVolume.addEventListener('input', handlevideoVolume);\nfullScreenBtn.addEventListener(\"click\", handleFullScreen);\n\n//# sourceURL=webpack://youchallenge/./src/client/js/videocontroller.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/client/js/videocontroller.js");
/******/ 	
/******/ })()
;