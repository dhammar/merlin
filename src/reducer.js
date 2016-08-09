import {nextPlayer, startGame, startMission, recordMissionAction, recordVote, selectMission, addPlayer} from './core';

export const INITIAL_STATE = {
	players: []
}

export default function reducer(state = INITIAL_STATE, action) {
	switch(action.type){
		case 'ADD_PLAYER':
			return addPlayer(state, action.player);
		case 'START_GAME':
			return startGame(state, action.rand);
		case 'SELECT_MISSION':
			return selectMission(state, action.mission);
		case 'RECORD_VOTE':
			return recordVote(state, action.vote);
		case 'START_MISSION':
			return startMission(state);
		case 'RECORD_MISSION_ACTION':
			return recordMissionAction(state, action.missionAction);
		case 'NEXT_PLAYER':
			return nextPlayer(state);
	}
	return state;
}