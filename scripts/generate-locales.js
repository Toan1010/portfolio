const fs = require('fs');
const path = require('path');

const messagesDir = path.join(__dirname, '../messages');
const localesFile = path.join(messagesDir, 'locales.json');

try {
  if (!fs.existsSync(messagesDir)) {
    fs.mkdirSync(messagesDir, { recursive: true });
  }

  const files = fs.readdirSync(messagesDir);
  const locales = files
    .filter(file => file.endsWith('.json') && file !== 'locales.json')
    .map(file => path.basename(file, '.json'));

  // Ensure locales is not empty
  if (locales.length === 0) {
    locales.push('vi'); // default fallback
  }

  fs.writeFileSync(localesFile, JSON.stringify(locales, null, 2));
  console.log(`[Locales Generator] Generated locales list: ${locales.join(', ')}`);
} catch (error) {
  console.error('[Locales Generator] Failed to generate locales list:', error);
}
