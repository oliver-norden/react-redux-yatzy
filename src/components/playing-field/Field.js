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
                    <FieldRow players={players} header='Ones:' score='1' />
                    <FieldRow players={players} header='Twos:' score='2' />
                    <FieldRow players={players} header='Threes:' score='3' />
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
