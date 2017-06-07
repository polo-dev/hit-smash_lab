import React, { Component } from 'react';
import SocketIOClient from 'socket.io-client';
import Home from './component/Home';
import Header from './component/Header';
import Main from './component/Main';
import data from './data.json';
import './App.css';

//const server_link = 'http://localhost:3100'
//const server_link = 'http://127.0.0.1:3100'
const server_link = 'http://192.168.0.22:3100'
//const server_link = 'https://opentdb.com/api.php?amount=1&type=multiple';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {heroes: data.heroes};

    this.heroSelected = this.heroSelected.bind(this);
    this.getQuestion = this.getQuestion.bind(this);
    this.attack = this.attack.bind(this);

    this.socket = SocketIOClient(server_link);

    this.socket.on('lab', (player_id) => {
      this.setState({
        player_id: player_id
      });
      console.log('my id : ' + player_id);
      this.socket.emit('start');
    });

    this.socket.on('match', (enemy_id) => {
      this.setState({
        enemy_id: enemy_id
      });
      console.log('enemy id : ' + enemy_id);
    });

    this.socket.on('enemySelection', (enemy_hero_id) => {
      this.setState({enemy: {hero_id: enemy_hero_id, life: this.state.heroes[enemy_hero_id].max_life}});
    })

    this.socket.on('message', (message) => {
      console.log(message);
    })

  }


  heroSelected(hero_id){
    this.setState({player: {hero_id: hero_id, life: this.state.heroes[hero_id].max_life}});
    this.socket.emit('heroSelected', hero_id);
  }
  
  getQuestion(){
    return fetch(server_link)
    .then((response) => {
      return response.json();
    }).catch((error) => {
      console.log(error);
    })
  }

  attack(player){
    if(player === 'player'){
      this.setState({
        player: {
          hero_id: this.state.player_1.hero_id,
          life: this.state.player_1.life - 5
        }
      }); 
    }
    if(player === 'enemy'){
      this.setState({
        enemy: {
          hero_id: this.state.player_2.hero_id,
          life: this.state.player_2.life - 5
        }
      }); 
    }
  }

  render() {
    let template = null;
    if (this.state.player !== undefined && this.state.enemy !== undefined){
      template = 
        <div>
          <Header state={this.state} />
          <Main attack={this.attack} getQuestion={this.getQuestion}/>
        </div>;
    } else if (this.state.player !== undefined){
      template = 
        <div>
          En attente de l'autre joueur
        </div>
    } else if (this.state.player_id !== undefined && this.state.enemy_id !== undefined) {
      template =
        <Home 
          player={this.state.player_id}
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
