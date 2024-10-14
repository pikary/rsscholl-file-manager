import os from "os";
import path from "path";
import fs from "fs";
import fsAsync from 'fs/promises'
import {isAboveHomeDirectory} from "./helpers.js";
import pipeline from 'stream'
import {promisify} from 'util'


async function handleFileCommands(option,currentPath){

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
                //command это имя файла
                const createStream = fs.createWriteStream(path.join(currentPath, command));
                createStream.end(() => {
                    console.log('File ' + command.toString() + ' successfuly created!')
                })
                break;
            case 'rn':
                if (args.length === 0) {
                    console.log('Invalid input: missing new filename.');
                } else {
                    const oldFilePath = path.join(currentPath, command);
                    const newFilePath = path.join(currentPath, args[0]);
                    await fsAsync.rename(oldFilePath, newFilePath);
                    console.log(`File renamed to ${args[0]}`);
                }
                break;
            case 'mv':
                const sourceFilePath = path.join(currentPath, command);
                const asyncPipeline = promisify(pipeline)
                const destinationPath = path.resolve(currentPath, args[0], path.basename(command));

                asyncPipeline(
                    fs.createReadStream(sourceFilePath),
                    //create copy with new name
                    fs.createWriteStream(destinationPath)
                )
                await fsAsync.unlink(sourceFilePath)
                break;
            case 'rm': // Remove file
                const deleteFilePath = path.join(currentPath, command);
                await fsAsync.unlink(deleteFilePath);
                console.log(`File ${command} removed.`);
                break;
            default:
                throw new Error(`Invalid command: ${option} not found`)
        }
    }catch (e) {

    }
}



export default handleFileCommands