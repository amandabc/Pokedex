import React, { Component } from "react";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
// itens clicados são definidos aqui
// import CardGroup from 'react-bootstrap/CardGroup'; não está sendo utilizao


class TodoItems extends Component {
    constructor(props) {
        super(props);
     
        this.createTasks = this.createTasks.bind(this); //criando tarefas
    }
     
    createTasks(item) {
        return <Card key={item.key} style={{ width: '18rem' }} className="p-3" >
        <Card.Img variant="top" src={item.imageUrl} />
        <Card.Body>
          <Card.Title>{item.key}</Card.Title>
          <Card.Text>
            {item.text}
          </Card.Text>
          <Button variant="primary" onClick = {() => this.delete (item.key)} key={item.key}>Capturar</Button>
        </Card.Body>
      </Card>

        // return <li onClick = {() => this.delete (item.key)} key={item.key}>
        //     {item.text}
        //     <button type="submit">Capturar</button>
        //     </li>
    }

    delete(key) {
        this.props.delete(key);
    }
 
    render() {
        var todoEntries = this.props.entries;
        var listItems = todoEntries.map(this.createTasks);
    
    //retorna os itens para mostrar na tela
    return (
    <div>
        {listItems}
    </div>
             
    );
  }
};
 
export default TodoItems;