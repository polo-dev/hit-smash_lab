import React, { Component } from 'react';
import {Line} from 'rc-progress';

export default class Timer extends Component {
    constructor(props){
        super(props);
    }
    render() {
        return (
            <Line />
        )
    }
}