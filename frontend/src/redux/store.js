import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import rootReducer from "./rootReducer";
//https://monsterlessons.com/project/lessons/reduxjs-asinhronnye-eksheny-s-pomoshyu-redux-thunk
const loggerMiddleware = createLogger();

export const store = createStore(
    rootReducer,
    applyMiddleware(
        thunkMiddleware,
        loggerMiddleware
    )
);

//!!! http://jasonwatmore.com/post/2017/09/16/react-redux-user-registration-and-login-tutorial-example
//http://redux.js.org/docs/basics/ExampleTodoList.html
//http://prgssr.ru/development/pogruzhenie-v-react-redux.html
//https://maxfarseer.gitbooks.io/redux-course-ru/content/prisoedinenie_dannih_connect.html
//! https://habrahabr.ru/post/269831/