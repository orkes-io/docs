const fs = require('fs');
const path = require('path');
const axios = require('axios');

const startMarker = 'docs-marker-start-';
const endMarker = 'docs-marker-end-';

function extractContent(rawUrl, section) {
    return new Promise((resolve, reject) => {
        const result = [];
        const startMarkerSec = `${startMarker}${section}`;
        const endMarkerSec = `${endMarker}${section}`;

        axios.get(rawUrl).then((response) => {
            const lines = response.data.split('\n');
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
                    // result.push(line.replaceAll('>', '&gt;').replaceAll('<', '&lt;'));
                    result.push(line);
                }

                if (line.includes(startMarkerSec)) {
                    foundStartMarker = true;
                    lineStart = index + 1;
                }
            });
            resolve([result, lineStart, lineEnd]);
        }).catch((error) => {
            console.error(error);
            reject(error);
        });
    });
}

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
                        const rawUrl = originalUrl.replace("github.com", "raw.githubusercontent.com").replace("/blob/", "/");
                        const section = lineContent[3].split('=')[1];
                        const [extractedContent, lineStart, lineEnd] = await extractContent(rawUrl, section);
                        console.log(`Found code block with url ${rawUrl} and section ${section} and content`, extractedContent);
                        codeBlocks[`${originalUrl}---${section}`] = `{\`${extractedContent.join('\n')}\`}`;
                        codeBlocks[`${originalUrl}---${section}-lines`] = `#L${lineStart}-L${lineEnd}`;
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
