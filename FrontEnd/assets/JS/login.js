// Pour se connecter et récupérer le userId et le token d'authentification
const url = "http://localhost:5678/api/users/login";
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");

// Pour accéder aux valeurs d'entrée
const email = emailInput.value;
const password = passwordInput.value;
fetch(url, {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({
        email: email,
        password: password
    })
});