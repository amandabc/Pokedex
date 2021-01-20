import axios from 'axios';

function Home(props){

const mainDiv = document.getElementById("root");

function getPokemon(){

  axios.get('https://pokeapi.co/api/v2/pokemon/')
  .then(response =>{
    const pokemons = response.data.results;
    console.log(pokemons)


    pokemons.forEach(pokemon =>{

    const { name, url } = pokemon;

    axios.get(url)
    .then(response =>{
      console.log(response)
      const atributosDoPokemon = response.data;
      const imageUrl = atributosDoPokemon.sprites.front_default;
      createCard(imageUrl)



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

function createCard(imageUrl){
  //agora crio uma card com cada informação
  let card = document.createElement("div");
  card.className = "card";

  let cardImg = document.createElement("img");
  cardImg.className = "card-img";
  cardImg.src = imageUrl;

  mainDiv.appendChild(card);
  card.appendChild(cardImg);
}

getPokemon();

return(


<div id = "container">
Ois galere
</div>


);
}

export default Home;
