import React, { Component } from 'react';

export default class Player extends Component {
    constructor(props){
        super(props);
        this.state = this.props.state;
    }

    render() {
        const player = this.props.player
        const hero_id = this.state[player].hero_id
        return (
            <div className="icon-player">
                <img 
                    src={process.env.PUBLIC_URL + '/img/hero/' + hero_id + '.png'}
                    alt={this.state.heroes[hero_id].name}
                />
                <p>{player}</p>
            </div>
        )
    }
}