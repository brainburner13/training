import {createStore, combineReducers, compose, applyMiddleware, Action} from 'redux';
import profileReducer from "./Profile-reducer";
import dialogsReducer from "./Dialogs-reducer";
import sidebarReducer from "./Sidebar-reducer";
import usersReducer from './Users-reducer';
import authReducer from './Auth-reducer';
import thunkMiddleware, { ThunkAction } from 'redux-thunk';
import {reducer as formReducer} from 'redux-form';
import appReducer from './App-reducer';

let reducers = combineReducers({
    profilePage: profileReducer,
    dialogsPage: dialogsReducer,
    sidebar: sidebarReducer,
    usersPage: usersReducer,
    auth: authReducer,
    app: appReducer,
    form: formReducer,
});

type RootReducerType = typeof reducers;
export type AppStateType = ReturnType<RootReducerType>;
export type InferActionTypes<T> = T extends {[key: string]: (...arg: any) => infer U} ? U : never;
export type BaseThunkType<A extends Action, R = Promise<void>> = ThunkAction<R, AppStateType, unknown, A>;

// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers, composeEnhancers(applyMiddleware(thunkMiddleware)));

export default store;