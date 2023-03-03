const itemContainer = document.getElementById("items");

/* Apparition des canapés avec les bonnes informations via l'API */
function displayItem(kanap){
  try {
    itemContainer.innerHTML += 
    `<a href="./product.html?id=${kanap._id}">
    <article>
      <img src="${kanap.imageUrl}" alt="${kanap.altTxt}">
      <h3 class="productName">${kanap.name}</h3>
      <p class="productDescription">${kanap.description}</p>
    </article>
    </a>`;
  }
  catch (e) {
    console.log('Erreur d\'affichage sur le displayItem : ' + e)
  }
}

/* Connexion au backend via API */
fetch("http://localhost:3000/api/products")
    .then(response => response.json())
    .then(function(products){
      for(let product of products){
        displayItem(product);
      }
    })
    .catch(function(error){
      alert("Il n'y a pas de capané disponible")
      console.log('Erreur backend')
    });