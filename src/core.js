import update from 'react-addons-update';

export function addPlayer(state, player){
	return {
		...state,
		players: [...state.players, player]
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
			votes: [...state.mission.votes.filter((v) => v.voter != payloadVote.voter), payloadVote]
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