import React, { Component } from 'react';
import { connect } from 'react-redux';
import FieldRow from './FieldRow';

class Field extends Component {
    render() {
        const { posScore, players } = this.props;
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
                    <FieldRow players={players} header='Fours:' score='4' />
                    <FieldRow players={players} header='Fives:' score='5' />
                    <FieldRow players={players} header='Sixes:' score='6' />
                    <FieldRow players={players} header='Sum:' type='singlesSum' />
                    <FieldRow players={players} header='Bonus:' score='bonus' />
                    <FieldRow players={players} header='1 pair:' score='one pair' />
                    <FieldRow players={players} header='2 pairs:' score='two pairs' />
                    <FieldRow players={players} header='Three of a kind:' score='threeOfAKind' />
                    <FieldRow players={players} header='Four of a kind:' score='fourOfAKind' />
                    <FieldRow players={players} header='Small straight:' score='small straight' />
                    <FieldRow players={players} header='Large straight:' score='large straight' />
                    <FieldRow players={players} header='Full house:' score='full house' />
                    <FieldRow players={players} header='Chance:' score='chance' />
                    <FieldRow players={players} header='Yatzy:' score='yatzy' />
                    <FieldRow players={players} header='Sum:' type='scoreSum' />
                </tbody>
            </table>
        )
    }
}

const mapStateToProps = state => ({
    posScore: state.possibleScore.possibleScores,
    players: state.game.players
});

export default connect(mapStateToProps, {})(Field);
