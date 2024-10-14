import os from "os";
import path from "path";
import fs from "fs";
import fsAsync from 'fs/promises'
import pipeline from 'stream'
import {promisify} from 'util'


async function handleFileCommands(input){
    const [baseCommand, targetFile, destination] = input
    console.log(arguments)
    try {
        switch (baseCommand) {
            case 'cat':
                console.log('IAM CAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAT')
                const filePath = path.join(this.currentDir, targetFile);
                const readStream = fs.createReadStream(filePath)
                readStream.on('readable', () => {
                    let chunk
                    while (null !== (chunk = readStream.read())) {
                        process.stdout.write(chunk);
                    }
                });
                readStream.on('error', (e) => {
                    throw new Error(e);
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

                const destinationPath = path.resolve(this.currentDir, destination, path.basename(targetFile));

                const sourceStats = await fsAsync.stat(sourceFilePath);
                if (!sourceStats.isFile()) {
                    console.log('Source is not a valid file.');
                    return;
                }
                //copy to destionnaton
                await fsAsync.copyFile(sourceFilePath, destinationPath);

                //delete
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
        console.log(e)
    }
}



export default handleFileCommands