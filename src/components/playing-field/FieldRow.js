import React, { Component } from 'react'

class FieldRow extends Component {
    render() {

        const { players, header } = this.props;
        console.log(header);
        return (
            <tr>
                <th>{header}</th>
                {players.map(player => 
                    <td key={player.name}></td>
                )}
            </tr>
        )
    }
}

export default FieldRow