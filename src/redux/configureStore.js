import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import CompanyReducer from './reducers/companiesReducer';
import { reducer as formReducer } from 'redux-form';

function configureStore() {
	const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
	const store = createStore(
		combineReducers({
			companies: CompanyReducer,
			form: formReducer
		}),
		composeEnhancers(applyMiddleware())
	)
	return store;
}

export default configureStore;