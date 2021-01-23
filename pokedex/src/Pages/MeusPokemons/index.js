
import React, { useEffect, useState } from 'react';
import Home from '../Home'
import SearchBar from '../Home/Components/SearchBar'


export default function MeusPokemons(){
 let pokemonsCapturados = []

   useEffect(()=>{
    pokemonsCapturados = localStorage.getItem('Pokemons Capturados');
  }, []);

  pokemonsCapturados.forEach(pokemon => console.log(pokemon.name))
  
  

 /*  function createCard(id, name, imageUrl, types, cardContainer){
    //agora crio uma card com cada informação

    let card = document.createElement("div");
    card.className = "card";
    card.id = name;

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
    cardId.innerHTML = "#" + id;


  let buttonCapturar = document.createElement("button");
  buttonCapturar.className = "blue-button";
  buttonCapturar.innerHTML =  "Capturar";
  buttonCapturar.name = name;
  buttonCapturar.addEventListener('click', capturarPokemon);



    let typeNames = "";
    types.forEach(element => typeNames += " " + element.type.name);

    let cardType = document.createElement("div");
    cardType.className = "types";
    cardType.innerHTML = typeNames;


  cardContainer.appendChild(card);
  card.appendChild(cardInnerArea);
  cardInnerArea.appendChild(cardImg);
  cardInnerArea.appendChild(cardTextInfo);
  cardTextInfo.appendChild(cardId);
  cardTextInfo.appendChild(cardName);
  cardTextInfo.appendChild(cardType);
/*     card.appendChild(buttonCapturar);
  } //fim de createCard */

/*function capturarPokemon(e){
  let name = e.path[1].id;

  if (!pokemonsCapturados.includes(name)){
    pokemonsCapturados.push(name);
    localStorage.setItem('Pokemons Capturados', pokemonsCapturados);
    console.log("Capturou "+ name);
  }
  else{
    console.log("Pokémon "+ name+" já capturado");
  }
 */




 return (


  <>




<nav>
<img src = "./images/logo.png" alt = "Pokedex Logo" class = "logo"/>
<ul>
<li><a class = "item-navegacao" href = "/"> Todos PKMN </a></li>
<li><a class = "item-navegacao"  href = "/meuspokemons"> Meus PKMN </a></li>
{/*  <SearchBar
     input={input}
     onChange={updateInput}
     pokemonList={pokemonList}
    />
     <PokemonList pokemonList={pokemonList}/>
 */}


      </ul>
    </nav>


    <div id="loading">
      <img id="loading-image" src="images/pikachu-dancing.gif" alt="Carregando..." />
      <p id="pagina-carregando">Página Carregando</p>
    </div>

    <div class="card-wrapper">
     
    </div>
    <div class="pagination-wrapper">
      <div class="pagination"></div>
    </div>


  </>


);

}





