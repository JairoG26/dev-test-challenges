// server.js

const express = require('express');
const app = express();
app.use(express.json());

// FIX BUG #4: Memory Leak.
const MAX_LOG_SIZE = 100;
const requestLog = [];

function addToLog(entry) {
  if (requestLog.length >= MAX_LOG_SIZE) {
    requestLog.shift(); // Remove oldest entry
  }
  requestLog.push(entry);
}

// Simulated async DB read
async function getDataFromDB() {
  return new Promise((resolve) => {
    setTimeout(() => resolve({ id: 1, value: 'hello' }), 100);
  });
}

// GET /data
app.get('/data', async (req, res, next) => {
  try {
    addToLog({ endpoint: '/data', ts: Date.now() });

    // FIX BUG #1: Missing await.
    const data = await getDataFromDB();

    if (!data) {
      // FIX BUG #2: Incorrect HTTP status
      res.status(404).json({ error: 'No data found' });
      return;
    }

    // FIX BUG #6: should be data.value
    res.json({ result: data.value });
  } catch (error) {
    // FIX BUG #5: Add error handling
    next(error);
  }
  
});

// POST /save
app.post('/save', (req, res, next) => {
  try {
    const { name, value } = req.body;

    // FIX BUG #3: Basic input validation
    if (!name || typeof name !== 'string' || name.trim() === '') {
      return res.status(400).json({ error: 'Invalid or missing name' });
    }
    if (value === undefined || value === null) {
      return res.status(400).json({ error: 'Missing value' });
    }

    addToLog({ endpoint: '/save', name: name.trim(), value, ts: Date.now() });  

    // FIX BUG #2: Incorrect HTTP status
    res.status(201).json({ saved: true, name: name.trim(), value });
  } catch (error) {
    next(error);
  }
});

// FIX BUG #5: Add error handling middleware
app.use((err, req, res, next) => {
  console.error('Unhandled Error:', err.message);
  res.status(500).json({ error: 'Internal Server Error' });
});

app.listen(3001, () => {
  console.log('Server running on port 3001');
});

module.exports = app;