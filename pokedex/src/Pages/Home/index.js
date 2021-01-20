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

  let cardInnerArea = document.createElement("div");
  cardInnerArea.className = "card-inner-area";

  let cardImg = document.createElement("img");
  cardImg.className = "card-img";
  cardImg.src = imageUrl;

  let cardTextInfo = document.createElement("div");
  cardTextInfo.className = "card-text-info";

  let cardName = document.createElement("div");
  cardName.className = "card-name";
  cardName.innerHTML = name;

  let cardId = document.createElement("div");
  cardId.className = "card-id";
  cardId.innerHTML = "#"+id;

  let typeNames = "";
  types.forEach(element => typeNames += " " +element.type.name);

  let cardType = document.createElement("div");
  cardType.className = "types";
  cardType.innerHTML = typeNames;

  let buttonCapturar = document.createElement("button");
  buttonCapturar.className = "blue-button";
  buttonCapturar.innerHTML =  "Capturar";


  mainDiv.appendChild(card);
  card.appendChild(cardInnerArea);
  cardInnerArea.appendChild(cardImg);
  cardInnerArea.appendChild(cardTextInfo);
  cardTextInfo.appendChild(cardId);
  cardTextInfo.appendChild(cardName);
  cardTextInfo.appendChild(cardType);
  card.appendChild(buttonCapturar);
}

getPokemon();

return(


<>

<nav>
<img src = "./images/logo.png" alt = "Pokedex Logo" class = "logo"/>
<ul>
  <li><a class = "item-navegacao" href = "#"> Todos PKMN </a></li>
  <li><a class = "item-navegacao"  href = "#"> Meus PKMN </a></li>
  <li><input placeholder = "Buscar"></input></li>

</ul>
</nav>

</>


);
}

export default Home;
