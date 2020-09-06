import React, { Component } from 'react';
import { connect } from 'react-redux';
import FieldRow from './FieldRow';
import styles from './PlayingField.module.css';
import { resetGame } from '../../actions/gameActions'

class Field extends Component {

    componentDidUpdate(prevProps){
        const { winner } = this.props;
        if (prevProps.winner !== this.props.winner){
            if (this.props.winner){
                alert(`The winner is ${winner.name} with ${winner.scoreSum} points.`);
                this.props.resetGame();
            }
        }
    }

    render() {
        const { posScore, players, rows, curPlayerIdx } = this.props;
        return (
            <table className={styles.playingField}>
                <colgroup>
                    <col />
                    {players.map(player => {
                        return (
                            <col 
                                key={player.id}
                                className={ (player.id === curPlayerIdx) ? styles.currentPlayer : null }
                            />
                        )
                    })}
                </colgroup>
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
    winner: state.game.winner,
    curPlayerIdx: state.game.currentPlayer.idx
});

export default connect(mapStateToProps, { resetGame })(Field);
