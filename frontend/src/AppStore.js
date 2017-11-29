import {createStore, applyMiddleware} from 'redux';
import thunkMiddleware from 'redux-thunk';
import {createLogger} from 'redux-logger';
import {combineReducers} from 'redux'
import loginReducer from './pages/login/login.reducer'
import dashboardReducer from "./pages/dasboard/dashboard.reducer";

//https://monsterlessons.com/project/lessons/reduxjs-asinhronnye-eksheny-s-pomoshyu-redux-thunk
const loggerMiddleware = createLogger();

const rootReducer = combineReducers({
    loginReducer,
    dashboardReducer
});

let serverState = null;
try { //SSR
    serverState = window.__initialData__;
    serverState = {
        dashboardReducer: {
            currentProjectId: serverState.projectId,
            loading: false,
            operations: serverState.operations,
            projects: []
        },
        loginReducer: {
            authData: {}
        }
    }
} catch (e) {
    console.log("SSR::serverState", e)
}

let _store;
if (serverState) {
    _store = createStore(
        rootReducer,
        serverState,
        applyMiddleware(
            thunkMiddleware,
            loggerMiddleware
        )
    );
} else {
    _store = createStore(
        rootReducer,
        applyMiddleware(
            thunkMiddleware,
            loggerMiddleware
        )
    );
}

export const store = _store;


//!!! http://jasonwatmore.com/post/2017/09/16/react-redux-user-registration-and-login-tutorial-example
//http://redux.js.org/docs/basics/ExampleTodoList.html
//http://prgssr.ru/development/pogruzhenie-v-react-redux.html
//https://maxfarseer.gitbooks.io/redux-course-ru/content/prisoedinenie_dannih_connect.html
//! https://habrahabr.ru/post/269831/