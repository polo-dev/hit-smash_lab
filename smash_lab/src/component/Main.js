import React, { Component } from 'react';
import Game from './Main/Game';
import './Main/Main.css';

export default class Main extends Component {
    constructor(props){
        super(props);
        this.getQuestion = this.props.getQuestion.bind(this);
        this.attack = this.props.attack.bind(this);
    }

    render() {  
        return (
            <main>
                <Game player='player_1' attack={this.attack} getQuestion={this.getQuestion}/>
                <Game player='player_2' attack={this.attack} getQuestion={this.getQuestion}/>
            </main>
        )
    }
}