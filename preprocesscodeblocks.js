const fs = require('fs');
const path = require('path');
const axios = require('axios');
const {exec} = require("child_process");

const startMarker = 'docs-marker-start-';
const endMarker = 'docs-marker-end-';

function extractContentFromFile(file, repo, section) {
    return new Promise((resolve, reject) => {
        console.log('file ', file, repo)
        const result = [];
        const startMarkerSec = `${startMarker}${section}`;
        const endMarkerSec = `${endMarker}${section}`;
        const repoFolder = `./gitrepos/${repo}/${file}`
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
                        result.push(line);
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

const cloneRepoIfNeeded = (gitUrl) => {
    return new Promise((resolve, reject) => {
        const gitFolder = gitUrl.substring(gitUrl.lastIndexOf('/'), gitUrl.indexOf('.git'));
        const destFolder = `./gitrepos/${gitFolder}`;
        let command;
        if (fs.existsSync(destFolder)) {
            command = `git -C ${destFolder} pull`;
        } else {
            command = `git clone ${gitUrl} ${destFolder}`;
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
                        const originalUrl = lineContent[2];
                        const gitUrl = getGitUrl(originalUrl);
                        await cloneRepoIfNeeded(gitUrl).then(async () => {
                            console.log("Repo clone/update successful")
                            const section = lineContent[3].split('=')[1];
                            const rawUrl = originalUrl.substring(originalUrl.indexOf('/blob/main/') + 10);
                            let l = originalUrl.substring(0, originalUrl.indexOf('/blob/main/'));
                            const repo = l.substring(l.lastIndexOf('/') + 1)
                            const [extractedContent, lineStart, lineEnd] = await extractContentFromFile(rawUrl, repo, section);
                            console.log(`Found code block with url ${rawUrl} and section ${section} and content`, extractedContent);
                            codeBlocks[`${originalUrl}---${section}`] = `{\`${extractedContent.join('\n')}\`}`;
                            codeBlocks[`${originalUrl}---${section}-lines`] = `#L${lineStart}-L${lineEnd}`;
                        });
                    }
                }
            }
        }
    }

};

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
