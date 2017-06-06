import React, { Component } from 'react';

export default class Question extends Component {
    render() {
        return (
            <h2 className="question">{this.props.question}</h2>
        )
    }
}