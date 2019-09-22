import React, { Component } from 'react';
import { connect } from 'react-redux';
import FieldRow from './FieldRow';

class Field extends Component {
    render() {
        const { posScore, players, rows } = this.props;
        return (
            <table>
                <thead>
                    <tr>
                        <th>
                            Player:
                        </th>
                        <th>
                            {players[0].name}
                        </th>
                        <th>
                            {players[1].name}
                        </th>
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
    rows: state.rules.playingField
});

export default connect(mapStateToProps, {})(Field);
