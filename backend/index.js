'use strict';

const express = require('express');
const path = require('path');
const app = express();

const fs = require('fs');

// This code makes sure that any request that does not matches a static file
// in the build folder, will just serve index.html. Client side routing is
// going to make sure that the correct content will be loaded.
app.use((req, res, next) => {
  if (
    /(.woff|.woff2|.*api.*|.json|.ico|.js|.css|.jpg|.png|.map)$/i.test(req.path)
  ) {
    next();
  } else {
    res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
    res.header('Expires', '-1');
    res.header('Pragma', 'no-cache');
    res.sendFile(path.join(__dirname, '../frontend/build', 'index.html'));
  }
});
app.use(express.static(path.join(__dirname, '../frontend/build')));

app.use(express.json());

app.get('/api/recipes/:id', (req, res) => {
  const id = req.params.id;
  console.log(id);
  var json = fs.readFileSync(`./data/recipes/${id}.json`);

  console.log(json);
  res.send(json);
});

app.post('/api/recipes/:id', (req, res) => {
  const id = req.params.id;
  const json = req.body;
  fs.writeFileSync(`./data/recipes/${id}.json`, JSON.stringify(json));

  res.status(201).send(json);
});

app.get('/api/ingredients/:id', (req, res) => {
  const id = req.params.id;
  var json = fs.readFileSync(`./data/ingredients/${id}.json`);

  res.send(json);
});

app.get('/api/recipes/:recipeID/steps/:stepID', () => {});

// Start the server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
  console.log('Press Ctrl+C to quit.');
});
