/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "app/api/media/route";
exports.ids = ["app/api/media/route"];
exports.modules = {

/***/ "(rsc)/./app/api/media/route.js":
/*!********************************!*\
  !*** ./app/api/media/route.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   GET: () => (/* binding */ GET)\n/* harmony export */ });\n/* harmony import */ var next_server__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/server */ \"(rsc)/./node_modules/next/dist/api/server.js\");\n/* harmony import */ var _lib_fs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/lib/fs */ \"(rsc)/./lib/fs.js\");\n\n\nasync function GET(req) {\n    const { searchParams } = new URL(req.url);\n    const reqPath = searchParams.get('path');\n    // No path → return roots + first root listing\n    if (!reqPath) {\n        try {\n            const entries = _lib_fs__WEBPACK_IMPORTED_MODULE_1__.ROOTS.length > 0 ? await (0,_lib_fs__WEBPACK_IMPORTED_MODULE_1__.listDir)(_lib_fs__WEBPACK_IMPORTED_MODULE_1__.ROOTS[0]) : [];\n            return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n                roots: _lib_fs__WEBPACK_IMPORTED_MODULE_1__.ROOTS,\n                entries\n            });\n        } catch  {\n            return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n                roots: _lib_fs__WEBPACK_IMPORTED_MODULE_1__.ROOTS,\n                entries: []\n            });\n        }\n    }\n    try {\n        const entries = await (0,_lib_fs__WEBPACK_IMPORTED_MODULE_1__.listDir)(reqPath);\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            entries\n        });\n    } catch (err) {\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            error: err.message\n        }, {\n            status: 400\n        });\n    }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9hcHAvYXBpL21lZGlhL3JvdXRlLmpzIiwibWFwcGluZ3MiOiI7Ozs7OztBQUEwQztBQUNEO0FBRWxDLGVBQWVHLElBQUlDLEdBQUc7SUFDM0IsTUFBTSxFQUFFQyxZQUFZLEVBQUUsR0FBRyxJQUFJQyxJQUFJRixJQUFJRyxHQUFHO0lBQ3hDLE1BQU1DLFVBQVVILGFBQWFJLEdBQUcsQ0FBQztJQUVqQyw4Q0FBOEM7SUFDOUMsSUFBSSxDQUFDRCxTQUFTO1FBQ1osSUFBSTtZQUNGLE1BQU1FLFVBQVVSLDBDQUFLQSxDQUFDUyxNQUFNLEdBQUcsSUFBSSxNQUFNVixnREFBT0EsQ0FBQ0MsMENBQUssQ0FBQyxFQUFFLElBQUksRUFBRTtZQUMvRCxPQUFPRixxREFBWUEsQ0FBQ1ksSUFBSSxDQUFDO2dCQUFFQyxPQUFPWCwwQ0FBS0E7Z0JBQUVRO1lBQVE7UUFDbkQsRUFBRSxPQUFNO1lBQ04sT0FBT1YscURBQVlBLENBQUNZLElBQUksQ0FBQztnQkFBRUMsT0FBT1gsMENBQUtBO2dCQUFFUSxTQUFTLEVBQUU7WUFBQztRQUN2RDtJQUNGO0lBRUEsSUFBSTtRQUNGLE1BQU1BLFVBQVUsTUFBTVQsZ0RBQU9BLENBQUNPO1FBQzlCLE9BQU9SLHFEQUFZQSxDQUFDWSxJQUFJLENBQUM7WUFBRUY7UUFBUTtJQUNyQyxFQUFFLE9BQU9JLEtBQUs7UUFDWixPQUFPZCxxREFBWUEsQ0FBQ1ksSUFBSSxDQUFDO1lBQUVHLE9BQU9ELElBQUlFLE9BQU87UUFBQyxHQUFHO1lBQUVDLFFBQVE7UUFBSTtJQUNqRTtBQUNGIiwic291cmNlcyI6WyIvaG9tZS9zaGF3b24vRGV2ZWxvcGVyL1NlcnZlci1LaXQvYXBwL2FwaS9tZWRpYS9yb3V0ZS5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZXh0UmVzcG9uc2UgfSBmcm9tICduZXh0L3NlcnZlcidcbmltcG9ydCB7IGxpc3REaXIsIFJPT1RTIH0gZnJvbSAnQC9saWIvZnMnXG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBHRVQocmVxKSB7XG4gIGNvbnN0IHsgc2VhcmNoUGFyYW1zIH0gPSBuZXcgVVJMKHJlcS51cmwpXG4gIGNvbnN0IHJlcVBhdGggPSBzZWFyY2hQYXJhbXMuZ2V0KCdwYXRoJylcblxuICAvLyBObyBwYXRoIOKGkiByZXR1cm4gcm9vdHMgKyBmaXJzdCByb290IGxpc3RpbmdcbiAgaWYgKCFyZXFQYXRoKSB7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IGVudHJpZXMgPSBST09UUy5sZW5ndGggPiAwID8gYXdhaXQgbGlzdERpcihST09UU1swXSkgOiBbXVxuICAgICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKHsgcm9vdHM6IFJPT1RTLCBlbnRyaWVzIH0pXG4gICAgfSBjYXRjaCB7XG4gICAgICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24oeyByb290czogUk9PVFMsIGVudHJpZXM6IFtdIH0pXG4gICAgfVxuICB9XG5cbiAgdHJ5IHtcbiAgICBjb25zdCBlbnRyaWVzID0gYXdhaXQgbGlzdERpcihyZXFQYXRoKVxuICAgIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbih7IGVudHJpZXMgfSlcbiAgfSBjYXRjaCAoZXJyKSB7XG4gICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKHsgZXJyb3I6IGVyci5tZXNzYWdlIH0sIHsgc3RhdHVzOiA0MDAgfSlcbiAgfVxufVxuIl0sIm5hbWVzIjpbIk5leHRSZXNwb25zZSIsImxpc3REaXIiLCJST09UUyIsIkdFVCIsInJlcSIsInNlYXJjaFBhcmFtcyIsIlVSTCIsInVybCIsInJlcVBhdGgiLCJnZXQiLCJlbnRyaWVzIiwibGVuZ3RoIiwianNvbiIsInJvb3RzIiwiZXJyIiwiZXJyb3IiLCJtZXNzYWdlIiwic3RhdHVzIl0sImlnbm9yZUxpc3QiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./app/api/media/route.js\n");

