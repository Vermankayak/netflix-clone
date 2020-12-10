import { combineReducers } from 'redux';

import updateNavBar from './navBarReducer'
import authReducer from './authReducer'
import actionReducer from './actionReducer'
import paymentReducer from './paymentReducer'


const rootReducer = combineReducers({
  updateNav:updateNavBar,
  authReducer:authReducer,
  action:actionReducer,
  payment:paymentReducer
})

export default rootReducer