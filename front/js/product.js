const url = new URL(document.location.href);
const idProduct = url.searchParams.get("id");

const title = document.getElementById("title");
const img = document.getElementById("product__img");
const price = document.getElementById("price");
const description = document.getElementById("description");
const colors = document.getElementById("colors");


fetch("http://localhost:3000/api/products/" + idProduct)
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

    .catch(function(error) {
      alert("Toutes nos excuses, le canapé n'est pas disponible")
    });


    

    const addLocalStorage = function(panier){
      localStorage.setItem('panier', JSON.stringify(panier));
    }

    const ajoutPanier = () => {
      let quantity = parseInt(document.getElementById('quantity').value);
      let color = colorsOption.options[colorsOption.selectedIndex].value;    

      let newBuy = {
        "_id" : idProduct,
        "quantity" : quantity,
        "color" : color,
      }
      
      let panier = localStorage.getItem('panier') ? JSON.parse(localStorage.getItem('panier')) : [];

      let productExistIndex = false;
      for (let i = 0; i < panier.length; i++) {
        let productPanel = panier[i];

        if (productPanel._id === productExistIndex._id) {
          productExistIndex = i;
        }
      }

      if (false !== productExistIndex) {
        panier[productExistIndex].quantity = parseInt(panier[productExistIndex].quantity) + productExistIndex.quantity;
      } else {
        panier.push(produit);
      }

      addLocalStorage(panier);
      window.location.replace("/front/html/cart.html");
    }

    document.getElementById('addToCart').addEventListener('click', function () {ajoutPanier(Kanap)})