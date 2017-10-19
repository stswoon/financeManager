import { combineReducers } from 'redux'
import login from './login'

const appStore = combineReducers({
    login,
    visibilityFilter
});

export default appStore;