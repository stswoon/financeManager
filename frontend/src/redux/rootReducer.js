import { combineReducers } from 'redux'
import loginReducer from './login.reducer'
import dashboardReducer from "../pages/dasboard/dashboard.reducer";

const rootReducer = combineReducers({
    loginReducer,
    dashboardReducer
});

export default rootReducer;