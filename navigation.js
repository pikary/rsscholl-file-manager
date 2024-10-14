import os from "os";
import path from "path";
import fsAsync from "fs/promises";
import {isAboveHomeDirectory} from "./files/helpers.js";

export const navigation = {
    currentDir: os.homedir(),
    cd: async function (targetPath) {
        const targetDir = path.resolve(this.currentDir, targetPath)
        const targetDirStats = await fsAsync.lstat(targetDir)
        if (targetDirStats.isDirectory()) {
            this.currentDir = targetDir
        } else {
            console.log('This is not a directory')
        }
    },
    up: function () {
        const parentDir = path.resolve(this.currentDir, '..');
        // Prevent moving above the home directory
        if (!isAboveHomeDirectory(parentDir)) {
            this.currentDir = parentDir;
        } else {
            console.log('Cannot go above the home directory.');
        }
    },
    ls: async function () {
        try {
            const dir = await fsAsync.opendir(this.currentDir);
            const dirFiles = [];
            let index = 0;
            console.log(`Listing contents of ${this.currentDir}:`);

            for await (const dirent of dir) {
                dirFiles.push({
                    Name: dirent.name,
                    Type: dirent.isDirectory() ? 'directory' : 'file',
                });
            }
            console.table(dirFiles.sort((a, b) => a.Type === 'file' ? -1:1));
        } catch (error) {
            console.error('Error reading directory:', error.message);
        }
    }
}