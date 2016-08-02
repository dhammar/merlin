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