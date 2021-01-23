
import React from 'react';
import {capturarPokemon} from '../../Home'
import axios from 'axios';


function getImageURL(pokemonURL){

  axios.get(pokemonURL)
  .then(response => {
    console.log("response: "+response.data.sprites.front_default);
    const atributosDoPokemon = response.data;
    const id = atributosDoPokemon.id;

    // var imageUrl = atributosDoPokemon.sprites.front_default;
    // if (imageUrl == null) {
    //   imageUrl = atributosDoPokemon.sprites.other['official-artwork'].front_default;
    //   if (imageUrl == null) {
    //     imageUrl = 'https://cdn-0.imagensemoldes.com.br/wp-content/uploads/2020/04/Logo-Pokebola-Pok%C3%A9mon-PNG.png';
    //   }
    // }
    return response.data.sprites.front_default;
  })

  .catch(err => {
    console.log("Erro");
    console.log(err);
  })
  //console.log(imageUrl);
  //return "sem url"
}//fim de getImageURL

const PokemonList = ({pokemonList=[]}) => {
//let urlDaImagem = "";
  return (

    <>
    <div class = "resultadosDaBusca">
    { pokemonList.map((data,index) => {
        if (data) {
        //  let numero = pokemonList[index].url;

          // console.log("oii");
          // console.log(pokemonList[index]);
          //.substring(33,36)
          let classe = "nomesBusca "+ data.name;
          //console.log(data.url);

          //let urlDaImagem = getImageURL(data.url);
          //console.log("imageURL= " + urlDaImagem);
          //console.log("dataURL= " + data.url);
          //  <img src = {urlDaImagem}/>
          let urlTeste = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/760.png"
          let fimDaURL = urlTeste.substring(urlTeste.lastIndexOf('/') + 1);
          // console.log("url: "+urlDaImagem);
          let urlDaImagem = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/"+fimDaURL;
          console.log("url: "+urlDaImagem);
          // >console.log
      //     axios.get(data.url)
      //
      //
      //     .then(response => {
      //       //console.log("response: "+response.data.sprites.front_default);
      //       urlDaImagem = response.data.sprites.front_default;
      //       //console.log(urlDaImagem);
      //   //)
      // })
      // <img src = {urlDaImagem}/>

          return (
            <>

            <div class = {classe}>

              <span >{data.name} </span>
              <button class = "blue-button-small" onClick = {capturarPokemon}>Capturar</button>

              </div>

            </>

    	   )
    	 } //if  data
    	 return null
    }) }
    </div>
    </>
  );
}



export default PokemonList
