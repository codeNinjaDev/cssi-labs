let numTiles = 0;
let allowedAttempts = 3;

const createTileButton = document.querySelector("#create-tile");
const hideMessageButton = document.querySelector("#hideMessageButton");
const messageDisplay = document.querySelector("#message");

createTileButton.addEventListener('click', (e) => {
    console.log(e)    
    const tileContainer = document.querySelector("#grid");
    const newTile = document.createElement('div');
    newTile.classList.add("gridItem");
    newTile.innerHTML = `
    <div class="hero-body has-text-centered">
        <div class="login">
            <form action="javascript:void(0);">
                <div class="field">
                    <div class="control">
                        <input class="input is-medium is-rounded" type="text" placeholder="What's the passcode?" id="passcode${numTiles}" required />
                    </div>
                </div>
                <button class="button is-block is-fullwidth is-primary is-medium is-rounded" type="submit" onclick="getMessages(${numTiles})">
                    Click Here
                </button>
            </form>
            <br>
        </div>
    </div>
    `;
    numTiles++;
    tileContainer.appendChild(newTile);

});

hideMessageButton.addEventListener('click', (e) => {
    messageDisplay.textContent = "";
    hideMessageButton.parentNode.hidden = true;
});


const getMessages = (index) => {
    if (allowedAttempts < 1) {
        alert("Not allowed!");
        return;
    }
    
    const messageRef = firebase.database().ref();
    messageRef.on('value', (snapshot) => {
        const data = snapshot.val();
        console.log(data);
        const passcodeAttempt = document.querySelector(`#passcode${index}`).value;


        for (const recordKey in data) {
            const record = data[recordKey];
            const storedPasscode = record.passcode;

            if (passcodeAttempt === storedPasscode) {
                console.log(`Message: ${record.message}`);
                renderMessageAsHtml(record.user, record.message, index);
                return;
            }
        }
        allowedAttempts--;
        alert(`Wrong password! You have ${allowedAttempts} attemps left`);
        if (allowedAttempts === 0) {
            alert("Please wait 3 seconds");
            window.setTimeout(() => allowedAttempts = 3, 3000);
        } 
    });
}

const renderMessageAsHtml = (user, message, index) => {
    const passCodeInput = document.querySelector(`#passcode${index}`);
    passCodeInput.value = "";

    messageDisplay.parentNode.hidden = false;
    messageDisplay.textContent = `${user}: ${message}`;
}

/*

                <div class="tile is-child hero-body has-text-centered">
                    <div class="login">
                    <form action="javascript:void(0);">
                        <div class="field">
                            <div class="control">
                                <input class="input is-medium is-rounded" type="text" placeholder="What's the passcode?" id="passcode" required />
                            </div>
                        </div>
                        <button class="button is-block is-fullwidth is-primary is-medium is-rounded" type="submit" onclick="getMessages()">
                            Click Here
                        </button>
                    </form>
                    <br>
                    </div>
                </div>

*/