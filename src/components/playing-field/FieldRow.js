import React, { Component } from 'react'
import { connect } from 'react-redux';
import { saveScore } from '../../actions/scoreActions';

class FieldRow extends Component {

    getCell = playerId => {

        const currentPlayerIdx = this.props.curPlayerIdx;
        const rowScoreType = this.props.score;
        const player = this.props.players[playerId];

        // Return table cell with saved score
        if (!isNaN(player.score[rowScoreType])){
            return (
                <td>{player.score[rowScoreType]}</td>
            )
        }

        // Return table cell with possible score for current player
        if (playerId === currentPlayerIdx) {
            const posScoreVal = this.props.posScore[rowScoreType] || 0;            
            const scoreObj = {[rowScoreType]: posScoreVal}

            return (
                <td
                    onClick={this.props.saveScore.bind(this, scoreObj, playerId)}
                    style={{
                        color: '#aaa',
                        cursor: 'pointer'
                    }}
                >
                    {posScoreVal}
                </td>
            );
        }
        else return (
            <td></td>
        );
    }

    render() {
        const { players, header } = this.props;
        return (
            <tr>
                <th>{header}</th>
                {players.map(player => 
                    <React.Fragment key={player.id}>
                        {this.getCell(player.id)}
                    </React.Fragment>
                )}
            </tr>
        )
    }
}

const mapStateToProps = state => ({
    posScore: state.possibleScore.possibleScores,
    players: state.game.players,
    curPlayerIdx: state.game.currentPlayer.idx
});

export default connect(mapStateToProps, { saveScore })(FieldRow);