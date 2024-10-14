import os from "os";
import path from "path";
import fsAsync from "fs/promises";
import {isAboveHomeDirectory} from "./files/helpers.js";

export const navigation = {
    currentDir: os.homedir(),
    cd:async function(path){
        const targetDir = path.resolve(this.currentDir, path)
        const targetDirStats = await fsAsync.lstat(targetDir)
        if(targetDirStats.isDirectory()){
            this.currentDir = targetDir
        }else{
            console.log('This is not a directory')
        }
    },
    up:function(){
        const parentDir = path.resolve(this.currentDir, '..');
        // Prevent moving above the home directory
        if (!isAboveHomeDirectory(parentDir)) {
            this.currentDir = parentDir;
        } else {
            console.log('Cannot go above the home directory.');
        }
    }
}