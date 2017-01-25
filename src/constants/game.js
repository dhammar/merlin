export const GAME_STATE = {
  id : -1,
  players: [], //{name: 'P1', role: 'good'} or just {name: 'P1'}
	active: '',
	gameBoard: [],
	mission: {
		participants: [],
		approved: 0,
		votes: [], // {voter: 'P1', choice: 1}
		score: 0
	},
	winner: ''
}
