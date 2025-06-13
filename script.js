document.addEventListener('DOMContentLoaded', () => {
    const criteriaForm = document.getElementById('criteria-form');
    const universityList = document.getElementById('university-list');

    const universities = [
        { name: 'University A', major: 'Computer Science', location: 'City X', gpa: 3.5 },
        { name: 'University B', major: 'Engineering', location: 'City Y', gpa: 3.2 },
        { name: 'University C', major: 'Business', location: 'City X', gpa: 3.8 },
        { name: 'University D', major: 'Computer Science', location: 'City Z', gpa: 3.0 },
        { name: 'University E', major: 'Arts', location: 'City Y', gpa: 3.9 },
        { name: 'University F', major: 'Computer Science', location: 'City X', gpa: 3.1 },
        { name: 'University G', major: 'Engineering', location: 'City Z', gpa: 3.6 },
    ];

    criteriaForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const inputMajor = document.getElementById('major').value.trim().toLowerCase();
        const inputLocation = document.getElementById('location').value.trim().toLowerCase();
        const inputGpa = parseFloat(document.getElementById('gpa').value);

        universityList.innerHTML = ''; // Clear previous results

        if (!inputMajor && !inputLocation && isNaN(inputGpa)) {
            const listItem = document.createElement('li');
            listItem.textContent = 'Please enter some criteria to start shortlisting.';
            universityList.appendChild(listItem);
            return;
        }

        const filteredUniversities = universities.filter(uni => {
            // Corrected GPA logic and filter combination
            if (inputMajor && !uni.major.toLowerCase().includes(inputMajor)) {
                return false;
            }
            if (inputLocation && !uni.location.toLowerCase().includes(inputLocation)) {
                return false;
            }
            if (!isNaN(inputGpa) && !(inputGpa >= uni.gpa)) { // User's GPA must be >= uni's min GPA
                return false;
            }

            // If all specified criteria are met (or not specified), it's a match.
            return true;
        });

        if (filteredUniversities.length > 0) {
            filteredUniversities.forEach(uni => {
                const listItem = document.createElement('li');
                listItem.textContent = `${uni.name} - Major: ${uni.major}, Location: ${uni.location}, Min GPA: ${uni.gpa}`;
                universityList.appendChild(listItem);
            });
        } else {
            const listItem = document.createElement('li');
            listItem.textContent = 'No universities match your criteria.';
            universityList.appendChild(listItem);
        }
    });
});
