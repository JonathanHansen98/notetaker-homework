const express = require('express');
const path = require("path");
const app = express();
const PORT =  process.env.PORT;
var notes = require('./db/db.json')


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'))


app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/index.html"));
});
app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/notes.html"));
});
app.get("/api/notes", (req, res) => {
  res.json(notes);
});
app.post("/api/notes" , (req, res) => {
  const newNote  = req.body
  newNote.id = (req.body.title.split(" "))[0].toLowerCase();
  notes.push(newNote)
  console.log(notes)
});
app.get("/api/notes/:id", (req, res) => {
  const idRequest = req.params.id
  console.log(idRequest)
  const query = notes.filter(note => note.id === idRequest)
  console.log(query)
  res.json(query)
});
app.delete("/api/notes/:id", (req,res) => {
  console.log(req.params.id)
  notes = notes.filter(note => note.id !== req.params.id)
  console.log(notes)
})
app.listen(PORT, () => {
  console.log("Server started")
});
