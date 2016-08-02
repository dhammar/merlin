
export const INITIAL_STATE = {
	players: []
}

export default function reducer(state = INITIAL_STATE, action) {
	switch(action.type){
		case 'ADD_PLAYER':
			return {
					...state,
					players: [...state.players, action.player]
			};
	}
	return state;
}