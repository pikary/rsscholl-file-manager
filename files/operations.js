import os from "os";
import path from "path";
import fs from "fs";
import fsAsync from 'fs/promises';
import zlib from 'zlib';


const getFullPath = (currentDir, targetFile) => path.resolve(currentDir, targetFile);

async function catFile(currentDir, targetFile) {
    const filePath = getFullPath(currentDir, targetFile);
    const readStream = fs.createReadStream(filePath);

    readStream.on('readable', () => {
        let chunk;
        while (null !== (chunk = readStream.read())) {
            process.stdout.write(chunk);
        }
    });
    readStream.on('end',()=>{
        console.log('File has been read \n')
    })
    readStream.on('error', (e) => {
        console.error(`Error reading file: ${e.message}`);
    });
}

async function addFile(currentDir, targetFile) {
    const filePath = getFullPath(currentDir, targetFile);
    const createStream = fs.createWriteStream(filePath);

    createStream.end(() => {
        console.log(`File '${targetFile}' successfully created!`);
    });
}

// Rename file
async function renameFile(currentDir, oldFileName, newFileName) {
    const oldFilePath = getFullPath(currentDir, oldFileName);
    const newFilePath = getFullPath(currentDir, newFileName);

    await fsAsync.rename(oldFilePath, newFilePath);
    console.log(`File renamed from '${oldFileName}' to '${newFileName}'`);
}

// Move file
async function moveFile(currentDir, targetFile, destination) {
    const sourceFilePath = getFullPath(currentDir, targetFile);
    const destinationPath = path.resolve(currentDir, destination, path.basename(targetFile));

    const sourceStats = await fsAsync.stat(sourceFilePath);
    if (!sourceStats.isFile()) {
        throw new Error('Source is not a valid file.');
    }
    await fsAsync.copyFile(sourceFilePath, destinationPath);
    await fsAsync.unlink(sourceFilePath);

    console.log(`File moved from '${sourceFilePath}' to '${destinationPath}'`);
}

async function copyFile(currentDir, targetFile, destination) {
    const sourceFilePath = getFullPath(currentDir, targetFile);
    const destinationPath = path.resolve(currentDir, destination, path.basename(targetFile));
    const sourceStats = await fsAsync.stat(sourceFilePath);
    if (!sourceStats.isFile()) {
        throw new Error('Source is not a valid file.');
    }

    await fsAsync.copyFile(sourceFilePath, destinationPath);
    console.log(`File copied from '${sourceFilePath}' to '${destinationPath}'`);
}

// Remove file
async function removeFile(currentDir, targetFile) {
    const filePath = getFullPath(currentDir, targetFile);
    await fsAsync.unlink(filePath);
    console.log(`File '${targetFile}' removed.`);
}

// Compress file using Brotli
async function compressFile(currentDir, sourceFile, destinationFile) {
    const sourceFilePath = getFullPath(currentDir, sourceFile);
    const destinationFilePath = getFullPath(currentDir, destinationFile);

    const readStream = fs.createReadStream(sourceFilePath);
    const writeStream = fs.createWriteStream(destinationFilePath);
    const brotli = zlib.createBrotliCompress();

    readStream.pipe(brotli).pipe(writeStream);

    writeStream.on('finish', () => {
        console.log(`File '${sourceFile}' successfully compressed to '${destinationFile}'`);
    });
}

// Decompress file using Brotli
async function decompressFile(currentDir, sourceFile, destinationFile) {
    const sourceFilePath = getFullPath(currentDir, sourceFile);
    const destinationFilePath = getFullPath(currentDir, destinationFile);

    const readStream = fs.createReadStream(sourceFilePath);
    const writeStream = fs.createWriteStream(destinationFilePath);
    const brotli = zlib.createBrotliDecompress();

    readStream.pipe(brotli).pipe(writeStream);

    writeStream.on('finish', () => {
        console.log(`File '${sourceFile}' successfully decompressed to '${destinationFile}'`);
    });
}


export {
    catFile,
    addFile,
    moveFile,
    copyFile,
    removeFile,
    renameFile,
    compressFile,
    decompressFile
}