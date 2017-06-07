import React, { Component } from 'react';

export default class Answers extends Component {
    constructor(props){
        super(props);
        this.state = this.props.state;
        this.handleClick = this.handleClick.bind(this);
        window.addEventListener('keydown', evt => {
            let index = null;
            switch(evt.keyCode){
                case 90:
                    index = 0;
                    break;
                case 81:
                    index = 1;
                    break;
                case 83:
                    index = 2;
                    break;
                case 68:
                    index = 3;
                    break;
                default:
                    console.log(evt.keyCode);
                    break;
            }
            console.log(evt.keyCode);
            if(index !== null)this.handleClick(index);
        })
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
                        onClick={() => {this.handleClick(index)}}
                    >
                        {answer}
                    </div>
                )} 
            </div>
        )
    }
}