import React, { Component } from 'react';
import Home from './component/Home';
import Header from './component/Header';
import Main from './component/Main';
import data from './data.json';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.heroSelected = this.heroSelected.bind(this);
    this.getQuestion = this.getQuestion.bind(this);
    this.attack = this.attack.bind(this);
    this.state = {heroes: data.heroes};
  }

  heroSelected(hero_id, player){
    if(player === 'player_1')this.setState({'player_1': {hero_id: hero_id, life: this.state.heroes[hero_id].max_life}});
    if(player === 'player_2')this.setState({'player_2': {hero_id: hero_id, life: this.state.heroes[hero_id].max_life}});
  }
  
  getQuestion(){
    //let link = 'https://opentdb.com/api.php?amount=1&type=multiple';
    let link = 'http://localhost:3100/'
    return fetch(link)
    .then((response) => {
      return response.json();
    }).catch((error) => {
      console.log(error);
    })
  }

  attack(player){
    if(player === 'player_1'){
      this.setState({
        player_1: {
          hero_id: this.state.player_1.hero_id,
          life: this.state.player_1.life - 5
        }
      }); 
    }
    if(player === 'player_2'){
      this.setState({
        player_2: {
          hero_id: this.state.player_2.hero_id,
          life: this.state.player_2.life - 5
        }
      }); 
    }
  }

  render() {
    let template = null;
    if (this.state.player_1 !== undefined && this.state.player_2 !== undefined){
      template = 
        <div>
          <Header state={this.state} />
          <main>
            <Main attack={this.attack} getQuestion={this.getQuestion}/>
            <Main attack={this.attack} getQuestion={this.getQuestion}/>
          </main>
        </div>;
    } else {
      let player = (this.state.player_1 !== undefined)?'player_2':'player_1';
      template = 
        <Home 
          player={player}
          heroes={this.state.heroes}
          onSelectHero={this.heroSelected}
        />;
    }
    return (
      <div>
       { template }
      </div>
    );
  }
}

export default App;
