const fs = require('fs');
const path = require('path');

const dbPath = path.join(__dirname, 'database.json');

fs.readFile(dbPath, 'utf8', (err, data) => {
  if (err) {
    console.error('Error reading database file:', err);
    // In a real backend, you might return a 500 error here
    process.exit(1); // Exit with an error code
  }

  try {
    // Validate if data is JSON before parsing (optional, but good practice)
    JSON.parse(data);
    // Output the raw JSON data. The frontend will parse it.
    console.log(data);
  } catch (parseErr) {
    console.error('Database file does not contain valid JSON:', parseErr);
    process.exit(1); // Exit with an error code
  }
});
