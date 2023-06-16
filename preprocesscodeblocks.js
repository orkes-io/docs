const fs = require('fs');
const path = require('path');
const axios = require('axios');
const { exec } = require("child_process");

const startMarker = 'docs-marker-start-';
const endMarker = 'docs-marker-end-';

function extractContentFromFile(repository, file, section) {
    return new Promise((resolve, reject) => {
        const result = [];
        const startMarkerSec = `${startMarker}${section}`;
        const endMarkerSec = `${endMarker}${section}`;
        const repoFolder = `./gitrepos/${repository}/${file}`
        try {
            fs.readFile(repoFolder, "utf8", (error, data) => {
                if (error) {
                    console.error(error.message);
                    return;
                }
                const lines = data.split('\n');
                let foundStartMarker = false;
                let lineStart = 0;
                let lineEnd = 0;
                let index = 0;
                lines.forEach((line) => {
                    index++;
                    if (line.includes(endMarkerSec)) {
                        foundStartMarker = false;
                        lineEnd = index - 1;
                    }

                    if (foundStartMarker) {
                        result.push(line.replace(/`/g, '\\`'));
                    }

                    if (line.includes(startMarkerSec)) {
                        foundStartMarker = true;
                        lineStart = index + 1;
                    }
                });
                resolve([result, lineStart, lineEnd]);
            });
        } catch (error) {
            console.error(error);
            reject(error);
        }
    });
}

const getGitUrl = (url) => {
    const rawUrl = url.substring(0, url.indexOf(`/blob/`));
    return `${rawUrl}.git`;
}

const cloneRepoIfNeeded = (gitUrl, branchOrCommit) => {
    return new Promise((resolve, reject) => {
        const gitFolder = gitUrl.substring(gitUrl.lastIndexOf('/') + 1, gitUrl.indexOf('.git'));
        const destFolder = `./gitrepos/${gitFolder}`;
        let command;
        if (!fs.existsSync(path.join(destFolder, '.git'))) {
            command = `git clone --single-branch --branch ${branchOrCommit} ${gitUrl} ${destFolder}`;
        } else {
            command = `git -C ${destFolder} fetch && git -C ${destFolder} checkout ${branchOrCommit}`;
        }
        try {
            exec(command, (error, stdout, stderr) => {
                if (error) {
                    console.error(`Error executing command: ${command}`);
                    console.error(error.message);
                    return;
                }
                console.log(stdout);
                console.error(stderr);
                console.log(command, "successful")
                resolve(true);
            });
        } catch (e) {
            console.error(e);
            reject(e);
        }
    });
};

const searchDirectory = async (dirPath, codeBlocks) => {
    const files = fs.readdirSync(dirPath);
    for (const file of files) {
        const filePath = path.join(dirPath, file);
        const stat = fs.statSync(filePath);
        if (stat.isDirectory()) {
            await searchDirectory(filePath, codeBlocks);
        } else {
            const extname = path.extname(filePath);
            if (extname === '.md' || extname === '.mdx') {
                const fileContent = fs.readFileSync(filePath, 'utf8');
                const lines = fileContent.split('\n');
                for (let i = 0; i < lines.length; i++) {
                    const line = lines[i];
                    if (line.startsWith('```') && line.indexOf(' dynamic ') > 0) {
                        const lineContent = line.split(' ');
                        const url = lineContent[2];
                        const gitUrl = getGitUrl(url);
                        const urlInfo = extractGitHubUrlInfo(url);
                        const section = lineContent[3].split('=')[1];
                        if (urlInfo == null) {
                            return null
                        }
                        const { username, repository, branchOrCommit, file } = urlInfo;
                        await cloneRepoIfNeeded(gitUrl, branchOrCommit).then(async () => {
                            console.log("Repo clone/update successful")
                            const [extractedContent, lineStart, lineEnd] = await extractContentFromFile(repository, file, section);
                            console.log(`Found code block with url ${url} and section ${section} and content`, extractedContent);
                            codeBlocks[`${url}---${section}`] = `{\`${extractedContent.join('\n')}\`}`;
                            codeBlocks[`${url}---${section}-lines`] = `#L${lineStart}-L${lineEnd}`;
                        });
                    }
                }
            }
        }
    }
};

function extractGitHubUrlInfo(url) {
    const regex = /^(?:https?:\/\/)?(?:www\.)?github\.com\/([^/]+)\/([^/]+)\/(?:blob|tree)\/([^/]+)\/(.+)/;
    const match = url.match(regex);
    if (!match) {
        return null
    }
    const [, username, repository, branchOrCommit, file] = match;
    return {
        username,
        repository,
        branchOrCommit,
        file
    };
}

const codeBlocks = {};
searchDirectory('./docs', codeBlocks).then(() => {
    const filePath = './codeblocks/codeblocks.json';
    fs.writeFile(filePath, JSON.stringify(codeBlocks), (err) => {
        if (err) {
            console.error(err);
            return;
        }
        console.log('File saved successfully.');
    });
});

async function fetchAndWriteConductorClientVersions() {
    await axios.get('https://orkes-api-tester.orkesconductor.com/latestJarVerson?type=orkes-java-client', {})
        .then(response => {
            // handle the response
            console.log("VERSION", response.data);
            const filePath = './codeblocks/versions.json';
            const versions = {
                "conductorJarVersion": response.data
            }
            fs.writeFile(filePath, JSON.stringify(versions), (err) => {
                if (err) {
                    console.error(err);
                    return;
                }
                console.log('File saved successfully.');
            });
        })
        .catch(error => {
            // handle the error
            console.error(error);
        });
}

fetchAndWriteConductorClientVersions();