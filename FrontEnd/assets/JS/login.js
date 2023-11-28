async function authentification() {
    // Récupérer les valeurs d'entrée
    const emailInput = document.getElementById("email");
    const passwordInput = document.getElementById("password");
    const email = emailInput.value;
    const password = passwordInput.value;
    console.log(email, password);
    const reponse = await fetch("http://localhost:5678/api/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            email: email,
            password: password
        })
    });
    const resultat = await reponse.json();

    // Si la propriété "token" de "resultat" n'est pas "undefined"
    if (resultat.token !== undefined) {
        // Stocker le token dans le localStorage
        sessionStorage.setItem("token", resultat.token);
        // Rediriger vers page d'accueil
        location.href = "index.html";


    } else {
        // Si la propriété "token" de "résultat" est "undefined"
        alert("Les identifiants sont incorrects")
    }
}

const submitBtn = document.querySelector("form");
// Ajout gestionnaire d'événements attaché à l'événement "submit" et recharger la page par défaut 
submitBtn.addEventListener("submit", (event) => {
    event.preventDefault();
    // Appel de la fonction 
    authentification()
});


