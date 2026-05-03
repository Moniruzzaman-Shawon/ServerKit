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
exports.id = "app/api/docker/summary/route";
exports.ids = ["app/api/docker/summary/route"];
exports.modules = {

/***/ "(rsc)/./app/api/docker/summary/route.js":
/*!*****************************************!*\
  !*** ./app/api/docker/summary/route.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   GET: () => (/* binding */ GET)\n/* harmony export */ });\n/* harmony import */ var next_server__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/server */ \"(rsc)/./node_modules/next/dist/api/server.js\");\n/* harmony import */ var _lib_docker__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/lib/docker */ \"(rsc)/./lib/docker.js\");\n\n\nasync function GET() {\n    try {\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json(await (0,_lib_docker__WEBPACK_IMPORTED_MODULE_1__.getDockerSummary)());\n    } catch (err) {\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            error: err.message\n        }, {\n            status: 500\n        });\n    }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9hcHAvYXBpL2RvY2tlci9zdW1tYXJ5L3JvdXRlLmpzIiwibWFwcGluZ3MiOiI7Ozs7OztBQUEwQztBQUNLO0FBRXhDLGVBQWVFO0lBQ3BCLElBQUk7UUFDRixPQUFPRixxREFBWUEsQ0FBQ0csSUFBSSxDQUFDLE1BQU1GLDZEQUFnQkE7SUFDakQsRUFBRSxPQUFPRyxLQUFLO1FBQ1osT0FBT0oscURBQVlBLENBQUNHLElBQUksQ0FBQztZQUFFRSxPQUFPRCxJQUFJRSxPQUFPO1FBQUMsR0FBRztZQUFFQyxRQUFRO1FBQUk7SUFDakU7QUFDRiIsInNvdXJjZXMiOlsiL2hvbWUvc2hhd29uL0RldmVsb3Blci9TZXJ2ZXItS2l0L2FwcC9hcGkvZG9ja2VyL3N1bW1hcnkvcm91dGUuanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmV4dFJlc3BvbnNlIH0gZnJvbSAnbmV4dC9zZXJ2ZXInXG5pbXBvcnQgeyBnZXREb2NrZXJTdW1tYXJ5IH0gZnJvbSAnQC9saWIvZG9ja2VyJ1xuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gR0VUKCkge1xuICB0cnkge1xuICAgIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbihhd2FpdCBnZXREb2NrZXJTdW1tYXJ5KCkpXG4gIH0gY2F0Y2ggKGVycikge1xuICAgIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbih7IGVycm9yOiBlcnIubWVzc2FnZSB9LCB7IHN0YXR1czogNTAwIH0pXG4gIH1cbn1cbiJdLCJuYW1lcyI6WyJOZXh0UmVzcG9uc2UiLCJnZXREb2NrZXJTdW1tYXJ5IiwiR0VUIiwianNvbiIsImVyciIsImVycm9yIiwibWVzc2FnZSIsInN0YXR1cyJdLCJpZ25vcmVMaXN0IjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/./app/api/docker/summary/route.js\n");

/***/ }),

