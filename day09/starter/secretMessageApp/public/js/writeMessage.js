const MAX_CHARS = 60;

const submitMessage = () => {
    console.log("message sent");
    const passcodeInput = document.querySelector('#passcode');
    const messageInput = document.querySelector('#message');

    const passcodeValue = passcodeInput.value;
    const messageValue = messageInput.value;

    if (messageValue.length > MAX_CHARS) {
        alert(`Message must be less than ${MAX_CHARS + 1} characters`);
        return;
    }

    if (!(/[A-Z]/.test(passcodeValue)) || !(/[0-9]/.test(passcodeValue))) {
        alert(`Need at least one uppercase value AND at least one number`);
        return;
    }

    passcodeInput.value = "";
    messageInput.value = "";
    console.log(new Hashes.MD5().hex(passcodeValue));
    firebase.database().ref().push({
        message: messageValue,
        passcode: new Hashes.MD5().hex(passcodeValue),
        user: "default",
    });

};