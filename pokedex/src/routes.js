import React from 'react';
import {Switch, Route, BrowserRouter} from 'react-router-dom';
import Home from './Pages/Home';
import MeusPokemons from './Pages/MeusPokemons';



export default function Routes(){
  return(
    <BrowserRouter>
    <Switch>
    <Route path = '/' exact component = {Home} />
    <Route path = '/meuspokemons' exact component = {MeusPokemons} />


    </Switch>
    </BrowserRouter>
  )
}
