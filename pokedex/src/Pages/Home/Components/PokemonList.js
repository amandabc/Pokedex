
import React from 'react';
import {capturarPokemon} from '../../Home'



const PokemonList = ({pokemonList=[]}) => {
  return (
    <>
    <div class = "resultadosDaBusca">
    { pokemonList.map((data,index) => {
        if (data) {
          let numero = pokemonList[index].url;
          console.log("oii");
          console.log(numero);
          //.substring(33,36)
          let classe = "nomesBusca "+ data.name;
          console.log(index);
          let imagem = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/"+(index+1)+".png";

          return (
            <>

            <div class = {classe}>
              <img src = {imagem}/> 
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
