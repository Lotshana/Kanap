const idKanap = new URLSearchParams.get("id")

const imgKanap = document.querySelector("item__img");
const nameKanap = document.getElementById("title");
const priceKanap = document.getElementById("price");
const txtKanap = document.getElementById("description");

/*function displayKanap(imgProduct){
    imgKanap.innerHTML += 
    `<img src="${imgProduct.imageUrl}" alt="${imgProduct.altTxt}">`;
} */

fetch("http://localhost:3000/api/products + idKanap")
    .then((response) => response.json())
    .then(function displayKanap(imgProduct){
        imgKanap.innerHTML += 
        `<img src="${imgProduct.imageUrl}" alt="${imgProduct.altTxt}">`;
    })
    .catch(function(error){
      alert("Toutes nos excuses, le canapé n'est pas disponible")
    });