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

function isValidMission(state, mission){

	return ((new Set(mission)).size === mission.length) && 
		mission.length === state.gameBoard.find((x) => {
			if(x !== -1 && x !== 0){
				return x;
			}
		});
};