#!/usr/bin/env node
const { execSync } = require('child_process');

const runCommand = command =>{

    try {

        execSync(command, { stdio: 'inherit' });

    } catch (error) {

        console.log(`Failed to run command: ${command}`);
        return false;

    }
    return true;


}

const repoName = process.argv[2];
const gitCheckout = `git clone --depth 1 https://github.com/Emmanuek5/bluehost.git ${repoName}`;
const installDeps = `cd ${repoName} && npm install`;
const startServer = `cd ${repoName} && npm start`;

if (runCommand(gitCheckout)) {
    
        if (runCommand(installDeps)) {
    
            runCommand(startServer);
    
        }else{
    
            console.log('Failed to install dependencies');
    
        }
    
    }else{
    
        console.log('Failed to clone repo, Git is not installed or you are not connected to the internet');
    
    }
