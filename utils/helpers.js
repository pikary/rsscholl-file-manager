import os from "os";
import path from "path";
import {navigation} from "../navigation.js";



const args = process.argv.slice(2);
const usernameArg = args.find(arg => arg.startsWith('--username='));
const username = usernameArg.split('=')[1] || 'Unknown';
export const printCurrentDirectory = () => {
    console.log(`Welcome to the File Manager, ${username}`);
    console.log(`You are currently in ${navigation.currentDir}`);
};


const validOperations = ['os','.exit','hash','ls','cd','up','cat','add','rn','cp','mv','rm','compress','decompress']

export const isValidOperation = (command)=> validOperations.includes(command)

export const isAboveHomeDirectory = (newPath) => {
    const homedir = os.homedir()
    const resolvedNewPath = path.resolve(newPath);
    return !resolvedNewPath.startsWith(homedir);
};