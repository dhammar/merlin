import update from 'react-addons-update';
import {STANDARD_RULE_SET} from './rulesets';

export function addPlayer(state, newPlayer){
	return {
		...state,
		players: [...state.players.filter((p) => (p !== newPlayer)), newPlayer]
	};	
}; 

export function nextPlayer(state){
	return {
		...state,
		active: state.players.indexOf(state.active) === (state.players.length-1) 
		? state.players[0] : state.players[state.players.indexOf(state.active) + 1] 
	};
};

export function startGame(state, rand){
	return {
		...state,
		active: state.players[(rand * 100) % (state.players.length)],
		...STANDARD_RULE_SET[state.players.length-5] // this needs to be changed. pass player to function
	};
};

export function selectMission(state, newMission){
	return isValidMission(state, newMission) ? {
		...state,
		mission: newMission
	} : state;
};

export function recordVote(state, payloadVote){
	return {
		...state,
		mission: {
			...state.mission,
			votes: [...state.mission.votes.filter((v) => v.voter !== payloadVote.voter), payloadVote]
		}
	};
};

export function recordMissionAction(state, missionAction){
	return {
		...state,
		mission: {
			...state.mission,
			score: state.mission.score + missionAction
		}
	};
};

export function startMission(state){
	return state.players.length === state.mission.votes.length ? {
		...state,
		mission: {
			...state.mission,
			approved: 1,
			score: 0
		}
	} : state;
};

function isValidMission(state, mission){

	return ((new Set(mission)).size === mission.length) && 
		mission.length === state.gameBoard.find((x) => {
			if(x !== -1 && x !== 0){
				return x;
			}
		});
};