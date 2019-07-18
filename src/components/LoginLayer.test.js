import React from 'react';
import {cleanup,fireEvent,render} from '@testing-library/react';
import LoginLayer from "./LoginLayer.jsx";
import Observable from "../helpers/Observable";
import $ from "jquery";
import Store from "../store.js";
import { Provider } from "react-redux";
import {POST_USERNAME_SET, UNSET_USERNAME} from "../actions.js";
import {noop} from "../testing-helpers.js";

let getByTestId, queryByTestId;
let store;
let div;
let LoginHelper = {
    tryToGetUsernameFromStorage: noop,
    setLocalUsername: noop,
    unsetLocalUsername : noop
};

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
test('renders LoginBar', () => {
    ({getByTestId, queryByTestId} = renderWithOptions({}));
    let elt = queryByTestId("LoginBar");
    expect(elt).toBeTruthy();
});
it('tries to get username from local storage on mount', () => {
    LoginHelper.tryToGetUsernameFromStorage = jest.fn();
    ({getByTestId, queryByTestId} = renderWithOptions({
        LoginHelper : LoginHelper
    }));
    expect(LoginHelper.tryToGetUsernameFromStorage.mock.calls.length).toBe(1)
});

describe("if username has been posted",() => {
    it('renders IsLoggedInStuff', () => {
        store.dispatch(POST_USERNAME_SET("adam"));
        ({getByTestId, queryByTestId} = renderWithOptions({
            LoginHelper : LoginHelper
        }));
        let IsLoggedInStuff = queryByTestId("IsLoggedInStuff");
        expect(IsLoggedInStuff).toBeTruthy();
    });
    it('renders LoginBar', () => {
        store.dispatch(POST_USERNAME_SET("adam"));
        ({getByTestId, queryByTestId} = renderWithOptions({
            LoginHelper : LoginHelper
        }));
        let elt = queryByTestId("LoginBar");
        expect(elt).toBeTruthy();
    });
});

describe("if UNSET_USERNAME has posted", () => {
    it('does not render IsLoggedInStuff', () => {
        store.dispatch(UNSET_USERNAME());
        ({getByTestId, queryByTestId} = renderWithOptions({
            LoginHelper : LoginHelper
        }));
        let IsLoggedInStuff = queryByTestId("IsLoggedInStuff");
        expect(IsLoggedInStuff).toBeFalsy();
    });
    it('renders LoginBar', () => {
        store.dispatch(UNSET_USERNAME());
        ({getByTestId, queryByTestId} = renderWithOptions({
            LoginHelper : LoginHelper
        }));
        let elt = queryByTestId("LoginBar");
        expect(elt).toBeTruthy();
    });
});

describe("if username is found in local storage", () => {
    it('renders IsLoggedInStuff', () => {
        LoginHelper.tryToGetUsernameFromStorage = jest.fn();
        LoginHelper.tryToGetUsernameFromStorage.mockReturnValueOnce("adam");
        ({getByTestId, queryByTestId} = renderWithOptions({
            LoginHelper : LoginHelper
        }));
        let IsLoggedInStuff = queryByTestId("IsLoggedInStuff");
        expect(IsLoggedInStuff).toBeTruthy();
    });
});

it('renders IsLoggedInStuff if user sets username value and clicks login-done-button button', () => {
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
    let IsLoggedInStuff = queryByTestId("IsLoggedInStuff");
    expect(IsLoggedInStuff).toBeTruthy();
});