/* Récupération du produit via l'API */
function getProduct(Currentid){
    return Promise.resolve(
        fetch("http://localhost:3000/api/products/" + Currentid)
        .then(response => response.json())
        .then(function (product){
            return product
        })
    )
}

/* Initialisation du nb d'articles et du panier à 0 */
let totalQte = 0;
let priceCart = 0;

/* Calcul du nombre total d'articles + prix total avec envoi au local storage */
function totalPriceCart(price, quantity){
    totalQte += Number(quantity);
    priceCart += quantity * price;

    let totalPrice = document.getElementById('totalPrice').textContent = priceCart;
    document.getElementById('totalQuantity').textContent = totalQte;
}

/* Récupération du panier */
let panier = localStorage.getItem("panierStorage") ? JSON.parse(localStorage.getItem("panierStorage")) : [];

let itemsCart = document.getElementById("cart__items");

/* Boucle pour le panier */
displayCart = () => {
    itemsCart.innerHTML = "";

    panier.forEach((kanap, i) => {
        getProduct(kanap._id).then(apiKanap => {
            try{
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
                    </article>`;
            }
            catch (e) {
              console.log('Erreur d\'affichage sur le getProduct : ' + e)
            }

                /* Appel de la fonction pour le prix total */
                totalPriceCart(apiKanap.price, kanap.quantity);

                if((i+1) === panier.length) {
                    /* Evenement changement sur tous les input quantité */
                    const listEditQte = document.querySelectorAll('.itemQuantity');
                        
                    listEditQte.forEach((inputQte, j) => {
                        inputQte.addEventListener('change', () => {
                            updateQte(inputQte.value, j)
                        })
                    })

                    /* Evenement suppression d'un article */
                    const deleteItems = document.querySelectorAll('.deleteItem');
    
                    deleteItems.forEach((deleteBtn, j) => {
                        deleteBtn.addEventListener('click', () => {
                            if (confirm("Êtes vous sur de vouloir supprimer ce Kanap ?")) {
                                deleteKanap(j)
                            }
                        })
                    })
                }
        })
    })
}

displayCart();


/* Evenement clique sur tous les boutons de suppression */
const deleteKanap = (index) => {
    panier.splice(index, 1);
    localStorage.setItem("panierStorage", JSON.stringify(panier)); /* Mise à jour du localStorage */
    totalQte = 0;
    priceCart = 0;
    displayCart();
}

/* Evenement clique sur la modification de la quantité */
const updateQte = (Qte, index) => {
    panier[index].quantity = Qte;
    localStorage.setItem("panierStorage", JSON.stringify(panier)); /* Mise à jour du localStorage */
    totalQte = 0;
    priceCart = 0;
    displayCart();
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
        window.location.assign("confirmation.html?orderId=" + rep.orderId);
        localStorage.removeItem("panierStorage", JSON.stringify(panier));
    })

    .catch(function (err) {
        console.log("Fetch Error");
      });
}