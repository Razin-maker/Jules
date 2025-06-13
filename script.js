document.addEventListener('DOMContentLoaded', () => {
    const criteriaForm = document.getElementById('criteria-form');
    const universityList = document.getElementById('university-list');
    let universities = []; // To store fetched university data

    // Fetch university data from database.json
    fetch('database.json')
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            universities = data;
            // console.log('Universities loaded:', universities); // For debugging
            // Optionally, display all universities initially or a prompt
            displayUniversities(universities);
        })
        .catch(error => {
            console.error('Error fetching university data:', error);
            universityList.innerHTML = '<li>Error loading university data. Please try again later.</li>';
        });

    function displayUniversities(uniArray) {
        universityList.innerHTML = ''; // Clear previous results

        if (uniArray.length === 0) {
            const listItem = document.createElement('li');
            listItem.textContent = 'No universities to display at the moment.';
            universityList.appendChild(listItem);
            return;
        }

        uniArray.forEach(uni => {
            const listItem = document.createElement('li');
            listItem.textContent = `${uni.name} - Major: ${uni.major}, Location: ${uni.location}, Min GPA: ${uni.gpa}`;
            universityList.appendChild(listItem);
        });
    }

    criteriaForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const inputMajor = document.getElementById('major').value.trim().toLowerCase();
        const inputLocation = document.getElementById('location').value.trim().toLowerCase();
        const inputGpa = parseFloat(document.getElementById('gpa').value);

        if (!inputMajor && !inputLocation && isNaN(inputGpa)) {
            // If no criteria, display all fetched universities or a prompt
            displayUniversities(universities);
            // Or display a specific prompt:
            // universityList.innerHTML = '<li>Please enter some criteria to start shortlisting.</li>';
            return;
        }

        const filteredUniversities = universities.filter(uni => {
            if (inputMajor && !uni.major.toLowerCase().includes(inputMajor)) {
                return false;
            }
            if (inputLocation && !uni.location.toLowerCase().includes(inputLocation)) {
                return false;
            }
            if (!isNaN(inputGpa) && !(inputGpa >= uni.gpa)) {
                return false;
            }
            return true;
        });

        if (filteredUniversities.length > 0) {
            displayUniversities(filteredUniversities);
        } else {
            universityList.innerHTML = '<li>No universities match your criteria.</li>';
        }
    });
});
