import update from 'react-addons-update';
import {STANDARD_RULE_SET} from './rulesets';

//this mutates arr fix this dude
export function fisherYatesShuffle(arr){
	var index = arr.length,
		temp,
		randomIndex;

	while(index){
		randomIndex = Math.floor(Math.random() * index);
		index -= 1;
		temp = arr[index];
		arr[index] = arr[randomIndex];
		arr[randomIndex] = temp;
	}

	return arr
}

export function addPlayer(state, newPlayer){
	return {
		type:'ADD_PLAYER',
		payload: {
			...state,
			players: [...state.players.filter((p) => (p !== newPlayer)), newPlayer]
		}
	};	
}; 

export function nextPlayer(state){
	return {
		type: 'NEXT_PLAYER',
		payload: {
			...state,
			active: state.players.indexOf(state.active) === (state.players.length-1) 
			? state.players[0] : state.players[state.players.indexOf(state.active) + 1] 
		}
	};
};

export function startGame(state, rand, shuffle){
	if(state.players.length < 5 || state.players.length > 10){
		return;
	}
	const ruleSet = STANDARD_RULE_SET[state.players.length-5];
	const newPlayers = assignRoles(ruleSet, state.players, shuffle);
	return {
		type: 'START_GAME',
		payload: {
		...state,
			players: newPlayers, 
			active: state.players[(rand * 100) % (state.players.length)],
			rules: ruleSet // this needs to be changed. pass player to function
		}
	};
};

function assignRoles(ruleset, players, shuffle){
	var completePlayers = [];
	for(var i = 0; i < players.length; i++){
		completePlayers[i] = {
			name: players[i],
			role: chooseRole(ruleset, i)
		}
	}
	return completePlayers;
}

function chooseRole(ruleset, i){
	if(i < ruleset.roles.good - 1){
		return 'good';
	} else if(i === ruleset.roles.good - 1){
		return 'merlin';
	} else if (i === ruleset.roles.good){
		return 'assassin';
	} else return 'evil';
}

export function selectMission(state, newMission){
	return isValidMission(state, newMission) ? {
		type: 'SELECT_MISSION',
		payload: {
			...state,
			mission: newMission
		}
	} : { type: 'SELECT_MISSION',
		payload: {
			state
		}};
};

export function recordVote(state, payloadVote){
	return {
		type: 'RECORD_VOTE',
		payload: {
			...state,
			mission: {
				...state.mission,
				votes: [...state.mission.votes.filter((v) => v.voter !== payloadVote.voter), payloadVote]
			}
		}
	};
};

export function recordMissionAction(state, missionAction){
	return {
		type: 'RECORD_MISSION_ACTION',
		payload: {
			...state,
			mission: {
				...state.mission,
				score: state.mission.score + missionAction
			}
		}
	};
};

export function startMission(state){
	return state.players.length === state.mission.votes.length ? {
		type: 'START_MISSION',
		payload: {
			...state,
			mission: {
				...state.mission,
				approved: 1,
				score: 0
			}
		}
	} : { type: 'START_MISSION',
		payload: {state}};
};

function isValidMission(state, mission){

	return ((new Set(mission)).size === mission.length) && 
		mission.length === state.gameBoard.find((x) => {
			if(x !== -1 && x !== 0){
				return x;
			}
		});
};

export function assassinAction(state, choice){
	return choice === state.players.find((p) => {
		if(p.role === 'merlin'){
			return p;
		}
	}).name ? {
		type:'RECORD_ASSASSIN_ACTION'
		payload:{
			players: state.players.map((p) => {return p.name}),
			winner: 'evil'
		}
	} : {
		type:'RECORD_ASSASSIN_ACTION'
		payload:{
			players: state.players.map((p) => {return p.name}),
			winner: 'good'
		}
	}; 
}