//LOG OUT

theName = localStorage.getItem('name')
console.log(theName);

document.querySelector("h2").innerHTML= `Hi ${theName}!`

const token = localStorage.getItem('token')

document.querySelector("#logOutBtn").addEventListener("click", () => {
    localStorage.clear()
    window.location.href = "/users/loginPage.html"
  
  })