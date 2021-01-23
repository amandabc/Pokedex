import React, { useEffect, useState } from 'react';
import Home from "../Home"

export default function MeusPokemons(){
  const [ pokemonsCapturados, setPokemonsCapturados] = useState([]);

  useEffect(()=>{
    let pokemons = localStorage.getItem('Pokemons Capturados');
    console.log(pokemons);

  }, []);


return(

<>
</>



)
}
