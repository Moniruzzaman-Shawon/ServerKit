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
exports.id = "app/api/auth/login/route";
exports.ids = ["app/api/auth/login/route"];
exports.modules = {

/***/ "(rsc)/./app/api/auth/login/route.js":
/*!*************************************!*\
  !*** ./app/api/auth/login/route.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   POST: () => (/* binding */ POST)\n/* harmony export */ });\n/* harmony import */ var next_server__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/server */ \"(rsc)/./node_modules/next/dist/api/server.js\");\n/* harmony import */ var _lib_auth__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/lib/auth */ \"(rsc)/./lib/auth.js\");\n/* harmony import */ var _lib_db__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/lib/db */ \"(rsc)/./lib/db.js\");\n/* harmony import */ var _lib_db__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_lib_db__WEBPACK_IMPORTED_MODULE_2__);\n\n\n\nasync function POST(req) {\n    const { password } = await req.json();\n    if (!process.env.SK_PASSWORD) {\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            error: 'SK_PASSWORD not set in environment'\n        }, {\n            status: 500\n        });\n    }\n    // DB-stored password (set via Settings page) takes precedence over env var\n    const effectivePassword = (0,_lib_db__WEBPACK_IMPORTED_MODULE_2__.getSetting)('password') ?? process.env.SK_PASSWORD;\n    if (password !== effectivePassword) {\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            error: 'Invalid password'\n        }, {\n            status: 401\n        });\n    }\n    const token = await (0,_lib_auth__WEBPACK_IMPORTED_MODULE_1__.signToken)();\n    const res = next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n        ok: true\n    });\n    res.cookies.set(_lib_auth__WEBPACK_IMPORTED_MODULE_1__.COOKIE, token, {\n        httpOnly: true,\n        secure: \"development\" === 'production',\n        sameSite: 'lax',\n        path: '/',\n        maxAge: 7 * 24 * 60 * 60\n    });\n    return res;\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9hcHAvYXBpL2F1dGgvbG9naW4vcm91dGUuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBMEM7QUFDSTtBQUNUO0FBRTlCLGVBQWVJLEtBQUtDLEdBQUc7SUFDNUIsTUFBTSxFQUFFQyxRQUFRLEVBQUUsR0FBRyxNQUFNRCxJQUFJRSxJQUFJO0lBRW5DLElBQUksQ0FBQ0MsUUFBUUMsR0FBRyxDQUFDQyxXQUFXLEVBQUU7UUFDNUIsT0FBT1YscURBQVlBLENBQUNPLElBQUksQ0FBQztZQUFFSSxPQUFPO1FBQXFDLEdBQUc7WUFBRUMsUUFBUTtRQUFJO0lBQzFGO0lBRUEsMkVBQTJFO0lBQzNFLE1BQU1DLG9CQUFvQlYsbURBQVVBLENBQUMsZUFBZUssUUFBUUMsR0FBRyxDQUFDQyxXQUFXO0lBRTNFLElBQUlKLGFBQWFPLG1CQUFtQjtRQUNsQyxPQUFPYixxREFBWUEsQ0FBQ08sSUFBSSxDQUFDO1lBQUVJLE9BQU87UUFBbUIsR0FBRztZQUFFQyxRQUFRO1FBQUk7SUFDeEU7SUFFQSxNQUFNRSxRQUFRLE1BQU1iLG9EQUFTQTtJQUM3QixNQUFNYyxNQUFNZixxREFBWUEsQ0FBQ08sSUFBSSxDQUFDO1FBQUVTLElBQUk7SUFBSztJQUN6Q0QsSUFBSUUsT0FBTyxDQUFDQyxHQUFHLENBQUNoQiw2Q0FBTUEsRUFBRVksT0FBTztRQUM3QkssVUFBVTtRQUNWQyxRQUFRWixrQkFBeUI7UUFDakNhLFVBQVU7UUFDVkMsTUFBTTtRQUNOQyxRQUFRLElBQUksS0FBSyxLQUFLO0lBQ3hCO0lBQ0EsT0FBT1I7QUFDVCIsInNvdXJjZXMiOlsiL2hvbWUvc2hhd29uL0RldmVsb3Blci9TZXJ2ZXItS2l0L2FwcC9hcGkvYXV0aC9sb2dpbi9yb3V0ZS5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZXh0UmVzcG9uc2UgfSBmcm9tICduZXh0L3NlcnZlcidcbmltcG9ydCB7IHNpZ25Ub2tlbiwgQ09PS0lFIH0gZnJvbSAnQC9saWIvYXV0aCdcbmltcG9ydCB7IGdldFNldHRpbmcgfSBmcm9tICdAL2xpYi9kYidcblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIFBPU1QocmVxKSB7XG4gIGNvbnN0IHsgcGFzc3dvcmQgfSA9IGF3YWl0IHJlcS5qc29uKClcblxuICBpZiAoIXByb2Nlc3MuZW52LlNLX1BBU1NXT1JEKSB7XG4gICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKHsgZXJyb3I6ICdTS19QQVNTV09SRCBub3Qgc2V0IGluIGVudmlyb25tZW50JyB9LCB7IHN0YXR1czogNTAwIH0pXG4gIH1cblxuICAvLyBEQi1zdG9yZWQgcGFzc3dvcmQgKHNldCB2aWEgU2V0dGluZ3MgcGFnZSkgdGFrZXMgcHJlY2VkZW5jZSBvdmVyIGVudiB2YXJcbiAgY29uc3QgZWZmZWN0aXZlUGFzc3dvcmQgPSBnZXRTZXR0aW5nKCdwYXNzd29yZCcpID8/IHByb2Nlc3MuZW52LlNLX1BBU1NXT1JEXG5cbiAgaWYgKHBhc3N3b3JkICE9PSBlZmZlY3RpdmVQYXNzd29yZCkge1xuICAgIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbih7IGVycm9yOiAnSW52YWxpZCBwYXNzd29yZCcgfSwgeyBzdGF0dXM6IDQwMSB9KVxuICB9XG5cbiAgY29uc3QgdG9rZW4gPSBhd2FpdCBzaWduVG9rZW4oKVxuICBjb25zdCByZXMgPSBOZXh0UmVzcG9uc2UuanNvbih7IG9rOiB0cnVlIH0pXG4gIHJlcy5jb29raWVzLnNldChDT09LSUUsIHRva2VuLCB7XG4gICAgaHR0cE9ubHk6IHRydWUsXG4gICAgc2VjdXJlOiBwcm9jZXNzLmVudi5OT0RFX0VOViA9PT0gJ3Byb2R1Y3Rpb24nLFxuICAgIHNhbWVTaXRlOiAnbGF4JyxcbiAgICBwYXRoOiAnLycsXG4gICAgbWF4QWdlOiA3ICogMjQgKiA2MCAqIDYwLFxuICB9KVxuICByZXR1cm4gcmVzXG59XG4iXSwibmFtZXMiOlsiTmV4dFJlc3BvbnNlIiwic2lnblRva2VuIiwiQ09PS0lFIiwiZ2V0U2V0dGluZyIsIlBPU1QiLCJyZXEiLCJwYXNzd29yZCIsImpzb24iLCJwcm9jZXNzIiwiZW52IiwiU0tfUEFTU1dPUkQiLCJlcnJvciIsInN0YXR1cyIsImVmZmVjdGl2ZVBhc3N3b3JkIiwidG9rZW4iLCJyZXMiLCJvayIsImNvb2tpZXMiLCJzZXQiLCJodHRwT25seSIsInNlY3VyZSIsInNhbWVTaXRlIiwicGF0aCIsIm1heEFnZSJdLCJpZ25vcmVMaXN0IjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/./app/api/auth/login/route.js\n");

