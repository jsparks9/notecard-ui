window.onload = function() {
    console.log('The page loaded!');
    let button = document.getElementById('login-button');
    button.addEventListener('click', login);

    let button1 = document.getElementById('logout-btn');
    button1.addEventListener('click', logout);

    let passwordField = document.getElementById('login-password');
    passwordField.addEventListener('keyup', function(e) {
        if (e.key === 'Enter') {
            login();
        }
    });
}

function login() {

    // Convenience references
    let usernameInput = document.getElementById('login-username');
    let passwordInput = document.getElementById('login-password');
    let errorContainer = document.getElementById('error-message');
    let feedbackContainer = document.getElementById('feedback');

    let u = usernameInput.value;
    let p = passwordInput.value;

    if (u && p) {
        
        // If the error message is being displayed, hide it
        errorContainer.setAttribute('hidden', true);

        let respData = fetch('http://localhost:8080/notecard/userauth', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({u, p})
        }).then(resp => {
            console.log(`Response status: ${resp.status}`);
            console.log(`Response timestamp: ${Date.now()}`);
            if(resp.status == 401) {
                feedbackContainer.setAttribute('hidden', true);
                errorContainer.removeAttribute('hidden');
                errorContainer.innerText = "Password is incorrect!";
                return resp.json();
            }
            if(resp.status == 404) {
                feedbackContainer.setAttribute('hidden', true);
                errorContainer.removeAttribute('hidden');
                errorContainer.innerText = "User not found!";
                return resp.json();
            }
            if(resp.status == 406) {
                feedbackContainer.setAttribute('hidden', true);
                errorContainer.removeAttribute('hidden');
                errorContainer.innerText = "Already Logged in!";
                return resp.json();
            }
            if (Math.floor(resp.status/100) != 2) {
                feedbackContainer.setAttribute('hidden', true);
                errorContainer.removeAttribute('hidden');
                errorContainer.innerText = "Login failed!";
                return resp.json();
            }

            if (Math.floor(resp.status/100) == 2) {
                feedbackContainer.removeAttribute('hidden');
                errorContainer.setAttribute('hidden', true);
                feedbackContainer.innerText = "Login Success!";
                return resp.json();
            }



            return resp.json();
        })
        
//        if (respData) {
//            respData.then(data => {
//                let successMsgContainer = document.createElement('p');
//                successMsgContainer.setAttribute('class', 'alert alert-success');
//                successMsgContainer.innerText = `Login successful! Welcome, ${data['firstName']}!`;
//                document.getElementById('login-container').appendChild(successMsgContainer);
//            });
//        }

    } else {

        // Show the error message
        errorContainer.removeAttribute('hidden');
        errorContainer.innerText = "You must provide a username and password!";
    }
}

function logout() {
    let errorContainer = document.getElementById('error-message');
    let feedbackContainer = document.getElementById('feedback');
    if (true) {
        let respData = fetch('http://localhost:8080/notecard/userauth', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({})
        })
    }
    feedbackContainer.removeAttribute('hidden');
    errorContainer.setAttribute('hidden', true);
    feedbackContainer.innerText = "Logged out!";
}