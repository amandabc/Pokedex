
import React, { useState, useEffect } from 'react';
import SearchBar from './SearchBar';
import PokemonList from './PokemonList';

function SearchPage(props) {
  const [input, setInput] = useState('');
  const [pokemonListDefault, setPokemonListDefault] = useState();
  const [pokemonList, setPokemonList] = useState();

  const fetchData = async () => {
    return await fetch('https://pokeapi.co/api/v2/pokemon?offset=0&limit=1118')
      .then(response => response.json())
      .then(data => {
         setPokemonList(data.results)
         console.log(data.results)
         setPokemonListDefault(data.results)
       });}


  const updateInput = async (input) => {
     const filtered = pokemonListDefault.filter(pokemon => {
      return pokemon.name.toLowerCase().includes(input.toLowerCase())
     })
     setInput(input);
     setPokemonList(filtered);
  }

  useEffect( () => {fetchData()},[]);

  return (
    <>
      <h1>Pokemon List</h1>
      <SearchBar
       input={input}
       onChange={updateInput}
      />
      <PokemonList pokemonList={pokemonList}/>
    </>
   );
}

export default SearchPage
