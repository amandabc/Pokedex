
import React from 'react';
import {capturarPokemon} from '../../Home'



const PokemonList = ({pokemonList=[]}) => {
  return (
    <>
    <div class = "resultadosDaBusca">
    { pokemonList.map((data,index) => {
        if (data) {

          let classe = "nomesBusca "+ data.name;
          return (
            <>
            <div class = {classe}>
              <span >{data.name} </span>
              <button class = "blue-button-small" onClick = {capturarPokemon}>Capturar</button>

              </div>

            </>

    	   )
    	 }
    	 return null
    }) }
    </div>
    </>
  );
}

// function capturarPokemon(){
//   console.log("Entrei");
// }

export default PokemonList
