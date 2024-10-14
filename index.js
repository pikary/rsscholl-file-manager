import readline from 'readline'
import handleOSCommands from "./os/index.js";
import handleFileCommands from "./files/index.js";
import {navigation} from "./navigation.js";
import {handleHashOperations} from "./hash/index.js";

function initApplication() {
    try{
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        })
        const printCurrentDirectory = () => {
            const args = process.argv.slice(2);
            console.log(`Welcome to the File Manager ${args[0]}`)
            console.log(`You are currently in ${navigation.currentDir}`);
        };
        printCurrentDirectory();


        const fileOperations = handleFileCommands.bind(navigation)
        const osOperations = handleOSCommands.bind(navigation)
        const hashOperations = handleHashOperations.bind(navigation)


        rl.on('line', async (input) => {
            const processedInput = input.split(' ')
            const [command, option] = processedInput
            switch (command) {
                case 'ls':
                    navigation.ls()
                    break;
                case 'up':
                    navigation.up()
                    break;
                case 'cd':
                    await navigation.cd(option)
                    break
                default :
                    if (command === 'os') {
                        osOperations(option)
                        break
                    } else if (command === 'hash') {
                        hashOperations(option)
                        break;
                    }
                    fileOperations(processedInput)
                    break;
            }
        }).on('history', (e) => {
            console.log("\n")
            printCurrentDirectory()
        }).on('close', () => {
            const args = process.argv.slice(2);
            console.log(`Thank you for using File Manager, ${args[0]}, goodbye!`)
        })
    }catch (e) {
        console.error(e.message)
    }

}


initApplication()