/***/ }),

/***/ "(rsc)/./lib/fs.js":
/*!*******************!*\
  !*** ./lib/fs.js ***!
  \*******************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   ROOTS: () => (/* binding */ ROOTS),\n/* harmony export */   isAllowed: () => (/* binding */ isAllowed),\n/* harmony export */   listDir: () => (/* binding */ listDir)\n/* harmony export */ });\n/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! fs */ \"fs\");\n/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(fs__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! path */ \"path\");\n/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(path__WEBPACK_IMPORTED_MODULE_1__);\n\n\nconst ROOTS = (process.env.MEDIA_ROOTS || '/mnt/media,/mnt/webserver').split(',').map((p)=>path__WEBPACK_IMPORTED_MODULE_1___default().resolve(p.trim()));\nfunction isAllowed(target) {\n    if (!target) return false;\n    const resolved = path__WEBPACK_IMPORTED_MODULE_1___default().resolve(target);\n    return ROOTS.some((root)=>resolved === root || resolved.startsWith(root + (path__WEBPACK_IMPORTED_MODULE_1___default().sep)));\n}\nasync function listDir(dirPath) {\n    if (!isAllowed(dirPath)) throw new Error('Path outside allowed roots');\n    const entries = await fs__WEBPACK_IMPORTED_MODULE_0__.promises.readdir(dirPath, {\n        withFileTypes: true\n    });\n    const items = await Promise.all(entries.map(async (entry)=>{\n        const full = path__WEBPACK_IMPORTED_MODULE_1___default().join(dirPath, entry.name);\n        try {\n            const stat = await fs__WEBPACK_IMPORTED_MODULE_0__.promises.stat(full);\n            return {\n                name: entry.name,\n                type: entry.isDirectory() ? 'dir' : 'file',\n                size: stat.size,\n                modified: stat.mtime.toISOString(),\n                path: full\n            };\n        } catch  {\n            return null;\n        }\n    }));\n    return items.filter(Boolean).sort((a, b)=>{\n        if (a.type !== b.type) return a.type === 'dir' ? -1 : 1;\n        return a.name.localeCompare(b.name);\n    });\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9saWIvZnMuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFtQztBQUNaO0FBRWhCLE1BQU1HLFFBQVEsQ0FBQ0MsUUFBUUMsR0FBRyxDQUFDQyxXQUFXLElBQUksMkJBQTBCLEVBQ3hFQyxLQUFLLENBQUMsS0FDTkMsR0FBRyxDQUFDQyxDQUFBQSxJQUFLUCxtREFBWSxDQUFDTyxFQUFFRSxJQUFJLEtBQUk7QUFFNUIsU0FBU0MsVUFBVUMsTUFBTTtJQUM5QixJQUFJLENBQUNBLFFBQVEsT0FBTztJQUNwQixNQUFNQyxXQUFXWixtREFBWSxDQUFDVztJQUM5QixPQUFPVixNQUFNWSxJQUFJLENBQUNDLENBQUFBLE9BQVFGLGFBQWFFLFFBQVFGLFNBQVNHLFVBQVUsQ0FBQ0QsT0FBT2QsaURBQVE7QUFDcEY7QUFFTyxlQUFlaUIsUUFBUUMsT0FBTztJQUNuQyxJQUFJLENBQUNSLFVBQVVRLFVBQVUsTUFBTSxJQUFJQyxNQUFNO0lBRXpDLE1BQU1DLFVBQVUsTUFBTXJCLHdDQUFFQSxDQUFDc0IsT0FBTyxDQUFDSCxTQUFTO1FBQUVJLGVBQWU7SUFBSztJQUNoRSxNQUFNQyxRQUFRLE1BQU1DLFFBQVFDLEdBQUcsQ0FDN0JMLFFBQVFkLEdBQUcsQ0FBQyxPQUFNb0I7UUFDaEIsTUFBTUMsT0FBTzNCLGdEQUFTLENBQUNrQixTQUFTUSxNQUFNRyxJQUFJO1FBQzFDLElBQUk7WUFDRixNQUFNQyxPQUFPLE1BQU0vQix3Q0FBRUEsQ0FBQytCLElBQUksQ0FBQ0g7WUFDM0IsT0FBTztnQkFDTEUsTUFBTUgsTUFBTUcsSUFBSTtnQkFDaEJFLE1BQU1MLE1BQU1NLFdBQVcsS0FBSyxRQUFRO2dCQUNwQ0MsTUFBTUgsS0FBS0csSUFBSTtnQkFDZkMsVUFBVUosS0FBS0ssS0FBSyxDQUFDQyxXQUFXO2dCQUNoQ3BDLE1BQU0yQjtZQUNSO1FBQ0YsRUFBRSxPQUFNO1lBQ04sT0FBTztRQUNUO0lBQ0Y7SUFHRixPQUFPSixNQUNKYyxNQUFNLENBQUNDLFNBQ1BDLElBQUksQ0FBQyxDQUFDQyxHQUFHQztRQUNSLElBQUlELEVBQUVULElBQUksS0FBS1UsRUFBRVYsSUFBSSxFQUFFLE9BQU9TLEVBQUVULElBQUksS0FBSyxRQUFRLENBQUMsSUFBSTtRQUN0RCxPQUFPUyxFQUFFWCxJQUFJLENBQUNhLGFBQWEsQ0FBQ0QsRUFBRVosSUFBSTtJQUNwQztBQUNKIiwic291cmNlcyI6WyIvaG9tZS9zaGF3b24vRGV2ZWxvcGVyL1NlcnZlci1LaXQvbGliL2ZzLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IHByb21pc2VzIGFzIGZzIH0gZnJvbSAnZnMnXG5pbXBvcnQgcGF0aCBmcm9tICdwYXRoJ1xuXG5leHBvcnQgY29uc3QgUk9PVFMgPSAocHJvY2Vzcy5lbnYuTUVESUFfUk9PVFMgfHwgJy9tbnQvbWVkaWEsL21udC93ZWJzZXJ2ZXInKVxuICAuc3BsaXQoJywnKVxuICAubWFwKHAgPT4gcGF0aC5yZXNvbHZlKHAudHJpbSgpKSlcblxuZXhwb3J0IGZ1bmN0aW9uIGlzQWxsb3dlZCh0YXJnZXQpIHtcbiAgaWYgKCF0YXJnZXQpIHJldHVybiBmYWxzZVxuICBjb25zdCByZXNvbHZlZCA9IHBhdGgucmVzb2x2ZSh0YXJnZXQpXG4gIHJldHVybiBST09UUy5zb21lKHJvb3QgPT4gcmVzb2x2ZWQgPT09IHJvb3QgfHwgcmVzb2x2ZWQuc3RhcnRzV2l0aChyb290ICsgcGF0aC5zZXApKVxufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gbGlzdERpcihkaXJQYXRoKSB7XG4gIGlmICghaXNBbGxvd2VkKGRpclBhdGgpKSB0aHJvdyBuZXcgRXJyb3IoJ1BhdGggb3V0c2lkZSBhbGxvd2VkIHJvb3RzJylcblxuICBjb25zdCBlbnRyaWVzID0gYXdhaXQgZnMucmVhZGRpcihkaXJQYXRoLCB7IHdpdGhGaWxlVHlwZXM6IHRydWUgfSlcbiAgY29uc3QgaXRlbXMgPSBhd2FpdCBQcm9taXNlLmFsbChcbiAgICBlbnRyaWVzLm1hcChhc3luYyBlbnRyeSA9PiB7XG4gICAgICBjb25zdCBmdWxsID0gcGF0aC5qb2luKGRpclBhdGgsIGVudHJ5Lm5hbWUpXG4gICAgICB0cnkge1xuICAgICAgICBjb25zdCBzdGF0ID0gYXdhaXQgZnMuc3RhdChmdWxsKVxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIG5hbWU6IGVudHJ5Lm5hbWUsXG4gICAgICAgICAgdHlwZTogZW50cnkuaXNEaXJlY3RvcnkoKSA/ICdkaXInIDogJ2ZpbGUnLFxuICAgICAgICAgIHNpemU6IHN0YXQuc2l6ZSxcbiAgICAgICAgICBtb2RpZmllZDogc3RhdC5tdGltZS50b0lTT1N0cmluZygpLFxuICAgICAgICAgIHBhdGg6IGZ1bGwsXG4gICAgICAgIH1cbiAgICAgIH0gY2F0Y2gge1xuICAgICAgICByZXR1cm4gbnVsbFxuICAgICAgfVxuICAgIH0pXG4gIClcblxuICByZXR1cm4gaXRlbXNcbiAgICAuZmlsdGVyKEJvb2xlYW4pXG4gICAgLnNvcnQoKGEsIGIpID0+IHtcbiAgICAgIGlmIChhLnR5cGUgIT09IGIudHlwZSkgcmV0dXJuIGEudHlwZSA9PT0gJ2RpcicgPyAtMSA6IDFcbiAgICAgIHJldHVybiBhLm5hbWUubG9jYWxlQ29tcGFyZShiLm5hbWUpXG4gICAgfSlcbn1cbiJdLCJuYW1lcyI6WyJwcm9taXNlcyIsImZzIiwicGF0aCIsIlJPT1RTIiwicHJvY2VzcyIsImVudiIsIk1FRElBX1JPT1RTIiwic3BsaXQiLCJtYXAiLCJwIiwicmVzb2x2ZSIsInRyaW0iLCJpc0FsbG93ZWQiLCJ0YXJnZXQiLCJyZXNvbHZlZCIsInNvbWUiLCJyb290Iiwic3RhcnRzV2l0aCIsInNlcCIsImxpc3REaXIiLCJkaXJQYXRoIiwiRXJyb3IiLCJlbnRyaWVzIiwicmVhZGRpciIsIndpdGhGaWxlVHlwZXMiLCJpdGVtcyIsIlByb21pc2UiLCJhbGwiLCJlbnRyeSIsImZ1bGwiLCJqb2luIiwibmFtZSIsInN0YXQiLCJ0eXBlIiwiaXNEaXJlY3RvcnkiLCJzaXplIiwibW9kaWZpZWQiLCJtdGltZSIsInRvSVNPU3RyaW5nIiwiZmlsdGVyIiwiQm9vbGVhbiIsInNvcnQiLCJhIiwiYiIsImxvY2FsZUNvbXBhcmUiXSwiaWdub3JlTGlzdCI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./lib/fs.js\n");