/***/ }),

/***/ "(rsc)/./lib/auth.js":
/*!*********************!*\
  !*** ./lib/auth.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   COOKIE: () => (/* binding */ COOKIE),\n/* harmony export */   getSession: () => (/* binding */ getSession),\n/* harmony export */   signToken: () => (/* binding */ signToken),\n/* harmony export */   verifyToken: () => (/* binding */ verifyToken)\n/* harmony export */ });\n/* harmony import */ var jose__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! jose */ \"(rsc)/./node_modules/jose/dist/node/esm/jwt/sign.js\");\n/* harmony import */ var jose__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! jose */ \"(rsc)/./node_modules/jose/dist/node/esm/jwt/verify.js\");\n/* harmony import */ var next_headers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/headers */ \"(rsc)/./node_modules/next/dist/api/headers.js\");\n\n\nconst COOKIE = 'sk_token';\nfunction secret() {\n    return new TextEncoder().encode(process.env.JWT_SECRET || 'serverkit-dev-secret-please-change-in-production');\n}\nasync function signToken() {\n    return new jose__WEBPACK_IMPORTED_MODULE_1__.SignJWT({\n        sub: 'admin'\n    }).setProtectedHeader({\n        alg: 'HS256'\n    }).setIssuedAt().setExpirationTime('7d').sign(secret());\n}\nasync function verifyToken(token) {\n    try {\n        const { payload } = await (0,jose__WEBPACK_IMPORTED_MODULE_2__.jwtVerify)(token, secret());\n        return payload;\n    } catch  {\n        return null;\n    }\n}\nasync function getSession() {\n    const store = (0,next_headers__WEBPACK_IMPORTED_MODULE_0__.cookies)();\n    const token = store.get(COOKIE)?.value;\n    if (!token) return null;\n    return verifyToken(token);\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9saWIvYXV0aC5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQXlDO0FBQ0g7QUFFL0IsTUFBTUcsU0FBUyxXQUFVO0FBRWhDLFNBQVNDO0lBQ1AsT0FBTyxJQUFJQyxjQUFjQyxNQUFNLENBQzdCQyxRQUFRQyxHQUFHLENBQUNDLFVBQVUsSUFBSTtBQUU5QjtBQUVPLGVBQWVDO0lBQ3BCLE9BQU8sSUFBSVYseUNBQU9BLENBQUM7UUFBRVcsS0FBSztJQUFRLEdBQy9CQyxrQkFBa0IsQ0FBQztRQUFFQyxLQUFLO0lBQVEsR0FDbENDLFdBQVcsR0FDWEMsaUJBQWlCLENBQUMsTUFDbEJDLElBQUksQ0FBQ1o7QUFDVjtBQUVPLGVBQWVhLFlBQVlDLEtBQUs7SUFDckMsSUFBSTtRQUNGLE1BQU0sRUFBRUMsT0FBTyxFQUFFLEdBQUcsTUFBTWxCLCtDQUFTQSxDQUFDaUIsT0FBT2Q7UUFDM0MsT0FBT2U7SUFDVCxFQUFFLE9BQU07UUFDTixPQUFPO0lBQ1Q7QUFDRjtBQUVPLGVBQWVDO0lBQ3BCLE1BQU1DLFFBQVFuQixxREFBT0E7SUFDckIsTUFBTWdCLFFBQVFHLE1BQU1DLEdBQUcsQ0FBQ25CLFNBQVNvQjtJQUNqQyxJQUFJLENBQUNMLE9BQU8sT0FBTztJQUNuQixPQUFPRCxZQUFZQztBQUNyQiIsInNvdXJjZXMiOlsiL2hvbWUvc2hhd29uL0RldmVsb3Blci9TZXJ2ZXItS2l0L2xpYi9hdXRoLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFNpZ25KV1QsIGp3dFZlcmlmeSB9IGZyb20gJ2pvc2UnXG5pbXBvcnQgeyBjb29raWVzIH0gZnJvbSAnbmV4dC9oZWFkZXJzJ1xuXG5leHBvcnQgY29uc3QgQ09PS0lFID0gJ3NrX3Rva2VuJ1xuXG5mdW5jdGlvbiBzZWNyZXQoKSB7XG4gIHJldHVybiBuZXcgVGV4dEVuY29kZXIoKS5lbmNvZGUoXG4gICAgcHJvY2Vzcy5lbnYuSldUX1NFQ1JFVCB8fCAnc2VydmVya2l0LWRldi1zZWNyZXQtcGxlYXNlLWNoYW5nZS1pbi1wcm9kdWN0aW9uJ1xuICApXG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBzaWduVG9rZW4oKSB7XG4gIHJldHVybiBuZXcgU2lnbkpXVCh7IHN1YjogJ2FkbWluJyB9KVxuICAgIC5zZXRQcm90ZWN0ZWRIZWFkZXIoeyBhbGc6ICdIUzI1NicgfSlcbiAgICAuc2V0SXNzdWVkQXQoKVxuICAgIC5zZXRFeHBpcmF0aW9uVGltZSgnN2QnKVxuICAgIC5zaWduKHNlY3JldCgpKVxufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gdmVyaWZ5VG9rZW4odG9rZW4pIHtcbiAgdHJ5IHtcbiAgICBjb25zdCB7IHBheWxvYWQgfSA9IGF3YWl0IGp3dFZlcmlmeSh0b2tlbiwgc2VjcmV0KCkpXG4gICAgcmV0dXJuIHBheWxvYWRcbiAgfSBjYXRjaCB7XG4gICAgcmV0dXJuIG51bGxcbiAgfVxufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZ2V0U2Vzc2lvbigpIHtcbiAgY29uc3Qgc3RvcmUgPSBjb29raWVzKClcbiAgY29uc3QgdG9rZW4gPSBzdG9yZS5nZXQoQ09PS0lFKT8udmFsdWVcbiAgaWYgKCF0b2tlbikgcmV0dXJuIG51bGxcbiAgcmV0dXJuIHZlcmlmeVRva2VuKHRva2VuKVxufVxuIl0sIm5hbWVzIjpbIlNpZ25KV1QiLCJqd3RWZXJpZnkiLCJjb29raWVzIiwiQ09PS0lFIiwic2VjcmV0IiwiVGV4dEVuY29kZXIiLCJlbmNvZGUiLCJwcm9jZXNzIiwiZW52IiwiSldUX1NFQ1JFVCIsInNpZ25Ub2tlbiIsInN1YiIsInNldFByb3RlY3RlZEhlYWRlciIsImFsZyIsInNldElzc3VlZEF0Iiwic2V0RXhwaXJhdGlvblRpbWUiLCJzaWduIiwidmVyaWZ5VG9rZW4iLCJ0b2tlbiIsInBheWxvYWQiLCJnZXRTZXNzaW9uIiwic3RvcmUiLCJnZXQiLCJ2YWx1ZSJdLCJpZ25vcmVMaXN0IjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/./lib/auth.js\n");

