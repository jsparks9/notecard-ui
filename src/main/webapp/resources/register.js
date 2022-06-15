window.onload = function() {
    let button = document.getElementById('register-button');
    button.addEventListener('click', register);

    let areaField = document.getElementById('register-postal-code');
    areaField.addEventListener('keyup', function(e) {
        if (e.key === 'Enter') {
            register();
        }
    });
}

function register() {

    // Convenience references
    let u = document.getElementById('register-username').value;
    let p = document.getElementById('register-password').value;
    let f = document.getElementById('register-first-name').value;
    let l = document.getElementById('register-last-name').value;

    let feedbackContainer = document.getElementById('feedback');
    let errorContainer = document.getElementById('error-message');

    if (u && p && f) {
        
        // If the error message is being displayed, hide it
        errorContainer.setAttribute('hidden', true);

        let respData = fetch('http://localhost:8080/notecard/userauth', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({u,p,f,l})
        }).then(resp => {
            console.log(`Response status: ${resp.status}`);
            console.log(`Response timestamp: ${Date.now()}`);

            if (resp.status == 409) {
                feedbackContainer.setAttribute('hidden', true);
                errorContainer.removeAttribute('hidden');
                errorContainer.innerText = "Username already taken!";
                return;
            }
            if (Math.floor(resp.status/100) == 2) {
                errorContainer.setAttribute('hidden', true);
                feedbackContainer.removeAttribute('hidden');
                feedbackContainer.innerText = "Registration Successful! You have been logged in.";
                return;
            }
            if (Math.floor(resp.status/100) >= 4) { // ADD CODE HANDLING
                feedbackContainer.setAttribute('hidden', true);
                errorContainer.removeAttribute('hidden');
                errorContainer.innerText = "Registration failed!";
                return;
            }


            return resp;
        })
        
//        if (respData) {
//            respData.then(data => {
//                // got a response!
//                processFeedback(data);
//            });
//        }

    } else {
        let ar = [u,p,f,l];
        let arr = [];
        let fields = ["username", "password", "first name", "last name"];
        if (!ar[0]) { arr.push(fields[0]); }
        if (!ar[1]) { arr.push(fields[1]); }
        if (!ar[2]) { arr.push(fields[2]); }
        //if (!ar[3]) { arr.push(fields[3]); }

        if (arr.every(function(e,i) {return e;})) { // if any not blank
          let message = "Missing "
          let last_e = arr.pop();

          if (arr.length == 1) {
            message += arr.pop() + " and " + last_e;
          }
          else if (arr.length != 0) {
            message += arr.join(", ");
            message += ", and " + last_e;
          }
          else {
            message += last_e;
          }
        console.log(message);
        errorContainer.removeAttribute('hidden');
        errorContainer.innerText = message;
        return;
        }
    }
}

// This function is not currently used
function processFeedback(data) {
    //let parsed = JSON.parse(data);
    console.log(`${data['firstname']}`);
    console.log(`${data.status}`);

    console.log(JSON.stringify(data));

    if (Math.floor(data['code']/100) == 2) {
        feedbackContainer.removeAttribute('hidden');
        feedbackContainer.innerText = `Registration successful! Welcome, ${data['firstname']}!`;
    }
}