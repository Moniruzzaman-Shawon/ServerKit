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
exports.id = "app/api/activity/route";
exports.ids = ["app/api/activity/route"];
exports.modules = {

/***/ "(rsc)/./app/api/activity/route.js":
/*!***********************************!*\
  !*** ./app/api/activity/route.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   GET: () => (/* binding */ GET)\n/* harmony export */ });\n/* harmony import */ var next_server__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/server */ \"(rsc)/./node_modules/next/dist/api/server.js\");\n/* harmony import */ var _lib_db__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/lib/db */ \"(rsc)/./lib/db.js\");\n/* harmony import */ var _lib_db__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_lib_db__WEBPACK_IMPORTED_MODULE_1__);\n\n\nasync function GET() {\n    try {\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json((0,_lib_db__WEBPACK_IMPORTED_MODULE_1__.getActivity)(30));\n    } catch (err) {\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json([], {\n            status: 500\n        });\n    }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9hcHAvYXBpL2FjdGl2aXR5L3JvdXRlLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBMEM7QUFDSjtBQUUvQixlQUFlRTtJQUNwQixJQUFJO1FBQ0YsT0FBT0YscURBQVlBLENBQUNHLElBQUksQ0FBQ0Ysb0RBQVdBLENBQUM7SUFDdkMsRUFBRSxPQUFPRyxLQUFLO1FBQ1osT0FBT0oscURBQVlBLENBQUNHLElBQUksQ0FBQyxFQUFFLEVBQUU7WUFBRUUsUUFBUTtRQUFJO0lBQzdDO0FBQ0YiLCJzb3VyY2VzIjpbIi9ob21lL3NoYXdvbi9EZXZlbG9wZXIvU2VydmVyLUtpdC9hcHAvYXBpL2FjdGl2aXR5L3JvdXRlLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5leHRSZXNwb25zZSB9IGZyb20gJ25leHQvc2VydmVyJ1xuaW1wb3J0IHsgZ2V0QWN0aXZpdHkgfSBmcm9tICdAL2xpYi9kYidcblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIEdFVCgpIHtcbiAgdHJ5IHtcbiAgICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24oZ2V0QWN0aXZpdHkoMzApKVxuICB9IGNhdGNoIChlcnIpIHtcbiAgICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24oW10sIHsgc3RhdHVzOiA1MDAgfSlcbiAgfVxufVxuIl0sIm5hbWVzIjpbIk5leHRSZXNwb25zZSIsImdldEFjdGl2aXR5IiwiR0VUIiwianNvbiIsImVyciIsInN0YXR1cyJdLCJpZ25vcmVMaXN0IjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/./app/api/activity/route.js\n");

/***/ }),

