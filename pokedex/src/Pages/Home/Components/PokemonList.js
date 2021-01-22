
import React from 'react';



const PokemonList = ({pokemonList=[]}) => {
  return (
    <>
    { pokemonList.map((data,index) => {
        if (data) {
          

          return (
            <div key={data.id}>
              <h1>{data.name}</h1>
            </div>
            
	  
    	   )	
    	 }
    	 return null
    }) }
    </>
  );
}

export default PokemonList