import React from 'react';
import {cleanup,fireEvent,render} from '@testing-library/react';
import LoginLayer from "./LoginLayer.jsx";
import Observable from "../helpers/Observable";
import $ from "jquery";
import Store from "../store.js";
import { Provider } from "react-redux";
import {NEW_DROPTEXT, UPDATE_DROPS} from "../actions.js";

let getByTestId, queryByTestId;
let container;
let store;
let noop = ()=>{};
let div;
let setProps = () => {};
let LoginHelper = {
    tryToGetUsernameFromStorage(){

    },
    setLocalUsername(){

    }
}

let DropBackendService;

beforeEach(()=>{
    store = Store();
    div = document.createElement('div');
    setProps();
    DropBackendService = {
        getUserDrops :  ()=> (new Observable((observer)=> {
    
        }))
    };
})

afterEach(() => {
    cleanup();
});

test('renders without crashing', () => {
    ({getByTestId} = render(<Provider store={store}><LoginLayer 
        pushNewStatusMessage = {noop}
        DropBackendService = {DropBackendService}
        updateDrops = {noop}
        drops = {[]}
        droptext = {""}
        isSyncing = {false}
        unsavedDrops = {[]}
        updateDroptext = {noop}
        createDrop = {noop}
        updateUnsavedDrops = {noop}
        setFatalError = {noop}
        appAlert = {noop}
        appConfirm = {noop}
        updateUsername = {noop}
        username = {""}
        updateIsUsernameSet = {noop}
        isUsernameSet = {true}
        LoginHelper = {LoginHelper}
    /></ Provider>, div ));
});

test('renders BackendCommunicationLayer if isUsernameSet', () => {
    ({getByTestId, queryByTestId} = render(<Provider store={store}><LoginLayer 
        pushNewStatusMessage = {noop}
        DropBackendService = {DropBackendService}
        updateDrops = {noop}
        drops = {[]}
        droptext = {""}
        isSyncing = {false}
        unsavedDrops = {[]}
        updateDroptext = {noop}
        createDrop = {noop}
        updateUnsavedDrops = {noop}
        setFatalError = {noop}
        appAlert = {noop}
        appConfirm = {noop}
        updateUsername = {noop}
        username = {""}
        updateIsUsernameSet = {noop}
        isUsernameSet = {true}
        LoginHelper = {LoginHelper}
    /></ Provider>, div  ));

    let elt = queryByTestId("BackendCommunicationLayer");
    expect(elt).toBeTruthy();
});

test('does not render BackendCommunicationLayer if isUsernameSet is false', () => {
    ({getByTestId, queryByTestId} = render(<Provider store={store}><LoginLayer 
        pushNewStatusMessage = {noop}
        DropBackendService = {DropBackendService}
        updateDrops = {noop}
        drops = {[]}
        droptext = {""}
        isSyncing = {false}
        unsavedDrops = {[]}
        updateDroptext = {noop}
        createDrop = {noop}
        updateUnsavedDrops = {noop}
        setFatalError = {noop}
        appAlert = {noop}
        appConfirm = {noop}
        updateUsername = {noop}
        username = {""}
        updateIsUsernameSet = {noop}
        isUsernameSet = {false}
        LoginHelper = {LoginHelper}
    /></ Provider>, div  ));

    let elt = queryByTestId("BackendCommunicationLayer");
    expect(elt).toBeFalsy();
});

test('renders LoginBar', () => {
    ({getByTestId, queryByTestId} = render(<Provider store={store}><LoginLayer 
        pushNewStatusMessage = {noop}
        DropBackendService = {DropBackendService}
        updateDrops = {noop}
        drops = {[]}
        droptext = {""}
        isSyncing = {false}
        unsavedDrops = {[]}
        updateDroptext = {noop}
        createDrop = {noop}
        updateUnsavedDrops = {noop}
        setFatalError = {noop}
        appAlert = {noop}
        appConfirm = {noop}
        updateUsername = {noop}
        username = {""}
        updateIsUsernameSet = {noop}
        isUsernameSet = {false}
        LoginHelper = {LoginHelper}
    /></ Provider>, div  ));

    let elt = queryByTestId("LoginBar");
    expect(elt).toBeTruthy();
});

test('tries to get username from local storage on mount', (done) => {
    LoginHelper.tryToGetUsernameFromStorage = () => {
        done();
    }
    ({getByTestId, queryByTestId} = render(<Provider store={store}><LoginLayer 
        pushNewStatusMessage = {noop}
        DropBackendService = {DropBackendService}
        updateDrops = {noop}
        drops = {[]}
        droptext = {""}
        isSyncing = {false}
        unsavedDrops = {[]}
        updateDroptext = {noop}
        createDrop = {noop}
        updateUnsavedDrops = {noop}
        setFatalError = {noop}
        appAlert = {noop}
        appConfirm = {noop}
        updateUsername = {noop}
        username = {""}
        updateIsUsernameSet = {noop}
        isUsernameSet = {false}
        LoginHelper = {LoginHelper}
    /></ Provider>, div  ));
});

