import React, { Component } from 'react';
import { connect } from 'react-redux';
import FieldRow from './FieldRow';

class Field extends Component {
    render() {
        const { posScore, players } = this.props;
        console.log(posScore);
        console.log(players);
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
                    <FieldRow players={players} header='Ones:' />
                    <tr>
                        <th>
                            Ones:
                        </th>
                        <td>
                            {posScore['1'] ? posScore['1'] : 0}
                        </td>
                        <td>
                            {posScore['1'] ? posScore['1'] : 0}
                        </td>
                    </tr>
                </tbody>
            </table>
        )
    }
}

const mapStateToProps = state => ({
    posScore: state.score.possibleScores,
    players: state.game.players
});

export default connect(mapStateToProps, {})(Field);
