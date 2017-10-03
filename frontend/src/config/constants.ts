export const constants = {
  errorMessages: {
    NOT_ENOUGH_CARDS: 'Not enough cards on deck to play, please shuffle deck to start again.',
    INVALID_DECK: 'Invalid Deck. Doesn\'t exist or expired, please shuffle deck to start again.',
    UNKNOWN_ERROR: 'Unknown Error'
  },
  cardValueArr: [
    {
      number: '2',
      value: 1
    },
    {
      number: '3',
      value: 2
    },
    {
      number: '4',
      value: 3
    },
    {
      number: '5',
      value: 4
    },
    {
      number: '6',
      value: 5
    },
    {
      number: '7',
      value: 6
    },
    {
      number: '8',
      value: 7
    },
    {
      number: '9',
      value: 8
    },
    {
      number: '10',
      value: 9
    },
    {
      number: 'J',
      value: 10
    },
    {
      number: 'Q',
      value: 11
    },
    {
      number: 'K',
      value: 12
    },
    {
      number: 'A',
      value: 13
    }
  ],
  handRanking: [
    {
      value: 1,
      name: 'High Card'
    },
    {
      value: 2,
      name: 'One Pair'
    },
    {
      value: 3,
      name: 'Two Pairs'
    },
    {
      value: 4,
      name: 'Three of a Kind'
    },
    {
      value: 5,
      name: 'Straight'
    },
    {
      value: 6,
      name: 'Flush'
    },
    {
      value: 7,
      name: 'Full House'
    },
    {
      value: 8,
      name: 'Four of a Kind'
    },
    {
      value: 9,
      name: 'Straight Flush'
    },
    {
      value: 10,
      name: 'Royal Flush'
    }
  ]
};
