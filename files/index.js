import os from "os";
import path from "path";
import fs from "fs";
import fsAsync from 'fs/promises'
import {isAboveHomeDirectory} from "./helpers.js";

const handleFileCommands = async(input,currentPath) => {
    const [option, command] = input.split(" ");
    try {
        switch (option) {
            case 'up':
                const parentDir = path.resolve(currentPath, '..');
                // Prevent moving above the home directory
                if (!isAboveHomeDirectory(parentDir)) {
                    currentPath = parentDir;
                } else {
                    console.log('Cannot go above the home directory.');
                }
                break;
            case 'ls':
                const currentDir = await fsAsync.opendir(currentPath)
                for await (const dirent of currentDir) {
                    console.log(dirent);
                }
                break;
            case 'cat':
                const filePath = path.join(currentPath, command);
                const readStream = fs.createReadStream(filePath)
                readStream.on('readable', () => {
                    let chunk
                    while (null !== (chunk = readStream.read())) {
                        process.stdout.write(chunk);
                    }
                });
                readStream.on('error', () => {
                    throw new Error(`Could not read stream: ${command}`);
                })
                break;
            case 'add':
                break;
            case 'rn':
                break;
            case 'mv':
                break;
            case 'rm':
                break;
            default:
                throw new Error(`Invalid command: ${option} not found`)
        }
    } catch (e) {
        console.error(e.message)
    }
};


export default handleFileCommands