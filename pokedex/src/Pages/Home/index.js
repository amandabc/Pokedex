import axios from 'axios';

function Home(props){

const mainDiv = document.getElementById("root");

function getPokemon(){

  axios.get('https://pokeapi.co/api/v2/pokemon/')
  .then(response =>{
    const pokemons = response.data.results;
    console.log(pokemons);


    pokemons.forEach(pokemon =>{

    const { name, url } = pokemon;

    axios.get(url)
    .then(response =>{

      const atributosDoPokemon = response.data;
      const id = atributosDoPokemon.id;
      const imageUrl = atributosDoPokemon.sprites.front_default;
      const types = atributosDoPokemon.types;
      console.log(types[0].type.name);

      createCard(id,name, imageUrl, types);

    })//segundo .then
    .catch(err =>{
      //console.log("Erro ao pegar o pokemon + "+ name);
      console.log(err);
    })


    }); //for each


  })
  .catch(err => {
      console.log("Erro ao puxar os pokemons")
      console.log(err);
    });
}

function createCard(id, name, imageUrl, types){
  //agora crio uma card com cada informação
  let card = document.createElement("div");
  card.className = "card";

  let cardImg = document.createElement("img");
  cardImg.className = "card-img";
  cardImg.src = imageUrl;

  let cardName = document.createElement("div");
  cardName.className = "card-name";
  cardName.innerHTML = name;

  let cardId = document.createElement("div");
  cardId.className = "card-id";
  cardId.innerHTML = id;

  let typeNames = "";
  types.forEach(element => typeNames += " " +element.type.name);

  let cardType = document.createElement("div");
  card.className = "types";
  cardType.innerHTML = typeNames;


  mainDiv.appendChild(card);
  card.appendChild(cardImg);
  card.appendChild(cardName);
  card.appendChild(cardId);
  card.appendChild(cardType);
}

getPokemon();

return(


<div id = "container">
Ois galere
</div>


);
}

export default Home;
