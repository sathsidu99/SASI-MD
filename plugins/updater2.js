const config = require('../config');
let fs = require('fs');
const { exec } = require('child_process');
const { cmd } = require('../command');

cmd({
    pattern: "update2",
    react: "💜",
    desc: "Update Repo GitHub",
    category: "system",
    use: '.update',
    filename: __filename
}, async (conn, mek, m, { from, reply }) => {
    try {
        const repoUrl = 'https://github.com/sathsidu99/SASI-MD.git'; 
        const targetFile = 'config.js','index.js','app.js';

        
        if (!fs.existsSync(targetFile)) {
            fs.mkdirSync(targetFile); 
        }


        const gitCommand = fs.existsSync(`${targetFile}/.git`)
            ? `git -C ${targetFile} pull`
            : `git clone ${repoUrl} ${targetFike}`;


        await new Promise((resolve, reject) => {
            exec(gitCommand, (err, stdout, stderr) => {
                if (err) {
                    reject(`Git command failed: ${stderr}`);
                } else {
                    resolve(stdout);
                }
            });
        });

        await conn.sendMessage(from, { text: '*✅ Update completed successfully!*' }, { quoted: mek });
    } catch (error) {
        console.error(error);
        reply(`*Error during update:* ${error.message}`);
    }
});
