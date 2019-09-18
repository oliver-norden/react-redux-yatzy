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
            },
            {
                id: 'dice4',
                saved: false,
                val: 0
            },
            {
                id: 'dice5',
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
                {this.state.dice.map(dice => 
                    <div key={dice.id}>
                        <label htmlFor={dice.id}>{dice.val}</label>
                        <input type='checkbox' id={dice.id} onChange={this.toggleDice}/>
                        <br />
                    </div>
                )}
                <button onClick={this.roll}>Roll</button>
            </div>
        )
    }
}

export default Dice
