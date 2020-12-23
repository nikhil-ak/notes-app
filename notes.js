const fs = require('fs')
const chalk = require('chalk');
const multer = require('multer')

const getNotes = (file) => {
    try{
        const readNotes = fs.readFileSync(file, 'utf-8');
        return JSON.parse(readNotes);
    }
    catch(err) {
        console.log("no notes");
        return [];
       
    }
   
}

const addNotes = (title,content) => {
    const notes = getNotes('notes.json')

    const duplicateNotes = notes.find(e => e.title === title)
    if(!duplicateNotes) {
        notes.push({
            'title': title,
            'content': content
        })
        
        console.log("added successfully");
        saveFile(notes);
    }
    else {
        console.log("note already exist");
    }
}

const saveFile = (notes) => {
    const saveNotes = JSON.stringify(notes)
    fs.writeFileSync('notes.json', saveNotes)
}


const removeNotes = (title)=> {
    const notes = getNotes('notes.json');
    if(notes.length!=0) {
        const updatedNotes = notes.filter(e => e.title != title);
        if(updatedNotes.length< notes.length) {
            saveFile(updatedNotes)
            console.log(chalk.bold.green("Successfully removed"));
        }
        else {
            console.log(chalk.bold.red("No matching title found"));
        }
        
    }
    else {
        console.log(chalk.bold.red("No notes"));
    }

}

const listNotes = () => {
    const notes = getNotes('notes.json')
    if(notes.length!=0) {
        console.log(chalk.bold.blue("Your Notes:"))
        notes.forEach(e => {
            console.log(e.title, '\n');
        });
    }

}

const readNotes = (title) => {
    const notes = getNotes('notes.json');
    const findNote = notes.find(e => e.title === title);
    if(findNote) {
        console.log(chalk.blue.underline(findNote.title));
        console.log(chalk.blue.italic(findNote.content));
    }
    else {
        console.log(chalk.red.bold("No note found"));
    }
  
}


module.exports = {getNotes, addNotes, removeNotes, listNotes,readNotes}