/***/ "(rsc)/./lib/docker.js":
/*!***********************!*\
  !*** ./lib/docker.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   containerAction: () => (/* binding */ containerAction),\n/* harmony export */   docker: () => (/* binding */ docker),\n/* harmony export */   getContainerLogs: () => (/* binding */ getContainerLogs),\n/* harmony export */   getDockerSummary: () => (/* binding */ getDockerSummary),\n/* harmony export */   listContainers: () => (/* binding */ listContainers)\n/* harmony export */ });\n/* harmony import */ var dockerode__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! dockerode */ \"dockerode\");\n/* harmony import */ var dockerode__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(dockerode__WEBPACK_IMPORTED_MODULE_0__);\n\nconst docker = new (dockerode__WEBPACK_IMPORTED_MODULE_0___default())({\n    socketPath: process.env.DOCKER_SOCKET || '/var/run/docker.sock'\n});\nasync function listContainers() {\n    const list = await docker.listContainers({\n        all: true\n    });\n    return list.map((c)=>({\n            id: c.Id.slice(0, 12),\n            fullId: c.Id,\n            name: (c.Names[0] || '/unnamed').replace('/', ''),\n            image: c.Image,\n            status: c.State,\n            statusText: c.Status,\n            ports: c.Ports.filter((p)=>p.PublicPort).map((p)=>`${p.PublicPort}→${p.PrivatePort}`).join(', '),\n            created: c.Created\n        }));\n}\nasync function containerAction(id, action) {\n    const c = docker.getContainer(id);\n    switch(action){\n        case 'start':\n            return c.start();\n        case 'stop':\n            return c.stop();\n        case 'restart':\n            return c.restart();\n        case 'remove':\n            return c.remove({\n                force: true\n            });\n        default:\n            throw new Error(`Unknown action: ${action}`);\n    }\n}\nasync function getContainerLogs(id, tail = 80) {\n    const c = docker.getContainer(id);\n    const buf = await c.logs({\n        stdout: true,\n        stderr: true,\n        tail,\n        timestamps: true\n    });\n    const b = Buffer.isBuffer(buf) ? buf : Buffer.from(buf);\n    const lines = [];\n    let offset = 0;\n    while(offset + 8 <= b.length){\n        const size = b.readUInt32BE(offset + 4);\n        if (size === 0) {\n            offset += 8;\n            continue;\n        }\n        lines.push(b.slice(offset + 8, offset + 8 + size).toString('utf8'));\n        offset += 8 + size;\n    }\n    return lines.join('');\n}\nasync function getDockerSummary() {\n    const [running, all, images] = await Promise.all([\n        docker.listContainers(),\n        docker.listContainers({\n            all: true\n        }),\n        docker.listImages()\n    ]);\n    return {\n        running: running.length,\n        total: all.length,\n        images: images.length\n    };\n}\n\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,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ci1LaXQvbGliL2RvY2tlci5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgRG9ja2Vyb2RlIGZyb20gJ2RvY2tlcm9kZSdcblxuY29uc3QgZG9ja2VyID0gbmV3IERvY2tlcm9kZSh7XG4gIHNvY2tldFBhdGg6IHByb2Nlc3MuZW52LkRPQ0tFUl9TT0NLRVQgfHwgJy92YXIvcnVuL2RvY2tlci5zb2NrJyxcbn0pXG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBsaXN0Q29udGFpbmVycygpIHtcbiAgY29uc3QgbGlzdCA9IGF3YWl0IGRvY2tlci5saXN0Q29udGFpbmVycyh7IGFsbDogdHJ1ZSB9KVxuICByZXR1cm4gbGlzdC5tYXAoYyA9PiAoe1xuICAgIGlkOiBjLklkLnNsaWNlKDAsIDEyKSxcbiAgICBmdWxsSWQ6IGMuSWQsXG4gICAgbmFtZTogKGMuTmFtZXNbMF0gfHwgJy91bm5hbWVkJykucmVwbGFjZSgnLycsICcnKSxcbiAgICBpbWFnZTogYy5JbWFnZSxcbiAgICBzdGF0dXM6IGMuU3RhdGUsXG4gICAgc3RhdHVzVGV4dDogYy5TdGF0dXMsXG4gICAgcG9ydHM6IGMuUG9ydHNcbiAgICAgIC5maWx0ZXIocCA9PiBwLlB1YmxpY1BvcnQpXG4gICAgICAubWFwKHAgPT4gYCR7cC5QdWJsaWNQb3J0feKGkiR7cC5Qcml2YXRlUG9ydH1gKVxuICAgICAgLmpvaW4oJywgJyksXG4gICAgY3JlYXRlZDogYy5DcmVhdGVkLFxuICB9KSlcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGNvbnRhaW5lckFjdGlvbihpZCwgYWN0aW9uKSB7XG4gIGNvbnN0IGMgPSBkb2NrZXIuZ2V0Q29udGFpbmVyKGlkKVxuICBzd2l0Y2ggKGFjdGlvbikge1xuICAgIGNhc2UgJ3N0YXJ0JzogICByZXR1cm4gYy5zdGFydCgpXG4gICAgY2FzZSAnc3RvcCc6ICAgIHJldHVybiBjLnN0b3AoKVxuICAgIGNhc2UgJ3Jlc3RhcnQnOiByZXR1cm4gYy5yZXN0YXJ0KClcbiAgICBjYXNlICdyZW1vdmUnOiAgcmV0dXJuIGMucmVtb3ZlKHsgZm9yY2U6IHRydWUgfSlcbiAgICBkZWZhdWx0OiB0aHJvdyBuZXcgRXJyb3IoYFVua25vd24gYWN0aW9uOiAke2FjdGlvbn1gKVxuICB9XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBnZXRDb250YWluZXJMb2dzKGlkLCB0YWlsID0gODApIHtcbiAgY29uc3QgYyA9IGRvY2tlci5nZXRDb250YWluZXIoaWQpXG4gIGNvbnN0IGJ1ZiA9IGF3YWl0IGMubG9ncyh7IHN0ZG91dDogdHJ1ZSwgc3RkZXJyOiB0cnVlLCB0YWlsLCB0aW1lc3RhbXBzOiB0cnVlIH0pXG4gIGNvbnN0IGIgPSBCdWZmZXIuaXNCdWZmZXIoYnVmKSA/IGJ1ZiA6IEJ1ZmZlci5mcm9tKGJ1ZilcbiAgY29uc3QgbGluZXMgPSBbXVxuICBsZXQgb2Zmc2V0ID0gMFxuICB3aGlsZSAob2Zmc2V0ICsgOCA8PSBiLmxlbmd0aCkge1xuICAgIGNvbnN0IHNpemUgPSBiLnJlYWRVSW50MzJCRShvZmZzZXQgKyA0KVxuICAgIGlmIChzaXplID09PSAwKSB7IG9mZnNldCArPSA4OyBjb250aW51ZSB9XG4gICAgbGluZXMucHVzaChiLnNsaWNlKG9mZnNldCArIDgsIG9mZnNldCArIDggKyBzaXplKS50b1N0cmluZygndXRmOCcpKVxuICAgIG9mZnNldCArPSA4ICsgc2l6ZVxuICB9XG4gIHJldHVybiBsaW5lcy5qb2luKCcnKVxufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZ2V0RG9ja2VyU3VtbWFyeSgpIHtcbiAgY29uc3QgW3J1bm5pbmcsIGFsbCwgaW1hZ2VzXSA9IGF3YWl0IFByb21pc2UuYWxsKFtcbiAgICBkb2NrZXIubGlzdENvbnRhaW5lcnMoKSxcbiAgICBkb2NrZXIubGlzdENvbnRhaW5lcnMoeyBhbGw6IHRydWUgfSksXG4gICAgZG9ja2VyLmxpc3RJbWFnZXMoKSxcbiAgXSlcbiAgcmV0dXJuIHsgcnVubmluZzogcnVubmluZy5sZW5ndGgsIHRvdGFsOiBhbGwubGVuZ3RoLCBpbWFnZXM6IGltYWdlcy5sZW5ndGggfVxufVxuXG5leHBvcnQgeyBkb2NrZXIgfVxuIl0sIm5hbWVzIjpbIkRvY2tlcm9kZSIsImRvY2tlciIsInNvY2tldFBhdGgiLCJwcm9jZXNzIiwiZW52IiwiRE9DS0VSX1NPQ0tFVCIsImxpc3RDb250YWluZXJzIiwibGlzdCIsImFsbCIsIm1hcCIsImMiLCJpZCIsIklkIiwic2xpY2UiLCJmdWxsSWQiLCJuYW1lIiwiTmFtZXMiLCJyZXBsYWNlIiwiaW1hZ2UiLCJJbWFnZSIsInN0YXR1cyIsIlN0YXRlIiwic3RhdHVzVGV4dCIsIlN0YXR1cyIsInBvcnRzIiwiUG9ydHMiLCJmaWx0ZXIiLCJwIiwiUHVibGljUG9ydCIsIlByaXZhdGVQb3J0Iiwiam9pbiIsImNyZWF0ZWQiLCJDcmVhdGVkIiwiY29udGFpbmVyQWN0aW9uIiwiYWN0aW9uIiwiZ2V0Q29udGFpbmVyIiwic3RhcnQiLCJzdG9wIiwicmVzdGFydCIsInJlbW92ZSIsImZvcmNlIiwiRXJyb3IiLCJnZXRDb250YWluZXJMb2dzIiwidGFpbCIsImJ1ZiIsImxvZ3MiLCJzdGRvdXQiLCJzdGRlcnIiLCJ0aW1lc3RhbXBzIiwiYiIsIkJ1ZmZlciIsImlzQnVmZmVyIiwiZnJvbSIsImxpbmVzIiwib2Zmc2V0IiwibGVuZ3RoIiwic2l6ZSIsInJlYWRVSW50MzJCRSIsInB1c2giLCJ0b1N0cmluZyIsImdldERvY2tlclN1bW1hcnkiLCJydW5uaW5nIiwiaW1hZ2VzIiwiUHJvbWlzZSIsImxpc3RJbWFnZXMiLCJ0b3RhbCJdLCJpZ25vcmVMaXN0IjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/./lib/docker.js\n");

