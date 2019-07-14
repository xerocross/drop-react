import React from 'react';
import {cleanup,fireEvent,render, act} from '@testing-library/react';
import $ from "jquery";
import Store from "../store.js";
import { Provider } from "react-redux";
import {NEW_DROPTEXT, UPDATE_DROPS} from "../actions.js";
import TopLayer from "./TopLayer.jsx";
import LoginHelper from "../helpers/LoginHelper.js";
import DropBackendService from "../helpers/DropBackendService.js";
import Observable from "../helpers/Observable.js";

jest.mock('../helpers/DropBackendService.js');
jest.mock('../helpers/LoginHelper.js');

let div;
let getByTestId, queryByTestId;
let container;
let store;

let noop = () => {};
let drops = [];
let droptext = "test";
let drops_nonempty = [
    {
        text: "candy #apple",
        hashtags : ["#apple"],
        key : "0"
    },
    {
        text: "candy #pear",
        hashtags : ["#pear"],
        key : "1"
    },
    {
        text: "candy #watermelon",
        hashtags : ["#watermelon"],
        key : "2"
    }
];

let exampleData = () => {
    return [
        {
            text: "candy #apple",
            hashtags : ["#apple"],
            key : "0"
        }
    ];
}

beforeEach(() => {
    store = Store();
    div = document.createElement('div');
})

afterEach(() => {
    cleanup();
});

function renderWithOptions (config) {
    return ({ getByTestId } = render(<Provider store={store}><TopLayer /></Provider>, div) );
}

it('renders without crashing', () => {
    ({ getByTestId } = renderWithOptions());
});


