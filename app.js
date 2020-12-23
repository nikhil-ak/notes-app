const fs = require('fs')
const fnt = require('./notes.js')
// fs.writeFileSync('notes.txt', 'this is my first nodejs script for the course')
// fs.appendFileSync('notes.txt', '\n i have appended contents to the file')
// const msg = fnt('notes.txt')
// console.log(msg)

const chalk = require('chalk');
const yargs = require('yargs');
const { string } = require('yargs');

 
// console.log(chalk.bold.green('Success!'));
// console.log(chalk.inverse.green('Success inverse!'));


yargs.command({
    command: 'add',
    describe: 'Add new notes',
    builder: {
        title: {
            describe: 'note title',
            demandOption: true,
            type: string
        },
        content: {
            describe: "note contents",
            demandOption: true,
            type: string
        }
      
    },
    handler(argv) {
        fnt.addNotes(argv.title, argv.content)
    }
})

debugger

yargs.command({
    command: 'remove',
    describe: 'remove exisiting notes',
    builder: {
        title: {
            describe: 'note title',
            demandOption: true,
            type: string
        }
    },
    handler(argv) {
        fnt.removeNotes(argv.title)
    }
})
yargs.command({
    command: 'list',
    describe: 'list all notes',
    handler() {
        fnt.listNotes();
    }
})

yargs.command({
    command: 'read',
    describe: 'Read title and content of a note',
    builder: {
        title: {
            describe: 'note title',
            demandOption: true,
            type: string
        }
    },
    handler(argv) {
        fnt.readNotes(argv.title)
    }
})



yargs.parse();