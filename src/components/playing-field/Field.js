import React, { Component } from 'react';
import { connect } from 'react-redux';
import FieldRow from './FieldRow';
import styles from './PlayingField.module.css';

class Field extends Component {

    componentDidUpdate(prevProps){
        const { winner } = this.props;
        if (prevProps.winner !== this.props.winner){
            if (this.props.winner){
                alert(`The winner is ${winner.name} with ${winner.scoreSum} points.`);
            }
        }
    }

    render() {
        const { posScore, players, rows } = this.props;
        return (
            <table className={styles.playingField}>
                <thead>
                    <tr>
                        <th>
                            Player:
                        </th>
                        {players.map(player => 
                            <th key={player.id} className={styles.playerName}>
                                {player.name}
                            </th>
                        )}
                    </tr>
                </thead>
                <tbody>
                    {rows.map(rowData =>
                        <FieldRow 
                            key={rowData.score || rowData.type}
                            players={players} 
                            header={rowData.header} 
                            score={rowData.score} 
                            type={rowData.type}
                        />
                    )}
                </tbody>
            </table>
        )
    }
}

const mapStateToProps = state => ({
    posScore: state.possibleScore.possibleScores,
    players: state.game.players,
    rows: state.rules.playingField,
    winner: state.game.winner
});

export default connect(mapStateToProps, {})(Field);
