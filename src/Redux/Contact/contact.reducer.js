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
			break
		case SET_CONTACTS.SUCCESS:
			console.log('action>>>', action)
			return {
				...state,
				contacts: action.data
			}
			break
		default:
			return state
			break

	}
}

export default reducer;