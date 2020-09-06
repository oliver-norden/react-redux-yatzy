import { RESET_GAME } from '../actions/types'

const playingField = [
    {header: 'Ones', score: '1', user: true},
    {header: 'Twos', score: '2', user: true},
    {header: 'Threes', score: '3', user: true},
    {header: 'Fours', score: '4', user: true},
    {header: 'Fives', score: '5', user: true},
    {header: 'Sixes', score: '6', user: true},
    {header: 'Sum', type: 'singlesSum'},
    {header: 'Bonus', score: 'bonus'},
    {header: '1 pair', score: 'one pair', user: true},
    {header: '2 pairs', score: 'two pairs', user: true},
    {header: 'Three of a kind', score: 'threeOfAKind', user: true},
    {header: 'Four of a kind', score: 'fourOfAKind', user: true},
    {header: 'Small straight', score: 'small straight', user: true},
    {header: 'Large straight', score: 'large straight', user: true},
    {header: 'Full house', score: 'full house', user: true},
    {header: 'Chance', score: 'chance', user: true},
    {header: 'Yatzy', score: 'yatzy', user: true},
    {header: 'Sum', type: 'scoreSum'}
];

const noOfTurns = playingField.reduce((noOfTurns, row) => row.user ? noOfTurns + 1 : noOfTurns, 0) // Calculate total number of turns (add one for each row where user input is required)

const initialState = {
    dice: 5,
    diceSides: 6,
    bonus: 50,
    bonusRequirment: 63,
    turns: noOfTurns,
    playingField: playingField,
    combinations: [
        {
            name: 'one pair',
            valueCounts: [2]
        },
        {
            name: 'threeOfAKind',
            valueCounts: [3]
        },
        {
            name: 'fourOfAKind',
            valueCounts: [4]
        },
        {
            name: 'two pairs',
            valueCounts: [2, 2]
        },
        {
            name: 'full house',
            valueCounts: [3, 2]
        },
        {
            name: 'yatzy',
            valueCounts: [5],
            score: 50
        },
        {
            name: 'small straight',
            values: [1, 2, 3, 4, 5]
        },
        {
            name: 'large straight',
            values: [2, 3, 4, 5, 6]
        }
    ]

};

export default function (state = initialState, action) {
    switch (action.type) {
        case RESET_GAME:
            return {
                ...state,
                playingField: playingField
            }
        default: 
            return state;
    }
}