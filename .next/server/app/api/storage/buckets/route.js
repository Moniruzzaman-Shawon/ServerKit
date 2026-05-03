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
exports.id = "app/api/storage/buckets/route";
exports.ids = ["app/api/storage/buckets/route"];
exports.modules = {

/***/ "(rsc)/./app/api/storage/buckets/route.js":
/*!******************************************!*\
  !*** ./app/api/storage/buckets/route.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   GET: () => (/* binding */ GET)\n/* harmony export */ });\n/* harmony import */ var next_server__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/server */ \"(rsc)/./node_modules/next/dist/api/server.js\");\n\nasync function GET() {\n    const endpoint = process.env.MINIO_ENDPOINT || 'http://localhost:9000';\n    const accessKey = process.env.MINIO_USER || 'minioadmin';\n    const secretKey = process.env.MINIO_PASS || '';\n    try {\n        // List buckets via MinIO admin API\n        const res = await fetch(`${endpoint}/minio/health/live`, {\n            signal: AbortSignal.timeout(3000)\n        });\n        if (!res.ok) throw new Error('MinIO not reachable');\n        // Basic bucket list — requires proper auth in production\n        // For now, return configured credentials so the UI can show the endpoint\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            buckets: [],\n            credentials: {\n                endpoint,\n                accessKey,\n                secretKey: secretKey ? '••••••••••' : null\n            }\n        });\n    } catch  {\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            buckets: [],\n            credentials: {\n                endpoint,\n                accessKey,\n                secretKey: secretKey ? '••••••••••' : null\n            },\n            offline: true\n        });\n    }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9hcHAvYXBpL3N0b3JhZ2UvYnVja2V0cy9yb3V0ZS5qcyIsIm1hcHBpbmdzIjoiOzs7OztBQUEwQztBQUVuQyxlQUFlQztJQUNwQixNQUFNQyxXQUFXQyxRQUFRQyxHQUFHLENBQUNDLGNBQWMsSUFBSTtJQUMvQyxNQUFNQyxZQUFZSCxRQUFRQyxHQUFHLENBQUNHLFVBQVUsSUFBSTtJQUM1QyxNQUFNQyxZQUFZTCxRQUFRQyxHQUFHLENBQUNLLFVBQVUsSUFBSTtJQUU1QyxJQUFJO1FBQ0YsbUNBQW1DO1FBQ25DLE1BQU1DLE1BQU0sTUFBTUMsTUFBTSxHQUFHVCxTQUFTLGtCQUFrQixDQUFDLEVBQUU7WUFBRVUsUUFBUUMsWUFBWUMsT0FBTyxDQUFDO1FBQU07UUFDN0YsSUFBSSxDQUFDSixJQUFJSyxFQUFFLEVBQUUsTUFBTSxJQUFJQyxNQUFNO1FBRTdCLHlEQUF5RDtRQUN6RCx5RUFBeUU7UUFDekUsT0FBT2hCLHFEQUFZQSxDQUFDaUIsSUFBSSxDQUFDO1lBQ3ZCQyxTQUFTLEVBQUU7WUFDWEMsYUFBYTtnQkFDWGpCO2dCQUNBSTtnQkFDQUUsV0FBV0EsWUFBWSxlQUFlO1lBQ3hDO1FBQ0Y7SUFDRixFQUFFLE9BQU07UUFDTixPQUFPUixxREFBWUEsQ0FBQ2lCLElBQUksQ0FBQztZQUN2QkMsU0FBUyxFQUFFO1lBQ1hDLGFBQWE7Z0JBQUVqQjtnQkFBVUk7Z0JBQVdFLFdBQVdBLFlBQVksZUFBZTtZQUFLO1lBQy9FWSxTQUFTO1FBQ1g7SUFDRjtBQUNGIiwic291cmNlcyI6WyIvaG9tZS9zaGF3b24vRGV2ZWxvcGVyL1NlcnZlci1LaXQvYXBwL2FwaS9zdG9yYWdlL2J1Y2tldHMvcm91dGUuanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmV4dFJlc3BvbnNlIH0gZnJvbSAnbmV4dC9zZXJ2ZXInXG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBHRVQoKSB7XG4gIGNvbnN0IGVuZHBvaW50ID0gcHJvY2Vzcy5lbnYuTUlOSU9fRU5EUE9JTlQgfHwgJ2h0dHA6Ly9sb2NhbGhvc3Q6OTAwMCdcbiAgY29uc3QgYWNjZXNzS2V5ID0gcHJvY2Vzcy5lbnYuTUlOSU9fVVNFUiB8fCAnbWluaW9hZG1pbidcbiAgY29uc3Qgc2VjcmV0S2V5ID0gcHJvY2Vzcy5lbnYuTUlOSU9fUEFTUyB8fCAnJ1xuXG4gIHRyeSB7XG4gICAgLy8gTGlzdCBidWNrZXRzIHZpYSBNaW5JTyBhZG1pbiBBUElcbiAgICBjb25zdCByZXMgPSBhd2FpdCBmZXRjaChgJHtlbmRwb2ludH0vbWluaW8vaGVhbHRoL2xpdmVgLCB7IHNpZ25hbDogQWJvcnRTaWduYWwudGltZW91dCgzMDAwKSB9KVxuICAgIGlmICghcmVzLm9rKSB0aHJvdyBuZXcgRXJyb3IoJ01pbklPIG5vdCByZWFjaGFibGUnKVxuXG4gICAgLy8gQmFzaWMgYnVja2V0IGxpc3Qg4oCUIHJlcXVpcmVzIHByb3BlciBhdXRoIGluIHByb2R1Y3Rpb25cbiAgICAvLyBGb3Igbm93LCByZXR1cm4gY29uZmlndXJlZCBjcmVkZW50aWFscyBzbyB0aGUgVUkgY2FuIHNob3cgdGhlIGVuZHBvaW50XG4gICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKHtcbiAgICAgIGJ1Y2tldHM6IFtdLFxuICAgICAgY3JlZGVudGlhbHM6IHtcbiAgICAgICAgZW5kcG9pbnQsXG4gICAgICAgIGFjY2Vzc0tleSxcbiAgICAgICAgc2VjcmV0S2V5OiBzZWNyZXRLZXkgPyAn4oCi4oCi4oCi4oCi4oCi4oCi4oCi4oCi4oCi4oCiJyA6IG51bGwsXG4gICAgICB9LFxuICAgIH0pXG4gIH0gY2F0Y2gge1xuICAgIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbih7XG4gICAgICBidWNrZXRzOiBbXSxcbiAgICAgIGNyZWRlbnRpYWxzOiB7IGVuZHBvaW50LCBhY2Nlc3NLZXksIHNlY3JldEtleTogc2VjcmV0S2V5ID8gJ+KAouKAouKAouKAouKAouKAouKAouKAouKAouKAoicgOiBudWxsIH0sXG4gICAgICBvZmZsaW5lOiB0cnVlLFxuICAgIH0pXG4gIH1cbn1cbiJdLCJuYW1lcyI6WyJOZXh0UmVzcG9uc2UiLCJHRVQiLCJlbmRwb2ludCIsInByb2Nlc3MiLCJlbnYiLCJNSU5JT19FTkRQT0lOVCIsImFjY2Vzc0tleSIsIk1JTklPX1VTRVIiLCJzZWNyZXRLZXkiLCJNSU5JT19QQVNTIiwicmVzIiwiZmV0Y2giLCJzaWduYWwiLCJBYm9ydFNpZ25hbCIsInRpbWVvdXQiLCJvayIsIkVycm9yIiwianNvbiIsImJ1Y2tldHMiLCJjcmVkZW50aWFscyIsIm9mZmxpbmUiXSwiaWdub3JlTGlzdCI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./app/api/storage/buckets/route.js\n");

