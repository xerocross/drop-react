import React from 'react';
import {cleanup,fireEvent,render} from '@testing-library/react';
import LoginBar from "./LoginBar.jsx";

let div;
let getByTestId;
let queryByTestId;

let setProps = () => {
}
const noop = ()=>{};

beforeEach(()=>{
    setProps();
    div = document.createElement('div');
})

afterEach(() => {
    cleanup();
});

test('renders without crashing', () => {
    const div = document.createElement('div');
    render(<LoginBar 
        username = {"adam"}
        updateUsername = {noop}
        isUsernameSet = {true}
        changeUser = {noop}
        postNewUsername = {noop}
    />, div);

});

test('if isUsernameSet then it shows logout/change user button', () => {
    const div = document.createElement('div');
    ({ getByTestId, queryByTestId } = render(<LoginBar 
        username = {"adam"}
        updateUsername = {noop}
        isUsernameSet = {true}
        changeUser = {noop}
        postNewUsername = {noop}
    />, div));
    let elt = queryByTestId("logout-button");
    expect(elt).toBeTruthy();
});

test('if isUsernameSet false then it does not show logout/change user button', () => {
    const div = document.createElement('div');
    ({ getByTestId, queryByTestId } = render(<LoginBar 
        username = {"adam"}
        updateUsername = {noop}
        isUsernameSet = {false}
        changeUser = {noop}
        postNewUsername = {noop}
    />, div));
    let elt = queryByTestId("logout-button");
    expect(elt).toBeFalsy();
});

test('if isUsernameSet false then it shows username form', () => {
    const div = document.createElement('div');
    ({ getByTestId, queryByTestId } = render(<LoginBar 
        username = {"adam"}
        updateUsername = {noop}
        isUsernameSet = {false}
        changeUser = {noop}
        postNewUsername = {noop}
    />, div));
    let elt = queryByTestId("username-input");
    expect(elt).toBeTruthy();
});

test('if isUsernameSet false then username form shows prop username value', () => {
    const div = document.createElement('div');
    ({ getByTestId, queryByTestId } = render(<LoginBar 
        username = {"adam"}
        updateUsername = {noop}
        isUsernameSet = {false}
        changeUser = {noop}
        postNewUsername = {noop}
    />, div));
    let elt = queryByTestId("username-input");
    expect(elt.value).toBe("adam");
});


test('if isUsernameSet false then login-done-button shows', () => {
    const div = document.createElement('div');
    ({ getByTestId, queryByTestId } = render(<LoginBar 
        username = {"adam"}
        updateUsername = {noop}
        isUsernameSet = {false}
        changeUser = {noop}
        postNewUsername = {noop}
    />, div));
    let elt = queryByTestId("login-done-button");
    expect(elt).toBeTruthy();
});


test('fire login-done-button then calls postNewUsername', (done) => {
    const div = document.createElement('div');
    let postNewUsername = ()=>{
        done();
    }
    ({ getByTestId, queryByTestId } = render(<LoginBar 
        username = {"adam"}
        updateUsername = {noop}
        isUsernameSet = {false}
        changeUser = {noop}
        postNewUsername = {postNewUsername}
    />, div));
    let elt = queryByTestId("login-done-button");
    fireEvent.click(elt);
});

test('changing value of username-input form calls updateUsername', (done) => {
    const div = document.createElement('div');
    let updateUsername = (val)=>{
        expect(val).toBe("apple");
        done();
    }
    ({ getByTestId, queryByTestId } = render(<LoginBar 
        username = {"adam"}
        updateUsername = {updateUsername}
        isUsernameSet = {false}
        changeUser = {noop}
        postNewUsername = {noop}
    />, div));
    let elt = queryByTestId("username-input");
    fireEvent.change(elt, { target: { value: "apple" } });
});

test('clicking logout button calls changeUser', (done) => {
    const div = document.createElement('div');
    let changeUser = (val)=>{
        done();
    }
    ({ getByTestId, queryByTestId } = render(<LoginBar 
        username = {"adam"}
        updateUsername = {noop}
        isUsernameSet = {true}
        changeUser = {changeUser}
        postNewUsername = {noop}
    />, div));
    let elt = queryByTestId("logout-button");
    fireEvent.click(elt);
});