# Module 02: Backend Debug - Solutions

### 1. Missing await in GET /data
- **File:** `server.js` | **Line:** 31
- **Root Cause:** Calling `getDataFromDB()` without `await` returned a pending Promise instead of resolved data, causing undefined behavior.
- **Fix:** Added the `await` keyword to pause execution until the promise resolves and the data is properly assigned.

### 2. Incorrect HTTP Status
- **File:** `server.js` | **Lines:** 35 and 64
- **Root Cause:** Returning a `200 OK` status for missing data or for resource creation is misleading and violates REST API standards.
- **Fix:** Updated status codes to `404 Not Found` for missing GET data, and `201 Created` for successful POST saves.

### 3. Missing Input Validation in POST /save
- **File:** `server.js` | **Lines:** 54-59
- **Root Cause:** The endpoint blindly processed the request body, allowing clients to send empty, null, or invalid data types.
- **Fix:** Added strict validation to ensure `name` is a non-empty string and `value` exists, returning a `400 Bad Request` if it fails.

### 4. Memory Leak (Unbounded Array)
- **File:** `server.js` | **Lines:** 8-16
- **Root Cause:** The global `requestLog` array grew infinitely with every request (`.push()`), which would eventually crash the server memory.
- **Fix:** Created an `addToLog` function that caps the array at 100 items, using `.shift()` to remove the oldest entry.

### 5. Missing Error Handling
- **File:** `server.js` | **Lines:** 71-74
- **Root Cause:** Lacking centralized error handling meant any unhandled exception would crash the entire Node.js server process.
- **Fix:** Wrapped routes in `try/catch` and added a global Express error-handling middleware to return a safe `500` status.

### 6. Wrong property accessed
- **File:** `server.js` | **Line:** 40
- **Root Cause:** The API attempted to return `data.result`, but the simulated database object only contains the properties `{ id, value }`.
- **Fix:** Changed the response payload mapping to correctly access and return `data.value`.