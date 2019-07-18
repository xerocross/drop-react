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

describe("if isUsernameSet false then", () => {
    it('it renders NewUsernameForm', () => {
        ({ getByTestId, queryByTestId } = renderWithOptions({
            isUsernameSet : false
        }));
        let elt = queryByTestId("NewUsernameForm");
        expect(elt).toBeTruthy();
    });
    it('shows login-done-button', () => {
        ({ getByTestId, queryByTestId } = renderWithOptions({
            isUsernameSet : false,
            username : "adam"
        }));
        let elt = queryByTestId("login-done-button");
        expect(elt).toBeTruthy();
    });
    
    describe("the username form", () => {
        it('shows prop username value', () => {
            ({ getByTestId, queryByTestId } = renderWithOptions({
                isUsernameSet : false,
                username : "adam"
            }));
            let elt = queryByTestId("username-input");
            expect(elt.value).toBe("adam");
        });
    });
    it('calls postNewUsername if click login-done-button', (done) => {
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
    it('calls postNewUsername with the new username when user clicks done', (done) => {
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
});
describe("if isUsernameSet true", () => {
    it("does not render NewUsernameForm", () => {
        ({ getByTestId, queryByTestId } = renderWithOptions({
            isUsernameSet : true
        }));
        let elt = queryByTestId("NewUsernameForm");
        expect(elt).toBeFalsy();
    });
});









