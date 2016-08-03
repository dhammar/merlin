import {recordMissionAction, recordVote, selectMission, addPlayer} from './core';

export const INITIAL_STATE = {
	players: []
}

export default function reducer(state = INITIAL_STATE, action) {
	switch(action.type){
		case 'ADD_PLAYER':
			return addPlayer(state, action.player);
		case 'SELECT_MISSION':
			return selectMission(state, action.mission);
		case 'RECORD_VOTE':
			return recordVote(state, action.vote);
		case 'RECORD_MISSION_ACTION':
			return recordMissionAction(state, action.missionAction);
	}
	return state;
}