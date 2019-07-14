import React from 'react';
import {cleanup,fireEvent,render} from '@testing-library/react';
import App from "./components/App.jsx";
import DropBackendService from "./helpers/DropBackendService.js";
import Observable from "./helpers/Observable.js";
import LoginHelper from "./helpers/LoginHelper.js";
import $ from "jquery";

jest.mock('./helpers/DropBackendService.js');
jest.mock('./helpers/LoginHelper.js');

let div;
let getByTestId, queryByTestId;

beforeEach(() => {
    div = document.createElement('div');
})

afterEach(() => {
    cleanup();
    LoginHelper.setLocalUsername.mockReset();
});

let exampleData = () => {
    return [
        {
            text: "candy #apple",
            hashtags : ["#apple"],
            key : "0"
        }
    ];
}



it('renders without crashing if username in local storage', () => {
    LoginHelper.tryToGetUsernameFromStorage.mockReturnValueOnce("adam");
    DropBackendService.getUserDrops.mockReturnValueOnce(
        new Observable((observer) => {
            observer.next({
                status: "SUCCESS",
                data: exampleData()
            });
        }));
    ({ getByTestId } =   render(<App />, div));
});

describe("handles no username set", () => {
    it('renders app without crashing', () => {
        ({ getByTestId } =   render(<App />, div));
    });

    it("show the LoginBar",() => {
        ({ getByTestId, queryByTestId } =   render(<App />, div));
        let elt = queryByTestId("LoginBar");
        expect(elt).toBeTruthy();
    });
    it("does not show MainDumbViewLayer",() => {
        ({ getByTestId, queryByTestId } =   render(<App />, div));
        let elt = queryByTestId("MainDumbViewLayer");
        expect(elt).toBeFalsy();
    });
    it("shows the username-input form",() => {
        ({ getByTestId, queryByTestId } =   render(<App />, div));
        let elt = queryByTestId("username-input");
        expect(elt).toBeTruthy();
    });
    it("has empty value for username-input form",() => {
        ({ getByTestId, queryByTestId } =   render(<App />, div));
        let elt = queryByTestId("username-input");
        expect($(elt).val()).toBe("");
    });
    it("allows user to change value of username-input form",() => {
        ({ getByTestId, queryByTestId } =   render(<App />, div));
        let elt = queryByTestId("username-input");
        expect($(elt).val()).toBe("");
        fireEvent.change(elt, { target: { value: "adam" } });
    });

});
