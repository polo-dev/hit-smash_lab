import React, { Component } from 'react';

export default class Home extends Component {

    constructor(props){
        super(props);
        this.onSelectHero = this.onSelectHero.bind(this);
    }

    onSelectHero(hero_id){
        this.props.onSelectHero(hero_id);
    }

    render() {
        const heroes = this.props.heroes;
        return (
            <div>
                <h3>Choisissez votre personnage :</h3>
                { heroes.map( hero => (
                    <img key={hero.id}
                        src={process.env.PUBLIC_URL + '/img/hero/' + hero.id + '.png'}
                        alt={hero.name} 
                        onClick={() => {this.onSelectHero(hero.id)}}
                    />
                )) }
            </div>
        )
    }
}