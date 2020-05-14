const express = require('express');
const app = express();
const path = require("path");
const PORT = process.env.PORT || 8000
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("/public/"));


app.get("/", function (request, response) {
  response.sendFile(path.join(__dirname, "../../index.html"));
});

app.get("/notes", function (request, response) {
  response.sendFile(path.join(__dirname, "../../notes.html"));
});

app.listen(PORT, () => {
  console.log("Server started")
});