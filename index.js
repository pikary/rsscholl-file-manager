import readline from 'readline'
import handleOSCommands from "./os/index.js";
import handleFileCommands from "./files/index.js";
import os from 'os'


const rl = readline.createInterface({
    input:process.stdin,
    output:process.stdout
})
const currentDirectory = os.homedir();
const printCurrentDirectory = () => {
    const args = process.argv.slice(2);
    // for(let i = 0 ; i < args.length;i++){
    //     if(args[i].startsWith('--')){
    //         parsedArgs[args[i].slice(2)] = args[++i];
    //     }
    // }
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