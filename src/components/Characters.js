import React from 'react';
import {characters} from '../data.json';

const Characters = (props) =>
<ul>
    { 
        characters.map( character => (
            <li id={character.id} >name : {character.name} universe: {character.universe}</li>
        )) 
    }
</ul>

export default Characters