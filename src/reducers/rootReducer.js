import { combineReducers } from 'redux';

import updateNavBar from './navBarReducer'
import authReducer from './authReducer'


const rootReducer = combineReducers({
  updateNav:updateNavBar,
  authReducer:authReducer
})

export default rootReducer