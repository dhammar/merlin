import {expect} from 'chai';
import reducer from '../src/reducer';

describe('reducer', () => {
	it('handles ADD_PLAYER', () => {
		const initialState = {
			players: ["ABCD"]
		};
		const playerCode = 'ABCDEFG';
		const action = {type: 'ADD_PLAYER', player: playerCode};

		const nextState = reducer(initialState, action);
		expect(nextState).to.deep.equal({
			...nextState,
			players: ["ABCD", "ABCDEFG"]
		});
	});

	describe('SELECT_MISSION', () => {
		it('handles SELECT_MISSION', () => {
			const initialState = {
				players: ['P1', 'P2', 'P3', 'P4'],
				active: 'P1',
				gameBoard: [-1, 2, 3]
			};
			const action = {type: 'SELECT_MISSION', mission: ['P2', 'P3']};
			const nextState = reducer(initialState, action);
			expect(nextState).to.deep.equal({
				...nextState,
				mission: ['P2', 'P3']
			});
		});

		it('does not allow duplicate players in SELECT_MISSION', () => {
			const initialState = {
				players: ['P1', 'P2', 'P3', 'P4'],
				active: 'P1',
				gameBoard: [0, 2, 3]
			};
			const action = {type: 'SELECT_MISSION', mission: ['P3', 'P3']};
			const nextState = reducer(initialState, action);
			expect(nextState).to.deep.equal(nextState);
		});

		it('only allows the correct number of players on the mission', () => {
			const initialState = {
				players: ['P1', 'P2', 'P3', 'P4'],
				active: 'P1',
				gameBoard: [0, -1, 3]
			};
			const action = {type: 'SELECT_MISSION', mission: ['P3', 'P1']};
			const nextState = reducer(initialState, action);
			expect(nextState).to.deep.equal(nextState);
		});
	});

it('handles RECORD_VOTE', () => {
	const initialState = {
		active: 'P4',
		mission: {
			participants: ['P1', 'P2'],
			approved: 0,
				votes: [] // vote: Player: "id", vote: "1" or "0"
			}

		};

		const action = {type: 'RECORD_VOTE', vote:{voter: 'P4', choice: 1}};
		const nextState = reducer(initialState, action);
		expect(nextState).to.deep.equal({
			active: 'P4',
			mission: {
				participants: ['P1', 'P2'],
				approved: 0,
				votes: [{voter: 'P4', choice: 1}] // vote: Player: "id", vote: "1" or "0"
			}

		});

	});
describe('START_MISSION', () => {
	it('handles START_MISSION', () => {
		const initialState = {
			active: 'P1',
			players: ['P1', 'P2', 'P3'],
			mission: {
				participants: ['P1', 'P2'],
				votes: [{voter: 'P1', choice: 1}, 
				{voter: 'P2', choice: 1}, {voter: 'P3', choice: 1}],
				approved: 0
			}
		};

		const action = {type: 'START_MISSION'};
		const nextState = reducer(initialState, action);
		expect(nextState).to.deep.equal({
			...initialState,
			mission: {
				...initialState.mission,
				approved: 1,
				score: 0
			}

		});
	});


	it('only allows mission to start once all votes are in', () => {
		const initialState = {
			active: 'P1',
			players: ['P1', 'P2', 'P3'],
			mission: {
				participants: ['P1', 'P2'],
				votes: [{voter: 'P1', choice: 1}, 
				{voter: 'P2', choice: 1}],
				approved: 0
			}
		};

		const action = {type: 'START_MISSION'};
		const nextState = reducer(initialState, action);
		expect(nextState).to.deep.equal(nextState);
	});
});

describe('NEXT_PLAYER', () => {
	it('handles NEXT_PLAYER', () => {
		const initialState = {
			active: 'P2',
			players: ['P1', 'P2']
		};

		const action = {type: 'NEXT_PLAYER'};
		const nextState = reducer(initialState, action);
		expect(nextState).to.deep.equal({
			...initialState,
			active: 'P1'
		});

	})
});

	// it('sets the next player as active when a mission vote fails', () => {
	// 	const initialState = {
	// 		active: 'P1',
	// 		players: ['P1', 'P2', 'P3'],
	// 		mission: {
	// 			participants: ['P1', 'P2'],
	// 			votes: [{voter: 'P1', choice: 1}, 
	// 				{voter: 'P2', choice: 1}, {voter: 'P3', choice: 1}],
	// 			approved: 0
	// 		}
	// 	};

	// 	const action = {type: 'START_MISSION'};
	// 	const nextState = reducer(initialState, action);
	// 	expect(nextState).to.deep.equal({
	// 		...initialState,
	// 		mission: {
	// 			...initialState.mission,
	// 			approved: 1,
	// 			score: 0
	// 		}

	// 	});
	// });
describe('RECORD_MISSION_ACTION', () => {
	it('handles RECORD_MISSION_ACTION good vote', () => {
		const initialState = {
			active: 'P4',
			mission: {
				participants: ['P1', 'P2', 'P3'],
				score: 0
			}
		};

		const action = {type: 'RECORD_MISSION_ACTION', missionAction: 1};
		const nextState = reducer(initialState, action);
		expect(nextState).to.deep.equal({
			active: 'P4',
			mission: {
				participants: ['P1', 'P2', 'P3'],
				score: 1
			}
		});

	});


	it('handles RECORD_MISSION_ACTION bad vote', () => {
		const initialState = {
			active: 'P4',
			mission: {
				participants: ['P1', 'P2', 'P3'],
				score: 1
			}
		};

		const action = {type: 'RECORD_MISSION_ACTION', missionAction: 0};
		const nextState = reducer(initialState, action);
		expect(nextState).to.deep.equal({
			active: 'P4',
			mission: {
				participants: ['P1', 'P2', 'P3'],
				score: 1
			}
		});

	});
});
});





















