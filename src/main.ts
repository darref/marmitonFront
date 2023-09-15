///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
let Title = document.createElement("h1")
Title.innerText = "Marmitop"
Title.style.textAlign = "center"
Title.style.fontSize = "80px"
document.body.append(Title)
//
let AddForm = document.createElement("div")
AddForm.style.width = "80%"
AddForm.style.border = "1px solid black"
AddForm.style.display = "flex"
AddForm.style.flexDirection = "center"
AddForm.style.margin = "5%"
AddForm.style.marginLeft = "auto"
AddForm.style.marginRight = "auto"
//
  let searchName = document.createElement("div")
    let textSearchName = document.createElement("p")
    textSearchName.innerText = "nom"
    let inputName = document.createElement("input")
    inputName.type = "text"
  searchName.append(textSearchName, inputName)
  searchName.style.margin = "3%"
    //
  let searchDuree = document.createElement("div")
    let textSearchDuree = document.createElement("p")  
    textSearchDuree.innerHTML = "Duree"
    let inputDuree= document.createElement("input")
    inputDuree.type = "text"
  searchDuree.append(textSearchDuree , inputDuree)
  searchDuree.style.margin = "3%"
    //
  let searchlinkPicture = document.createElement("div")
    let textlinkPicture = document.createElement("p")
    textlinkPicture.innerText = "Lien Image"
    let inputPicture= document.createElement("input")
    inputPicture.type = "text"
  searchlinkPicture.append(textlinkPicture , inputPicture)
  searchlinkPicture.style.margin = "3%"
    //
  let searchNote = document.createElement("div")
    let textSearchNote = document.createElement("p")
    textSearchNote.innerText ="Note"
    let inputNote= document.createElement("input")
    inputNote.type = "text"
  searchNote.append(textSearchNote , inputNote)
  searchNote.style.margin = "3%"
  //
  let ajouterButton = document.createElement("button")
    ajouterButton.innerText = "Ajouter"
  ajouterButton.style.margin = "3%"
  //
  let TitleMesRecettes = document.createElement("h2")
  TitleMesRecettes.style.fontSize = "50px"
  TitleMesRecettes.innerText = "Mes Recettes:"
  TitleMesRecettes.style.marginLeft = "10%"
  //
  AddForm.append(searchName,searchDuree,searchlinkPicture,searchNote,ajouterButton)
  //
  document.body.append(AddForm)
  document.body.append(TitleMesRecettes)
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
let recipesArrayInPage:Array<HTMLDivElement>

function createRecipe()
{
  let recipe = document.createElement("div")
  recipe.style.border = "1px solid black"
  //
  let recipeTitle = document.createElement("h2")
  recipeTitle.innerText = inputName.value
  //
  let recipeNote = document.createElement("h3")
  recipeNote.innerText = "Note : " + inputNote.value
  //
  let recipeDuree = document.createElement("p")
  recipeDuree.innerText = "Durée : " + inputDuree.value
  //
  let recipePicture = document.createElement("img")
  recipePicture.setAttribute("src" , inputPicture.value)
  //
  recipe.style.margin = "auto"
  recipe.style.width = "80%"
  recipe.style.height = "10%"
  //
  recipe.append(recipeTitle,recipeNote,recipeDuree,recipePicture)
  //
  return recipe
}
function loadRecipes(recipesArray:Array<{name:string , note:string , duree:string , linkPicture:string}>)
{
  //on vide la deuxieme partie de la page , celle de la liste de recettes
  recipesArrayInPage.forEach((e,i)=>{
    e.remove()
  })
  //on remplis la liste avec ce qui vient du serveur
  recipesArray.forEach((e,i)=>{
      let recipe = document.createElement("div")
      recipe.style.border = "1px solid black"
      //
      let recipeTitle = document.createElement("h2")
      recipeTitle.innerText = recipesArray[i].name
      //
      let recipeNote = document.createElement("h3")
      recipeNote.innerText = "Note : " + recipesArray[i].note
      //
      let recipeDuree = document.createElement("p")
      recipeDuree.innerText = "Durée : " + recipesArray[i].duree
      //
      let recipePicture = document.createElement("img")
      recipePicture.setAttribute("src" , recipesArray[i].linkPicture)
      //
      recipe.append(recipeTitle,recipeNote,recipeDuree,recipePicture)
      //
    })
}

function replaceAll(input: string, toReplace: string, by: string){
  return input
      .split('')
      .map( (letter: string) => {
          letter.replace(toReplace, by)
          return letter
      })
}

ajouterButton.addEventListener("click" , async () =>{
  let recipe:HTMLDivElement = createRecipe(); // on crée une recette
  //recipesArrayInPage.push(recipe)// on l'ajoute au tableau de recettes de la page
  //on l'ajoute a la BDD
  let urlimage:string = inputPicture.value;
  const response = await fetch(`http://localhost:3030/api/addNewRecipe/${inputName.value}/${inputNote.value}/${inputDuree.value}/"${replaceAll(urlimage , "/" , "%2F")}`,
  {method:"POST"})
  const status = await response.text();
  if (status === "ok")  //si la recette ab ien été ajoutée à la BDD
  {  
    document.body.append(recipe) //on l ajoute a la page
  }
  //on vide les input text de la page
  inputDuree.value = ""
  inputName.value = ""
  inputNote.value = ""
  inputPicture.value = ""
})