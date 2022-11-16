const idKanap = new URLSearchParams.get("id")

fetch("http://localhost:3000/api/products + idKanap")
    .then((response) => response.json())

    .catch(function(error){
      alert("Toutes nos excuses, le canapé n'est pas disponible")
    });