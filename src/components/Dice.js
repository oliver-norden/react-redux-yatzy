import React, { Component } from 'react';
import { connect } from 'react-redux';
import { rollDice, toggleDice } from '../actions/diceActions';

class Dice extends Component {

    toggleDice = e => {
        this.props.toggleDice(e);
    }


    roll = () => {
        this.props.rollDice();
    }

    render() {
        return (
            <div>
                {this.props.dice.map(dice => 
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

const mapStateToProps = state => ({
    dice: state.dice.dice
});

export default connect(mapStateToProps, { rollDice, toggleDice })(Dice)
