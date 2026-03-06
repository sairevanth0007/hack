const fs = require('fs');
const path = require('path');

function walkDir(dir, callback) {
    fs.readdirSync(dir).forEach(f => {
        let dirPath = path.join(dir, f);
        if (dirPath.includes('node_modules') || dirPath.includes('.git')) return;
        let isDirectory = fs.statSync(dirPath).isDirectory();
        isDirectory ? walkDir(dirPath, callback) : callback(path.join(dir, f));
    });
}

function processFiles() {
    walkDir('src', function (filePath) {
        if (filePath.endsWith('.js') || filePath.endsWith('.jsx')) {
            let content = fs.readFileSync(filePath, 'utf8');
            let originalContent = content;

            // replacements
            content = content.replace(/\bXP\b/g, 'Coins');
            content = content.replace(/\bpoints\b/g, 'coins');
            content = content.replace(/\bTotal XP\b/g, 'Total Coins');

            // Add 'coins' to user object when registered
            if (filePath.endsWith('Login.jsx') || filePath.endsWith('auth.js')) {
                content = content.replace(/points:/g, 'coins:');
                content = content.replace(/user\.points/g, 'user.coins');
            }

            // Handle the strings:
            // "+50 XP" → "+50 Coins"
            content = content.replace(/\+([0-9]+)\s*XP/g, '+$1 Coins');
            content = content.replace(/\+([0-9]+)\s*Coins/g, '+$1 Coins'); // just in case it was XP

            // localStorage key
            content = content.replace(/turtrl_points/g, 'turtrl_coins');

            // "rubies" -> "Chains" in UI text. 
            // The prompt says "Keep the localStorage key as 'rubies' internally to avoid breaking logic, but display label as 'Chains' everywhere."
            // I will do this manually in TopNav instead to avoid breaking arbitrary things.

            // Replace star emoji used for XP with chain image
            // Let's replace '⭐' with '<img src={coinImg} alt="coins" className="..." />' but only in JS/JSX? No, I will do this manually in TopNav.

            if (content !== originalContent) {
                fs.writeFileSync(filePath, content, 'utf8');
                console.log('Modified', filePath);
            }
        }
    });
}
processFiles();
