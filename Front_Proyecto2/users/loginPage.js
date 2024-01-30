//LOGIN PAGE

const loginURL = "http://localhost:3000/auth/login"

if(document.querySelector("#lForm")) {
    document.querySelector("#lForm").addEventListener("submit", (event) => {
        event.preventDefault();
        let username = document.querySelector(".username").value;
        let password= document.querySelector(".password").value;
        console.log(typeof(password));

        fetch(loginURL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({username, password}), //básicamente enviamos los datos del formulario
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);

            localStorage.setItem('token', data.access_token)
            token = localStorage.getItem('token')
            console.log(token)

            let errorText = document.querySelector(".error")

            if (username === "" || password === "") {

                errorText.innerHTML = "How can you expect logging anywhere if you don't write anything below, my dear friend?";
                
            } else if(token === "undefined") {

                errorText.innerHTML = "Incorrect username or password";

            } else {

                errorText.innerHTML = "";
                window.location.href = "/BigNest/mainPage.html"

            }
        })
    })
}



