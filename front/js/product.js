/* Création d'une constante pour l'URL d'un produit en particulier en fonction de son ID */
const url = new URL(document.location.href);
const idProduct = url.searchParams.get("id");

/* Création des constantes pour la récupération des informations sur l'API */
const title = document.getElementById("title");
const img = document.getElementById("product__img");
const price = document.getElementById("price");
const description = document.getElementById("description");
const colors = document.getElementById("colors");


fetch("http://localhost:3000/api/products/" + idProduct)
    .then(response => response.json())
    .then(function(item) {
      try{
        title.innerHTML = `${item.name}`
        img.innerHTML = `<img src="${item.imageUrl}" alt="${item.altTxt}">`
        price.innerHTML = `${item.price}`
        description.innerHTML = `${item.description}`

        for(let color of item.colors){
          colors.innerHTML +=
          `<option value="${color}">${color}</option>`
        }
      }
      catch (e) {
        console.log('Erreur d\'affichage sur le item : ' + e)
      }
    })

    .catch(function(error) {
      alert("Toutes nos excuses, le canapé n'est pas disponible")
      console.log('Erreur backend')
    });

    const ajoutPanier = () => {     
       
      const quantity = parseInt(document.getElementById('quantity').value);
      const color = colors.options[colors.selectedIndex].value;

      /* Check des erreurs sur la couleur, indiquer à l'utilisateur de choisir une couleur */
      if(color == "") {
        alert("Veuillez préciser une couleur pour le canapé")
        return
      }
      
      /* Check des erreurs sur la quantité, indiquer à l'utilisateur de choisir une quantité */
      if(quantity <= 0 || quantity >= 100) {
        alert("Veuillez indiquer une quantité entre 1 et 100")
        return
      }

      let newBuy = {
        "_id" : idProduct,
        "quantity" : quantity,
        "color" : color,
      }

      let panier = localStorage.getItem('panierStorage') ? JSON.parse(localStorage.getItem('panierStorage')) : [];

      let existIndex = false;

      for (let i = 0; i < panier.length; i++) {
        let productPanel = panier[i];

        if (productPanel._id === newBuy._id && productPanel.color === newBuy.color) {
          existIndex = i;
        }
      }

      if (existIndex !== false) {
        panier[existIndex].quantity += newBuy.quantity;
      } else {
        panier.push(newBuy);
      }



      localStorage.setItem('panierStorage', JSON.stringify(panier));
    }

    document.getElementById('addToCart').addEventListener('click', function () {ajoutPanier(alert("Votre kanap a bien été ajouté au panier"))})