import axios from 'axios';

function Home(props){

const mainDiv = document.getElementById("root");

let paginaAtual = 1;
const ITENS_POR_PAGINA = 20;

function getPokemon(){

  axios.get('https://pokeapi.co/api/v2/pokemon/?offset=0&limit=9999')
  .then(response =>{
    const pokemons = response.data.results;

    const paginatedData = paginateData(pokemons)

    renderPaginationMenu(paginatedData);

    console.log(paginatedData);
    mainDiv = document.querySelector(".card");

    //while (mainDiv.firstChild) {
    //    mainDiv.removeChild(mainDiv.firstChild)
    //}

    paginatedData[paginaAtual - 1].forEach(pokemon =>{

      const { name, url } = pokemon;

      axios.get(url)
      .then(response =>{

        const atributosDoPokemon = response.data;
        const id = atributosDoPokemon.id;
        const imageUrl = atributosDoPokemon.sprites.front_default;
        const types = atributosDoPokemon.types;

        createCard(id,name, imageUrl, types);

      })//segundo .then
      .catch(err =>{
        //console.log("Erro ao pegar o pokemon + "+ name);
        console.log(err);
      })


      }); //for each


  })
  .catch(err => {
      console.log("Erro ao puxar os pokemons")
      console.log(err);
    });
}

const paginateData = (data) => {
  //receber o valor total e o atual para dividir o numero de paginas
  return data.reduce((total,current, index) => {
      const belongArrayIndex = Math.ceil((index + 1 )/ ITENS_POR_PAGINA) -1
      total[belongArrayIndex] ? total[belongArrayIndex].push(current) : total.push([current])
      return total
  }, [])
}

const changePage = (pageToBeRendered) => {
  paginaAtual = pageToBeRendered
  getPokemon()
}
//método de mudar de página

const renderPaginationMenu = (paginatedData) => {

  const paginationContainer = document.querySelector('.pagination')
  //colocamos nossa div container dos cards em uma variável

  while (paginationContainer.firstChild) {
      paginationContainer.removeChild(paginationContainer.firstChild)
  }
  //esvaziamos essa div a cada render para que não seja rendedrizado o menu com os dados da página antiga do usuário

  const previousPage = document.createElement('span')
  previousPage.className = 'page-changer'
  previousPage.innerHTML = '<'
  previousPage.addEventListener('click', () => paginaAtual <= 1 ? () => { } : changePage(paginaAtual - 1))
  paginationContainer.appendChild(previousPage)
  //geramos um botão que ao ser clicado atualiza chama o método de mudar de página passando a página anterior se a página
  //atual não for 1

  paginatedData.forEach((_, index) => {
      //para cada array (página) dentro do nosso array total criaremos um botão numerado para ir para aquela página
      const pageButton = document.createElement('span')
      pageButton.innerHTML = index + 1 //index + 1 porque os indices começam em 0 e queremos mostrar a primeira página como 1

      pageButton.addEventListener('click', () => changePage(index + 1))

      if (paginaAtual === index + 1) {
          pageButton.className = 'active'
      }

      paginationContainer.appendChild(pageButton)
  })

  const nextPage = document.createElement('span')
  nextPage.className = 'page-changer'
  nextPage.innerHTML = '>'
  nextPage.addEventListener('click', () => paginaAtual >= paginatedData.length ? () => { } : changePage(paginaAtual + 1))

  paginationContainer.appendChild(nextPage)

  //por fim, método de avançãr a página que funciona igual o de voltar a página só que ao contrário :)
}


function createCard(id, name, imageUrl, types){
  //agora crio uma card com cada informação
  let card = document.createElement("div");
  card.className = "card";

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
  cardId.innerHTML = id;

  let typeNames = "";
  types.forEach(element => typeNames += " " +element.type.name);

  let cardType = document.createElement("div");
  cardType.className = "types";
  cardType.innerHTML = typeNames;



  mainDiv.appendChild(card);
  card.appendChild(cardImg);
  card.appendChild(cardTextInfo);
  cardTextInfo.appendChild(cardName);
  cardTextInfo.appendChild(cardId);
  cardTextInfo.appendChild(cardType);

}

getPokemon();

return(


<>
</>


);
}


export default Home;
