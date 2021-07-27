let displayName, emailAddress;
const colors = ['has-background-primary', 'has-background-link', 'has-background-info', 'has-background-success', 'has-background-warning', 'has-background-danger'];

window.onload = (event) => {
    // Use this to retain user state between html pages.
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            console.log('Logged in as: ' + user.displayName);
            
            displayName = user.displayName;
            emailAddress = user.email;

            const userId = user.uid;

            getNotes(userId);
            const searchInput = document.querySelector("#search");
            searchInput.addEventListener('keyup', e => {
                // Get labels
                // filter by input
                // render to screen

                const inputValue = searchInput.value;
                const labelRef = firebase.database().ref(`users/${userId}/${inputValue}`);

                console.log(labelRef);
                
            });
        } else {
            window.location = 'index.html'; // If not logged in, navigate back to login page.
        }
    });
};



const getNotes = (userId) => {
    console.log(userId);
    const userRef = firebase.database().ref(`users/${userId}`);
    userRef.on('value', (snapshot) => {
        writeNotesToHTML(snapshot.val());
    }, (errorObject) => {
        console.log('The read failed: ' + errorObject.name);
    });
}

const writeNotesToHTML = (data) => {
    const area = document.querySelector('#app');

    area.innerHTML = "";
    for (const labels in data) {
        Object.values(data[labels]).forEach(note => {
            area.appendChild(createHTMLForNote(labels, note));
        });
    }
    // Put all html into page
}

const createHTMLForNote = (label, note) => {
    const cardContainer = document.createElement('div');
    cardContainer.classList.add('column', 'is-one-third');
    cardContainer.innerHTML = `<div class="card ${chooseRandomColor()}">
                    <header class="card-header">
                        <p class="card-header-title">
                            ${note.title}
                        </p>
                        <p class="subtitle">
                            ${displayName} - ${emailAddress}
                        </p>
                    </header>
                    <div class="card-content">
                        <div class="content">
                            ${note.text}
                        </div>
                    </div>
                    <footer class="card-footer">
                        <a href="#" class="card-footer-item">${label}</a>
                    </footer>
                    </div> 
            `;
    return cardContainer;
};

const chooseRandomColor = () => {
    return colors[Math.floor(Math.random() * colors.length)];
}