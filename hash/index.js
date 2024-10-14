import path from "path";
import crypto from "crypto";
import fs from "fs";
import {printCurrentDirectory} from "../utils/helpers.js";



export function handleHashOperations(target){
    try{
        const targetFilePath = path.resolve(this.currentDir, target)

        const hash = crypto.createHash('sha256');
        const readableStream = fs.createReadStream(targetFilePath, {encoding:'utf-8'});
        readableStream.on('data', (chunk) => {
            hash.update(chunk);
        })
        readableStream.on('end', () => {
            const result = hash.digest('hex');
            console.log(result);
        });
        readableStream.on('error', (err) => {
            console.error(`Error reading file: ${err.message}`);
        });
    }catch (e) {
        console.error(e.message)
    }finally {
        printCurrentDirectory()
    }

}