# Challenge 01 — Frontend Debug

Here is the detailed breakdown of the bugs found and the implemented fixes:

### 1. Asynchronous handling in `api.js`
- **File:** `api.js`
- **Lines:** 4-5
- **Root Cause:** The `fetch()` and `.json()` methods return Promises. The original code was not using `await`, causing the function to return a pending promise instead of the actual data, leading to a `TypeError`.
- **Fix:** Added the `await` keyword to both calls to ensure the data is fully resolved before returning.

### 2. Assignment instead of Comparison in `app.js`
- **File:** `app.js`
- **Line:** 8
- **Root Cause:** Use of `=` (assignment) instead of `===` (strict comparison) in the condition `userId = ''`. This silently overwrote the input value and caused the validation to fail.
- **Fix:** Replaced `=` with `===` and added `.trim()` when getting the input value to handle edge cases with empty spaces.

### 3. Faulty Cache Logic in `app.js`
- **File:** `app.js`
- **Line:** 17-19
- **Root Cause:** The application used a single global variable `cachedUser`. After the first fetch, it would always return that same user regardless of the new ID entered because the variable was no longer `null`.
- **Fix:** Implemented an object-based cache (`userCache = {}`) to store and retrieve multiple users indexed by their unique ID.

### 4. Input Validation Logic in `app.js`
- **File:** `app.js`
- **Line:** 13
- **Root Cause:** The condition `userId > 0 === false` was confusing, poorly written, and prone to type coercion issues with non-numeric strings.
- **Fix:** Refactored the condition to `isNaN(userId) || Number(userId) <= 0` for robust, strict numeric validation.

### 5. Persistent Error UI in `app.js`
- **File:** `app.js`
- **Line:** 24 (New)
- **Root Cause:** When an error occurred, the `error` class was added to the result div to show red text, but it was never removed when a subsequent successful fetch occurred.
- **Fix:** Added logic to reset `className` to an empty string (`resultEl.className = '';`) right before rendering successful results.

### 6. XSS Vulnerability (Security) in `app.js`
- **File:** `app.js`
- **Line:** 24-25 (Original)
- **Root Cause:** Using `.innerHTML` to render external API data directly into the DOM allows for Cross-Site Scripting (XSS) attacks if the API data contains malicious `<script>` tags.
- **Fix:** Removed `.innerHTML` and replaced it with `document.createElement` and `document.createTextNode`. By assigning data via `.textContent`, it forces the browser to treat the data strictly as plain, harmless text.