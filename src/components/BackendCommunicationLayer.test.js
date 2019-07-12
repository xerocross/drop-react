import React from 'react';
import {cleanup,fireEvent,render} from '@testing-library/react';
import BackendCommunicationLayer from "./BackendCommunicationLayer.jsx";
import Observable from "../helpers/Observable";
import $ from "jquery";
import Store from "../store.js";
import { Provider } from "react-redux";
import {NEW_DROPTEXT, UPDATE_DROPS} from "../actions.js";
import COPY from "../configuration/messages-copy.js";

let div;
let getByTestId;
let container;
let store;

let DropBackendService;
let getBackendService = () => {
    return {
        getUserDrops :  () => (new Observable((observer) => {

        })),
        saveNewDrop : (username) => {
            return new Observable((observer) => {
                observer.next({
                });
            })
        },
        deleteDrop : (username) => {
            return new Observable((observer) => {
            });
        }
    };
}
let noop = () => {};
let drops = [
    {
        text: "candy #apple",
        hashtags : ["#apple"],
        key : "syrup",
        _id : "syrup"
    }
]

beforeEach(() => {
    div = document.createElement('div');
    store = Store();
    DropBackendService = getBackendService();
});

afterEach(() => {
    cleanup();
});

let throwIt = (val) => {
    throw new Error(`${val} not defined`);
}

function renderWithOptions (config) {
    return render(<Provider store={store}><BackendCommunicationLayer
        username = {config.username || "adam"}
        pushNewStatusMessage = {config.pushNewStatusMessage || noop}
        changeUser = {config.changeUser || noop}
        DropBackendService = {config.DropBackendService || DropBackendService}
        setFatalError = {config.setFatalError || noop}
        updateDrops = {config.updateDrops || noop}
        isSyncing = {config.isSyncing || false}
        unsavedDrops = {config.unsavedDrops || []}
        updateDroptext = {config.updateDroptext || noop}
        createDrop = {config.createDrop || noop}
        updateUnsavedDrops = {config.updateUnsavedDrops || noop}
        appAlert = {config.appAlert || (() => throwIt("appAlert"))}
        appConfirm = {config.appConfirm || (() => throwIt("appConfirm"))}
        deleteDropFailed = {config.deleteDropFailed || noop}
    /></ Provider>, div);
}


describe("the BackendCommunicationLayer layer", () => {
    test('renders without crashing', () => {
        renderWithOptions({
        });
    });
});