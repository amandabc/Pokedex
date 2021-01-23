
import React, { useEffect, useState } from 'react';
import {renderArray} from '../Home'
import SearchBar from '../Home/Components/SearchBar'
import {useHistory} from 'react-router-dom';


export default function MeusPokemons(){
  const history = useHistory();
  const [ pokemonsList, setPokemonsList ] = useState([]);
 let pokemonsCapturados = []

 useEffect(() => {
  let pokemonsList = localStorage.getItem('pokemonsCapturados');
  if (pokemonsList != null) {
  pokemonsList = JSON.parse(pokemonsList);
  setPokemonsList(pokemonsList)
  console.log(pokemonsList)

  renderArray(pokemonsList);


  } else {
      history.push('')
  }
}, []);









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
