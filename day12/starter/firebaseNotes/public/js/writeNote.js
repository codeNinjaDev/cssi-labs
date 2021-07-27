
let googleUser;

window.onload = (event) => {
  // Use this to retain user state between html pages.
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      console.log('Logged in as: ' + user.displayName);
      getLabels(user.uid);
      googleUser = user;

    } else {
      window.location = 'index.html'; // If not logged in, navigate back to login page.
    }
  });
};

const getLabels = (userId) => {
    console.log(userId);
    const userRef = firebase.database().ref(`users/${userId}`);
    userRef.on('value', (snapshot) => {
        createHTMLForDropdown(Object.keys(snapshot.val()));
    }, (errorObject) => {
        console.log('The read failed: ' + errorObject.name);
    });
}

const createHTMLForDropdown = (labels) => {
    let optionElements = `
        <option value="start">Select dropdown</option>
    `;
    const labelDropdown = document.querySelector("#dropdown");
    for (const label of labels) {
        optionElements += `<option value="${label}">${label}</option>`
    }
    labelDropdown.innerHTML = optionElements;
};



const handleNoteSubmit = () => {
  // 1. Capture the form data
  const noteTitle = document.querySelector('#noteTitle');
  const noteText = document.querySelector('#noteText');

  const labelDropdown = document.querySelector("#dropdown");
  const newLabelInput = document.querySelector('#newLabel');
  
  let labelValue;

  if (newLabelInput.value !== "") {
    labelValue = newLabelInput.value;
  } else if (labelDropdown.value === "start") {
      alert("Please choose a label");
      return;
  } else {
    labelValue = labelDropdown.value;
  }
  // 2. Format the data and write it to our database
  firebase.database().ref(`users/${googleUser.uid}/${labelValue}`).push({
    title: noteTitle.value,
    text: noteText.value
  })
  // 3. Clear the form so that we can write a new note
  .then(() => {
    noteTitle.value = "";
    noteText.value = "";
    label.value = "start";
    newLabelInput.value="";
  });
}