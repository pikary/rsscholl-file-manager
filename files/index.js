import os from "os";
import path from "path";
import fs from "fs";
import fsAsync from 'fs/promises'
import pipeline from 'stream'
import {promisify} from 'util'


async function handleFileCommands(){
    const [baseCommand, targetFile, destination] = arguments
    try {
        switch (baseCommand) {
            case 'cat':
                const filePath = path.join(this.currentDir, targetFile);
                const readStream = fs.createReadStream(filePath)
                readStream.on('readable', () => {
                    let chunk
                    while (null !== (chunk = readStream.read())) {
                        process.stdout.write(chunk);
                    }
                });
                readStream.on('error', () => {
                    throw new Error(`Could not read stream}`);
                })
                break;
            case 'add':
                const createStream = fs.createWriteStream(path.join(this.currentDir, targetFile));
                createStream.end(() => {
                    console.log('File ' + targetFile.toString() + ' successfuly created!')
                })
                break;
            case 'rn':
                if (arguments.length > 3) {
                    console.log('Invalid input: missing new required parameters');
                } else {
                    const oldFilePath = path.join(this.currentDir, targetFile);
                    const newFilePath = path.join(this.currentDir, destination);
                    await fsAsync.rename(oldFilePath, newFilePath);
                    console.log(`File renamed to ${destination}`);
                }
                break;
            case 'mv':
                const sourceFilePath = path.join(this.currentDir, targetFile);
                const asyncPipeline = promisify(pipeline)
                const destinationPath = path.resolve(this.currentDir, destination, path.basename(targetFile));

                asyncPipeline(
                    fs.createReadStream(sourceFilePath),
                    fs.createWriteStream(destinationPath)
                )
                await fsAsync.unlink(sourceFilePath)
                break;
            case 'rm': // Remove file
                const deleteFilePath = path.join(this.currentDir, targetFile);
                await fsAsync.unlink(deleteFilePath);
                console.log(`File ${targetFile} removed.`);
                break;
            default:
                throw new Error(`Invalid command not found`)
        }
    }catch (e) {

    }
}



export default handleFileCommands