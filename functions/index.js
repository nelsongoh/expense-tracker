const functions = require("firebase-functions");
const express = require("express");
const app = express();

app.use("/", (req, res) => {
  res.send();
});

exports.app = functions.https.onRequest(app);
