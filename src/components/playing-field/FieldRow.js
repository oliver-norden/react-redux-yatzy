import React, { Component } from 'react'
import { connect } from 'react-redux';

class FieldRow extends Component {

    getCell = playerId => {
        if (playerId === this.props.curPlayerIdx) {
            return this.props.posScore[this.props.score];
        }
        else return null;
    }

    render() {
        const { players, header } = this.props;
        return (
            <tr>
                <th>{header}</th>
                {players.map(player => 
                    <td key={player.name}>{this.getCell(player.id)}</td>
                )}
            </tr>
        )
    }
}

const mapStateToProps = state => ({
    posScore: state.score.possibleScores,
    curPlayerIdx: state.game.currentPlayer.idx
});

export default connect(mapStateToProps, {})(FieldRow);