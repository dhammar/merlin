import {isValidMission} from './core';

export const INITIAL_STATE = {
	players: []
}

export default function reducer(state = INITIAL_STATE, action) {
	switch(action.type){
		case 'ADD_PLAYER':
			return {
				...state,
				players: [...state.players, action.player]
			};
		case 'SELECT_MISSION':
				return isValidMission(state, action.mission) ? {
						...state,
						mission: action.mission
					} : state;

	}
	return state;
}