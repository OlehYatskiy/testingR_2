import { compose,
	createStore,
	combineReducers,
	applyMiddleware
} from "redux";

import product from './Product/product.reducer';
import apiMiddleware from 'Redux/Middleware/api';


const rootReducer = combineReducers({ product });

const store = createStore(rootReducer, compose(
	applyMiddleware(apiMiddleware),
	window.devToolsExtension ? window.devToolsExtension() : f => f
))

export default store;
