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

            /* Evenement changement sur tous les input quantité */
            const listEditQte = document.querySelectorAll('.itemQuantity');
                
            listEditQte.forEach((inputQte, j) => {
                inputQte.addEventListener('change', () => {
                    updateQte(inputQte.value, j)
                })
            })
    })
})

/* Evenement clique sur tous les boutons de suppression */
const deleteKanap = (index) => {
    panier.splice(index, 1);
    localStorage.setItem("panierStorage", JSON.stringify(panier)); /* Mise à jour du localStorage */
    location.reload();
}

const updateQte = (Qte, index) => {
    panier[index].quantity = Qte;
    localStorage.setItem("panierStorage", JSON.stringify(panier)); /* Mise à jour du localStorage */
    location.reload();
}



/* Création de la fonction pour la validation des champs */
function validateInput(input, masque) {
    if(input.value.match(masque)) {
        return true;
    }
    else {
        return false;
    }
}


/* Envoi du formulaire */
const btnCommander = document.getElementById('order');
btnCommander.addEventListener('click', function(event) {
    event.preventDefault();
    
    /* Initialisation des erreurs */
    let isValidate = true;
    firstNameErrorMsg.innerHTML="";
    lastNameErrorMsg.innerHTML="";
    addressErrorMsg.innerHTML="";
    cityErrorMsg.innerHTML="";
    emailErrorMsg.innerHTML="";

    /*Test des validations des champs */
    if(validateInput(document.getElementById("firstName"), /^[a-zA-Z]+$/) == false){
        isValidate = false;
        firstNameErrorMsg.innerHTML="Il y a une erreur sur le prénom";
    }

    if(validateInput(lastName, /^[a-zA-Z]+$/) == false){
        isValidate = false;
        lastNameErrorMsg.innerHTML="Il y a une erreur sur le nom";
    }

    if(validateInput(address, /^[A-Za-z0-9 \-]+$/) == false){
        isValidate = false;
        addressErrorMsg.innerHTML="Il y a une erreur sur l'adresse";
    }

    if(validateInput(city, /^[A-Za-z0-9 \-]+$/) == false){
        isValidate = false;
        cityErrorMsg.innerHTML="Il y a une erreur sur la ville";
    }
    
    if(validateInput(email, /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/) == false){
        isValidate = false;
        emailErrorMsg.innerHTML="Il y a une erreur sur l'email";
    }

    if(isValidate){
        envoiCommande();
    }
})

const envoiCommande = () => {
    const contact = {
        'firstName' : document.getElementById("firstName").value,
        'lastName' : document.getElementById("lastName").value,
        'address' : document.getElementById("address").value,
        'city' : document.getElementById("city").value,
        'email' : document.getElementById("email").value
    };

    console.log(contact);
    let products = []; /* Création du tableau vide de produits de la commande */
    panier.forEach((kanap) => {
        products.push(kanap._id)
    })

    console.log(products);
    let formCommande = JSON.stringify({
        contact,
        products
    });

    fetch('http://localhost:3000/api/products/order', {
        method: 'POST',
        headers: {
            'content-type': "application/json"
        },
        mode: "cors",
        body: formCommande
    })
    .then(function (response) {
        return response.json()
    })
    .then(function (rep) {
        // localStorage.setItem("contact", JSON.stringify(rep.contact));
        // localStorage.setItem("produits ", JSON.stringify(rep.products));        
        window.location.assign("confirmation.html?orderId=" + rep.orderId);
    })

    .catch(function (err) {
        console.log("fetch Error");
      });
}