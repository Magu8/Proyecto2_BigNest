//PUT INTO ADOPTION PAGE
const token = localStorage.getItem("token");

const toAdoptUrl = "http://localhost:3000/bigNest/putIntoAdoption";

if (document.querySelector("#aForm")) {
  document
    .querySelector("#aForm")
    .addEventListener("submit", (event) => {
      event.preventDefault();
      let data = {
        image: document.querySelector(".image").value,
        name: document.querySelector(".name").value,
        specie: document.querySelector(".specie").value,
        sex: document.querySelector(".sex").value,
        age: document.querySelector(".age").value,
        nature: document.querySelector(".nature").value,
        available: true,
      };
      console.log(data);
      fetch(toAdoptUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, //al incluir esto, informamos al servidor que los datos que vamos a enviar están en formato JSON. No es imprescindible pero
        },
        body: JSON.stringify(data),
      })
      .then((response) => {
        console.log(response);
        if (response.ok) {
          console.log("AWESOME");
          document.querySelector(
            "#adoptionForm"
          ).innerHTML = `<h2>${data.name} has been put into adoption!</h2>
            <p>Now we hope it finds a very nice place to live as happy a they deserve to be c:</p>
                `;
        } else {
          document.querySelector(".error").textContent = "Just so you know, you need to fill ALL the fields. Well, not actually, but at least it's name, specie, age and sex"
          
        }
      });
    })
    .then((data) => console.log(data))
    .catch("Error connecting to server");
} else {
  ("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA");
}

//LOG OUT

document.querySelector("#logOutBtn").addEventListener("click", () => {
    localStorage.clear()
    window.location.href = "/users/loginPage.html"
  
  })