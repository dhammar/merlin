import {assassinAction, nextPlayer, startGame, startMission,
		recordMissionAction, recordVote, selectMission, addPlayer} from './core';
import * as ACT from './constants/actions';

export default function reducer(state = INITIAL_STATE, {type, payload}){
	switch(type){
		case ACT.ADD_PLAYER:
			return addPlayer(state, payload.player);
		case ACT.START_GAME:
			return startGame(state, payload.rand, payload.shuffle);
		case ACT.SELECT_MISSION:
			return selectMission(state, payload.mission);
		case ACT.RECORD_VOTE:
			return recordVote(state, payload.vote);
		case ACT.START_MISSION:
			return startMission(state);
		case ACT.RECORD_MISSION_ACTION:
			return recordMissionAction(state, payload.missionAction);
		case ACT.NEXT_PLAYER:
			return nextPlayer(state);
		case ACT.RECORD_ASSASSIN_ACTION:
			return assassinAction(state, payload.choice);
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