/***/ "(rsc)/./lib/db.js":
/*!*******************!*\
  !*** ./lib/db.js ***!
  \*******************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("\nconst Database = __webpack_require__(/*! better-sqlite3 */ \"better-sqlite3\");\nconst path = __webpack_require__(/*! path */ \"path\");\nconst fss = __webpack_require__(/*! fs */ \"fs\");\nconst DB_PATH = process.env.DB_PATH || path.join(process.cwd(), 'data', 'serverkit.db');\nfss.mkdirSync(path.dirname(DB_PATH), {\n    recursive: true\n});\nconst db = new Database(DB_PATH);\ndb.pragma('journal_mode = WAL');\ndb.exec(`\n  CREATE TABLE IF NOT EXISTS activity (\n    id        INTEGER PRIMARY KEY AUTOINCREMENT,\n    message   TEXT    NOT NULL,\n    level     TEXT    NOT NULL DEFAULT 'info',\n    ts        INTEGER NOT NULL DEFAULT (unixepoch())\n  );\n\n  CREATE TABLE IF NOT EXISTS settings (\n    key   TEXT PRIMARY KEY,\n    value TEXT NOT NULL\n  );\n`);\nfunction logActivity(message, level = 'info') {\n    db.prepare('INSERT INTO activity (message, level) VALUES (?, ?)').run(message, level);\n}\nfunction getActivity(limit = 30) {\n    return db.prepare('SELECT * FROM activity ORDER BY ts DESC, id DESC LIMIT ?').all(limit);\n}\nfunction getSetting(key, fallback = null) {\n    const row = db.prepare('SELECT value FROM settings WHERE key = ?').get(key);\n    return row ? JSON.parse(row.value) : fallback;\n}\nfunction setSetting(key, value) {\n    db.prepare('INSERT OR REPLACE INTO settings (key, value) VALUES (?, ?)').run(key, JSON.stringify(value));\n}\nfunction getAllSettings() {\n    const rows = db.prepare('SELECT key, value FROM settings').all();\n    return Object.fromEntries(rows.map((r)=>[\n            r.key,\n            JSON.parse(r.value)\n        ]));\n}\nmodule.exports = {\n    db,\n    logActivity,\n    getActivity,\n    getSetting,\n    setSetting,\n    getAllSettings\n};\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9saWIvZGIuanMiLCJtYXBwaW5ncyI6IjtBQUFBLE1BQU1BLFdBQVdDLG1CQUFPQSxDQUFDLHNDQUFnQjtBQUN6QyxNQUFNQyxPQUFPRCxtQkFBT0EsQ0FBQyxrQkFBTTtBQUMzQixNQUFNRSxNQUFNRixtQkFBT0EsQ0FBQyxjQUFJO0FBRXhCLE1BQU1HLFVBQVVDLFFBQVFDLEdBQUcsQ0FBQ0YsT0FBTyxJQUFJRixLQUFLSyxJQUFJLENBQUNGLFFBQVFHLEdBQUcsSUFBSSxRQUFRO0FBQ3hFTCxJQUFJTSxTQUFTLENBQUNQLEtBQUtRLE9BQU8sQ0FBQ04sVUFBVTtJQUFFTyxXQUFXO0FBQUs7QUFFdkQsTUFBTUMsS0FBSyxJQUFJWixTQUFTSTtBQUN4QlEsR0FBR0MsTUFBTSxDQUFDO0FBRVZELEdBQUdFLElBQUksQ0FBQyxDQUFDOzs7Ozs7Ozs7Ozs7QUFZVCxDQUFDO0FBRUQsU0FBU0MsWUFBWUMsT0FBTyxFQUFFQyxRQUFRLE1BQU07SUFDMUNMLEdBQUdNLE9BQU8sQ0FBQyx1REFBdURDLEdBQUcsQ0FBQ0gsU0FBU0M7QUFDakY7QUFFQSxTQUFTRyxZQUFZQyxRQUFRLEVBQUU7SUFDN0IsT0FBT1QsR0FBR00sT0FBTyxDQUFDLDREQUE0REksR0FBRyxDQUFDRDtBQUNwRjtBQUVBLFNBQVNFLFdBQVdDLEdBQUcsRUFBRUMsV0FBVyxJQUFJO0lBQ3RDLE1BQU1DLE1BQU1kLEdBQUdNLE9BQU8sQ0FBQyw0Q0FBNENTLEdBQUcsQ0FBQ0g7SUFDdkUsT0FBT0UsTUFBTUUsS0FBS0MsS0FBSyxDQUFDSCxJQUFJSSxLQUFLLElBQUlMO0FBQ3ZDO0FBRUEsU0FBU00sV0FBV1AsR0FBRyxFQUFFTSxLQUFLO0lBQzVCbEIsR0FBR00sT0FBTyxDQUFDLDhEQUNSQyxHQUFHLENBQUNLLEtBQUtJLEtBQUtJLFNBQVMsQ0FBQ0Y7QUFDN0I7QUFFQSxTQUFTRztJQUNQLE1BQU1DLE9BQU90QixHQUFHTSxPQUFPLENBQUMsbUNBQW1DSSxHQUFHO0lBQzlELE9BQU9hLE9BQU9DLFdBQVcsQ0FBQ0YsS0FBS0csR0FBRyxDQUFDQyxDQUFBQSxJQUFLO1lBQUNBLEVBQUVkLEdBQUc7WUFBRUksS0FBS0MsS0FBSyxDQUFDUyxFQUFFUixLQUFLO1NBQUU7QUFDdEU7QUFFQVMsT0FBT0MsT0FBTyxHQUFHO0lBQUU1QjtJQUFJRztJQUFhSztJQUFhRztJQUFZUTtJQUFZRTtBQUFlIiwic291cmNlcyI6WyIvaG9tZS9zaGF3b24vRGV2ZWxvcGVyL1NlcnZlci1LaXQvbGliL2RiLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImNvbnN0IERhdGFiYXNlID0gcmVxdWlyZSgnYmV0dGVyLXNxbGl0ZTMnKVxuY29uc3QgcGF0aCA9IHJlcXVpcmUoJ3BhdGgnKVxuY29uc3QgZnNzID0gcmVxdWlyZSgnZnMnKVxuXG5jb25zdCBEQl9QQVRIID0gcHJvY2Vzcy5lbnYuREJfUEFUSCB8fCBwYXRoLmpvaW4ocHJvY2Vzcy5jd2QoKSwgJ2RhdGEnLCAnc2VydmVya2l0LmRiJylcbmZzcy5ta2RpclN5bmMocGF0aC5kaXJuYW1lKERCX1BBVEgpLCB7IHJlY3Vyc2l2ZTogdHJ1ZSB9KVxuXG5jb25zdCBkYiA9IG5ldyBEYXRhYmFzZShEQl9QQVRIKVxuZGIucHJhZ21hKCdqb3VybmFsX21vZGUgPSBXQUwnKVxuXG5kYi5leGVjKGBcbiAgQ1JFQVRFIFRBQkxFIElGIE5PVCBFWElTVFMgYWN0aXZpdHkgKFxuICAgIGlkICAgICAgICBJTlRFR0VSIFBSSU1BUlkgS0VZIEFVVE9JTkNSRU1FTlQsXG4gICAgbWVzc2FnZSAgIFRFWFQgICAgTk9UIE5VTEwsXG4gICAgbGV2ZWwgICAgIFRFWFQgICAgTk9UIE5VTEwgREVGQVVMVCAnaW5mbycsXG4gICAgdHMgICAgICAgIElOVEVHRVIgTk9UIE5VTEwgREVGQVVMVCAodW5peGVwb2NoKCkpXG4gICk7XG5cbiAgQ1JFQVRFIFRBQkxFIElGIE5PVCBFWElTVFMgc2V0dGluZ3MgKFxuICAgIGtleSAgIFRFWFQgUFJJTUFSWSBLRVksXG4gICAgdmFsdWUgVEVYVCBOT1QgTlVMTFxuICApO1xuYClcblxuZnVuY3Rpb24gbG9nQWN0aXZpdHkobWVzc2FnZSwgbGV2ZWwgPSAnaW5mbycpIHtcbiAgZGIucHJlcGFyZSgnSU5TRVJUIElOVE8gYWN0aXZpdHkgKG1lc3NhZ2UsIGxldmVsKSBWQUxVRVMgKD8sID8pJykucnVuKG1lc3NhZ2UsIGxldmVsKVxufVxuXG5mdW5jdGlvbiBnZXRBY3Rpdml0eShsaW1pdCA9IDMwKSB7XG4gIHJldHVybiBkYi5wcmVwYXJlKCdTRUxFQ1QgKiBGUk9NIGFjdGl2aXR5IE9SREVSIEJZIHRzIERFU0MsIGlkIERFU0MgTElNSVQgPycpLmFsbChsaW1pdClcbn1cblxuZnVuY3Rpb24gZ2V0U2V0dGluZyhrZXksIGZhbGxiYWNrID0gbnVsbCkge1xuICBjb25zdCByb3cgPSBkYi5wcmVwYXJlKCdTRUxFQ1QgdmFsdWUgRlJPTSBzZXR0aW5ncyBXSEVSRSBrZXkgPSA/JykuZ2V0KGtleSlcbiAgcmV0dXJuIHJvdyA/IEpTT04ucGFyc2Uocm93LnZhbHVlKSA6IGZhbGxiYWNrXG59XG5cbmZ1bmN0aW9uIHNldFNldHRpbmcoa2V5LCB2YWx1ZSkge1xuICBkYi5wcmVwYXJlKCdJTlNFUlQgT1IgUkVQTEFDRSBJTlRPIHNldHRpbmdzIChrZXksIHZhbHVlKSBWQUxVRVMgKD8sID8pJylcbiAgICAucnVuKGtleSwgSlNPTi5zdHJpbmdpZnkodmFsdWUpKVxufVxuXG5mdW5jdGlvbiBnZXRBbGxTZXR0aW5ncygpIHtcbiAgY29uc3Qgcm93cyA9IGRiLnByZXBhcmUoJ1NFTEVDVCBrZXksIHZhbHVlIEZST00gc2V0dGluZ3MnKS5hbGwoKVxuICByZXR1cm4gT2JqZWN0LmZyb21FbnRyaWVzKHJvd3MubWFwKHIgPT4gW3Iua2V5LCBKU09OLnBhcnNlKHIudmFsdWUpXSkpXG59XG5cbm1vZHVsZS5leHBvcnRzID0geyBkYiwgbG9nQWN0aXZpdHksIGdldEFjdGl2aXR5LCBnZXRTZXR0aW5nLCBzZXRTZXR0aW5nLCBnZXRBbGxTZXR0aW5ncyB9XG4iXSwibmFtZXMiOlsiRGF0YWJhc2UiLCJyZXF1aXJlIiwicGF0aCIsImZzcyIsIkRCX1BBVEgiLCJwcm9jZXNzIiwiZW52Iiwiam9pbiIsImN3ZCIsIm1rZGlyU3luYyIsImRpcm5hbWUiLCJyZWN1cnNpdmUiLCJkYiIsInByYWdtYSIsImV4ZWMiLCJsb2dBY3Rpdml0eSIsIm1lc3NhZ2UiLCJsZXZlbCIsInByZXBhcmUiLCJydW4iLCJnZXRBY3Rpdml0eSIsImxpbWl0IiwiYWxsIiwiZ2V0U2V0dGluZyIsImtleSIsImZhbGxiYWNrIiwicm93IiwiZ2V0IiwiSlNPTiIsInBhcnNlIiwidmFsdWUiLCJzZXRTZXR0aW5nIiwic3RyaW5naWZ5IiwiZ2V0QWxsU2V0dGluZ3MiLCJyb3dzIiwiT2JqZWN0IiwiZnJvbUVudHJpZXMiLCJtYXAiLCJyIiwibW9kdWxlIiwiZXhwb3J0cyJdLCJpZ25vcmVMaXN0IjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/./lib/db.js\n");

