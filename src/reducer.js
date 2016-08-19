import {assassinAction, nextPlayer, startGame, startMission, recordMissionAction, recordVote, selectMission, addPlayer} from './core';

export const INITIAL_STATE = {
	players: []
}

export default function reducer(state = INITIAL_STATE, {type, payload})
	switch(type){
		case 'ADD_PLAYER':
			return addPlayer(state, payload.player);
		case 'START_GAME':
			return startGame(state, payload.rand);
		case 'SELECT_MISSION':
			return selectMission(state, payload.mission);
		case 'RECORD_VOTE':
			return recordVote(state, payload.vote);
		case 'START_MISSION':
			return startMission(state);
		case 'RECORD_MISSION_ACTION':
			return recordMissionAction(state, payload.missionAction);
		case 'NEXT_PLAYER':
			return nextPlayer(state);
		case 'RECORD_ASSASSIN_ACTION':
			return assassinAction(state, payload.choice);
	}
	return state;
}