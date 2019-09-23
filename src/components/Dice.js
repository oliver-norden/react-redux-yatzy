import React, { Component } from 'react';
import { connect } from 'react-redux';
import { rollDice, toggleDice, genDice } from '../actions/diceActions';

class Dice extends Component {

    componentDidMount() {
        this.props.genDice(this.props.noOfDice);
        this.props.rollDice();
    }

    toggleDice = e => {
        this.props.toggleDice(e);
    }


    roll = () => {
        this.props.rollDice();
    }

    render() {
        const { players, curPlayer } = this.props;
        return (
            <div>
                <p>{curPlayer.rollsLeft} rolls left</p>
                {this.props.dice.map(dice => 
                    <div key={dice.id}>
                        <label htmlFor={dice.id}>{dice.val}</label>
                        <input type='checkbox' checked={dice.saved} id={dice.id} onChange={this.toggleDice}/>
                        <br />
                    </div>
                )}
                <button disabled={!this.props.rollBtnEnabled} onClick={this.roll}>Roll</button>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    dice: state.dice.dice,
    rollBtnEnabled: state.dice.enabled,
    curPlayer: state.game.currentPlayer,
    players: state.game.players,
    noOfDice: state.rules.dice
});

export default connect(mapStateToProps, { rollDice, toggleDice, genDice })(Dice)
