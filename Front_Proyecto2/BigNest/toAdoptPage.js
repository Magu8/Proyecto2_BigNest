//TO ADOPT PAGE
const token = localStorage.getItem('token')

const availableAnimalsUrl = "http://localhost:3000/bigNest/availableAnimals";

fetch(availableAnimalsUrl, {
  method: 'GET',
  headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}` //al incluir esto, informamos al servidor que los datos que vamos a enviar están en formato JSON. No es imprescindible pero 
  },
})
.then(res => res.json())
.then(data => {
    console.log(data);
    let mainDiv = document.querySelector("#mainDiv")
    data.forEach(animal => {
        let card = document.createElement("div");
        card.classList.add(`animal`);

        let animalData = document.createElement("div");
        animalData.classList.add(`animalInfo`);

        let image = document.createElement("img");
        let name = document.createElement("h3");
        let age = document.createElement("p");
        let specie = document.createElement("p");
        let available = document.createElement("p");
        let sex = document.createElement("p");
        let nature = document.createElement("p");

        let toAdoptBtn = document.createElement("button");
        toAdoptBtn.classList.add('adoptBtn')

        image.src = animal.image;
        name.textContent = `${animal.name}`;
        age.textContent = `Age: ${animal.age}`;
        specie.textContent = `Specie: ${animal.specie}`;
        available.textContent = `Available: ${animal.available}`;
        sex.textContent = `Sex: ${animal.sex}`;
        nature.textContent = `Nature: ${animal.nature}`
        toAdoptBtn.textContent = `Adopt ${animal.name}`

        animalData.append(image, name, specie, age, sex, nature, available, toAdoptBtn);
        card.appendChild(animalData);
        mainDiv.appendChild(card);

        toAdoptBtn.addEventListener("click", () => {
            const animalId = animal._id;
          
            const updatedAvailable = !animal.available;   //en available tenemos un valor booleano, en esta variable se recogerá el valor booleano opuesto
            
            fetch(`http://localhost:3000/bigNest/adoptAnimal/${animalId}`, {
              method: 'PUT',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                available: updatedAvailable, // se aplicará el valor opuesto que tenga. Aunque es un poco innecesario puesto que TODOS son true pero bueno, algo nuevo que sabemos ehe
              }),
            })
              .then(response => {
                if (response.ok) {
                  console.log(`Animal availability changed to ${updatedAvailable ? 'true' : 'false'}`);
                  // alert(`${animal.name} has been adopted`)
                  
                  let adoptedAlert = document.querySelector("#adoptedAlert");                  
                  let span = document.querySelector(".close");
                  document.querySelector(".alert").textContent = `${animal.name} has been adopted`
                  let yay = document.createElement("img")
                  yay.src = "gatoYAY.png" 
                  document.querySelector(".imgDiv").appendChild(yay)

                  adoptedAlert.style.display = "block"

                  span.addEventListener("click", () => {
                    adoptedAlert.style.display = "none"
                    window.location.reload()
                  })

                  window.addEventListener("click", (event) =>{
                    if(event.target == adoptedAlert) {
                      adoptedAlert.style.display = "none"
                      window.location.reload()
                    }
                  })
                } else {
                
                  console.error('Error while adopting the animal');
                }
              })
              .catch(error => {
                console.error('Connection error while adopting the animal', error);
              });
          });
    });
})
.catch("Error connecting to available animals");

//LOG OUT

document.querySelector("#logOutBtn").addEventListener("click", () => {
    localStorage.clear()
    window.location.href = "/users/loginPage.html"
  
  })




