const productId = new URLSearchParams.get("id")

const img = document.querySelector("item__img");
const title = document.getElementById("title");
const price = document.getElementById("price");
const description = document.getElementById("description");

function displayProduct(kanap){
    `title.innerHTML = kanap.name`;
}


fetch("http://localhost:3000/api/products + productId")
    .then(response => response.json())

    .catch(function(error){
      alert("Toutes nos excuses, le canapé n'est pas disponible")
    });