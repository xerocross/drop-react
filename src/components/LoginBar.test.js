import React from 'react';
import {cleanup,fireEvent,render} from '@testing-library/react';
import LoginBar from "./LoginBar.jsx";

let div;
let getByTestId;
let queryByTestId;

let setProps = () => {
}
const noop = () => {};

beforeEach(() => {
    setProps();
    div = document.createElement('div');
})

afterEach(() => {
    cleanup();
});

function renderWithOptions (config) {
    return render(<LoginBar 
        username = {config.username || undefined}
        isUsernameSet = {config.isUsernameSet || undefined}
        unsetUsername = {config.unsetUsername || noop}
        postNewUsername = {config.postNewUsername || noop}
    />, div);
}


test('renders without crashing', () => {
    renderWithOptions({
        username : "adam"
    });
});

test('if isUsernameSet then it shows logout/change user button', () => {
    ({ getByTestId, queryByTestId } = renderWithOptions({
        username : "adam",
        isUsernameSet : true
    }));
    let elt = queryByTestId("logout-button");
    expect(elt).toBeTruthy();
});

test('if isUsernameSet false then it does not show logout/change user button', () => {
    ({ getByTestId, queryByTestId } = renderWithOptions({
        username : "adam",
        isUsernameSet : false
    }));
    let elt = queryByTestId("logout-button");
    expect(elt).toBeFalsy();
});

test('if isUsernameSet false then it renders NewUsernameForm', () => {
    ({ getByTestId, queryByTestId } = renderWithOptions({
        isUsernameSet : false
    }));
    let elt = queryByTestId("NewUsernameForm");
    expect(elt).toBeTruthy();
});

test('if isUsernameSet false then username form shows prop username value', () => {
    ({ getByTestId, queryByTestId } = renderWithOptions({
        isUsernameSet : false,
        username : "adam"
    }));
    let elt = queryByTestId("username-input");
    expect(elt.value).toBe("adam");
});


test('if isUsernameSet false then login-done-button shows', () => {
    ({ getByTestId, queryByTestId } = renderWithOptions({
        isUsernameSet : false,
        username : "adam"
    }));
    let elt = queryByTestId("login-done-button");
    expect(elt).toBeTruthy();
});


test('fire login-done-button then calls postNewUsername', (done) => {
    let postNewUsername = () => {
        done();
    }
    ({ getByTestId, queryByTestId } = renderWithOptions({
        isUsernameSet : false,
        username : "adam",
        postNewUsername : postNewUsername
    }));
    let elt = queryByTestId("login-done-button");
    fireEvent.click(elt);
});

test('calls postNewUsername with the new username when user clicks done', (done) => {
    let postNewUsername = (val) => {
        expect(val).toBe("apple");
        done();
    }
    ({ getByTestId, queryByTestId } = renderWithOptions({
        isUsernameSet : false,
        username : "adam",
        postNewUsername : postNewUsername
    }));
    let elt = queryByTestId("username-input");
    fireEvent.change(elt, { target: { value: "apple" } });
    let doneButton = queryByTestId("login-done-button");
    fireEvent.click(doneButton);

});

test('clicking logout button calls unsetUsername', (done) => {
    let unsetUsername = () => {
        done();
    }
    ({ getByTestId, queryByTestId } = renderWithOptions({
        isUsernameSet : true,
        username : "adam",
        unsetUsername : unsetUsername
    }));
    let elt = queryByTestId("logout-button");
    fireEvent.click(elt);
});