/***/ }),

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fmedia%2Froute&page=%2Fapi%2Fmedia%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fmedia%2Froute.js&appDir=%2Fhome%2Fshawon%2FDeveloper%2FServer-Kit%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2Fhome%2Fshawon%2FDeveloper%2FServer-Kit&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!":
/*!***********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fmedia%2Froute&page=%2Fapi%2Fmedia%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fmedia%2Froute.js&appDir=%2Fhome%2Fshawon%2FDeveloper%2FServer-Kit%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2Fhome%2Fshawon%2FDeveloper%2FServer-Kit&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D! ***!
  \***********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   patchFetch: () => (/* binding */ patchFetch),\n/* harmony export */   routeModule: () => (/* binding */ routeModule),\n/* harmony export */   serverHooks: () => (/* binding */ serverHooks),\n/* harmony export */   workAsyncStorage: () => (/* binding */ workAsyncStorage),\n/* harmony export */   workUnitAsyncStorage: () => (/* binding */ workUnitAsyncStorage)\n/* harmony export */ });\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/dist/server/route-modules/app-route/module.compiled */ \"(rsc)/./node_modules/next/dist/server/route-modules/app-route/module.compiled.js\");\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/dist/server/route-kind */ \"(rsc)/./node_modules/next/dist/server/route-kind.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/dist/server/lib/patch-fetch */ \"(rsc)/./node_modules/next/dist/server/lib/patch-fetch.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _home_shawon_Developer_Server_Kit_app_api_media_route_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app/api/media/route.js */ \"(rsc)/./app/api/media/route.js\");\n\n\n\n\n// We inject the nextConfigOutput here so that we can use them in the route\n// module.\nconst nextConfigOutput = \"\"\nconst routeModule = new next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__.AppRouteRouteModule({\n    definition: {\n        kind: next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__.RouteKind.APP_ROUTE,\n        page: \"/api/media/route\",\n        pathname: \"/api/media\",\n        filename: \"route\",\n        bundlePath: \"app/api/media/route\"\n    },\n    resolvedPagePath: \"/home/shawon/Developer/Server-Kit/app/api/media/route.js\",\n    nextConfigOutput,\n    userland: _home_shawon_Developer_Server_Kit_app_api_media_route_js__WEBPACK_IMPORTED_MODULE_3__\n});\n// Pull out the exports that we need to expose from the module. This should\n// be eliminated when we've moved the other routes to the new format. These\n// are used to hook into the route.\nconst { workAsyncStorage, workUnitAsyncStorage, serverHooks } = routeModule;\nfunction patchFetch() {\n    return (0,next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__.patchFetch)({\n        workAsyncStorage,\n        workUnitAsyncStorage\n    });\n}\n\n\n//# sourceMappingURL=app-route.js.map//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvbmV4dC9kaXN0L2J1aWxkL3dlYnBhY2svbG9hZGVycy9uZXh0LWFwcC1sb2FkZXIvaW5kZXguanM/bmFtZT1hcHAlMkZhcGklMkZtZWRpYSUyRnJvdXRlJnBhZ2U9JTJGYXBpJTJGbWVkaWElMkZyb3V0ZSZhcHBQYXRocz0mcGFnZVBhdGg9cHJpdmF0ZS1uZXh0LWFwcC1kaXIlMkZhcGklMkZtZWRpYSUyRnJvdXRlLmpzJmFwcERpcj0lMkZob21lJTJGc2hhd29uJTJGRGV2ZWxvcGVyJTJGU2VydmVyLUtpdCUyRmFwcCZwYWdlRXh0ZW5zaW9ucz10c3gmcGFnZUV4dGVuc2lvbnM9dHMmcGFnZUV4dGVuc2lvbnM9anN4JnBhZ2VFeHRlbnNpb25zPWpzJnJvb3REaXI9JTJGaG9tZSUyRnNoYXdvbiUyRkRldmVsb3BlciUyRlNlcnZlci1LaXQmaXNEZXY9dHJ1ZSZ0c2NvbmZpZ1BhdGg9dHNjb25maWcuanNvbiZiYXNlUGF0aD0mYXNzZXRQcmVmaXg9Jm5leHRDb25maWdPdXRwdXQ9JnByZWZlcnJlZFJlZ2lvbj0mbWlkZGxld2FyZUNvbmZpZz1lMzAlM0QhIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQStGO0FBQ3ZDO0FBQ3FCO0FBQ1E7QUFDckY7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCLHlHQUFtQjtBQUMzQztBQUNBLGNBQWMsa0VBQVM7QUFDdkI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLFlBQVk7QUFDWixDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0EsUUFBUSxzREFBc0Q7QUFDOUQ7QUFDQSxXQUFXLDRFQUFXO0FBQ3RCO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDMEY7O0FBRTFGIiwic291cmNlcyI6WyIiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQXBwUm91dGVSb3V0ZU1vZHVsZSB9IGZyb20gXCJuZXh0L2Rpc3Qvc2VydmVyL3JvdXRlLW1vZHVsZXMvYXBwLXJvdXRlL21vZHVsZS5jb21waWxlZFwiO1xuaW1wb3J0IHsgUm91dGVLaW5kIH0gZnJvbSBcIm5leHQvZGlzdC9zZXJ2ZXIvcm91dGUta2luZFwiO1xuaW1wb3J0IHsgcGF0Y2hGZXRjaCBhcyBfcGF0Y2hGZXRjaCB9IGZyb20gXCJuZXh0L2Rpc3Qvc2VydmVyL2xpYi9wYXRjaC1mZXRjaFwiO1xuaW1wb3J0ICogYXMgdXNlcmxhbmQgZnJvbSBcIi9ob21lL3NoYXdvbi9EZXZlbG9wZXIvU2VydmVyLUtpdC9hcHAvYXBpL21lZGlhL3JvdXRlLmpzXCI7XG4vLyBXZSBpbmplY3QgdGhlIG5leHRDb25maWdPdXRwdXQgaGVyZSBzbyB0aGF0IHdlIGNhbiB1c2UgdGhlbSBpbiB0aGUgcm91dGVcbi8vIG1vZHVsZS5cbmNvbnN0IG5leHRDb25maWdPdXRwdXQgPSBcIlwiXG5jb25zdCByb3V0ZU1vZHVsZSA9IG5ldyBBcHBSb3V0ZVJvdXRlTW9kdWxlKHtcbiAgICBkZWZpbml0aW9uOiB7XG4gICAgICAgIGtpbmQ6IFJvdXRlS2luZC5BUFBfUk9VVEUsXG4gICAgICAgIHBhZ2U6IFwiL2FwaS9tZWRpYS9yb3V0ZVwiLFxuICAgICAgICBwYXRobmFtZTogXCIvYXBpL21lZGlhXCIsXG4gICAgICAgIGZpbGVuYW1lOiBcInJvdXRlXCIsXG4gICAgICAgIGJ1bmRsZVBhdGg6IFwiYXBwL2FwaS9tZWRpYS9yb3V0ZVwiXG4gICAgfSxcbiAgICByZXNvbHZlZFBhZ2VQYXRoOiBcIi9ob21lL3NoYXdvbi9EZXZlbG9wZXIvU2VydmVyLUtpdC9hcHAvYXBpL21lZGlhL3JvdXRlLmpzXCIsXG4gICAgbmV4dENvbmZpZ091dHB1dCxcbiAgICB1c2VybGFuZFxufSk7XG4vLyBQdWxsIG91dCB0aGUgZXhwb3J0cyB0aGF0IHdlIG5lZWQgdG8gZXhwb3NlIGZyb20gdGhlIG1vZHVsZS4gVGhpcyBzaG91bGRcbi8vIGJlIGVsaW1pbmF0ZWQgd2hlbiB3ZSd2ZSBtb3ZlZCB0aGUgb3RoZXIgcm91dGVzIHRvIHRoZSBuZXcgZm9ybWF0LiBUaGVzZVxuLy8gYXJlIHVzZWQgdG8gaG9vayBpbnRvIHRoZSByb3V0ZS5cbmNvbnN0IHsgd29ya0FzeW5jU3RvcmFnZSwgd29ya1VuaXRBc3luY1N0b3JhZ2UsIHNlcnZlckhvb2tzIH0gPSByb3V0ZU1vZHVsZTtcbmZ1bmN0aW9uIHBhdGNoRmV0Y2goKSB7XG4gICAgcmV0dXJuIF9wYXRjaEZldGNoKHtcbiAgICAgICAgd29ya0FzeW5jU3RvcmFnZSxcbiAgICAgICAgd29ya1VuaXRBc3luY1N0b3JhZ2VcbiAgICB9KTtcbn1cbmV4cG9ydCB7IHJvdXRlTW9kdWxlLCB3b3JrQXN5bmNTdG9yYWdlLCB3b3JrVW5pdEFzeW5jU3RvcmFnZSwgc2VydmVySG9va3MsIHBhdGNoRmV0Y2gsICB9O1xuXG4vLyMgc291cmNlTWFwcGluZ1VSTD1hcHAtcm91dGUuanMubWFwIl0sIm5hbWVzIjpbXSwiaWdub3JlTGlzdCI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fmedia%2Froute&page=%2Fapi%2Fmedia%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fmedia%2Froute.js&appDir=%2Fhome%2Fshawon%2FDeveloper%2FServer-Kit%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2Fhome%2Fshawon%2FDeveloper%2FServer-Kit&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!\n");

