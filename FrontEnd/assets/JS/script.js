function afficherWorks(works) {
        const gallery = document.querySelector(".gallery");
        gallery.innerHTML = "";
        // Récupération de l'élément du DOM qui accueillera la galerie //
        for (let i = 0; i < works.length; i++) {
                const work = works[i];

                // Création d'une balise dédiée à un travail //
                const workElement = document.createElement("figure");

                // Création des balises //
                const imageElement = document.createElement("img");
                // Mettre à jour l'image afichée dans l'élément HTML //
                imageElement.src = work.imageUrl;
                const figcaption = document.createElement("figcaption");
                figcaption.innerText = work.title;

                // On rattache la balise workElement à la div gallery //
                gallery.appendChild(workElement);

                // Ajout des éléments au DOM //   
                workElement.appendChild(imageElement);
                workElement.appendChild(figcaption);
        }
}



function afficherCategories(categories, works) {
        // Récupération de l'élément du DOM qui accueillera les catégories //
        const filtres = document.querySelector(".filtres");

        // Création du bouton "Tous" pour afficher tous les travaux //
        const toutesLesCategories = document.createElement("button");
        toutesLesCategories.classList.add("btn-filtre");
        toutesLesCategories.innerHTML = "Tous";
        filtres.appendChild(toutesLesCategories);

        // Ajout gestionnaire d'événements pour le bouton "Tous" //
        toutesLesCategories.addEventListener("click", function () {
                afficherWorks(works); // Afficher tous les travaux //
        });

        for (let i = 0; i < categories.length; i++) {
                const categorie = categories[i];

                // Création d'une balise dédiée à un bouton filtre de la galerie //
                const categoryElement = document.createElement("button");
                categoryElement.classList.add("btn-filtre");
                // Récupération de la propriété name dans la catégorie du tableau //
                categoryElement.innerHTML = categorie.name;

                // Ajout gestionnaire d'événement pour chaque catégorie //
                categoryElement.addEventListener("click", function () {
                        const categoryName = categorie.name;
                        const travauxFiltres = works.filter(function (work) {
                                return work.category.name === categoryName;
                        });

                        // Afficher les travaux filtrés //
                        afficherWorks(travauxFiltres);
                });

                // categoryElement et l'enfant de filtres //
                filtres.appendChild(categoryElement);

        }
}

// Récupérer le token d'authentification
const token = sessionStorage.getItem("token");

// fonction fléchée pour se déconnecter et retourner à la page d'accueil
const logout = (event) => {
        event.preventDefault();
        sessionStorage.clear("token"); // supprime la clé de l'utilisateur
        window.location.href = "./index.html" // redirige vers la page d'accueil
}

const modalClassname = ".modale";

function hideModal() {
        const modal = document.querySelector(modalClassname);
        modal.style.display = "none";
}

function showModal() {
        const modal = document.querySelector(modalClassname);
        modal.style.display = "block";
        switchModalMode("list");
}

function switchModalMode(mode) {
        const modal = document.querySelector(modalClassname);
        const listContainer = modal.querySelector(".list");
        const createContainer = modal.querySelector(".create");
        const back = document.querySelector(".back");
        if (mode === "list") {
                // on affiche le mode list
                back.style.display = "none";
                listContainer.style.display = "block"
                createContainer.style.display = "none"
        } else if (mode === "create") {
                // on affiche le mode create
                back.style.display = "block";
                createContainer.style.display = "block"
                listContainer.style.display = "none"
        }
}

function generateModalList() {
        const modal = document.querySelector(modalClassname);
        const addPictureBtn = modal.querySelector(".list .add-picture");
        // Afficher la liste des travaux

        // Pour chaque travaux on génère le dom (image + bouton avec icon poubelle)

        // on attache un évènement click sur le bouton pour appeler la route de suppression (delete)

        // Ajouter l'évènement click pour switcher au mode create
        addPictureBtn.addEventListener("click", () => {
                switchModalMode("create")
        })
}

function generateModalCreate() {
        const modal = document.querySelector(modalClassname);
        const backBtn = modal.querySelector(".back");
        // Ajouter l'évènement retour pour la flèche retour
        backBtn.addEventListener("click", () => {
                switchModalMode("list")
        })
        // Ajouter l'évènement submit pour le formulaire

        // retour au mode list
}

function generateModal() {
        const modal = document.querySelector(modalClassname);
        const closeBtn = modal.querySelector(".close-modale")
        // Ajouter l'évènement fermer sur la croix
        closeBtn.addEventListener("click", hideModal);
        // on genere le dom et les event pour la partie liste
        generateModalList()
        // on genere le dom et les event pour la partie create
        generateModalCreate()
}

/****** Partie Mode édition ******/

// Fonction admin
function admin() {
        // Éléments HTML nécessaires
        const banniere = document.querySelector(".mode-edition");
        const btnModifier = document.querySelector(".modifier");
        const loginBtn = document.querySelector("#loginBtn");
        const filtres = document.querySelector(".filtres");


        // au chargement de la page la modale n'est pas visible;
        hideModal();

        // Si un token est présent (utilisateur connecté)
        if (token) {
                loginBtn.textContent = "logout"; // met le bouton login en logout 
                loginBtn.addEventListener("click", logout);
                filtres.style.display = "none";
                btnModifier.addEventListener("click", showModal)
                // On génère la modale
                generateModal()
        } else {
                btnModifier.style.display = "none";
                banniere.style.display = "none";
        }
}

async function main() {
        // Récupération des travaux depuis l' API //
        const reponse = await fetch("http://localhost:5678/api/works");
        const works = await reponse.json();
        console.log(works);

        // Récupération des catégories depuis l'API //
        const reponse2 = await fetch("http://localhost:5678/api/categories");
        const categories = await reponse2.json();
        // const categories = getCategoriesFromWorks(works);
        console.log(categories);

        afficherWorks(works);

        afficherCategories(categories, works);

        admin();
}

main();