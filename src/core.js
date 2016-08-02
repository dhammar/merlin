import update from 'react-addons-update';

export function addPlayer(state, player){
	return update(state, {
		players: {$push: [player]}
	});
};

export function selectMission(state, newMission){
	return isValidMission(state, newMission) ? update(state, {
		mission: {$set: newMission}
	}) : state;
}

function isValidMission(state, mission){
	var missionSize = -2;

	for (var i = 0; i < state.gameBoard.length; i++) {
		if(state.gameBoard[i] !== -1 || 0){ // -1 signifies a mission loss, 0 signifies a win
			missionSize = state.gameBoard[i];
			break;
		} 
	};

	return ((new Set(mission)).size === mission.length) && 
		mission.length === missionSize;
}