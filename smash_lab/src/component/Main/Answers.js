import React, { Component } from 'react';

export default class Answers extends Component {
    constructor(props){
        super(props);
        this.state = this.props.state;
        this.handleClick = this.handleClick.bind(this);
    }


    handleKeyPress(evt){
        alert('prout');
        console.log(evt.charCode);
    }

    handleClick(index){
       this.props.sendAnswer(index);
    }

    render() {
        let answers = this.props.answers;
        return (
            <div className="answers">
                { answers.map( (answer, index) => 
                    <div
                        key={index} 
                        className="answer"
                        //onKeyPress={() => {console.log(index)}}
                        onClick={() => {this.handleClick(index)}}
                    >
                        {answer}
                    </div>
                )} 
            </div>
        )
    }
}