import React from 'react';
import {cleanup,fireEvent,render} from '@testing-library/react';
import LoginLayer from "./LoginLayer.jsx";
import Observable from "../helpers/Observable";
import $ from "jquery";
import Store from "../store.js";
import { Provider } from "react-redux";
import {POST_USERNAME_SET, UNSET_USERNAME} from "../actions.js";

let getByTestId, queryByTestId;
let store;
let noop = () => {};
let div;
let LoginHelper = {
    tryToGetUsernameFromStorage (){

    },
    setLocalUsername (){
    }
}

let DropBackendService;

beforeEach(() => {
    store = Store();
    div = document.createElement('div');
    DropBackendService = {
        getUserDrops :  () => (new Observable((observer) => {
        }))
    };
})

afterEach(() => {
    cleanup();
});

let renderWithOptions = (config) => {
    return render(<Provider store={store}><LoginLayer 
        pushNewStatusMessage = {config.pushNewStatusMessage || noop}
        DropBackendService = {config.DropBackendService || DropBackendService}
        updateDrops = {config.DropBackendService || noop}
        unsavedDrops = {config.unsavedDrops || []}
        updateDroptext = {config.updateDroptext || noop}
        createDrop = {config.createDrop || noop}
        updateUnsavedDrops = {config.updateUnsavedDrops || noop}
        setFatalError = {config.setFatalError || noop}
        appAlert = {config.appAlert || noop}
        appConfirm = {config.appConfirm || noop}
        LoginHelper = {config.LoginHelper || LoginHelper}
    /></ Provider>, div );
}

test('renders without crashing', () => {
    renderWithOptions({});
});

test('renders BackendCommunicationLayer if isUsernameSet', () => {
    store.dispatch(POST_USERNAME_SET("adam"));
    ({getByTestId, queryByTestId} = renderWithOptions({}));
    let elt = queryByTestId("BackendCommunicationLayer");
    expect(elt).toBeTruthy();
});

test('does not render BackendCommunicationLayer if username is unset', () => {
    store.dispatch(UNSET_USERNAME("adam"));
    ({getByTestId, queryByTestId} = renderWithOptions({}));
    let elt = queryByTestId("BackendCommunicationLayer");
    expect(elt).toBeFalsy();
});

test('renders LoginBar', () => {
    ({getByTestId, queryByTestId} = renderWithOptions({}));
    let elt = queryByTestId("LoginBar");
    expect(elt).toBeTruthy();
});

test('tries to get username from local storage on mount', () => {
    LoginHelper.tryToGetUsernameFromStorage = jest.fn();
    ({getByTestId, queryByTestId} = renderWithOptions({
        LoginHelper : LoginHelper
    }));
    expect(LoginHelper.tryToGetUsernameFromStorage.mock.calls.length).toBe(1)
});

test('dispatches POST_USERNAME_SET if username is found in local storage', (done) => {
    LoginHelper.tryToGetUsernameFromStorage = jest.fn();
    LoginHelper.tryToGetUsernameFromStorage.mockReturnValueOnce("adam");
    store.dispatch = jest.fn();
    ({getByTestId, queryByTestId} = renderWithOptions({
        LoginHelper : LoginHelper
    }));
    store.dispatch.mock.calls.forEach(call => {
        if (call[0].type === "POST_USERNAME_SET") {
            expect(call[0].payload).toBe("adam");
            done();
        }
    });
});

test('dispatches UNSET_USERNAME if user clicks logout/change username button', (done) => {
    LoginHelper.tryToGetUsernameFromStorage = jest.fn();
    LoginHelper.tryToGetUsernameFromStorage.mockReturnValueOnce("adam");
    store.dispatch = jest.fn(store.dispatch);
    ({getByTestId, queryByTestId} = renderWithOptions({
        LoginHelper : LoginHelper
    }));
    let logoutButton = getByTestId("logout-button");
    fireEvent.click(logoutButton);
    store.dispatch.mock.calls.forEach(call => {
        if (call[0].type === "UNSET_USERNAME") {
            done();
        }
    });
});

test('dispatches POST_USERNAME_SET if user sets username value and clicks login-done-button button', (done) => {
    LoginHelper.tryToGetUsernameFromStorage = jest.fn();
    LoginHelper.tryToGetUsernameFromStorage.mockReturnValueOnce(undefined);
    store.dispatch = jest.fn(store.dispatch);
    ({getByTestId, queryByTestId} = renderWithOptions({
        LoginHelper : LoginHelper
    }));
    let usernameInput = getByTestId("username-input")
    fireEvent.change(usernameInput, { target: { value: "andrew" } });
    let loginDoneButton = getByTestId("login-done-button");
    store.dispatch.mockClear();
    fireEvent.click(loginDoneButton);
    store.dispatch.mock.calls.forEach(call => {
        if (call[0].type === "POST_USERNAME_SET") {
            expect(call[0].payload).toBe("andrew");
            done();
        }
    });
});

test('stores username locally if user sets username', () => {
    LoginHelper.tryToGetUsernameFromStorage = jest.fn();
    LoginHelper.tryToGetUsernameFromStorage.mockReturnValueOnce(undefined);
    store.dispatch = jest.fn(store.dispatch);
    ({getByTestId, queryByTestId} = renderWithOptions({
        LoginHelper : LoginHelper
    }));
    let usernameInput = getByTestId("username-input")
    fireEvent.change(usernameInput, { target: { value: "andrew" } });
    let loginDoneButton = getByTestId("login-done-button");
    store.dispatch.mockClear();
    LoginHelper.setLocalUsername = jest.fn();
    fireEvent.click(loginDoneButton);
    expect(LoginHelper.setLocalUsername.mock.calls[0][0]).toBe("andrew");
});