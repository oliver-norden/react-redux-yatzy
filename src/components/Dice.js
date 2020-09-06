import React, { Component } from 'react';
import { connect } from 'react-redux';
import { rollDice, toggleDice, genDice } from '../actions/diceActions';
import styles from './Dice.module.css';

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
        const { curPlayer } = this.props;
        return (
            <div>
                <p>{curPlayer.rollsLeft} rolls left</p>
                <p>{curPlayer.message}</p>
                <div className={styles.diceContainer}>
                    {this.props.dice.map(dice => 
                        <div key={dice.id}>
                            <input 
                                disabled={!this.props.rollBtnEnabled}
                                type='checkbox' 
                                checked={dice.saved} 
                                id={dice.id} 
                                onChange={this.toggleDice}
                                className={styles.diceCheckbox}
                            />
                            <label htmlFor={dice.id} className={styles.diceLabel}>
                                <span
                                    className={ `${styles.dice} ${styles[`dice-${dice.val}`]}` }
                                    title={`Dice ${dice.val}`}>
                                </span>
                            </label>
                            <br />
                        </div>
                    )}
                </div>
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
