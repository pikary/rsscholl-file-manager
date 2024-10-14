import readline from 'readline'
import handleOSCommands from "./os/index.js";
import handleFileCommands from "./files/index.js";
import os from 'os'
import path from "path";
import {isAboveHomeDirectory} from "./files/helpers.js";
import fsAsync from "fs/promises";
import {navigation} from "./navigation.js";

function initApplication(){
    const rl = readline.createInterface({
        input:process.stdin,
        output:process.stdout
    })
    const currentDirectory = os.homedir();
    const printCurrentDirectory = () => {
        const args = process.argv.slice(2);
        console.log(`Welcome to the File Manager ${args[0]}`)
        console.log(`You are currently in ${currentDirectory}`);
    };
    printCurrentDirectory();








    rl.on('line', async(input) => {
        const [command, option] = input.split(' ');
        await handleFileCommands(input,currentDirectory)
        if(command==='os'){
            handleOSCommands(option)
        }
        printCurrentDirectory()
    }).on('close', () => {
        const args = process.argv.slice(2);
        console.log(`Thank you for using File Manager, ${args[0]}, goodbye!`)
    })
}


initApplication()

