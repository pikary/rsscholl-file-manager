import os from "os";
import path from "path";
import fsAsync from "fs/promises";
import {isAboveHomeDirectory} from './utils/helpers.js'

export const navigation = {
    currentDir: os.homedir(),

    cd: async function (targetPath) {
        try {
            const targetDir = path.resolve(this.currentDir, targetPath);
            const targetDirStats = await fsAsync.lstat(targetDir);

            if (targetDirStats.isDirectory()) {
                this.currentDir = targetDir;
                console.log(`Changed directory to ${this.currentDir}`);
            } else {
                console.error('This is not a directory');
            }
        } catch (error) {
            console.error(`Error changing directory: ${error.message}`);
        }
    },
    up: function () {
        try {
            const parentDir = path.resolve(this.currentDir, '..');

            // Prevent moving above the home directory
            if (!isAboveHomeDirectory(parentDir)) {
                this.currentDir = parentDir;
                console.log(`Moved up to ${this.currentDir}`);
            } else {
                console.error('Cannot go above the home directory.');
            }
        } catch (error) {
            console.error(`Error moving up: ${error.message}`);
        }
    },
    ls: async function () {
        try {
            const dir = await fsAsync.opendir(this.currentDir);
            const dirFiles = [];
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