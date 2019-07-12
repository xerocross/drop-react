import React, { Component } from "react";
import BaseComponent from "./BaseComponent.jsx";
import TopLayer from "./TopLayer.jsx";
import Store from "../store.js";
import { Provider } from "react-redux";
import './App.scss';

export default class DropApp extends BaseComponent {
    constructor (props) {
        super(props);
        this.store = Store();
    }

    render () {
        return (
            <div className = "App">
                <Provider store={this.store}>
                    <TopLayer/>
                </Provider>
            </div>
        );
    }
}