/***/ }),

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true!":
/*!******************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true! ***!
  \******************************************************************************************************/
/***/ (() => {



/***/ }),

/***/ "(ssr)/./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true!":
/*!******************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true! ***!
  \******************************************************************************************************/
/***/ (() => {



/***/ }),

/***/ "../app-render/after-task-async-storage.external":
/*!***********************************************************************************!*\
  !*** external "next/dist/server/app-render/after-task-async-storage.external.js" ***!
  \***********************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/app-render/after-task-async-storage.external.js");

/***/ }),

/***/ "../app-render/work-async-storage.external":
/*!*****************************************************************************!*\
  !*** external "next/dist/server/app-render/work-async-storage.external.js" ***!
  \*****************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/app-render/work-async-storage.external.js");

/***/ }),

/***/ "./work-unit-async-storage.external":
/*!**********************************************************************************!*\
  !*** external "next/dist/server/app-render/work-unit-async-storage.external.js" ***!
  \**********************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/app-render/work-unit-async-storage.external.js");

/***/ }),

/***/ "fs":
/*!*********************!*\
  !*** external "fs" ***!
  \*********************/
/***/ ((module) => {

"use strict";
module.exports = require("fs");

/***/ }),

/***/ "next/dist/compiled/next-server/app-page.runtime.dev.js":
/*!*************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-page.runtime.dev.js" ***!
  \*************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/compiled/next-server/app-page.runtime.dev.js");

/***/ }),

/***/ "next/dist/compiled/next-server/app-route.runtime.dev.js":
/*!**************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-route.runtime.dev.js" ***!
  \**************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/compiled/next-server/app-route.runtime.dev.js");

/***/ }),

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/***/ ((module) => {

"use strict";
module.exports = require("path");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next"], () => (__webpack_exec__("(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fmedia%2Froute&page=%2Fapi%2Fmedia%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fmedia%2Froute.js&appDir=%2Fhome%2Fshawon%2FDeveloper%2FServer-Kit%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2Fhome%2Fshawon%2FDeveloper%2FServer-Kit&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!")));
module.exports = __webpack_exports__;

})();