/***/ }),

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fstorage%2Fbuckets%2Froute&page=%2Fapi%2Fstorage%2Fbuckets%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fstorage%2Fbuckets%2Froute.js&appDir=%2Fhome%2Fshawon%2FDeveloper%2FServer-Kit%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2Fhome%2Fshawon%2FDeveloper%2FServer-Kit&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!":
/*!***********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fstorage%2Fbuckets%2Froute&page=%2Fapi%2Fstorage%2Fbuckets%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fstorage%2Fbuckets%2Froute.js&appDir=%2Fhome%2Fshawon%2FDeveloper%2FServer-Kit%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2Fhome%2Fshawon%2FDeveloper%2FServer-Kit&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D! ***!
  \***********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   patchFetch: () => (/* binding */ patchFetch),\n/* harmony export */   routeModule: () => (/* binding */ routeModule),\n/* harmony export */   serverHooks: () => (/* binding */ serverHooks),\n/* harmony export */   workAsyncStorage: () => (/* binding */ workAsyncStorage),\n/* harmony export */   workUnitAsyncStorage: () => (/* binding */ workUnitAsyncStorage)\n/* harmony export */ });\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/dist/server/route-modules/app-route/module.compiled */ \"(rsc)/./node_modules/next/dist/server/route-modules/app-route/module.compiled.js\");\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/dist/server/route-kind */ \"(rsc)/./node_modules/next/dist/server/route-kind.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/dist/server/lib/patch-fetch */ \"(rsc)/./node_modules/next/dist/server/lib/patch-fetch.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _home_shawon_Developer_Server_Kit_app_api_storage_buckets_route_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app/api/storage/buckets/route.js */ \"(rsc)/./app/api/storage/buckets/route.js\");\n\n\n\n\n// We inject the nextConfigOutput here so that we can use them in the route\n// module.\nconst nextConfigOutput = \"\"\nconst routeModule = new next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__.AppRouteRouteModule({\n    definition: {\n        kind: next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__.RouteKind.APP_ROUTE,\n        page: \"/api/storage/buckets/route\",\n        pathname: \"/api/storage/buckets\",\n        filename: \"route\",\n        bundlePath: \"app/api/storage/buckets/route\"\n    },\n    resolvedPagePath: \"/home/shawon/Developer/Server-Kit/app/api/storage/buckets/route.js\",\n    nextConfigOutput,\n    userland: _home_shawon_Developer_Server_Kit_app_api_storage_buckets_route_js__WEBPACK_IMPORTED_MODULE_3__\n});\n// Pull out the exports that we need to expose from the module. This should\n// be eliminated when we've moved the other routes to the new format. These\n// are used to hook into the route.\nconst { workAsyncStorage, workUnitAsyncStorage, serverHooks } = routeModule;\nfunction patchFetch() {\n    return (0,next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__.patchFetch)({\n        workAsyncStorage,\n        workUnitAsyncStorage\n    });\n}\n\n\n//# sourceMappingURL=app-route.js.map//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvbmV4dC9kaXN0L2J1aWxkL3dlYnBhY2svbG9hZGVycy9uZXh0LWFwcC1sb2FkZXIvaW5kZXguanM/bmFtZT1hcHAlMkZhcGklMkZzdG9yYWdlJTJGYnVja2V0cyUyRnJvdXRlJnBhZ2U9JTJGYXBpJTJGc3RvcmFnZSUyRmJ1Y2tldHMlMkZyb3V0ZSZhcHBQYXRocz0mcGFnZVBhdGg9cHJpdmF0ZS1uZXh0LWFwcC1kaXIlMkZhcGklMkZzdG9yYWdlJTJGYnVja2V0cyUyRnJvdXRlLmpzJmFwcERpcj0lMkZob21lJTJGc2hhd29uJTJGRGV2ZWxvcGVyJTJGU2VydmVyLUtpdCUyRmFwcCZwYWdlRXh0ZW5zaW9ucz10c3gmcGFnZUV4dGVuc2lvbnM9dHMmcGFnZUV4dGVuc2lvbnM9anN4JnBhZ2VFeHRlbnNpb25zPWpzJnJvb3REaXI9JTJGaG9tZSUyRnNoYXdvbiUyRkRldmVsb3BlciUyRlNlcnZlci1LaXQmaXNEZXY9dHJ1ZSZ0c2NvbmZpZ1BhdGg9dHNjb25maWcuanNvbiZiYXNlUGF0aD0mYXNzZXRQcmVmaXg9Jm5leHRDb25maWdPdXRwdXQ9JnByZWZlcnJlZFJlZ2lvbj0mbWlkZGxld2FyZUNvbmZpZz1lMzAlM0QhIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQStGO0FBQ3ZDO0FBQ3FCO0FBQ2tCO0FBQy9GO0FBQ0E7QUFDQTtBQUNBLHdCQUF3Qix5R0FBbUI7QUFDM0M7QUFDQSxjQUFjLGtFQUFTO0FBQ3ZCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxZQUFZO0FBQ1osQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBLFFBQVEsc0RBQXNEO0FBQzlEO0FBQ0EsV0FBVyw0RUFBVztBQUN0QjtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQzBGOztBQUUxRiIsInNvdXJjZXMiOlsiIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFwcFJvdXRlUm91dGVNb2R1bGUgfSBmcm9tIFwibmV4dC9kaXN0L3NlcnZlci9yb3V0ZS1tb2R1bGVzL2FwcC1yb3V0ZS9tb2R1bGUuY29tcGlsZWRcIjtcbmltcG9ydCB7IFJvdXRlS2luZCB9IGZyb20gXCJuZXh0L2Rpc3Qvc2VydmVyL3JvdXRlLWtpbmRcIjtcbmltcG9ydCB7IHBhdGNoRmV0Y2ggYXMgX3BhdGNoRmV0Y2ggfSBmcm9tIFwibmV4dC9kaXN0L3NlcnZlci9saWIvcGF0Y2gtZmV0Y2hcIjtcbmltcG9ydCAqIGFzIHVzZXJsYW5kIGZyb20gXCIvaG9tZS9zaGF3b24vRGV2ZWxvcGVyL1NlcnZlci1LaXQvYXBwL2FwaS9zdG9yYWdlL2J1Y2tldHMvcm91dGUuanNcIjtcbi8vIFdlIGluamVjdCB0aGUgbmV4dENvbmZpZ091dHB1dCBoZXJlIHNvIHRoYXQgd2UgY2FuIHVzZSB0aGVtIGluIHRoZSByb3V0ZVxuLy8gbW9kdWxlLlxuY29uc3QgbmV4dENvbmZpZ091dHB1dCA9IFwiXCJcbmNvbnN0IHJvdXRlTW9kdWxlID0gbmV3IEFwcFJvdXRlUm91dGVNb2R1bGUoe1xuICAgIGRlZmluaXRpb246IHtcbiAgICAgICAga2luZDogUm91dGVLaW5kLkFQUF9ST1VURSxcbiAgICAgICAgcGFnZTogXCIvYXBpL3N0b3JhZ2UvYnVja2V0cy9yb3V0ZVwiLFxuICAgICAgICBwYXRobmFtZTogXCIvYXBpL3N0b3JhZ2UvYnVja2V0c1wiLFxuICAgICAgICBmaWxlbmFtZTogXCJyb3V0ZVwiLFxuICAgICAgICBidW5kbGVQYXRoOiBcImFwcC9hcGkvc3RvcmFnZS9idWNrZXRzL3JvdXRlXCJcbiAgICB9LFxuICAgIHJlc29sdmVkUGFnZVBhdGg6IFwiL2hvbWUvc2hhd29uL0RldmVsb3Blci9TZXJ2ZXItS2l0L2FwcC9hcGkvc3RvcmFnZS9idWNrZXRzL3JvdXRlLmpzXCIsXG4gICAgbmV4dENvbmZpZ091dHB1dCxcbiAgICB1c2VybGFuZFxufSk7XG4vLyBQdWxsIG91dCB0aGUgZXhwb3J0cyB0aGF0IHdlIG5lZWQgdG8gZXhwb3NlIGZyb20gdGhlIG1vZHVsZS4gVGhpcyBzaG91bGRcbi8vIGJlIGVsaW1pbmF0ZWQgd2hlbiB3ZSd2ZSBtb3ZlZCB0aGUgb3RoZXIgcm91dGVzIHRvIHRoZSBuZXcgZm9ybWF0LiBUaGVzZVxuLy8gYXJlIHVzZWQgdG8gaG9vayBpbnRvIHRoZSByb3V0ZS5cbmNvbnN0IHsgd29ya0FzeW5jU3RvcmFnZSwgd29ya1VuaXRBc3luY1N0b3JhZ2UsIHNlcnZlckhvb2tzIH0gPSByb3V0ZU1vZHVsZTtcbmZ1bmN0aW9uIHBhdGNoRmV0Y2goKSB7XG4gICAgcmV0dXJuIF9wYXRjaEZldGNoKHtcbiAgICAgICAgd29ya0FzeW5jU3RvcmFnZSxcbiAgICAgICAgd29ya1VuaXRBc3luY1N0b3JhZ2VcbiAgICB9KTtcbn1cbmV4cG9ydCB7IHJvdXRlTW9kdWxlLCB3b3JrQXN5bmNTdG9yYWdlLCB3b3JrVW5pdEFzeW5jU3RvcmFnZSwgc2VydmVySG9va3MsIHBhdGNoRmV0Y2gsICB9O1xuXG4vLyMgc291cmNlTWFwcGluZ1VSTD1hcHAtcm91dGUuanMubWFwIl0sIm5hbWVzIjpbXSwiaWdub3JlTGlzdCI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fstorage%2Fbuckets%2Froute&page=%2Fapi%2Fstorage%2Fbuckets%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fstorage%2Fbuckets%2Froute.js&appDir=%2Fhome%2Fshawon%2FDeveloper%2FServer-Kit%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2Fhome%2Fshawon%2FDeveloper%2FServer-Kit&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!\n");

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
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next"], () => (__webpack_exec__("(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fstorage%2Fbuckets%2Froute&page=%2Fapi%2Fstorage%2Fbuckets%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fstorage%2Fbuckets%2Froute.js&appDir=%2Fhome%2Fshawon%2FDeveloper%2FServer-Kit%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2Fhome%2Fshawon%2FDeveloper%2FServer-Kit&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!")));
module.exports = __webpack_exports__;

})();