//ADOPTED PAGE
const token = localStorage.getItem('token')

const adoptedAnimalsUrl = "http://localhost:3000/bigNest/adoptedAnimals";

fetch(adoptedAnimalsUrl, {
  method: 'GET',
  headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}` //al incluir esto, informamos al servidor que los datos que vamos a enviar están en formato JSON. No es imprescindible pero 
  },
})
.then(res => res.json())
.then(data => {
    console.log(data);
    let mainDiv = document.querySelector("#adoptedDiv")
    data.forEach(animal => {
        let card = document.createElement("div");
        card.classList.add(`animal`);

        let animalData = document.createElement("div");
        animalData.classList.add(`animalInfo`);

        let image = document.createElement("img");
        let name = document.createElement("h3");
        let age = document.createElement("p");
        let specie = document.createElement("p");
        let sex = document.createElement("p");
        let nature = document.createElement("p");
        let deleteBtn = document.createElement("button")
        deleteBtn.classList.add('deleteBtn')



        image.src = animal.image;
        name.textContent = `Name: ${animal.name}`;
        age.textContent = `Age: ${animal.age}`;
        specie.textContent = `Specie: ${animal.specie}`;
        sex.textContent = `Sex: ${animal.sex}`;
        nature.textContent = `Nature: ${animal.nature}`
        deleteBtn.textContent = `Delete ${animal.name}`
       

        animalData.append(image, name, specie, age, sex, nature, deleteBtn);
        card.appendChild(animalData);
        mainDiv.appendChild(card);

        deleteBtn.addEventListener("click", () => {


            const animalName = animal.name
            let whyDiv = document.querySelector("#deleteAlert")
            // let span = document.querySelector(".close")

            let ohNo = document.createElement("img")
            let yesOpt = document.createElement("button")
            let noOpt = document.createElement("button")

            yesOpt.classList.add('yesBtn')
            noOpt.classList.add('noBtn')

            document.querySelector(".question").textContent = `Are you sure you want to delete ${animalName}?`
            document.querySelector(".aclaration").textContent = `I mean, nothing bad will happen to ${animalName}, it will just dissapear from the data base. Yet, why would you do that?`
            yesOpt.textContent = `Yes`
            noOpt.textContent = `No`
            ohNo.src = "gatoNO.png"

            document.querySelector(".imgDiv").appendChild(ohNo)
            document.querySelector(".yesNo").append(yesOpt,noOpt)

            whyDiv.style.display = "block"

            yesOpt.addEventListener("click", (event) => {
                event.preventDefault();
                fetch(`http://localhost:3000/BigNest/deleteAnimal/${animalName}`, {
                    method: `DELETE`,
                    headers: {
                        'Content-Type': 'application/json',
                      }
                })
                .then(response => {
                    if(response.ok) {
                        console.log("HOW DARE YOU");
                        alert("HOW DARE YOU")
                    } else {
                        console.error("HAH YOU CAN'T DELETE IT")
                    }
                })
                .then(data => console.log(data))
                .catch("Error connecting")
                window.location.reload()
            })

            noOpt.addEventListener("click", () => {
                alert("You have chosen wisely")
                whyDiv.style.display = "none"    
                
            })
        })

    });
})
.catch("Error connecting to adopted animals");

//LOG OUT

document.querySelector("#logOutBtn").addEventListener("click", () => {
    localStorage.clear()
    window.location.href = "/users/loginPage.html"
  
  })
