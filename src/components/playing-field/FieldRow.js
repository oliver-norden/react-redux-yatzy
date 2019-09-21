import React, { Component } from 'react'
import { connect } from 'react-redux';
import { saveScore } from '../../actions/scoreActions';

class FieldRow extends Component {

    getCell = playerId => {

        // Return table cell with possible score for current player
        if (playerId === this.props.curPlayerIdx) {
            const posScoreVal = this.props.posScore[this.props.score];
            const scoreObj = {[this.props.score]: posScoreVal}
            return (
                <td onClick={
                    this.props.saveScore.bind(this, scoreObj, playerId)
                }>
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
    curPlayerIdx: state.game.currentPlayer.idx
});

export default connect(mapStateToProps, { saveScore })(FieldRow);