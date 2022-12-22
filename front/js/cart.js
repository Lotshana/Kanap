/* Récupération du produit via l'api */
function getProduct(Currentid){
    return Promise.resolve(
        fetch("http://localhost:3000/api/products/" + Currentid)
        .then(response => response.json())
        .then(function (product){
            return product
        })
    )
}

/* Initialisation du panier à 0 */
let priceCart = 0;

/* Calcul du prix total avec envoi au local storage */
function totalPriceCart(price, quantity){
    priceCart += quantity * price;
    let totalPrice = document.getElementById('totalPrice').textContent = priceCart;
    localStorage.setItem('totalPrice', JSON.stringify(totalPrice));
}

/* Récupération du panier */
let panier = localStorage.getItem("panierStorage") ? JSON.parse(localStorage.getItem("panierStorage")) : [];

let itemsCart = document.getElementById("cart__items");

/* Boucle pour le panier */
panier.forEach((kanap, i) => {
    getProduct(kanap._id).then(apiKanap => {
        itemsCart.innerHTML += `
            <article class="cart__item" data-id="${kanap._id}" data-color="${kanap.color}">
            <div class="cart__item__img">
                <img src="${apiKanap.imageUrl}" alt="${apiKanap.altTxt}">
            </div>
            <div class="cart__item__content">
                <div class="cart__item__content__description">
                    <h2>${apiKanap.name}</h2>
                    <p>Couleur : ${kanap.color}</p>
                    <p>Prix : ${apiKanap.price} €</p>
                </div>
                <div class="cart__item__content__settings">
                    <div class="cart__item__content__settings__quantity">
                        <p>Qté : </p>
                        <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${kanap.quantity}">
                        <p>Total : ${apiKanap.price * kanap.quantity} €</p>
                    </div>
                    <div class="cart__item__content__settings__delete">
                        <p class="deleteItem" onclick="deleteKanap(${i})">Supprimer</p>
                    </div>
                </div>
            </div>
            </article>`;

            /* Appel de la fonction pour le prix total */
            totalPriceCart(apiKanap.price, kanap.quantity);
    })
})

/* Incrémation de l'id du produit */
// addIdCart.push(kanap._id);


/* Evenement clique sur tous les boutons de suppression */
const deleteKanap = (index) => {
    panier.splice(index, 1);
    localStorage.setItem("panierStorage", JSON.stringify(panier)); /* Mise à jour du localStorage */
    location.reload();
}

/* Evenement changement sur tous les input quantité */
const modifKanap = (index, qte) => {
    /* Modifier la quantité sur la position index de la variable panier avant de la mettre à jour */
    localStorage.setItem("panierStorage", JSON.stringify(panier)); /* Mise à jour du localStorage */
    location.reload();
}