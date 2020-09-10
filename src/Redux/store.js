import { compose,
	createStore,
	combineReducers,
	applyMiddleware
} from "redux";

import contact from './Contact/contact.reducer';
import apiMiddleware from 'Redux/Middleware/api';


const rootReducer = combineReducers({ contact });

const store = createStore(rootReducer, compose(
	applyMiddleware(apiMiddleware),
	window.devToolsExtension ? window.devToolsExtension() : f => f
))

export default store;
