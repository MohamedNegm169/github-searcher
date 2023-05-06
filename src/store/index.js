import { legacy_createStore as createStore ,combineReducers, applyMiddleware} from 'redux'
import { persistStore, persistReducer } from 'redux-persist';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import storage from 'redux-persist/lib/storage';
import filters from './filters/filterReducer'
import listReducer from './List/listReducer'

const rootReducer=combineReducers({
  list: listReducer,
  filters: filters,
})

const persistConfig = {
  key: 'persistKey',
  storage: storage
};
const pReducer = persistReducer(persistConfig, rootReducer);
const middleware = applyMiddleware(thunk, logger);
const store = createStore(pReducer, middleware);
const persistor = persistStore(store);

export { persistor, store };