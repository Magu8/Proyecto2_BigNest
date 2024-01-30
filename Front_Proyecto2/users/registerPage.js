//REGISTRATION PAGE

const registrationUrl = "http://localhost:3000/auth/register"
if(document.querySelector("#rForm")) {
    document.querySelector("#rForm").addEventListener("submit", (event) => {
        event.preventDefault();
        let name = document.querySelector(".name").value;
        let username = document.querySelector(".username").value;
        let password = document.querySelector(".password").value;

        fetch(registrationUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
                
            },
            body: JSON.stringify({
                name: name,
                username: username,
                password: password,
            })
        })
        .then(response => {
            console.log(response);
            if(response.ok) {
                console.log("YAY")

                localStorage.setItem('name', name)
                realName = localStorage.getItem('name')
                console.log(typeof(realName));

                document.querySelector("#registrationForm").innerHTML = `
                <h2>Succesfully registered</h2>
                <p>Now you can log into your account</p>
                `
            
            } else if (response.status === 409 ) {
                document.querySelector(".error").textContent = "User already exists"
            } else if(name === "" || username === "" || password === ""){
                document.querySelector(".error").textContent = "Hey pal, what about filling these fields so you can sign in?"
            } else {
                document.querySelector(".error").textContent = "Password must have at least 6 characters"
            }
        })
        .catch("Error connecting to server")
    });
} else {
    "DAMN IT"
}