const submitMessage = () => {
    const messageRef = firebase.database().ref();

    // Get a key for a new Post.
    let newPostKey = messageRef.push().key;
    const messageElement = document.querySelector("#message");

    if (messageElement.value.length > 30) {
        alert("Must send message shorter than 31 characters");
        return;
    } 
    
    const passcodeElement = document.querySelector("#passcode");

    let update = {}
    update[newPostKey] = {
            message: messageElement.value,
            passcode: passcodeElement.value,
            user: "default",
        }
    

    messageRef.update(update).then(response => console.log(response));
    messageElement.value = "";
    passcodeElement.value = "";
}