/***/ }),

/***/ "(rsc)/./lib/db.js":
/*!*******************!*\
  !*** ./lib/db.js ***!
  \*******************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("\nconst Database = __webpack_require__(/*! better-sqlite3 */ \"better-sqlite3\");\nconst path = __webpack_require__(/*! path */ \"path\");\nconst fss = __webpack_require__(/*! fs */ \"fs\");\nconst DB_PATH = process.env.DB_PATH || path.join(process.cwd(), 'data', 'serverkit.db');\nfss.mkdirSync(path.dirname(DB_PATH), {\n    recursive: true\n});\nconst db = new Database(DB_PATH);\ndb.pragma('journal_mode = WAL');\ndb.exec(`\n  CREATE TABLE IF NOT EXISTS activity (\n    id        INTEGER PRIMARY KEY AUTOINCREMENT,\n    message   TEXT    NOT NULL,\n    level     TEXT    NOT NULL DEFAULT 'info',\n    ts        INTEGER NOT NULL DEFAULT (unixepoch())\n  );\n\n  CREATE TABLE IF NOT EXISTS settings (\n    key   TEXT PRIMARY KEY,\n    value TEXT NOT NULL\n  );\n`);\nfunction logActivity(message, level = 'info') {\n    db.prepare('INSERT INTO activity (message, level) VALUES (?, ?)').run(message, level);\n}\nfunction getActivity(limit = 30) {\n    return db.prepare('SELECT * FROM activity ORDER BY ts DESC, id DESC LIMIT ?').all(limit);\n}\nfunction getSetting(key, fallback = null) {\n    const row = db.prepare('SELECT value FROM settings WHERE key = ?').get(key);\n    return row ? JSON.parse(row.value) : fallback;\n}\nfunction setSetting(key, value) {\n    db.prepare('INSERT OR REPLACE INTO settings (key, value) VALUES (?, ?)').run(key, JSON.stringify(value));\n}\nfunction getAllSettings() {\n    const rows = db.prepare('SELECT key, value FROM settings').all();\n    return Object.fromEntries(rows.map((r)=>[\n            r.key,\n            JSON.parse(r.value)\n        ]));\n}\nmodule.exports = {\n    db,\n    logActivity,\n    getActivity,\n    getSetting,\n    setSetting,\n    getAllSettings\n};\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9saWIvZGIuanMiLCJtYXBwaW5ncyI6IjtBQUFBLE1BQU1BLFdBQVdDLG1CQUFPQSxDQUFDLHNDQUFnQjtBQUN6QyxNQUFNQyxPQUFPRCxtQkFBT0EsQ0FBQyxrQkFBTTtBQUMzQixNQUFNRSxNQUFNRixtQkFBT0EsQ0FBQyxjQUFJO0FBRXhCLE1BQU1HLFVBQVVDLFFBQVFDLEdBQUcsQ0FBQ0YsT0FBTyxJQUFJRixLQUFLSyxJQUFJLENBQUNGLFFBQVFHLEdBQUcsSUFBSSxRQUFRO0FBQ3hFTCxJQUFJTSxTQUFTLENBQUNQLEtBQUtRLE9BQU8sQ0FBQ04sVUFBVTtJQUFFTyxXQUFXO0FBQUs7QUFFdkQsTUFBTUMsS0FBSyxJQUFJWixTQUFTSTtBQUN4QlEsR0FBR0MsTUFBTSxDQUFDO0FBRVZELEdBQUdFLElBQUksQ0FBQyxDQUFDOzs7Ozs7Ozs7Ozs7QUFZVCxDQUFDO0FBRUQsU0FBU0MsWUFBWUMsT0FBTyxFQUFFQyxRQUFRLE1BQU07SUFDMUNMLEdBQUdNLE9BQU8sQ0FBQyx1REFBdURDLEdBQUcsQ0FBQ0gsU0FBU0M7QUFDakY7QUFFQSxTQUFTRyxZQUFZQyxRQUFRLEVBQUU7SUFDN0IsT0FBT1QsR0FBR00sT0FBTyxDQUFDLDREQUE0REksR0FBRyxDQUFDRDtBQUNwRjtBQUVBLFNBQVNFLFdBQVdDLEdBQUcsRUFBRUMsV0FBVyxJQUFJO0lBQ3RDLE1BQU1DLE1BQU1kLEdBQUdNLE9BQU8sQ0FBQyw0Q0FBNENTLEdBQUcsQ0FBQ0g7SUFDdkUsT0FBT0UsTUFBTUUsS0FBS0MsS0FBSyxDQUFDSCxJQUFJSSxLQUFLLElBQUlMO0FBQ3ZDO0FBRUEsU0FBU00sV0FBV1AsR0FBRyxFQUFFTSxLQUFLO0lBQzVCbEIsR0FBR00sT0FBTyxDQUFDLDhEQUNSQyxHQUFHLENBQUNLLEtBQUtJLEtBQUtJLFNBQVMsQ0FBQ0Y7QUFDN0I7QUFFQSxTQUFTRztJQUNQLE1BQU1DLE9BQU90QixHQUFHTSxPQUFPLENBQUMsbUNBQW1DSSxHQUFHO0lBQzlELE9BQU9hLE9BQU9DLFdBQVcsQ0FBQ0YsS0FBS0csR0FBRyxDQUFDQyxDQUFBQSxJQUFLO1lBQUNBLEVBQUVkLEdBQUc7WUFBRUksS0FBS0MsS0FBSyxDQUFDUyxFQUFFUixLQUFLO1NBQUU7QUFDdEU7QUFFQVMsT0FBT0MsT0FBTyxHQUFHO0lBQUU1QjtJQUFJRztJQUFhSztJQUFhRztJQUFZUTtJQUFZRTtBQUFlIiwic291cmNlcyI6WyIvaG9tZS9zaGF3b24vRGV2ZWxvcGVyL1NlcnZlci1LaXQvbGliL2RiLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImNvbnN0IERhdGFiYXNlID0gcmVxdWlyZSgnYmV0dGVyLXNxbGl0ZTMnKVxuY29uc3QgcGF0aCA9IHJlcXVpcmUoJ3BhdGgnKVxuY29uc3QgZnNzID0gcmVxdWlyZSgnZnMnKVxuXG5jb25zdCBEQl9QQVRIID0gcHJvY2Vzcy5lbnYuREJfUEFUSCB8fCBwYXRoLmpvaW4ocHJvY2Vzcy5jd2QoKSwgJ2RhdGEnLCAnc2VydmVya2l0LmRiJylcbmZzcy5ta2RpclN5bmMocGF0aC5kaXJuYW1lKERCX1BBVEgpLCB7IHJlY3Vyc2l2ZTogdHJ1ZSB9KVxuXG5jb25zdCBkYiA9IG5ldyBEYXRhYmFzZShEQl9QQVRIKVxuZGIucHJhZ21hKCdqb3VybmFsX21vZGUgPSBXQUwnKVxuXG5kYi5leGVjKGBcbiAgQ1JFQVRFIFRBQkxFIElGIE5PVCBFWElTVFMgYWN0aXZpdHkgKFxuICAgIGlkICAgICAgICBJTlRFR0VSIFBSSU1BUlkgS0VZIEFVVE9JTkNSRU1FTlQsXG4gICAgbWVzc2FnZSAgIFRFWFQgICAgTk9UIE5VTEwsXG4gICAgbGV2ZWwgICAgIFRFWFQgICAgTk9UIE5VTEwgREVGQVVMVCAnaW5mbycsXG4gICAgdHMgICAgICAgIElOVEVHRVIgTk9UIE5VTEwgREVGQVVMVCAodW5peGVwb2NoKCkpXG4gICk7XG5cbiAgQ1JFQVRFIFRBQkxFIElGIE5PVCBFWElTVFMgc2V0dGluZ3MgKFxuICAgIGtleSAgIFRFWFQgUFJJTUFSWSBLRVksXG4gICAgdmFsdWUgVEVYVCBOT1QgTlVMTFxuICApO1xuYClcblxuZnVuY3Rpb24gbG9nQWN0aXZpdHkobWVzc2FnZSwgbGV2ZWwgPSAnaW5mbycpIHtcbiAgZGIucHJlcGFyZSgnSU5TRVJUIElOVE8gYWN0aXZpdHkgKG1lc3NhZ2UsIGxldmVsKSBWQUxVRVMgKD8sID8pJykucnVuKG1lc3NhZ2UsIGxldmVsKVxufVxuXG5mdW5jdGlvbiBnZXRBY3Rpdml0eShsaW1pdCA9IDMwKSB7XG4gIHJldHVybiBkYi5wcmVwYXJlKCdTRUxFQ1QgKiBGUk9NIGFjdGl2aXR5IE9SREVSIEJZIHRzIERFU0MsIGlkIERFU0MgTElNSVQgPycpLmFsbChsaW1pdClcbn1cblxuZnVuY3Rpb24gZ2V0U2V0dGluZyhrZXksIGZhbGxiYWNrID0gbnVsbCkge1xuICBjb25zdCByb3cgPSBkYi5wcmVwYXJlKCdTRUxFQ1QgdmFsdWUgRlJPTSBzZXR0aW5ncyBXSEVSRSBrZXkgPSA/JykuZ2V0KGtleSlcbiAgcmV0dXJuIHJvdyA/IEpTT04ucGFyc2Uocm93LnZhbHVlKSA6IGZhbGxiYWNrXG59XG5cbmZ1bmN0aW9uIHNldFNldHRpbmcoa2V5LCB2YWx1ZSkge1xuICBkYi5wcmVwYXJlKCdJTlNFUlQgT1IgUkVQTEFDRSBJTlRPIHNldHRpbmdzIChrZXksIHZhbHVlKSBWQUxVRVMgKD8sID8pJylcbiAgICAucnVuKGtleSwgSlNPTi5zdHJpbmdpZnkodmFsdWUpKVxufVxuXG5mdW5jdGlvbiBnZXRBbGxTZXR0aW5ncygpIHtcbiAgY29uc3Qgcm93cyA9IGRiLnByZXBhcmUoJ1NFTEVDVCBrZXksIHZhbHVlIEZST00gc2V0dGluZ3MnKS5hbGwoKVxuICByZXR1cm4gT2JqZWN0LmZyb21FbnRyaWVzKHJvd3MubWFwKHIgPT4gW3Iua2V5LCBKU09OLnBhcnNlKHIudmFsdWUpXSkpXG59XG5cbm1vZHVsZS5leHBvcnRzID0geyBkYiwgbG9nQWN0aXZpdHksIGdldEFjdGl2aXR5LCBnZXRTZXR0aW5nLCBzZXRTZXR0aW5nLCBnZXRBbGxTZXR0aW5ncyB9XG4iXSwibmFtZXMiOlsiRGF0YWJhc2UiLCJyZXF1aXJlIiwicGF0aCIsImZzcyIsIkRCX1BBVEgiLCJwcm9jZXNzIiwiZW52Iiwiam9pbiIsImN3ZCIsIm1rZGlyU3luYyIsImRpcm5hbWUiLCJyZWN1cnNpdmUiLCJkYiIsInByYWdtYSIsImV4ZWMiLCJsb2dBY3Rpdml0eSIsIm1lc3NhZ2UiLCJsZXZlbCIsInByZXBhcmUiLCJydW4iLCJnZXRBY3Rpdml0eSIsImxpbWl0IiwiYWxsIiwiZ2V0U2V0dGluZyIsImtleSIsImZhbGxiYWNrIiwicm93IiwiZ2V0IiwiSlNPTiIsInBhcnNlIiwidmFsdWUiLCJzZXRTZXR0aW5nIiwic3RyaW5naWZ5IiwiZ2V0QWxsU2V0dGluZ3MiLCJyb3dzIiwiT2JqZWN0IiwiZnJvbUVudHJpZXMiLCJtYXAiLCJyIiwibW9kdWxlIiwiZXhwb3J0cyJdLCJpZ25vcmVMaXN0IjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/./lib/db.js\n");

