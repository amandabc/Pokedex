
import React from 'react';
import PokemonList from './PokemonList'

const SearchBar = ({input:keyword, onChange:setKeyword}) => {

  return (
    <>
    <input
     class="caixa-buscar"
     key="random1"
     value={keyword}
     placeholder={"Buscar pokemon"}
     onChange={(e) => {
       document.querySelector(".resultadosDaBusca").style.display = "block";
       setKeyword(e.target.value)}}
    />

    </>
  );
}

export default SearchBar
