const submitMessage = () => {
    console.log("message sent");
    const passcodeInput = document.querySelector('#passcode');
    const messageInput = document.querySelector('#message');

    const passcodeValue = passcodeInput.value;
    const messageValue = messageInput.value;

    passcodeInput.value = "";
    messageInput.value = "";

    firebase.database().ref().push({
        message: messageValue,
        passcode: passcodeValue,
        user: "default",
    });

};