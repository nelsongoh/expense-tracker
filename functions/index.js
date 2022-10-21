const functions = require("firebase-functions");
const express = require("express");
const app = express();
const path = require("path");

const staticAssetPath = path.resolve(__dirname + "/../build/");

// To serve static assets (e.g. CSS, JPG files) from the build folder
app.use(express.static(staticAssetPath));

app.use("/*", (req, res) => {
  res.sendFile(staticAssetPath + "/index.html");
});

exports.app = functions.https.onRequest(app);
