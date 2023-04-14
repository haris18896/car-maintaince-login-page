import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import reducers from './reducers';

const middlewares = [thunk];

/**
 * Export the store holding state of whole application with thunk and logger middlewares.
 */
export default createStore(
  reducers,
  {},
  compose(applyMiddleware(...middlewares)),
);
