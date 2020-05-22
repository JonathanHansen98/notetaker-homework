const path = require('path')
const fs = require('fs')

module.exports = function (app) {
  app.get("/api/notes", (req, res) => {
    const data = fs.readFileSync('./db/db.json', 'utf8') 
    res.json(JSON.parse(data))
  
  })
  app.post("/api/notes", (req, res) => {
    const newNote = req.body
    
    const data = fs.readFileSync('./db/db.json', 'utf8')
    var noteList = JSON.parse(data);
    newNote.id = (req.body.title.split(" "))[0].toLowerCase() + (noteList.length + 1);
  
    noteList.push(newNote);  
  
    const notesString = JSON.stringify(noteList)
    fs.writeFileSync('./db/db.json',notesString)
    console.log(`Note Added:${JSON.stringify(newNote)}`)
    res.json(noteList)
  });
  app.get("/api/notes/:id", (req, res) => {
    const idRequest = req.params.id
    const data = fs.readFileSync('./db/db.json', 'utf8')
    const query = data.filter(note => note.id === idRequest)
    res.json(query)
  });
  app.delete("/api/notes/:id", (req, res) => {
    const paramId = req.params.id;
    const data = fs.readFileSync('./db/db.json', 'utf8');
    var filteredNotes = JSON.parse(data).filter(note => note.id !== paramId)
    fs.writeFileSync('./db/db.json',JSON.stringify(filteredNotes))
    console.log(`Note deleted`)
    res.json({success: true})
    })
};