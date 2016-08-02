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
});