test('updates state username if username is found in local storage', (done) => {
    LoginHelper.tryToGetUsernameFromStorage = (done) => {
        return "adam";
    }
    let updateUsername = (newVal)=>{
        expect(newVal).toBe("adam");
        done();
    }
    ({getByTestId, queryByTestId} = render(<Provider store={store}><LoginLayer 
        pushNewStatusMessage = {noop}
        DropBackendService = {DropBackendService}
        updateDrops = {noop}
        drops = {[]}
        droptext = {""}
        isSyncing = {false}
        unsavedDrops = {[]}
        updateDroptext = {noop}
        createDrop = {noop}
        updateUnsavedDrops = {noop}
        setFatalError = {noop}
        appAlert = {noop}
        appConfirm = {noop}
        updateUsername = {updateUsername}
        username = {""}
        updateIsUsernameSet = {noop}
        isUsernameSet = {false}
        LoginHelper = {LoginHelper}
    /></ Provider>, div  ));
});

test('updates isUsernameSet to false if click logout/change username button', (done) => {
    let updateIsUsernameSet = (newVal)=>{
        expect(newVal).toBe(false);
        done();
    }
    LoginHelper.tryToGetUsernameFromStorage = () => {
        return undefined;
    }
    ({getByTestId, queryByTestId} = render(<Provider store={store}><LoginLayer 
        pushNewStatusMessage = {noop}
        DropBackendService = {DropBackendService}
        updateDrops = {noop}
        drops = {[]}
        droptext = {""}
        isSyncing = {false}
        unsavedDrops = {[]}
        updateDroptext = {noop}
        createDrop = {noop}
        updateUnsavedDrops = {noop}
        setFatalError = {noop}
        appAlert = {noop}
        appConfirm = {noop}
        updateUsername = {noop}
        username = {"adam"}
        updateIsUsernameSet = {updateIsUsernameSet}
        isUsernameSet = {true}
        LoginHelper = {LoginHelper}
    /></ Provider>, div  ));
    let logoutButton = getByTestId("logout-button");
    fireEvent.click(logoutButton);
});

test('calls updateUsername if username-input is changed', (done) => {
    let updateUsername = (newVal)=>{
        expect(newVal).toBe("paul");
        done();
    }
    LoginHelper.tryToGetUsernameFromStorage = () => {
        return undefined;
    }
    ({getByTestId, queryByTestId} = render(<Provider store={store}><LoginLayer 
        pushNewStatusMessage = {noop}
        DropBackendService = {DropBackendService}
        updateDrops = {noop}
        drops = {[]}
        droptext = {""}
        isSyncing = {false}
        unsavedDrops = {[]}
        updateDroptext = {noop}
        createDrop = {noop}
        updateUnsavedDrops = {noop}
        setFatalError = {noop}
        appAlert = {noop}
        appConfirm = {noop}
        updateUsername = {updateUsername}
        username = {""}
        updateIsUsernameSet = {noop}
        isUsernameSet = {false}
        LoginHelper = {LoginHelper}
    /></ Provider>, div  ));
    let usernameInput = getByTestId("username-input");
    fireEvent.change(usernameInput, { target: { value: "paul" } });
});

test('calls updateIsUsernameSet true if click login-done-button button', (done) => {
    LoginHelper.tryToGetUsernameFromStorage = () => {
        return undefined;
    }
    let updateIsUsernameSet = (val) => {
        expect(val).toBe(true);
        done();
    }
    ({getByTestId, queryByTestId} = render(<Provider store={store}><LoginLayer 
        pushNewStatusMessage = {noop}
        DropBackendService = {DropBackendService}
        updateDrops = {noop}
        drops = {[]}
        droptext = {""}
        isSyncing = {false}
        unsavedDrops = {[]}
        updateDroptext = {noop}
        createDrop = {noop}
        updateUnsavedDrops = {noop}
        setFatalError = {noop}
        appAlert = {noop}
        appConfirm = {noop}
        updateUsername = {noop}
        username = {"adam"}
        updateIsUsernameSet = {updateIsUsernameSet}
        isUsernameSet = {false}
        LoginHelper = {LoginHelper}
    /></ Provider>, div  ));
    let loginDoneButton = getByTestId("login-done-button");
    fireEvent.click(loginDoneButton);
});