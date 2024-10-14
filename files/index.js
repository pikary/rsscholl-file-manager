import {
    catFile,
    addFile,
    renameFile,
    moveFile,
    removeFile,
    compressFile,
    decompressFile, copyFile
} from "./operations.js";
import {printCurrentDirectory} from "../utils/helpers.js";

async function handleFileCommands(input) {
    const [baseCommand, targetFile, destination] = input;
    try {
        switch (baseCommand) {
            case 'cat':
                await catFile(this.currentDir, targetFile);
                break;

            case 'add':
                await addFile(this.currentDir, targetFile);
                break;

            case 'rn':
                if (!targetFile || !destination) {
                    console.error('Invalid input: missing required parameters.');
                    break

                } else {
                    await renameFile(this.currentDir, targetFile, destination);
                }
                break;
            case 'cp':
                if (!targetFile || !destination) {
                    console.error('Invalid input: missing required parameters.');
                    break

                }
                await copyFile(this.currentDir,targetFile,destination);
                break;
            case 'mv':
                if (!targetFile || !destination) {
                    console.error('Invalid input: missing required parameters.');
                    break
                }
                await moveFile(this.currentDir, targetFile, destination);
                break;

            case 'rm':
                await removeFile(this.currentDir, targetFile);
                break;

            case 'compress':
                await compressFile(this.currentDir, targetFile, destination);
                break;

            case 'decompress':
                await decompressFile(this.currentDir, targetFile, destination);
                break;
        }
    } catch (e) {
        console.error(e.message);
    }finally {
        printCurrentDirectory();
    }
}


export default handleFileCommands;