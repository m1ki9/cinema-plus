#!/usr/bin/env node
'use strict';
const fs = require('fs');

function patch(filePath, description, ...replacements) {
  let src = fs.readFileSync(filePath, 'utf8');
  const original = src;
  for (const [from, to] of replacements) {
    if (!src.includes(from)) {
      console.error(`[patch] MISS in ${filePath}: could not find expected text`);
      process.exit(1);
    }
    src = src.replace(from, to);
  }
  if (src === original) { console.warn(`[patch] SKIP ${filePath}`); return; }
  fs.writeFileSync(filePath, src, 'utf8');
  console.log(`[patch] OK   ${filePath} — ${description}`);
}

// --- movies.js: GET→POST for photo upload + public URL via X-Forwarded-Host ---
patch(
  './src/routes/movies.js',
  'GET→POST photo upload + X-Forwarded-Host + sendStatus fix',
  ["router.get(\n  '/movies/photo/:id',", "router.post(\n  '/movies/photo/:id',"],
  ["const url = `${req.protocol}://${req.get('host')}`;",
   "const url = `${req.headers['x-forwarded-proto'] || req.protocol}://${req.headers['x-forwarded-host'] || req.get('host')}`;"],
  ["res.sendStatus(400).send(e);", "res.status(400).send(e);"]
);

// --- cinema.js: public URL via X-Forwarded-Host ---
patch(
  './src/routes/cinema.js',
  'X-Forwarded-Host + sendStatus fix',
  ["const url = `${req.protocol}://${req.get('host')}`;",
   "const url = `${req.headers['x-forwarded-proto'] || req.protocol}://${req.headers['x-forwarded-host'] || req.get('host')}`;"],
  ["res.sendStatus(400).send(e);", "res.status(400).send(e);"]
);

// --- users.js: public URL via X-Forwarded-Host ---
patch(
  './src/routes/users.js',
  'X-Forwarded-Host + sendStatus fix',
  ["const url = `${req.protocol}://${req.get('host')}`;",
   "const url = `${req.headers['x-forwarded-proto'] || req.protocol}://${req.headers['x-forwarded-host'] || req.get('host')}`;"],
  ["res.sendStatus(400).send(e);", "res.status(400).send(e);"]
);

// --- index.js: fix catch-all to return JSON 404 + add error handler ---
patch(
  './src/index.js',
  'JSON 404 catch-all + global error handler',
  ["app.get('/*', (req, res) => {\n  res.sendFile(path.join(__dirname + '../../client/build/index.html'));\n});",
   "app.get('/*', (req, res) => {\n  const indexPath = path.join(__dirname, '../../client/build/index.html');\n  res.sendFile(indexPath, (err) => {\n    if (err) res.status(404).json({ error: 'Not found' });\n  });\n});\n\napp.use((err, req, res, next) => {\n  res.status(err.status || 500).json({ error: err.message || 'Internal server error' });\n});"]
);

// --- mongoose.js: add retry logic for Docker startup timing ---
patch(
  './src/db/mongoose.js',
  'connection retry logic',
  ["mongoose.connect(process.env.MONGODB_URI, {\n  useNewUrlParser: true,\n  useCreateIndex: true,\n});",
   "const connectWithRetry = () => {\n  mongoose.connect(process.env.MONGODB_URI, {\n    useNewUrlParser: true,\n    useCreateIndex: true,\n  }).catch(() => {\n    console.log('MongoDB connection failed, retrying in 5s...');\n    setTimeout(connectWithRetry, 5000);\n  });\n};\n\nconnectWithRetry();"]
);

console.log('[patch] All patches applied successfully.');
