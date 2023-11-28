
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

// function getCategoriesFromWorks(works) {
//         let categories = [];
//         for(let i = 0; i < works.length; i++) {
//                 const work = works[i];
//                 console.log(work)
//                 categories.push(JSON.stringify(work.category));
//         }
        
//         return [...new Set(categories)].map(category => JSON.parse(category))
// }

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
}
main();

// Stocker le token d'authentification
const token = sessionStorage.getItem("token");


