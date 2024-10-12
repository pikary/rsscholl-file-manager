import os from "os";

const handleOSCommands = (input) => {
    const [command, option] = input.split(' ');

    if (command === 'os') {
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
                console.log('Invalid input');
        }
    }
};


export default handleOSCommands