import {selectMission, addPlayer} from './core';

export const INITIAL_STATE = {
	players: []
}

export default function reducer(state = INITIAL_STATE, action) {
	switch(action.type){
		case 'ADD_PLAYER':
			return addPlayer(state, action.player);
		case 'SELECT_MISSION':
			return selectMission(state, action.mission);
	}
	return state;
}