/***/ }),

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Factivity%2Froute&page=%2Fapi%2Factivity%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Factivity%2Froute.js&appDir=%2Fhome%2Fshawon%2FDeveloper%2FServer-Kit%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2Fhome%2Fshawon%2FDeveloper%2FServer-Kit&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!":
/*!********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Factivity%2Froute&page=%2Fapi%2Factivity%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Factivity%2Froute.js&appDir=%2Fhome%2Fshawon%2FDeveloper%2FServer-Kit%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2Fhome%2Fshawon%2FDeveloper%2FServer-Kit&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D! ***!
  \********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   patchFetch: () => (/* binding */ patchFetch),\n/* harmony export */   routeModule: () => (/* binding */ routeModule),\n/* harmony export */   serverHooks: () => (/* binding */ serverHooks),\n/* harmony export */   workAsyncStorage: () => (/* binding */ workAsyncStorage),\n/* harmony export */   workUnitAsyncStorage: () => (/* binding */ workUnitAsyncStorage)\n/* harmony export */ });\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/dist/server/route-modules/app-route/module.compiled */ \"(rsc)/./node_modules/next/dist/server/route-modules/app-route/module.compiled.js\");\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/dist/server/route-kind */ \"(rsc)/./node_modules/next/dist/server/route-kind.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/dist/server/lib/patch-fetch */ \"(rsc)/./node_modules/next/dist/server/lib/patch-fetch.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _home_shawon_Developer_Server_Kit_app_api_activity_route_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app/api/activity/route.js */ \"(rsc)/./app/api/activity/route.js\");\n\n\n\n\n// We inject the nextConfigOutput here so that we can use them in the route\n// module.\nconst nextConfigOutput = \"\"\nconst routeModule = new next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__.AppRouteRouteModule({\n    definition: {\n        kind: next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__.RouteKind.APP_ROUTE,\n        page: \"/api/activity/route\",\n        pathname: \"/api/activity\",\n        filename: \"route\",\n        bundlePath: \"app/api/activity/route\"\n    },\n    resolvedPagePath: \"/home/shawon/Developer/Server-Kit/app/api/activity/route.js\",\n    nextConfigOutput,\n    userland: _home_shawon_Developer_Server_Kit_app_api_activity_route_js__WEBPACK_IMPORTED_MODULE_3__\n});\n// Pull out the exports that we need to expose from the module. This should\n// be eliminated when we've moved the other routes to the new format. These\n// are used to hook into the route.\nconst { workAsyncStorage, workUnitAsyncStorage, serverHooks } = routeModule;\nfunction patchFetch() {\n    return (0,next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__.patchFetch)({\n        workAsyncStorage,\n        workUnitAsyncStorage\n    });\n}\n\n\n//# sourceMappingURL=app-route.js.map//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvbmV4dC9kaXN0L2J1aWxkL3dlYnBhY2svbG9hZGVycy9uZXh0LWFwcC1sb2FkZXIvaW5kZXguanM/bmFtZT1hcHAlMkZhcGklMkZhY3Rpdml0eSUyRnJvdXRlJnBhZ2U9JTJGYXBpJTJGYWN0aXZpdHklMkZyb3V0ZSZhcHBQYXRocz0mcGFnZVBhdGg9cHJpdmF0ZS1uZXh0LWFwcC1kaXIlMkZhcGklMkZhY3Rpdml0eSUyRnJvdXRlLmpzJmFwcERpcj0lMkZob21lJTJGc2hhd29uJTJGRGV2ZWxvcGVyJTJGU2VydmVyLUtpdCUyRmFwcCZwYWdlRXh0ZW5zaW9ucz10c3gmcGFnZUV4dGVuc2lvbnM9dHMmcGFnZUV4dGVuc2lvbnM9anN4JnBhZ2VFeHRlbnNpb25zPWpzJnJvb3REaXI9JTJGaG9tZSUyRnNoYXdvbiUyRkRldmVsb3BlciUyRlNlcnZlci1LaXQmaXNEZXY9dHJ1ZSZ0c2NvbmZpZ1BhdGg9dHNjb25maWcuanNvbiZiYXNlUGF0aD0mYXNzZXRQcmVmaXg9Jm5leHRDb25maWdPdXRwdXQ9JnByZWZlcnJlZFJlZ2lvbj0mbWlkZGxld2FyZUNvbmZpZz1lMzAlM0QhIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQStGO0FBQ3ZDO0FBQ3FCO0FBQ1c7QUFDeEY7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCLHlHQUFtQjtBQUMzQztBQUNBLGNBQWMsa0VBQVM7QUFDdkI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLFlBQVk7QUFDWixDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0EsUUFBUSxzREFBc0Q7QUFDOUQ7QUFDQSxXQUFXLDRFQUFXO0FBQ3RCO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDMEY7O0FBRTFGIiwic291cmNlcyI6WyIiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQXBwUm91dGVSb3V0ZU1vZHVsZSB9IGZyb20gXCJuZXh0L2Rpc3Qvc2VydmVyL3JvdXRlLW1vZHVsZXMvYXBwLXJvdXRlL21vZHVsZS5jb21waWxlZFwiO1xuaW1wb3J0IHsgUm91dGVLaW5kIH0gZnJvbSBcIm5leHQvZGlzdC9zZXJ2ZXIvcm91dGUta2luZFwiO1xuaW1wb3J0IHsgcGF0Y2hGZXRjaCBhcyBfcGF0Y2hGZXRjaCB9IGZyb20gXCJuZXh0L2Rpc3Qvc2VydmVyL2xpYi9wYXRjaC1mZXRjaFwiO1xuaW1wb3J0ICogYXMgdXNlcmxhbmQgZnJvbSBcIi9ob21lL3NoYXdvbi9EZXZlbG9wZXIvU2VydmVyLUtpdC9hcHAvYXBpL2FjdGl2aXR5L3JvdXRlLmpzXCI7XG4vLyBXZSBpbmplY3QgdGhlIG5leHRDb25maWdPdXRwdXQgaGVyZSBzbyB0aGF0IHdlIGNhbiB1c2UgdGhlbSBpbiB0aGUgcm91dGVcbi8vIG1vZHVsZS5cbmNvbnN0IG5leHRDb25maWdPdXRwdXQgPSBcIlwiXG5jb25zdCByb3V0ZU1vZHVsZSA9IG5ldyBBcHBSb3V0ZVJvdXRlTW9kdWxlKHtcbiAgICBkZWZpbml0aW9uOiB7XG4gICAgICAgIGtpbmQ6IFJvdXRlS2luZC5BUFBfUk9VVEUsXG4gICAgICAgIHBhZ2U6IFwiL2FwaS9hY3Rpdml0eS9yb3V0ZVwiLFxuICAgICAgICBwYXRobmFtZTogXCIvYXBpL2FjdGl2aXR5XCIsXG4gICAgICAgIGZpbGVuYW1lOiBcInJvdXRlXCIsXG4gICAgICAgIGJ1bmRsZVBhdGg6IFwiYXBwL2FwaS9hY3Rpdml0eS9yb3V0ZVwiXG4gICAgfSxcbiAgICByZXNvbHZlZFBhZ2VQYXRoOiBcIi9ob21lL3NoYXdvbi9EZXZlbG9wZXIvU2VydmVyLUtpdC9hcHAvYXBpL2FjdGl2aXR5L3JvdXRlLmpzXCIsXG4gICAgbmV4dENvbmZpZ091dHB1dCxcbiAgICB1c2VybGFuZFxufSk7XG4vLyBQdWxsIG91dCB0aGUgZXhwb3J0cyB0aGF0IHdlIG5lZWQgdG8gZXhwb3NlIGZyb20gdGhlIG1vZHVsZS4gVGhpcyBzaG91bGRcbi8vIGJlIGVsaW1pbmF0ZWQgd2hlbiB3ZSd2ZSBtb3ZlZCB0aGUgb3RoZXIgcm91dGVzIHRvIHRoZSBuZXcgZm9ybWF0LiBUaGVzZVxuLy8gYXJlIHVzZWQgdG8gaG9vayBpbnRvIHRoZSByb3V0ZS5cbmNvbnN0IHsgd29ya0FzeW5jU3RvcmFnZSwgd29ya1VuaXRBc3luY1N0b3JhZ2UsIHNlcnZlckhvb2tzIH0gPSByb3V0ZU1vZHVsZTtcbmZ1bmN0aW9uIHBhdGNoRmV0Y2goKSB7XG4gICAgcmV0dXJuIF9wYXRjaEZldGNoKHtcbiAgICAgICAgd29ya0FzeW5jU3RvcmFnZSxcbiAgICAgICAgd29ya1VuaXRBc3luY1N0b3JhZ2VcbiAgICB9KTtcbn1cbmV4cG9ydCB7IHJvdXRlTW9kdWxlLCB3b3JrQXN5bmNTdG9yYWdlLCB3b3JrVW5pdEFzeW5jU3RvcmFnZSwgc2VydmVySG9va3MsIHBhdGNoRmV0Y2gsICB9O1xuXG4vLyMgc291cmNlTWFwcGluZ1VSTD1hcHAtcm91dGUuanMubWFwIl0sIm5hbWVzIjpbXSwiaWdub3JlTGlzdCI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Factivity%2Froute&page=%2Fapi%2Factivity%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Factivity%2Froute.js&appDir=%2Fhome%2Fshawon%2FDeveloper%2FServer-Kit%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2Fhome%2Fshawon%2FDeveloper%2FServer-Kit&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!\n");

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

/***/ "better-sqlite3":
/*!*********************************!*\
  !*** external "better-sqlite3" ***!
  \*********************************/
/***/ ((module) => {

"use strict";
module.exports = require("better-sqlite3");

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
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next"], () => (__webpack_exec__("(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Factivity%2Froute&page=%2Fapi%2Factivity%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Factivity%2Froute.js&appDir=%2Fhome%2Fshawon%2FDeveloper%2FServer-Kit%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2Fhome%2Fshawon%2FDeveloper%2FServer-Kit&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!")));
module.exports = __webpack_exports__;

})();