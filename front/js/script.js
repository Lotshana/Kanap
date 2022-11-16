const itemContainer = document.getElementById("items");

function displayItem(kanap){
    itemContainer.innerHTML += 
    `<a href="./product.html?id=${kanap._id}">
    <article>
      <img src="${kanap.imageUrl}" alt="${kanap.altTxt}">
      <h3 class="productName">${kanap.name}</h3>
      <p class="productDescription">${kanap.description}</p>
    </article>
    </a>`;
}

fetch("http://localhost:3000/api/products")
    .then((response) => response.json())
    .then(function(products){
      for(let product of products){
        displayItem(product);
      }
    })
    .catch(function(error){
      alert("Il n'y a pas de capané disponible")
    });