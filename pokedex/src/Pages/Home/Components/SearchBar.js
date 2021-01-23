
import React from 'react';


const SearchBar = ({input:keyword, onChange:setKeyword}) => {

  return (
    <>
    <input
     class="caixa-buscar"
     key="random1"
     value={keyword}
     placeholder="Buscar pokémon"
     onChange={(e) => {
       document.querySelector(".resultadosDaBusca").style.display = "block";
       setKeyword(e.target.value)}}
    />

    </>
  );
}

export default SearchBar
