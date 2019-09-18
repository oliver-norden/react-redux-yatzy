import React, { Component } from 'react'

class Dice extends Component {

    state = {
        dice: [
            {
                id: 'dice1',
                saved: false,
                val: 0
            },
            {
                id: 'dice2',
                saved: false,
                val: 0
            },
            {
                id: 'dice3',
                saved: false,
                val: 0
            }
        ]
    }

    toggleDice = e => {
        const newDice = this.state.dice.map(dice => {
            if (e.target.id === dice.id) dice.saved = !dice.saved;
            return dice;
        });

        this.setState({dice: newDice});
    }


    roll = () => {
        function diceRoll() {
            return Math.floor(Math.random() * 6 ) + 1;
        } 

        const newDice = this.state.dice.map(dice => {
            if (!dice.saved) dice.val = diceRoll();
            return dice;
        });

        this.setState({dice: newDice});
    }

    render() {
        return (
            <div>
                <label htmlFor='dice1'>{this.state.dice[0].val}</label>
                <input type='checkbox' id='dice1' onChange={this.toggleDice}/>
                <br />
                <label htmlFor='dice2'>{this.state.dice[1].val}</label>
                <input type='checkbox' id='dice2' onChange={this.toggleDice}/>
                <br />
                <label htmlFor='dice3'>{this.state.dice[2].val}</label>
                <input type='checkbox' id='dice3' onChange={this.toggleDice}/>
                <br />
                <button onClick={this.roll}>Roll</button>
            </div>
        )
    }
}

export default Dice
