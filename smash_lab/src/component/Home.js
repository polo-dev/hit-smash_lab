import React, { Component } from 'react';

export default class Home extends Component {

    constructor(props){
        super(props);
        this.onSelectHero = this.onSelectHero.bind(this);
    }

    onSelectHero(hero_id, player){
        this.props.onSelectHero(hero_id, player);
    }

    render() {
        const player = this.props.player
        const heroes = this.props.heroes;
        return (
            <div>
                <h3>{player}, Choississez votre personnage :</h3>
                { heroes.map( hero => (
                    <img key={hero.id}
                        src={process.env.PUBLIC_URL + '/img/hero/' + hero.id + '.png'}
                        alt={hero.name} 
                        onClick={() => {this.onSelectHero(hero.id,player)}}
                    />
                )) }
            </div>
        )
    }
}