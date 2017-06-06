import React, { Component } from 'react';
import Answers from './Main/Answers';
import './Main/Main.css';

export default class Main extends Component {
    constructor(props){
        super(props);
        this.state = {
            player_1: {},
            player_2: {}
        };
        this.getQuestion = this.getQuestion.bind(this);
        this.sendAnswer = this.sendAnswer.bind(this);
        this.getQuestion('player_1');
    }

    getQuestion(player){
        this.props.getQuestion(player).then((data) => {         
            this.setState({
                player_1: {
                    'question': data.question,                 
                    'answers': data.answers,
                    'correct_answer': data.correct_answer
                } 
            });
        });
    }

    sendAnswer(index){
        const player = 'player_1'; 
        if(index === this.state[player].correct_answer){
            console.log('bravo');
            this.props.attack('player_2');
        }else{
            console.log('perdu');
            this.props.attack('player_1');
        }
        this.getQuestion(player);
    }

    render() {
        //const player = this.props.player;
        const player = 'player_1';  
        const question = this.state[player].question;
        let answers = this.state[player].answers || [];
        return (
            <main>
                <div>
                    <h2 className="question">{question}</h2>
                    <Answers sendAnswer={this.sendAnswer} answers={answers} />
                </div>
                <div>
                    <h2 className="question">{question}</h2>
                    <Answers sendAnswer={this.sendAnswer} answers={answers} />
                </div>           
            </main>
        )
    }
}