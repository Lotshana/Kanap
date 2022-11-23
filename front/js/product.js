const url = new URL(document.location.href);
const idProduct = url.searchParams.get("id");

const title = document.getElementById("title");
const img = document.getElementById("product__img");
const price = document.getElementById("price");
const description = document.getElementById("description");
const colors = document.getElementById("colors");


fetch("http://localhost:3000/api/products + idProduct")
    .then(response => response.json())
    .then(function(item) {
      title.innerHTML = `${item.name}`
      img.innerHTML = `<img src="${item.imageUrl}" alt="${item.altTxt}">`
      price.innerHTML = `${item.price}`
      description.innerHTML = `${item.description}`
      for(let color of item.colors){
        colors.innerHTML+=
        `<option value="${color}">${color}</option>`
      }
    })

    .catch(function(error){
      alert("Toutes nos excuses, le canapé n'est pas disponible")
    });