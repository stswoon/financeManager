import {createStore, applyMiddleware} from "redux";
import thunkMiddleware from "redux-thunk";
import {createLogger} from "redux-logger";
import {combineReducers} from "redux"
import loginReducer from "./pages/login/login.reducer"
import dashboardReducer from "./pages/dasboard/dashboard.reducer";

let rootReducer;
if (process.env.NODE_ENV !== "production") {
//https://monsterlessons.com/project/lessons/reduxjs-asinhronnye-eksheny-s-pomoshyu-redux-thunk
    const loggerMiddleware = createLogger();

    rootReducer = combineReducers({
        loginReducer,
        dashboardReducer
    });
} else {
    rootReducer = combineReducers({
        dashboardReducer
    });
}

let serverState = null;
try { //SSR
    serverState = window.__initialData__;
    serverState = {
        dashboardReducer: {
            currentProjectId: serverState.currentProjectId,
            loading: false,
            operations: serverState.operations,
            projects: serverState.projects
        },
        loginReducer: {
            authData: serverState.auth
        }
    }
} catch (e) {
    console.log("SSR::serverState", e.message)
}

let _store;
if (serverState) {
    console.log("SSR::init client store with server data");
    _store = createStore(
        rootReducer,
        serverState,
        applyMiddleware(
            thunkMiddleware,
            loggerMiddleware
        )
    );
} else {
    try {
        localStorage.getItem("qwe");


        console.log("SSR::init client store");
        _store = createStore(
            rootReducer,
            applyMiddleware(
                thunkMiddleware,
                loggerMiddleware
            )
        );


    } catch (e) {
        //SSR, in nodejs
        console.log("SSR::init store in nodejs");
        _store = createStore(
            rootReducer,
            applyMiddleware(
                thunkMiddleware,
            )
        );
    }


}

export const store = _store;


//!!! http://jasonwatmore.com/post/2017/09/16/react-redux-user-registration-and-login-tutorial-example
//http://redux.js.org/docs/basics/ExampleTodoList.html
//http://prgssr.ru/development/pogruzhenie-v-react-redux.html
//https://maxfarseer.gitbooks.io/redux-course-ru/content/prisoedinenie_dannih_connect.html
//! https://habrahabr.ru/post/269831/