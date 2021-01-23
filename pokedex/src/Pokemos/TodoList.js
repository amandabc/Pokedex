import React, { Component } from "react";
import TodoItems from "./TodoItems";
import "./TodoList.css";


// página de manipulação de formulários
// onSubmit={this.addItem}: permite adicionar um item

class TodoList extends Component {
  constructor(props) {
    super(props);
    // no objeto state é definido uma matriz, que será responsável por armazenar os itens
    this.state = {
      items: this.props.items || [],
      myItems: this.props.myItems || []
    };

    // this.addItem = this.addItem.bind(this); // addItem(manipulador de eventos) é chamado quando o formulário é enviado
    this.deleteItem = this.deleteItem.bind(this);
  }
  
  //gera uma lista com os pokemons
  getApiPokemon() {

    let items = [];
    for (let i = 0; i < 4; i++) {
      items.push({
        key: "00" + i,
        text: "Poke1" + i
      })

    }

    return {
      "items": items
    }
  }

  componentDidMount() {
    // GET na api de pokemons
    // Ao receber o valor
    // envia o resultado no estado
    // let pokemons = this.getApiPokemon()
    // this.setState({ items: pokemons.items })
  }

  addItem(e) {
    console.log(this.state.items);
    e.preventDefault(); 
  }

  
  deleteItem(key) {
  //essa função está sendo usada para "capturar" o pokemon
  //falta pegar o pokemon capturado e colocar ele na parte dos meus pokemons
    var filteredItems = this.state.items.filter(function (item) {
      return (item.key !== key);
    });

    var item = this.state.items.find(function(item) {
      return item.key == key
    })
    //guarda os pokemons capturados 
    var myItems = this.state.myItems
    myItems.push(item)


    this.setState({
      items: filteredItems, 
      myItems: myItems
    });
  }

  
  render() {

    
    return (
      <div className="todoListMain">
        <div className="header">
          {/* <nav>
            <img src = "" alt = "Pokedex Logo" class = "logo"/>
            <ul>
              <li><a class = "item-navegacao" href = "#"> Todos PKMN </a></li>
              <li><a class = "item-navegacao"  href = "#"> Meus PKMN </a></li>
              <input class = "caixa-buscar" placeholder = "Buscar..."></input>
            </ul>
          </nav> */}

        </div>
        <h1>Todos os Pokemons</h1>
        <br/>
        <TodoItems entries={this.state.items}  delete={this.deleteItem} />
          <br/>
          <h1>Pokemons capturados</h1>
        <TodoItems entries={this.state.myItems}  delete={this.deleteItem} />

      </div>
    );
  }
}

export default TodoList;