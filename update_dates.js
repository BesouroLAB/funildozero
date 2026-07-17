const fs = require('fs');
const path = require('path');

const contentDir = path.join('c:', 'Users', 'Tiago', 'Desktop', 'PROJETOS', 'funil-do-zero', 'blog', 'content');

// Helper to get random int between min and max (inclusive)
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Generate random date between 10 and 16
function getRandomPublishDate() {
  const day = getRandomInt(10, 16);
  return `2026-07-${day.toString().padStart(2, '0')}`;
}

// Generate random updated date after publish date, max 17
function getRandomUpdateDate(publishDay) {
  const minDay = parseInt(publishDay) + 1;
  const maxDay = 17;
  const day = getRandomInt(minDay, maxDay);
  return `2026-07-${day.toString().padStart(2, '0')}`;
}

function processDirectory(dir) {
  const files = fs.readdirSync(dir);

  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      processDirectory(fullPath);
    } else if (fullPath.endsWith('.mdx')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      
      const publishDateStr = getRandomPublishDate();
      const publishDay = publishDateStr.split('-')[2];
      const updateDateStr = getRandomUpdateDate(publishDay);

      // Replace date: "..."
      content = content.replace(/^date:\s*".*?"/m, `date: "${publishDateStr}"`);
      // Replace updatedAt: "..."
      content = content.replace(/^updatedAt:\s*".*?"/m, `updatedAt: "${updateDateStr}"`);

      fs.writeFileSync(fullPath, content);
      console.log(`Updated ${file}: date=${publishDateStr}, updatedAt=${updateDateStr}`);
    }
  }
}

processDirectory(contentDir);
console.log("All files updated successfully!");
