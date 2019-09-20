import React, { Component } from 'react';
import { connect } from 'react-redux';

class Field extends Component {
    render() {
        const { posScore } = this.props;
        console.log(posScore);
        return (
            <table>
                <thead>
                    <tr>
                        <th>
                            Player:
                        </th>
                        <th>
                            Player 1
                        </th>
                        <th>
                            Player 2
                        </th>
                    </tr>
                </thead>
                <tbody>
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
    posScore: state.score.possibleScores
});

export default connect(mapStateToProps, {})(Field);
