import {createStore, applyMiddleware } from "redux";
import reducer from "./reducer.js";
import thunk from "redux-thunk";
export default ()=> {return createStore(reducer, applyMiddleware(thunk))}