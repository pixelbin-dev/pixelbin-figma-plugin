/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./formOptions.js":
/*!************************!*\
  !*** ./formOptions.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
const ebgOptions = [
	{
		name: "Industry Type",
		type: "enum",
		enum: ["general", "ecommerce", "car", "human"],
		preview: ["car"],
		default: "general",
		identifier: "i",
		title: "Industry type",
	},
	{
		name: "Add Shadow",
		title: "Add Shadow (cars only)",
		type: "boolean",
		default: false,
		preview: false,
		identifier: "shadow",
	},
	{
		name: "Refine",
		title: "Refine Output",
		type: "boolean",
		default: true,
		identifier: "r",
	},
];

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ebgOptions);


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
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!*********************!*\
  !*** ./src/code.ts ***!
  \*********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _formOptions_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./../formOptions.js */ "./formOptions.js");
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};

figma.showUI(__html__, {
    title: "Erase Bg",
    height: 400,
    width: 248,
    themeColors: true,
});
figma.ui.onmessage = (msg) => __awaiter(void 0, void 0, void 0, function* () {
    if (msg.type === "initialCall") {
        const body = {
            type: "createForm",
            optionsArray: _formOptions_js__WEBPACK_IMPORTED_MODULE_0__["default"],
            savedFormValue: "",
        };
        figma.clientStorage
            .getAsync("savedFormValue")
            .then((value) => {
            body.savedFormValue = value;
        })
            .catch((err) => {
            console.error("Error loading data:", err);
        })
            .finally(() => {
            figma.ui.postMessage(body);
        });
    }
    if (msg.type === "transform") {
        if (msg.params) {
            figma.clientStorage
                .setAsync("savedFormValue", msg.params)
                .then(() => {
                console.log(`Data saved`);
            })
                .catch((err) => {
                console.error("Error saving data:", err);
            });
        }
        if (figma.currentPage.selection.length > 1)
            figma.notify("Please select a single node");
        else {
            let node = figma.currentPage.selection[0];
            try {
                const res = yield fetch("http://localhost:8081/service/platform/assets/v1.0/upload/signed-url", {
                    method: "POST",
                    headers: {
                        "x-pixelbin-token": "da66bab0-723a-4157-94ab-b4e83fd910e1",
                        "Content-Type": "application/json",
                        // mode: "cors",
                    },
                    body: JSON.stringify({
                        path: "path/to/containing/folder",
                        name: "filename",
                        format: "jpeg",
                        access: "public-read",
                        tags: ["tag1", "tag2"],
                        metadata: {},
                        overwrite: false,
                        filenameOverride: true,
                    }),
                    redirect: "follow",
                });
                console.log("sure", res);
            }
            catch (err) {
                console.log("Err", err);
            }
            if (node.fills[0].type === "IMAGE") {
                const image = figma.getImageByHash(node.fills[0].imageHash);
                let bytes = null;
                if (image) {
                    bytes = yield image.getBytesAsync();
                    // const imageLayer = figma.createImage(bytes);
                    // figma.currentPage.appendChild(imageLayer);
                    figma.ui.postMessage({
                        type: "selectedImage",
                        imageBytes: bytes,
                    });
                }
            }
            figma
                .createImageAsync("https://cdn.pixelbin.io/v2/muddy-lab-41820d/erase.bg(i:general,shadow:false,r:true)/__playground/playground-default.jpeg")
                .then((image) => __awaiter(void 0, void 0, void 0, function* () {
                node.fills = [
                    {
                        type: "IMAGE",
                        imageHash: image.hash,
                        scaleMode: "FILL",
                    },
                ];
            }))
                .then(() => {
                figma.closePlugin();
            });
        }
    }
    else if (msg.type === "close-plugin")
        figma.closePlugin();
});

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29kZS5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7O0FBRUEsaUVBQWUsVUFBVSxFQUFDOzs7Ozs7O1VDM0IxQjtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7Ozs7Ozs7O0FDTkEsaUJBQWlCLFNBQUksSUFBSSxTQUFJO0FBQzdCLDRCQUE0QiwrREFBK0QsaUJBQWlCO0FBQzVHO0FBQ0Esb0NBQW9DLE1BQU0sK0JBQStCLFlBQVk7QUFDckYsbUNBQW1DLE1BQU0sbUNBQW1DLFlBQVk7QUFDeEYsZ0NBQWdDO0FBQ2hDO0FBQ0EsS0FBSztBQUNMO0FBQzZDO0FBQzdDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSwwQkFBMEIsdURBQVU7QUFDcEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQjtBQUNyQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQ0FBb0M7QUFDcEM7QUFDQTtBQUNBLHFCQUFxQjtBQUNyQjtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUI7QUFDckI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUI7QUFDckI7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8xNHRoRGVjLy4vZm9ybU9wdGlvbnMuanMiLCJ3ZWJwYWNrOi8vMTR0aERlYy93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly8xNHRoRGVjL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly8xNHRoRGVjL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vMTR0aERlYy93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovLzE0dGhEZWMvLi9zcmMvY29kZS50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBlYmdPcHRpb25zID0gW1xuXHR7XG5cdFx0bmFtZTogXCJJbmR1c3RyeSBUeXBlXCIsXG5cdFx0dHlwZTogXCJlbnVtXCIsXG5cdFx0ZW51bTogW1wiZ2VuZXJhbFwiLCBcImVjb21tZXJjZVwiLCBcImNhclwiLCBcImh1bWFuXCJdLFxuXHRcdHByZXZpZXc6IFtcImNhclwiXSxcblx0XHRkZWZhdWx0OiBcImdlbmVyYWxcIixcblx0XHRpZGVudGlmaWVyOiBcImlcIixcblx0XHR0aXRsZTogXCJJbmR1c3RyeSB0eXBlXCIsXG5cdH0sXG5cdHtcblx0XHRuYW1lOiBcIkFkZCBTaGFkb3dcIixcblx0XHR0aXRsZTogXCJBZGQgU2hhZG93IChjYXJzIG9ubHkpXCIsXG5cdFx0dHlwZTogXCJib29sZWFuXCIsXG5cdFx0ZGVmYXVsdDogZmFsc2UsXG5cdFx0cHJldmlldzogZmFsc2UsXG5cdFx0aWRlbnRpZmllcjogXCJzaGFkb3dcIixcblx0fSxcblx0e1xuXHRcdG5hbWU6IFwiUmVmaW5lXCIsXG5cdFx0dGl0bGU6IFwiUmVmaW5lIE91dHB1dFwiLFxuXHRcdHR5cGU6IFwiYm9vbGVhblwiLFxuXHRcdGRlZmF1bHQ6IHRydWUsXG5cdFx0aWRlbnRpZmllcjogXCJyXCIsXG5cdH0sXG5dO1xuXG5leHBvcnQgZGVmYXVsdCBlYmdPcHRpb25zO1xuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJ2YXIgX19hd2FpdGVyID0gKHRoaXMgJiYgdGhpcy5fX2F3YWl0ZXIpIHx8IGZ1bmN0aW9uICh0aGlzQXJnLCBfYXJndW1lbnRzLCBQLCBnZW5lcmF0b3IpIHtcbiAgICBmdW5jdGlvbiBhZG9wdCh2YWx1ZSkgeyByZXR1cm4gdmFsdWUgaW5zdGFuY2VvZiBQID8gdmFsdWUgOiBuZXcgUChmdW5jdGlvbiAocmVzb2x2ZSkgeyByZXNvbHZlKHZhbHVlKTsgfSk7IH1cbiAgICByZXR1cm4gbmV3IChQIHx8IChQID0gUHJvbWlzZSkpKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgZnVuY3Rpb24gZnVsZmlsbGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yLm5leHQodmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgICBmdW5jdGlvbiByZWplY3RlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvcltcInRocm93XCJdKHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgICAgZnVuY3Rpb24gc3RlcChyZXN1bHQpIHsgcmVzdWx0LmRvbmUgPyByZXNvbHZlKHJlc3VsdC52YWx1ZSkgOiBhZG9wdChyZXN1bHQudmFsdWUpLnRoZW4oZnVsZmlsbGVkLCByZWplY3RlZCk7IH1cbiAgICAgICAgc3RlcCgoZ2VuZXJhdG9yID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pKS5uZXh0KCkpO1xuICAgIH0pO1xufTtcbmltcG9ydCBlYmdPcHRpb25zIGZyb20gXCIuLy4uL2Zvcm1PcHRpb25zLmpzXCI7XG5maWdtYS5zaG93VUkoX19odG1sX18sIHtcbiAgICB0aXRsZTogXCJFcmFzZSBCZ1wiLFxuICAgIGhlaWdodDogNDAwLFxuICAgIHdpZHRoOiAyNDgsXG4gICAgdGhlbWVDb2xvcnM6IHRydWUsXG59KTtcbmZpZ21hLnVpLm9ubWVzc2FnZSA9IChtc2cpID0+IF9fYXdhaXRlcih2b2lkIDAsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgIGlmIChtc2cudHlwZSA9PT0gXCJpbml0aWFsQ2FsbFwiKSB7XG4gICAgICAgIGNvbnN0IGJvZHkgPSB7XG4gICAgICAgICAgICB0eXBlOiBcImNyZWF0ZUZvcm1cIixcbiAgICAgICAgICAgIG9wdGlvbnNBcnJheTogZWJnT3B0aW9ucyxcbiAgICAgICAgICAgIHNhdmVkRm9ybVZhbHVlOiBcIlwiLFxuICAgICAgICB9O1xuICAgICAgICBmaWdtYS5jbGllbnRTdG9yYWdlXG4gICAgICAgICAgICAuZ2V0QXN5bmMoXCJzYXZlZEZvcm1WYWx1ZVwiKVxuICAgICAgICAgICAgLnRoZW4oKHZhbHVlKSA9PiB7XG4gICAgICAgICAgICBib2R5LnNhdmVkRm9ybVZhbHVlID0gdmFsdWU7XG4gICAgICAgIH0pXG4gICAgICAgICAgICAuY2F0Y2goKGVycikgPT4ge1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcihcIkVycm9yIGxvYWRpbmcgZGF0YTpcIiwgZXJyKTtcbiAgICAgICAgfSlcbiAgICAgICAgICAgIC5maW5hbGx5KCgpID0+IHtcbiAgICAgICAgICAgIGZpZ21hLnVpLnBvc3RNZXNzYWdlKGJvZHkpO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgaWYgKG1zZy50eXBlID09PSBcInRyYW5zZm9ybVwiKSB7XG4gICAgICAgIGlmIChtc2cucGFyYW1zKSB7XG4gICAgICAgICAgICBmaWdtYS5jbGllbnRTdG9yYWdlXG4gICAgICAgICAgICAgICAgLnNldEFzeW5jKFwic2F2ZWRGb3JtVmFsdWVcIiwgbXNnLnBhcmFtcylcbiAgICAgICAgICAgICAgICAudGhlbigoKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coYERhdGEgc2F2ZWRgKTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgLmNhdGNoKChlcnIpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKFwiRXJyb3Igc2F2aW5nIGRhdGE6XCIsIGVycik7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoZmlnbWEuY3VycmVudFBhZ2Uuc2VsZWN0aW9uLmxlbmd0aCA+IDEpXG4gICAgICAgICAgICBmaWdtYS5ub3RpZnkoXCJQbGVhc2Ugc2VsZWN0IGEgc2luZ2xlIG5vZGVcIik7XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgbGV0IG5vZGUgPSBmaWdtYS5jdXJyZW50UGFnZS5zZWxlY3Rpb25bMF07XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIGNvbnN0IHJlcyA9IHlpZWxkIGZldGNoKFwiaHR0cDovL2xvY2FsaG9zdDo4MDgxL3NlcnZpY2UvcGxhdGZvcm0vYXNzZXRzL3YxLjAvdXBsb2FkL3NpZ25lZC11cmxcIiwge1xuICAgICAgICAgICAgICAgICAgICBtZXRob2Q6IFwiUE9TVFwiLFxuICAgICAgICAgICAgICAgICAgICBoZWFkZXJzOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBcIngtcGl4ZWxiaW4tdG9rZW5cIjogXCJkYTY2YmFiMC03MjNhLTQxNTctOTRhYi1iNGU4M2ZkOTEwZTFcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiQ29udGVudC1UeXBlXCI6IFwiYXBwbGljYXRpb24vanNvblwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gbW9kZTogXCJjb3JzXCIsXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHBhdGg6IFwicGF0aC90by9jb250YWluaW5nL2ZvbGRlclwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJmaWxlbmFtZVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgZm9ybWF0OiBcImpwZWdcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIGFjY2VzczogXCJwdWJsaWMtcmVhZFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgdGFnczogW1widGFnMVwiLCBcInRhZzJcIl0sXG4gICAgICAgICAgICAgICAgICAgICAgICBtZXRhZGF0YToge30sXG4gICAgICAgICAgICAgICAgICAgICAgICBvdmVyd3JpdGU6IGZhbHNlLFxuICAgICAgICAgICAgICAgICAgICAgICAgZmlsZW5hbWVPdmVycmlkZTogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICAgICAgICAgIHJlZGlyZWN0OiBcImZvbGxvd1wiLFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwic3VyZVwiLCByZXMpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2F0Y2ggKGVycikge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiRXJyXCIsIGVycik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAobm9kZS5maWxsc1swXS50eXBlID09PSBcIklNQUdFXCIpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBpbWFnZSA9IGZpZ21hLmdldEltYWdlQnlIYXNoKG5vZGUuZmlsbHNbMF0uaW1hZ2VIYXNoKTtcbiAgICAgICAgICAgICAgICBsZXQgYnl0ZXMgPSBudWxsO1xuICAgICAgICAgICAgICAgIGlmIChpbWFnZSkge1xuICAgICAgICAgICAgICAgICAgICBieXRlcyA9IHlpZWxkIGltYWdlLmdldEJ5dGVzQXN5bmMoKTtcbiAgICAgICAgICAgICAgICAgICAgLy8gY29uc3QgaW1hZ2VMYXllciA9IGZpZ21hLmNyZWF0ZUltYWdlKGJ5dGVzKTtcbiAgICAgICAgICAgICAgICAgICAgLy8gZmlnbWEuY3VycmVudFBhZ2UuYXBwZW5kQ2hpbGQoaW1hZ2VMYXllcik7XG4gICAgICAgICAgICAgICAgICAgIGZpZ21hLnVpLnBvc3RNZXNzYWdlKHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6IFwic2VsZWN0ZWRJbWFnZVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgaW1hZ2VCeXRlczogYnl0ZXMsXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGZpZ21hXG4gICAgICAgICAgICAgICAgLmNyZWF0ZUltYWdlQXN5bmMoXCJodHRwczovL2Nkbi5waXhlbGJpbi5pby92Mi9tdWRkeS1sYWItNDE4MjBkL2VyYXNlLmJnKGk6Z2VuZXJhbCxzaGFkb3c6ZmFsc2Uscjp0cnVlKS9fX3BsYXlncm91bmQvcGxheWdyb3VuZC1kZWZhdWx0LmpwZWdcIilcbiAgICAgICAgICAgICAgICAudGhlbigoaW1hZ2UpID0+IF9fYXdhaXRlcih2b2lkIDAsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgICAgICAgICAgICAgIG5vZGUuZmlsbHMgPSBbXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6IFwiSU1BR0VcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIGltYWdlSGFzaDogaW1hZ2UuaGFzaCxcbiAgICAgICAgICAgICAgICAgICAgICAgIHNjYWxlTW9kZTogXCJGSUxMXCIsXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgXTtcbiAgICAgICAgICAgIH0pKVxuICAgICAgICAgICAgICAgIC50aGVuKCgpID0+IHtcbiAgICAgICAgICAgICAgICBmaWdtYS5jbG9zZVBsdWdpbigpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgZWxzZSBpZiAobXNnLnR5cGUgPT09IFwiY2xvc2UtcGx1Z2luXCIpXG4gICAgICAgIGZpZ21hLmNsb3NlUGx1Z2luKCk7XG59KTtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==