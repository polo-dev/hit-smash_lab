import React, { Component } from 'react';
import Status from './Header/Status';
import Smash from './Header/Smash';
import Player from './Header/Player';

export default class Header extends Component {
    constructor(props){
        super(props);
        this.state = this.props.state;
    }
    componentWillUpdate(nextProps, nextState){
       this.state = nextProps;
    }

    render() {
        return (
            <header>
                <div>
                    <Smash />
                    <Status 
                        player='player_1'
                        state={this.state}
                    />
                    <Player
                        player='player_1'
                        state={this.state}
                    />    
                </div>
                <p>VERSUS</p>
                <div>
                    <Player 
                        player='player_2'
                        state={this.state}
                    />   
                     <Status 
                        player='player_1'
                        state={this.state}
                    />                   
                    <Smash />
                </div>
            </header>
        )
    }
}