const fs = require('fs');
const chalk = require('chalk');

const getNotes = function () {
    return 'Your notes...'
}

const addNote = function (title, body) {
    const notes = loadNotes()
    const duplicateNotes = notes.filter(function (note) {
        return note.title === title
    })

    debugger;

    if (duplicateNotes.length === 0) {
        notes.push({
            title: title,
            body: body
        })
        saveNotes(notes)
        console.log(chalk.bgGreen('New note added!'))
    } else {
        console.log(chalk.bgRed('Note title taken!'))
    }
}

const saveNotes = function (notes) {
    const dataJSON = JSON.stringify(notes)
    fs.writeFileSync('notes.json', dataJSON)
}

const loadNotes = function () {
    try {
        const dataBuffer = fs.readFileSync('notes.json')
        const dataJSON = dataBuffer.toString()
        return JSON.parse(dataJSON)
    } catch (e) {
        return []
    }
}



///////////////////////////////////////////Remove Note////////////////////////////////////////////////////////////////////

const removeNote = function(title){
    const notes = loadNotes();

    const notesToKeep = notes.filter(function (note) {
       return note.title !== title;
    });

    if(notes.length > notesToKeep.length){
        console.log(chalk.bgGreen("Note was Removed!!"));
        saveNotes(notesToKeep);
    }else{
        console.log(chalk.bgRed("No note found!!"));
    }
}

///////////////////////////////////list notes/////////////////////////////////////////////

const listNotes = function(){
    console.log(chalk.bgRedBright("Your Notes!!"));
    console.log("")

    const notes = loadNotes();
    notes.forEach(function(note){
        console.log(chalk.bgBlueBright(note.title))
        console.log("");
    })
}

///////////////////////////////////////////Read The Note ////////////////////////////////

const readNote = function(title){
    const notes = loadNotes();

    const ReqNote = notes.find(note=>{
        if(note.title===title){
            return note;
        } 
    });

    if(ReqNote){
        console.log(chalk.bgBlueBright(ReqNote.title));
        console.log("");
        console.log(ReqNote.body);
    }else{
        console.log(chalk.bgRedBright("seems like no node on the list matched ur title!!"))
    }
}

module.exports = {
    getNotes: getNotes,
    addNote: addNote,
    removeNote:removeNote,
    listNotes:listNotes,
    readNote:readNote,
}