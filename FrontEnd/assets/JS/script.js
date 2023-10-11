// Récupération des travaux depuis l' API //
const reponse = await fetch("http://localhost:5678/api/works");
const works = await reponse.json();
console.log(works);

function afficherWorks(works) {
        for (let i = 0; i < works.length; i++) {
                const work = works[i];

                // Récupération de l'élément du DOM qui accueillera la galerie //
                const gallery = document.querySelector(".gallery");

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

afficherWorks(works);

// Récupération des catégories depuis l'API //
const reponse2 = await fetch("http://localhost:5678/api/categories");
const categories = await reponse2.json();
console.log(categories);

function afficherCategories(categories) {
        for (let i = 0; i < categories.length; i++) {
                const categorie = categories[i];

                // Récupération de l'élément du DOM qui accueillera les catégories //
                const filtres = document.querySelector(".filtres");
                // Création d'une balise dédiée à un bouton filtre de la galerie //
                const categoryElement = document.createElement("button");
                categoryElement.classList.add("btn-filtre");
                // Récupération de la propriété name dans la catégorie du tableau //
                categoryElement.innerHTML = categories[i].name

                // Créations des balises //
                const filtre = document.createElement("div");
                filtre.className = "filtre";
                filtres.appendChild(categoryElement);

                categoryElement.addEventListener("click", function () {
                        const categoriesFiltrees = works.filter(function (work) {
                                return work.category.name;
                        })
                        console.log(categoriesFiltrees);
                        // Effacer les filtres précédents //
                        document.querySelector(".filtres").innerHTML = "";
                        // Afficher les catégories filtrées //
                        afficherCategories(categoriesFiltrees)
                })
        }
}

afficherCategories(categories);

