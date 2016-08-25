import {assassinAction, nextPlayer, startGame, startMission,
		recordMissionAction, recordVote, selectMission, addPlayer} from './core';
import * as ACT from './constants/actions';


export default function reducer(state = INITIAL_STATE, action) {
	switch(action.type){
		case ACT.ADD_PLAYER:
			return addPlayer(state, action.player);
		case ACT.START_GAME:
			return startGame(state, action.rand);
		case ACT.SELECT_MISSION:
			return selectMission(state, action.mission);
		case ACT.RECORD_VOTE:
			return recordVote(state, action.vote);
		case ACT.START_MISSION:
			return startMission(state);
		case ACT.RECORD_MISSION_ACTION:
			return recordMissionAction(state, action.missionAction);
		case ACT.NEXT_PLAYER:
			return nextPlayer(state);
		case ACT.RECORD_ASSASSIN_ACTION:
			return assassinAction(state, action.choice);
	}
	return state;
}

export const INITIAL_STATE = {
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