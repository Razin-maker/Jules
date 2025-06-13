const fs = require('fs');
const path = require('path');

const dbPath = path.join(__dirname, 'database.json');

// New university data (in a real app, this would come from args or a request)
const newUniversity = {
  name: "New Example University",
  major: "Data Science",
  location: "Remote Town",
  gpa: 3.7
};

fs.readFile(dbPath, 'utf8', (err, data) => {
  if (err) {
    if (err.code === 'ENOENT') { // File doesn't exist
      fs.writeFile(dbPath, JSON.stringify([newUniversity], null, 2), 'utf8', err => {
        if (err) {
          console.error('Error writing new database file:', err);
          return;
        }
        console.log('New database file created and university added.');
      });
      return;
    }
    console.error('Error reading database file:', err);
    return;
  }

  let universities = [];
  try {
    universities = JSON.parse(data);
  } catch (parseErr) {
    console.error('Error parsing database JSON:', parseErr);
    return;
  }

  universities.push(newUniversity);

  fs.writeFile(dbPath, JSON.stringify(universities, null, 2), 'utf8', err => {
    if (err) {
      console.error('Error writing updated database file:', err);
      return;
    }
    console.log('University added successfully to database.json.');
    console.log('Run get_universities.js to see the updated list, or check database.json.');
  });
});
