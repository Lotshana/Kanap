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

/* Vérification du nom de famille */
function validateLastName(lastName) {
    let lastName = /^[a-zA-Z]+$/; /* Masque du format de texte*/
    if(name.value.match(lastName)) {
        document.forms1.text1.focus();
        return true;
    }
    else {
        alert("Votre nom est invalide.");
        document.forms.text.focus();
        return false;
    }
}

/* Vérification du prénom */
function validateFirstName(firstName) {
    let firstName = /^[a-zA-Z]+$/; /* Masque du format de texte*/
    if(name.value.match(firstName)) {
        document.forms1.text1.focus();
        return true;
    }
    else {
        alert("Votre nom est invalide.");
        document.forms.text.focus();
        return false;
    }
}

/* Vérification de l'adresse */
function validateAddress(address) {
    let address = /^[A-Za-z0-9\-]+$/; /* Masque du format de l'adresse*/
    if(address.value.match(firstName)) {
        document.forms1.text1.focus();
        return true;
    }
    else {
        alert("Votre nom est invalide.");
        document.forms.text.focus();
        return false;
    }
}

/* Vérification de la ville */
function validateCity(city) {
    let city = /^[a-zA-Z\-]+$/; /* Masque du format de la ville*/
    if(city.value.match(city)) {
        document.forms1.text1.focus();
        return true;
    }
    else {
        alert("Votre nom est invalide.");
        document.forms.text.focus();
        return false;
    }
}

/* Vérification de l'email */
function validateEmail(email) {
    let mailFormat = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/; /* Masque du format d'email*/
    if(email.value.match(mailFormat)) {
        document.forms1.text1.focus();
        return true;
    }
    else {
        alert("Votre adresse email est invalide.");
        document.forms.text.focus();
        return false;
    }
}

/* Envoi du formulaire */
let btnCommander = document.getElementById('order');
btnCommander.addEventListener('click', function(event) {
    event.preventDefault();
    //alert(document.querySelector("form").reportValidity());

    envoiCommande();
})

const envoiCommande = () => {
    //alert('Traitement du formulaire')

    // Récupérer les données du formulaire
    // Test de la validation des données

    // Appeler l'API commande (objet contact et array de l'ID des produits)
    // Après un retour positif, redirection vers la page confirmation et affichage de l'ID de la commande

    if(document.querySelector("form").reportValidity()) {
        const contact = {
            'firstName' : document.getElementById("firstName").value,
            'lastName' : document.getElementById("lastName").value,
            'address' : document.getElementById("address").value,
            'city' : document.getElementById("city").value,
            'email' : document.getElementById("email").value
        };

        console.log(contact);

        let products = []; /* Création du tableau de produits de la commande */
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
            localStorage.setItem("contact", JSON.stringify(rep.contact));
            localStorage.setItem("produits ", JSON.stringify(rep.products ));        
            window.location.assign("confirmation.html?orderId=" + rep.orderId);
        })

        .catch(function (err) {
            console.log("fetch Error");
          });

    }
    else {
        alert('Erreur')
    }
}