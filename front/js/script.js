let itemsContainer = document.getElementById("items");

function displayItem(item){
    itemsContainer.innerHTML += 
    `<a href="./product.html?id=${item._id}">
    <article>
      <img src=".../product01.jpg" alt="Lorem ipsum dolor sit amet, Kanap name1">
      <h3 class="productName">Kanap name1</h3>
      <p class="productDescription">Dis enim malesuada risus sapien gravida nulla nisl arcu. Dis enim malesuada risus sapien gravida nulla nisl arcu.</p>
    </article>
    </a>`;
}

fetch("http://localhost:3000/api/products")
    .then((response) => response.json())