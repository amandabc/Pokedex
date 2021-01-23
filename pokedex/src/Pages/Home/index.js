import axios from 'axios';
import React, { useEffect, useState,  Component } from "react";
import SearchBar from './Components/SearchBar';
import PokemonList from './Components/PokemonList';
import TodoList from '../../Pokemos/TodoList';





let pokemonsCapturados = [];

function Home(props){



const mainDiv = document.getElementById("root");
const [input, setInput] = useState('');
const [pokemonListDefault, setPokemonListDefault] = useState();
const [pokemonList, setPokemonList] = useState();
//const [pokemons, setPokemons] = useState();

let pokemons = [];


  let paginaAtual = 1;
  const ITENS_POR_PAGINA = 20;


  function createPokemonCard(id, name, imageUrl, types) {
    // altera o estado adicionando +1 pokemon na lista
    pokemons.push({ key: id, title: name, text: name, imageUrl: imageUrl, types: types })
    //setPokemons(pokemons)
    // useState(0);
  }


  function getPokemon() {
    axios.get('https://pokeapi.co/api/v2/pokemon/?offset=0&limit=9999')
      .then(response => {
        //console.log(response);
        // setTimeout( function(){
        //   document.getElementById("loading").style.display = "none";
        // }, 1500);

        const pokemons = response.data.results;
        const paginatedData = paginateData(pokemons);
        renderPaginationMenu(paginatedData);

    let cardContainer = document.querySelector(".card-wrapper");

    while (cardContainer.firstChild) {
       cardContainer.removeChild(cardContainer.firstChild);
    }

//daqui
      renderPokemons(paginatedData[paginaAtual-1]);
        //ate aqui

        renderPaginationMenu(paginatedData);

      })//fim do primeiro then
      .catch(err => {
        console.log("Erro ao puxar os pokemons")
        console.log(err);
      });
  }//fim de getPokemon

  function renderPokemons(arrayPokemons){
    arrayPokemons.forEach(pokemon => {

      const { name, url } = pokemon;

      axios.get(url) //pega cada um
        .then(response => {
          setTimeout(function () { //mudar lugar
            document.getElementById("loading").style.display = "none";
          }, 1500);


          const atributosDoPokemon = response.data;
          const id = atributosDoPokemon.id;
          const types = atributosDoPokemon.types;

          var imageUrl = atributosDoPokemon.sprites.front_default;
          if (imageUrl == null) {
            imageUrl = atributosDoPokemon.sprites.other['official-artwork'].front_default;
            if (imageUrl == null) {
              imageUrl = 'https://cdn-0.imagensemoldes.com.br/wp-content/uploads/2020/04/Logo-Pokebola-Pok%C3%A9mon-PNG.png';
            }
          }

          // let cardContainer = document.createElement("div");
          // cardContainer.className ="card-container";
          let cardContainer = document.querySelector(".card-wrapper");

          mainDiv.appendChild(cardContainer);
          createCard(id, name, imageUrl, types, cardContainer);
          createPokemonCard(id, name, imageUrl, types)

        })//segundo .then
        .catch(err => {
          console.log("Erro ao pegar o pokemon + " + name);
          console.log(err);
        })


    }); //for each
  }

  const paginateData = (data) => {
    //receber o valor total e o atual para dividir o numero de paginas
    return data.reduce((total, current, index) => {
      const belongArrayIndex = Math.ceil((index + 1) / ITENS_POR_PAGINA) - 1
      total[belongArrayIndex] ? total[belongArrayIndex].push(current) : total.push([current])
      return total
    }, [])
  } //paginateData ok

  const changePage = (pageToBeRendered) => {
    paginaAtual = pageToBeRendered
    getPokemon()
  }//método de mudar de página

  const renderPaginationMenu = (paginatedData) => {

    const paginationContainer = document.querySelector('.pagination');



    while (paginationContainer.firstChild) {
      paginationContainer.removeChild(paginationContainer.firstChild);
    }
    //esvaziamos essa div a cada render para que não seja rendedrizado o menu com os dados da página antiga do usuário

    const previousPage = document.createElement('span');
    previousPage.className = 'page-changer';
    previousPage.innerHTML = '<';
    previousPage.addEventListener('click', () => paginaAtual <= 1 ? () => { } : changePage(paginaAtual - 1));
    paginationContainer.appendChild(previousPage);
    //geramos um botão que ao ser clicado atualiza chama o método de mudar de página passando a página anterior se a página
    //atual não for 1

    paginatedData.forEach((_, index) => {
      //para cada array (página) dentro do nosso array total criaremos um botão numerado para ir para aquela página
      const pageButton = document.createElement('span');
      pageButton.innerHTML = (index + 1) + " "//index + 1 porque os indices começam em 0 e queremos mostrar a primeira página como 1

      pageButton.addEventListener('click', () => changePage(index + 1));

      if (paginaAtual === index + 1) {
        pageButton.className = 'active';
      }

      paginationContainer.appendChild(pageButton);
    })

    const nextPage = document.createElement('span');
    nextPage.className = 'page-changer';
    nextPage.innerHTML = '>';
    nextPage.addEventListener('click', () => paginaAtual >= paginatedData.length ? () => { } : changePage(paginaAtual + 1));

    paginationContainer.appendChild(nextPage);

    //por fim, método de avançãr a página que funciona igual o de voltar a página só que ao contrário :)
  }// fim de renderPaginationMenu

function createCard(id, name, imageUrl, types, cardContainer){
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
    card.appendChild(buttonCapturar);
  } //fim de createCard

function capturarPokemon(e){
  let name = e.path[1].id;

  if (!pokemonsCapturados.includes(name)){
    let urlP = "https://pokeapi.co/api/v2/pokemon/"+name;
    pokemonsCapturados.push({name: name, url: urlP} );
    localStorage.setItem('Pokemons Capturados', pokemonsCapturados);
    console.log("Capturou "+ name);
  }
  else{
    console.log("Pokémon "+ name+" já capturado");
  }

}


getPokemon();

  //getAllPokemonNames();

  useEffect(() => { getPokemon() }, []);


  //barra de pesquisa

  const fetchData = async () => {
    return await fetch('https://pokeapi.co/api/v2/pokemon?offset=0&limit=1118')
      .then(response => response.json())
      .then(data => {
         setPokemonList(data.results)
         setPokemonListDefault(data.results)
       });}


  const updateInput = async (input) => {
     const filtered = pokemonListDefault.filter(pokemon => {
      return pokemon.name.toLowerCase().includes(input.toLowerCase())
     })
     setInput(input);
     setPokemonList(filtered);

  }




  useEffect(() => { fetchData() }, []);




  return (


    <>


<nav>
<img src = "./images/logo.png" alt = "Pokedex Logo" class = "logo"/>
<ul>
  <li><a class = "item-navegacao" href = "/"> Todos PKMN </a></li>
  <li><a class = "item-navegacao"  href = "/meuspokemons"> Meus PKMN </a></li>
  <SearchBar
       input={input}
       onChange={updateInput}
       pokemonList={pokemonList}
      />
       <PokemonList pokemonList={pokemonList}/>



        </ul>
      </nav>


      <div id="loading">
        <img id="loading-image" src="images/pikachu-dancing.gif" alt="Carregando..." />
        <p id="pagina-carregando">Página Carregando</p>
      </div>

      <div class="card-wrapper">
        <TodoList items={pokemons} />
      </div>
      <div class="pagination-wrapper">
        <div class="pagination"></div>
      </div>


    </>


  );

}

export default Home;
