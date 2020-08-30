const yargs = require("yargs");
const notes = require('./note');

//command to add 
//challange time with the title and bdy on builder option inside the add command
yargs.command({
    command:"add",
    describe:"The additiion of new note here",
    builder:{
        title:{
            describe:"The title",
            type:"string",
            demandOption:true,
        },
        body:{
            describe:"the body of the title",
            type:"string",
            demandOption:true,
        }

    },
    handler:function(argv){
        notes.addNote(argv.title,argv.body);
    }
});

yargs.command({
    command:"remove",
    describe:"Remove the note from the existing note list",
    builder:{
        title:{
            describe:"the title that to be removed here",
            type:"string",
            demandOption:true, 
        }
    },
    handler: function(argv){
        notes.removeNote(argv.title);
    }
});

yargs.command({
    command:"list",
    describe:"List the all notes that are avilable for you to see",
    handler:function(){
        notes.listNotes();
    }
})

yargs.command({
    command:"read",
    describe:"This is the method that will allow u to read the notes on ur local file sytsem aka:the file",
    builder:{
        title:{
            describe:"The title to read from",
            type:"string",
            demandOption:true,
        }
    },
    handler:function(argv){
       notes.readNote(argv.title);
    }
})


yargs.parse();

