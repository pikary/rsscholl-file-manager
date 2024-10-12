import readline from 'readline'
import handleOSCommands from "./os/index.js";
import os from 'os'


const rl = readline.createInterface({
    input:process.stdin,
    output:process.stdout
})
const currentDirectory = os.homedir();
const printCurrentDirectory = () => {
    const args = process.argv.slice(2);
    console.log(`Welcome to the File Manager ${}`)
    console.log(`You are currently in ${currentDirectory}`);
};

printCurrentDirectory();

rl.on('line', (input) => {
    const [command, option] = input.split(' ');
    if(command==='os'){
        handleOSCommands(option)
    }
}).on('close', () => {
});