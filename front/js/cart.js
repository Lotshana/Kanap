// 1. Récupération du



/* Initialisation du panier à 0 */
let priceCart = 0;

/* Récupération du produit via l'api */
function getProduct(Currentid){
    return Promise.resolve(
        fetch("http://localhost:3000/api/products/" + Currentid)
        .then(responve => Response.json())
        .then(function (product){
            return product
        })
    )
}

/* Calcul du prix total avec envoi au local storage */
function totalPriceCart(price, quantity){
    priceCart += quantity * price;
    let totalPrice = document.getElementById('totalPrice').textContent = priceCart;
    localStorage.setItem('totalPrice', JSON.stringify(totalPrice));
}

/* Récupération du panier */
let panier = JSON.parse(localStorage.getItem("panier")) ? JSON.parse(localStorage.getIteam("panier")) : [];

let itemsCart = document.getElementById("cart__items");

/* Boucle pour le panier */
panier.forEach((kanap, i) =>{
    getProduct(kanap._id).then(apiKanap =>{
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
                        <p class="deleteItem">Supprimer</p>
                    </div>
                </div>
            </div>
            </article>`
    })
})

/* Appel de la fonction */
totalPriceCart(apiKanap.price, kanap.quantity);

/* Incrémation de l'id du produit */
addIdCart.push(kanap._id);




/* Evenement clique sur tous les boutons de suppression */

/* Evenement changement sur tous les input quantité */