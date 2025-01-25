
// va chercher les categories 
let resCat = await fetch("http://localhost:5678/api/categories");
// les transformes en json
const categories = await resCat.json();

function getCategories(){ 
   //creation du bouton 'tous'
   let btnTous=document.createElement('button')
   btnTous.setAttribute('class', 'btnTous')
   btnTous.innerText='Tous';
   btnTous.dataset.id=0;

   btnTous.addEventListener('click', function(){
    document.querySelector('.gallery').innerHTML='';
    getWorks(projets)
   })

   //cree une div qui va contenir le bouton 'Tous'
   let fltrAll=document.createElement('div');
   //donne à ce div une class
   fltrAll.setAttribute('class', 'fltrAll');
    // va dans porfolio recupère la div 'filtre'
   let filtre=document.querySelector('#portfolio .filtre')
   //stoque le container du bouton 'Tous' dans la div 'filtre'
   filtre.append(fltrAll)
   //stoque le bouton 'tous' dans 'fltrAll'
   fltrAll.append(btnTous)

   //creation de la div 'fltrSpecifk' qui va contenir les elts de la categorie
   let fltrSpecifk=document.createElement('div');
   fltrSpecifk.setAttribute('class', 'fltrSpecifk');

   for (let ca of categories) {
       //creation du button pour chaque elt de filtres
       let btnfltr=document.createElement('button');
       btnfltr.setAttribute('class', 'btnFGal')

       //le texte à afficher pour chaque bouton
       btnfltr.textContent = ca.name;
       btnfltr.dataset.id=ca.id


    btnfltr.addEventListener('click', function () {
    const categoryId = parseInt(btnfltr.dataset.id); // Récupère l'ID de la catégorie
    const filtreProjetsId = projets.filter(function (projet) {
            return projet.categoryId === categoryId; // Filtre les projets par catégorie
    });
        getWorks(filtreProjetsId); // Met à jour la galerie avec les projets filtrés
});

       //affectation des tous les boutons à la div container
       fltrSpecifk.appendChild(btnfltr)

       //affectation de la div container à la div filtre
       filtre.append(fltrSpecifk);

   }

   console.log(fltrSpecifk)
   console.log(categories);

}


//recuperation de categories

// va chercher les projets 
let resProjets = await fetch("http://localhost:5678/api/works");
// les transforme en json
const projets = await resProjets.json();
// va chercher la div "gallery" dans le DOM
console.log(projets);

export function getWorks(p_pro){
    document.querySelector('.gallery').innerHTML='';
    const rootGal = document.querySelector(".gallery")
    for (let pro of p_pro) {
        // pour chaque projet
        // créer une balise figure, figcaption, img
        let figure= document.createElement('figure');
        let title=document.createElement('figcaption');
        let image=document.createElement('img')    
        // Donne a chacun ce qu'il doit afficher partant de donnees Backend
        image.src=pro.imageUrl;
        title.textContent=pro.title;
        
        //afficher les donnees au DOM
        figure.appendChild(image);
        figure.appendChild(title);
        rootGal.appendChild(figure);

    }
}
getCategories()
getWorks(projets)

//filtrage de bouton objets
/*const boutonObjt=document.querySelector('.fltrSpecifk .Objets')
boutonObjt.addEventListener('click', function(){
    const filtreProjetsId=projets.filter(function(projet){
    return projet.categoryId==1;
    })
    getWorks(filtreProjetsId)
    console.log(filtreProjetsId)

})*/




