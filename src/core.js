import {STANDARD_RULE_SET} from './constants/rulesets';
import {GOOD, ASSASSIN, EVIL, MERLIN} from "./constants/roles";

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

export function startGame(state, rand, shuffle){
	if(state.players.length < 5 || state.players.length > 10){
		return;
	}
	const ruleSet = STANDARD_RULE_SET[state.players.length-5];
	const newPlayers = assignRoles(ruleSet, state.players, shuffle);
	return {
		...state,
		players: newPlayers, 
		active: state.players[(rand * 100) % (state.players.length)],
		rules: ruleSet // this needs to be changed. pass player to function
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
		return GOOD;
	} else if(i === ruleset.roles.good - 1){
		return MERLIN;
	} else if (i === ruleset.roles.good){
		return ASSASSIN;
	} else return EVIL;
}

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

export function assassinAction(state, choice){
	return choice === state.players.find((p) => {
		if(p.role === 'merlin'){
			return p;
		}
	}).name ? {
		players: state.players.map((p) => {return p.name}),
		winner: 'evil'
	} : {
		players: state.players.map((p) => {return p.name}),
		winner: 'good'
	}; 
}