/***/ }),

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fauth%2Flogin%2Froute&page=%2Fapi%2Fauth%2Flogin%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fauth%2Flogin%2Froute.js&appDir=%2Fhome%2Fshawon%2FDeveloper%2FServer-Kit%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2Fhome%2Fshawon%2FDeveloper%2FServer-Kit&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!":
/*!********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fauth%2Flogin%2Froute&page=%2Fapi%2Fauth%2Flogin%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fauth%2Flogin%2Froute.js&appDir=%2Fhome%2Fshawon%2FDeveloper%2FServer-Kit%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2Fhome%2Fshawon%2FDeveloper%2FServer-Kit&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D! ***!
  \********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   patchFetch: () => (/* binding */ patchFetch),\n/* harmony export */   routeModule: () => (/* binding */ routeModule),\n/* harmony export */   serverHooks: () => (/* binding */ serverHooks),\n/* harmony export */   workAsyncStorage: () => (/* binding */ workAsyncStorage),\n/* harmony export */   workUnitAsyncStorage: () => (/* binding */ workUnitAsyncStorage)\n/* harmony export */ });\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/dist/server/route-modules/app-route/module.compiled */ \"(rsc)/./node_modules/next/dist/server/route-modules/app-route/module.compiled.js\");\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/dist/server/route-kind */ \"(rsc)/./node_modules/next/dist/server/route-kind.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/dist/server/lib/patch-fetch */ \"(rsc)/./node_modules/next/dist/server/lib/patch-fetch.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _home_shawon_Developer_Server_Kit_app_api_auth_login_route_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app/api/auth/login/route.js */ \"(rsc)/./app/api/auth/login/route.js\");\n\n\n\n\n// We inject the nextConfigOutput here so that we can use them in the route\n// module.\nconst nextConfigOutput = \"\"\nconst routeModule = new next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__.AppRouteRouteModule({\n    definition: {\n        kind: next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__.RouteKind.APP_ROUTE,\n        page: \"/api/auth/login/route\",\n        pathname: \"/api/auth/login\",\n        filename: \"route\",\n        bundlePath: \"app/api/auth/login/route\"\n    },\n    resolvedPagePath: \"/home/shawon/Developer/Server-Kit/app/api/auth/login/route.js\",\n    nextConfigOutput,\n    userland: _home_shawon_Developer_Server_Kit_app_api_auth_login_route_js__WEBPACK_IMPORTED_MODULE_3__\n});\n// Pull out the exports that we need to expose from the module. This should\n// be eliminated when we've moved the other routes to the new format. These\n// are used to hook into the route.\nconst { workAsyncStorage, workUnitAsyncStorage, serverHooks } = routeModule;\nfunction patchFetch() {\n    return (0,next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__.patchFetch)({\n        workAsyncStorage,\n        workUnitAsyncStorage\n    });\n}\n\n\n//# sourceMappingURL=app-route.js.map//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvbmV4dC9kaXN0L2J1aWxkL3dlYnBhY2svbG9hZGVycy9uZXh0LWFwcC1sb2FkZXIvaW5kZXguanM/bmFtZT1hcHAlMkZhcGklMkZhdXRoJTJGbG9naW4lMkZyb3V0ZSZwYWdlPSUyRmFwaSUyRmF1dGglMkZsb2dpbiUyRnJvdXRlJmFwcFBhdGhzPSZwYWdlUGF0aD1wcml2YXRlLW5leHQtYXBwLWRpciUyRmFwaSUyRmF1dGglMkZsb2dpbiUyRnJvdXRlLmpzJmFwcERpcj0lMkZob21lJTJGc2hhd29uJTJGRGV2ZWxvcGVyJTJGU2VydmVyLUtpdCUyRmFwcCZwYWdlRXh0ZW5zaW9ucz10c3gmcGFnZUV4dGVuc2lvbnM9dHMmcGFnZUV4dGVuc2lvbnM9anN4JnBhZ2VFeHRlbnNpb25zPWpzJnJvb3REaXI9JTJGaG9tZSUyRnNoYXdvbiUyRkRldmVsb3BlciUyRlNlcnZlci1LaXQmaXNEZXY9dHJ1ZSZ0c2NvbmZpZ1BhdGg9dHNjb25maWcuanNvbiZiYXNlUGF0aD0mYXNzZXRQcmVmaXg9Jm5leHRDb25maWdPdXRwdXQ9JnByZWZlcnJlZFJlZ2lvbj0mbWlkZGxld2FyZUNvbmZpZz1lMzAlM0QhIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQStGO0FBQ3ZDO0FBQ3FCO0FBQ2E7QUFDMUY7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCLHlHQUFtQjtBQUMzQztBQUNBLGNBQWMsa0VBQVM7QUFDdkI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLFlBQVk7QUFDWixDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0EsUUFBUSxzREFBc0Q7QUFDOUQ7QUFDQSxXQUFXLDRFQUFXO0FBQ3RCO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDMEY7O0FBRTFGIiwic291cmNlcyI6WyIiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQXBwUm91dGVSb3V0ZU1vZHVsZSB9IGZyb20gXCJuZXh0L2Rpc3Qvc2VydmVyL3JvdXRlLW1vZHVsZXMvYXBwLXJvdXRlL21vZHVsZS5jb21waWxlZFwiO1xuaW1wb3J0IHsgUm91dGVLaW5kIH0gZnJvbSBcIm5leHQvZGlzdC9zZXJ2ZXIvcm91dGUta2luZFwiO1xuaW1wb3J0IHsgcGF0Y2hGZXRjaCBhcyBfcGF0Y2hGZXRjaCB9IGZyb20gXCJuZXh0L2Rpc3Qvc2VydmVyL2xpYi9wYXRjaC1mZXRjaFwiO1xuaW1wb3J0ICogYXMgdXNlcmxhbmQgZnJvbSBcIi9ob21lL3NoYXdvbi9EZXZlbG9wZXIvU2VydmVyLUtpdC9hcHAvYXBpL2F1dGgvbG9naW4vcm91dGUuanNcIjtcbi8vIFdlIGluamVjdCB0aGUgbmV4dENvbmZpZ091dHB1dCBoZXJlIHNvIHRoYXQgd2UgY2FuIHVzZSB0aGVtIGluIHRoZSByb3V0ZVxuLy8gbW9kdWxlLlxuY29uc3QgbmV4dENvbmZpZ091dHB1dCA9IFwiXCJcbmNvbnN0IHJvdXRlTW9kdWxlID0gbmV3IEFwcFJvdXRlUm91dGVNb2R1bGUoe1xuICAgIGRlZmluaXRpb246IHtcbiAgICAgICAga2luZDogUm91dGVLaW5kLkFQUF9ST1VURSxcbiAgICAgICAgcGFnZTogXCIvYXBpL2F1dGgvbG9naW4vcm91dGVcIixcbiAgICAgICAgcGF0aG5hbWU6IFwiL2FwaS9hdXRoL2xvZ2luXCIsXG4gICAgICAgIGZpbGVuYW1lOiBcInJvdXRlXCIsXG4gICAgICAgIGJ1bmRsZVBhdGg6IFwiYXBwL2FwaS9hdXRoL2xvZ2luL3JvdXRlXCJcbiAgICB9LFxuICAgIHJlc29sdmVkUGFnZVBhdGg6IFwiL2hvbWUvc2hhd29uL0RldmVsb3Blci9TZXJ2ZXItS2l0L2FwcC9hcGkvYXV0aC9sb2dpbi9yb3V0ZS5qc1wiLFxuICAgIG5leHRDb25maWdPdXRwdXQsXG4gICAgdXNlcmxhbmRcbn0pO1xuLy8gUHVsbCBvdXQgdGhlIGV4cG9ydHMgdGhhdCB3ZSBuZWVkIHRvIGV4cG9zZSBmcm9tIHRoZSBtb2R1bGUuIFRoaXMgc2hvdWxkXG4vLyBiZSBlbGltaW5hdGVkIHdoZW4gd2UndmUgbW92ZWQgdGhlIG90aGVyIHJvdXRlcyB0byB0aGUgbmV3IGZvcm1hdC4gVGhlc2Vcbi8vIGFyZSB1c2VkIHRvIGhvb2sgaW50byB0aGUgcm91dGUuXG5jb25zdCB7IHdvcmtBc3luY1N0b3JhZ2UsIHdvcmtVbml0QXN5bmNTdG9yYWdlLCBzZXJ2ZXJIb29rcyB9ID0gcm91dGVNb2R1bGU7XG5mdW5jdGlvbiBwYXRjaEZldGNoKCkge1xuICAgIHJldHVybiBfcGF0Y2hGZXRjaCh7XG4gICAgICAgIHdvcmtBc3luY1N0b3JhZ2UsXG4gICAgICAgIHdvcmtVbml0QXN5bmNTdG9yYWdlXG4gICAgfSk7XG59XG5leHBvcnQgeyByb3V0ZU1vZHVsZSwgd29ya0FzeW5jU3RvcmFnZSwgd29ya1VuaXRBc3luY1N0b3JhZ2UsIHNlcnZlckhvb2tzLCBwYXRjaEZldGNoLCAgfTtcblxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9YXBwLXJvdXRlLmpzLm1hcCJdLCJuYW1lcyI6W10sImlnbm9yZUxpc3QiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fauth%2Flogin%2Froute&page=%2Fapi%2Fauth%2Flogin%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fauth%2Flogin%2Froute.js&appDir=%2Fhome%2Fshawon%2FDeveloper%2FServer-Kit%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2Fhome%2Fshawon%2FDeveloper%2FServer-Kit&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!\n");

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

/***/ "node:buffer":
/*!******************************!*\
  !*** external "node:buffer" ***!
  \******************************/
/***/ ((module) => {

"use strict";
module.exports = require("node:buffer");

/***/ }),

/***/ "node:crypto":
/*!******************************!*\
  !*** external "node:crypto" ***!
  \******************************/
/***/ ((module) => {

"use strict";
module.exports = require("node:crypto");

/***/ }),

/***/ "node:util":
/*!****************************!*\
  !*** external "node:util" ***!
  \****************************/
/***/ ((module) => {

"use strict";
module.exports = require("node:util");

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
var __webpack_require__ = require("../../../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next","vendor-chunks/jose"], () => (__webpack_exec__("(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fauth%2Flogin%2Froute&page=%2Fapi%2Fauth%2Flogin%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fauth%2Flogin%2Froute.js&appDir=%2Fhome%2Fshawon%2FDeveloper%2FServer-Kit%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2Fhome%2Fshawon%2FDeveloper%2FServer-Kit&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!")));
module.exports = __webpack_exports__;

})();