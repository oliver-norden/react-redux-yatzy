const initialState = {
    dice: 5,
    diceSides: 6,
    bonus: 50,
    bonusRequirment: 63,
    playingField: [
        {header: 'Ones', score: '1'},
        {header: 'Twos', score: '2'},
        {header: 'Threes', score: '3'},
        {header: 'Fours', score: '4'},
        {header: 'Fives', score: '5'},
        {header: 'Sixes', score: '6'},
        {header: 'Sum', type: 'singlesSum'},
        {header: 'Bonus', score: 'bonus'},
        {header: '1 pair', score: 'one pair'},
        {header: '2 pairs', score: 'two pairs'},
        {header: 'Three of a kind', score: 'threeOfAKind'},
        {header: 'Four of a kind', score: 'fourOfAKind'},
        {header: 'Small straight', score: 'small straight'},
        {header: 'Large straight', score: 'large straight'},
        {header: 'Full house', score: 'full house'},
        {header: 'Chance', score: 'chance'},
        {header: 'Yatzy', score: 'yatzy'},
        {header: 'Sum', type: 'scoreSum'}
    ],
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
        default: 
            return state;
    }
}