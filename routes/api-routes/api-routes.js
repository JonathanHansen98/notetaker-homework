const path = require('path')
const fs = require('fs')

module.exports = function (app) {
  app.get("/api/notes", (req, res) => {
    fs.readFile('../../db/db.json', 'utf8', (err, data) => {
      if(err) throw err;
      res.json(JSON.parse(data))
    })
  });
  app.post("/api/notes", (req, res) => {
    const newNote = req.body
    
    // Read db.json file
    fs.readFile('../../db/db.json', 'utf8', (err, data) => {
      if (err) throw err;
      // Parse json data and store in var
      var noteList = JSON.parse(data);
    newNote.id = (req.body.title.split(" "))[0].toLowerCase() + (noteList.length + 1);
      console.log(noteList)
  
      noteList.push(newNote);
  
      console.log(noteList)
  
      const notesString = JSON.stringify(noteList)
  
      fs.writeFile('../../db/db.json',notesString, err => {
        if (err) throw err;
        console.log(`Note Added:${notesString}`)
      })
    })
  });
  app.get("/api/notes/:id", (req, res) => {
    const idRequest = req.params.id
    console.log(idRequest)
    fs.readFile('../../db/db.json', 'utf8', (err, data) => {
      if(err) throw err;
      const query = data.filter(note => note.id === idRequest)
      console.log(query)
      res.json(query)
    })
  });
  app.delete("/notes/api/notes/:id", (req, res) => {
    console.log(req.params.id);
    const paramId = req.params.id;
    fs.readFile('../../db/db.json', 'utf8', (err, data) => {
    if (err) throw err;
    var filteredNotes = JSON.parse(data).filter(note => note.id !== paramId)
    fs.writeFile('../../db/db.json',JSON.stringify(filteredNotes), err => {
      if (err) throw err;
      console.log(`Note deleted: ${paramId}`)
    })
  })
  })
};