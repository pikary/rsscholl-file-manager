import readline from 'readline'
import handleOSCommands from "./os/index.js";
import os from 'os'

const rl = readline.createInterface({
    input:process.stdin,
    output:process.stdout
})
const currentDirectory = os.homedir();
const printCurrentDirectory = () => {
    console.log(`You are currently in ${currentDirectory}`);
};

printCurrentDirectory();

rl.on('line', (input) => {
    console.log(input)
}).on('close', () => {
});