import readline from 'readline'
import handleOSCommands from "./os/index.js";
import handleFileCommands from "./files/index.js";
import {navigation} from "./navigation.js";
import {handleHashOperations} from "./hash/index.js";
import {isValidOperation, printCurrentDirectory} from "./utils/helpers.js";




function initApplication() {
    try{
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        })
        printCurrentDirectory()

        const fileOperations = handleFileCommands.bind(navigation)
        const osOperations = handleOSCommands.bind(navigation)
        const hashOperations = handleHashOperations.bind(navigation)


        rl.on('line', async (input) => {
            const processedInput = input.split(' ')
            const [command, option] = processedInput
            // Check if the command is valid
            if (!isValidOperation(command)) {
                console.error(new Error('Invalid command').message);
            }
            switch (command) {
                case '.exit':
                    rl.close()
                    break;
                case 'ls':
                   await navigation.ls()
                    break;
                case 'up':
                    navigation.up()
                    break;
                case 'cd':
                    await navigation.cd(option)
                    break
                default :
                    if (command === 'os') {
                        await osOperations(option)
                        // printCurrentDirectory()
                        break
                    } else if (command === 'hash') {
                        await hashOperations(option)
                        // printCurrentDirectory()
                        break;
                    }
                    await fileOperations(processedInput)
                    // printCurrentDirectory()
                    break;
            }
        }).on('close', () => {
            console.log(`Thank you for using File Manager, ${username}, goodbye!`)
        })
    }catch (e) {
        console.error(e.message)
    }

}


initApplication()

