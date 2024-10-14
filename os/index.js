import os from "os";

function handleOSCommands(option) {
    try{
        switch (option) {
            case '--EOL':
                process.stdout.write(JSON.stringify(os.EOL));
                break;
            case '--cpus':
                const cpus = os.cpus();
                cpus.forEach((cpu, index) => {
                    console.log(`CPU ${index + 1}: ${cpu.model}, ${cpu.speed / 1000} GHz`);
                });
                break;
            case '--homedir':
                console.log(os.homedir());
                break;
            case '--username':
                console.log(os.userInfo().username);
                break;
            case '--architecture':
                console.log(os.arch());
                break;
            default:
                throw new Error(`Invalid command: ${option} not found`)
        }
    }catch (e) {
        console.error(e.message)
    }
};


export default handleOSCommands