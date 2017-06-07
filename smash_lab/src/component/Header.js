import React, { Component } from 'react';
import Status from './Header/Status';
import Smash from './Header/Smash';
import Player from './Header/Player';

export default class Header extends Component {
    constructor(props){
        super(props);
        this.state = this.props.state;
    }
    componentWillReceiveProps(nextProps){
       this.setState(nextProps.state);
    }

    render() {
        return (
            <header>
                <div>
                    <Smash />
                    <Status 
                        player='player'
                        state={this.state}
                    />
                    <Player
                        player='player'
                        state={this.state}
                    />    
                </div>
                <p>VERSUS</p>
                <div>
                    <Player 
                        player='enemy'
                        state={this.state}
                    />   
                     <Status 
                        player='enemy'
                        state={this.state}
                    />                   
                    <Smash />
                </div>
            </header>
        )
    }
}