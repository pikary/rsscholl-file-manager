import {
    catFile,
    addFile,
    renameFile,
    moveFile,
    removeFile,
    compressFile,
    decompressFile
} from "./helpers.js";

async function handleFileCommands(input) {
    const [baseCommand, targetFile, destination] = input
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
                    console.log('Invalid input: missing required parameters.');
                } else {
                    await renameFile(this.currentDir, targetFile, destination);
                }
                break;

            case 'mv':
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
        console.error(e.message)
    }
}


export default handleFileCommands