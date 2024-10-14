import path from 'path';
import os from 'os';

export const isAboveHomeDirectory = (newPath) => {
    const homedir = os.homedir()
    const resolvedNewPath = path.resolve(newPath);
    return !resolvedNewPath.startsWith(homedir);
};