/***/ }),

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fdocker%2Fsummary%2Froute&page=%2Fapi%2Fdocker%2Fsummary%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fdocker%2Fsummary%2Froute.js&appDir=%2Fhome%2Fshawon%2FDeveloper%2FServer-Kit%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2Fhome%2Fshawon%2FDeveloper%2FServer-Kit&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!":
/*!********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fdocker%2Fsummary%2Froute&page=%2Fapi%2Fdocker%2Fsummary%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fdocker%2Fsummary%2Froute.js&appDir=%2Fhome%2Fshawon%2FDeveloper%2FServer-Kit%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2Fhome%2Fshawon%2FDeveloper%2FServer-Kit&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D! ***!
  \********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   patchFetch: () => (/* binding */ patchFetch),\n/* harmony export */   routeModule: () => (/* binding */ routeModule),\n/* harmony export */   serverHooks: () => (/* binding */ serverHooks),\n/* harmony export */   workAsyncStorage: () => (/* binding */ workAsyncStorage),\n/* harmony export */   workUnitAsyncStorage: () => (/* binding */ workUnitAsyncStorage)\n/* harmony export */ });\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/dist/server/route-modules/app-route/module.compiled */ \"(rsc)/./node_modules/next/dist/server/route-modules/app-route/module.compiled.js\");\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/dist/server/route-kind */ \"(rsc)/./node_modules/next/dist/server/route-kind.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/dist/server/lib/patch-fetch */ \"(rsc)/./node_modules/next/dist/server/lib/patch-fetch.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _home_shawon_Developer_Server_Kit_app_api_docker_summary_route_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app/api/docker/summary/route.js */ \"(rsc)/./app/api/docker/summary/route.js\");\n\n\n\n\n// We inject the nextConfigOutput here so that we can use them in the route\n// module.\nconst nextConfigOutput = \"\"\nconst routeModule = new next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__.AppRouteRouteModule({\n    definition: {\n        kind: next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__.RouteKind.APP_ROUTE,\n        page: \"/api/docker/summary/route\",\n        pathname: \"/api/docker/summary\",\n        filename: \"route\",\n        bundlePath: \"app/api/docker/summary/route\"\n    },\n    resolvedPagePath: \"/home/shawon/Developer/Server-Kit/app/api/docker/summary/route.js\",\n    nextConfigOutput,\n    userland: _home_shawon_Developer_Server_Kit_app_api_docker_summary_route_js__WEBPACK_IMPORTED_MODULE_3__\n});\n// Pull out the exports that we need to expose from the module. This should\n// be eliminated when we've moved the other routes to the new format. These\n// are used to hook into the route.\nconst { workAsyncStorage, workUnitAsyncStorage, serverHooks } = routeModule;\nfunction patchFetch() {\n    return (0,next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__.patchFetch)({\n        workAsyncStorage,\n        workUnitAsyncStorage\n    });\n}\n\n\n//# sourceMappingURL=app-route.js.map//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvbmV4dC9kaXN0L2J1aWxkL3dlYnBhY2svbG9hZGVycy9uZXh0LWFwcC1sb2FkZXIvaW5kZXguanM/bmFtZT1hcHAlMkZhcGklMkZkb2NrZXIlMkZzdW1tYXJ5JTJGcm91dGUmcGFnZT0lMkZhcGklMkZkb2NrZXIlMkZzdW1tYXJ5JTJGcm91dGUmYXBwUGF0aHM9JnBhZ2VQYXRoPXByaXZhdGUtbmV4dC1hcHAtZGlyJTJGYXBpJTJGZG9ja2VyJTJGc3VtbWFyeSUyRnJvdXRlLmpzJmFwcERpcj0lMkZob21lJTJGc2hhd29uJTJGRGV2ZWxvcGVyJTJGU2VydmVyLUtpdCUyRmFwcCZwYWdlRXh0ZW5zaW9ucz10c3gmcGFnZUV4dGVuc2lvbnM9dHMmcGFnZUV4dGVuc2lvbnM9anN4JnBhZ2VFeHRlbnNpb25zPWpzJnJvb3REaXI9JTJGaG9tZSUyRnNoYXdvbiUyRkRldmVsb3BlciUyRlNlcnZlci1LaXQmaXNEZXY9dHJ1ZSZ0c2NvbmZpZ1BhdGg9dHNjb25maWcuanNvbiZiYXNlUGF0aD0mYXNzZXRQcmVmaXg9Jm5leHRDb25maWdPdXRwdXQ9JnByZWZlcnJlZFJlZ2lvbj0mbWlkZGxld2FyZUNvbmZpZz1lMzAlM0QhIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQStGO0FBQ3ZDO0FBQ3FCO0FBQ2lCO0FBQzlGO0FBQ0E7QUFDQTtBQUNBLHdCQUF3Qix5R0FBbUI7QUFDM0M7QUFDQSxjQUFjLGtFQUFTO0FBQ3ZCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxZQUFZO0FBQ1osQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBLFFBQVEsc0RBQXNEO0FBQzlEO0FBQ0EsV0FBVyw0RUFBVztBQUN0QjtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQzBGOztBQUUxRiIsInNvdXJjZXMiOlsiIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFwcFJvdXRlUm91dGVNb2R1bGUgfSBmcm9tIFwibmV4dC9kaXN0L3NlcnZlci9yb3V0ZS1tb2R1bGVzL2FwcC1yb3V0ZS9tb2R1bGUuY29tcGlsZWRcIjtcbmltcG9ydCB7IFJvdXRlS2luZCB9IGZyb20gXCJuZXh0L2Rpc3Qvc2VydmVyL3JvdXRlLWtpbmRcIjtcbmltcG9ydCB7IHBhdGNoRmV0Y2ggYXMgX3BhdGNoRmV0Y2ggfSBmcm9tIFwibmV4dC9kaXN0L3NlcnZlci9saWIvcGF0Y2gtZmV0Y2hcIjtcbmltcG9ydCAqIGFzIHVzZXJsYW5kIGZyb20gXCIvaG9tZS9zaGF3b24vRGV2ZWxvcGVyL1NlcnZlci1LaXQvYXBwL2FwaS9kb2NrZXIvc3VtbWFyeS9yb3V0ZS5qc1wiO1xuLy8gV2UgaW5qZWN0IHRoZSBuZXh0Q29uZmlnT3V0cHV0IGhlcmUgc28gdGhhdCB3ZSBjYW4gdXNlIHRoZW0gaW4gdGhlIHJvdXRlXG4vLyBtb2R1bGUuXG5jb25zdCBuZXh0Q29uZmlnT3V0cHV0ID0gXCJcIlxuY29uc3Qgcm91dGVNb2R1bGUgPSBuZXcgQXBwUm91dGVSb3V0ZU1vZHVsZSh7XG4gICAgZGVmaW5pdGlvbjoge1xuICAgICAgICBraW5kOiBSb3V0ZUtpbmQuQVBQX1JPVVRFLFxuICAgICAgICBwYWdlOiBcIi9hcGkvZG9ja2VyL3N1bW1hcnkvcm91dGVcIixcbiAgICAgICAgcGF0aG5hbWU6IFwiL2FwaS9kb2NrZXIvc3VtbWFyeVwiLFxuICAgICAgICBmaWxlbmFtZTogXCJyb3V0ZVwiLFxuICAgICAgICBidW5kbGVQYXRoOiBcImFwcC9hcGkvZG9ja2VyL3N1bW1hcnkvcm91dGVcIlxuICAgIH0sXG4gICAgcmVzb2x2ZWRQYWdlUGF0aDogXCIvaG9tZS9zaGF3b24vRGV2ZWxvcGVyL1NlcnZlci1LaXQvYXBwL2FwaS9kb2NrZXIvc3VtbWFyeS9yb3V0ZS5qc1wiLFxuICAgIG5leHRDb25maWdPdXRwdXQsXG4gICAgdXNlcmxhbmRcbn0pO1xuLy8gUHVsbCBvdXQgdGhlIGV4cG9ydHMgdGhhdCB3ZSBuZWVkIHRvIGV4cG9zZSBmcm9tIHRoZSBtb2R1bGUuIFRoaXMgc2hvdWxkXG4vLyBiZSBlbGltaW5hdGVkIHdoZW4gd2UndmUgbW92ZWQgdGhlIG90aGVyIHJvdXRlcyB0byB0aGUgbmV3IGZvcm1hdC4gVGhlc2Vcbi8vIGFyZSB1c2VkIHRvIGhvb2sgaW50byB0aGUgcm91dGUuXG5jb25zdCB7IHdvcmtBc3luY1N0b3JhZ2UsIHdvcmtVbml0QXN5bmNTdG9yYWdlLCBzZXJ2ZXJIb29rcyB9ID0gcm91dGVNb2R1bGU7XG5mdW5jdGlvbiBwYXRjaEZldGNoKCkge1xuICAgIHJldHVybiBfcGF0Y2hGZXRjaCh7XG4gICAgICAgIHdvcmtBc3luY1N0b3JhZ2UsXG4gICAgICAgIHdvcmtVbml0QXN5bmNTdG9yYWdlXG4gICAgfSk7XG59XG5leHBvcnQgeyByb3V0ZU1vZHVsZSwgd29ya0FzeW5jU3RvcmFnZSwgd29ya1VuaXRBc3luY1N0b3JhZ2UsIHNlcnZlckhvb2tzLCBwYXRjaEZldGNoLCAgfTtcblxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9YXBwLXJvdXRlLmpzLm1hcCJdLCJuYW1lcyI6W10sImlnbm9yZUxpc3QiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fdocker%2Fsummary%2Froute&page=%2Fapi%2Fdocker%2Fsummary%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fdocker%2Fsummary%2Froute.js&appDir=%2Fhome%2Fshawon%2FDeveloper%2FServer-Kit%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2Fhome%2Fshawon%2FDeveloper%2FServer-Kit&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!\n");

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

/***/ "dockerode":
/*!****************************!*\
  !*** external "dockerode" ***!
  \****************************/
/***/ ((module) => {

"use strict";
module.exports = require("dockerode");

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

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next"], () => (__webpack_exec__("(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fdocker%2Fsummary%2Froute&page=%2Fapi%2Fdocker%2Fsummary%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fdocker%2Fsummary%2Froute.js&appDir=%2Fhome%2Fshawon%2FDeveloper%2FServer-Kit%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2Fhome%2Fshawon%2FDeveloper%2FServer-Kit&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!")));
module.exports = __webpack_exports__;

})();