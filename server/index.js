const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const http = require("http");
const app = express();
const { upload } = require('./routes');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "../client/dist/client")));
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/dist/client/index.html"));
});
app.post("/upload", upload());
const server = http.createServer(app);
server.listen(3000, () => {
  console.log("Meme-Generator is running on port:3000");
});