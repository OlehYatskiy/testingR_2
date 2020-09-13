import {SET_CONTACTS} from "../types";


const initialState = {
	contacts: [],
	err: null,
	isLoader: false
};

const reducer = (state = initialState, action) => {
	switch(action.type){
		case SET_CONTACTS.REQUEST:
			console.log('action>>>', action)
			return {
				...state,
				isLoader: true
			}
		case SET_CONTACTS.SUCCESS:
			console.log('action>>>', action)
			return {
				...state,
				contacts: action.data
			}
		default:
			return state
	}
}

export default reducer;