import React from 'react';
import {cleanup,fireEvent,render} from '@testing-library/react';
import App from "./App.jsx";
import DropBackendService from "../helpers/DropBackendService.js";
import Observable from "../helpers/Observable.js";
import LoginHelper from "../helpers/LoginHelper.js";
import $ from "jquery";

jest.mock('../helpers/DropBackendService.js');
jest.mock('../helpers/LoginHelper.js');

let div;
let getByTestId, queryByTestId;

let setProps = () => {
}

beforeEach(()=>{
    setProps();
    div = document.createElement('div');
})

afterEach(() => {
    cleanup();
    LoginHelper.setLocalUsername.mockReset();
});

test('renders without crashing, no local username', () => {
    ({ getByTestId } =   render(<App />, div));
});

test('renders without crashing if username in local storage', () => {
    LoginHelper.tryToGetUsernameFromStorage.mockReturnValueOnce("adam");
    DropBackendService.getUserDrops.mockReturnValueOnce(
        new Observable((observer)=> {
            observer.next({
                status: "SUCCESS",
                data: [
                    {
                        text: "candy #apple",
                        hashtags : ["#apple"],
                        key : "0"
                    }
                ]});
        }));
    ({ getByTestId } =   render(<App />, div));
});

describe("renders MainDumbViewLayer with data if username is set",()=>{

    test('renders MainDumbViewLayer if username in local storage', () => {
        LoginHelper.tryToGetUsernameFromStorage.mockReturnValueOnce("adam");
        DropBackendService.getUserDrops.mockReturnValueOnce(
            new Observable((observer)=> {
                observer.next({
                    status: "SUCCESS",
                    data: []
                });
            }));
        ({ getByTestId, queryByTestId } =   render(<App />, div));
        let MainDumbViewLayer = queryByTestId("MainDumbViewLayer");
        expect(MainDumbViewLayer).toBeTruthy();
    });

    test('renders MainDumbViewLayer with data if username in local storage ', () => {
        LoginHelper.tryToGetUsernameFromStorage.mockReturnValueOnce("adam");
        DropBackendService.getUserDrops.mockReturnValueOnce(
            new Observable((observer)=> {
                observer.next({
                    status: "SUCCESS",
                    data: [
                        {
                            text: "candy #apple",
                            hashtags : ["#apple"],
                            key : "0"
                        }
                    ]
                });
            }));
        ({ getByTestId, queryByTestId } =   render(<App />, div));
        let DropSearchElt = queryByTestId("drop-search");
        let dropItems = $(".drop-item", DropSearchElt);
        expect(dropItems).toHaveLength(1);
    });
});

describe("handles fresh login situation", () => {
    it("renders username form if no local username found",()=>{
        LoginHelper.tryToGetUsernameFromStorage.mockReturnValueOnce(undefined);
        ({ getByTestId, queryByTestId } =   render(<App />, div));
        let usernameInput = queryByTestId("username-input");
        expect(usernameInput).toBeTruthy();
    });
    it("updates username in storage upon login",()=>{
        LoginHelper.tryToGetUsernameFromStorage.mockReturnValueOnce(undefined);
        DropBackendService.getUserDrops.mockReturnValueOnce(
            new Observable((observer)=> {
                observer.next({
                    status: "SUCCESS",
                    data: [
                        {
                            text: "candy #apple",
                            hashtags : ["#apple"],
                            key : "0"
                        }
                    ]
                });
            }));
        ({ getByTestId, queryByTestId } =   render(<App />, div));
        let usernameInput = getByTestId("username-input");
        let loginDoneButton = getByTestId("login-done-button");

        fireEvent.change(usernameInput, { target: { value: "adam" } });
        fireEvent.click(loginDoneButton);
        expect(LoginHelper.setLocalUsername.mock.calls.length).toBe(1);
    });
    it("queries for data when user logs in",(done)=>{
        LoginHelper.tryToGetUsernameFromStorage.mockReturnValueOnce(undefined);
        DropBackendService.getUserDrops.mockReturnValueOnce(
            new Observable((observer)=> {
                done();
                observer.next({
                    status: "SUCCESS",
                    data: [
                        {
                            text: "candy #apple",
                            hashtags : ["#apple"],
                            key : "0"
                        }
                    ]
                });
            }));
        ({ getByTestId, queryByTestId } =   render(<App />, div));
        let usernameInput = getByTestId("username-input");
        let loginDoneButton = getByTestId("login-done-button");
        fireEvent.change(usernameInput, { target: { value: "adam" } });
        fireEvent.click(loginDoneButton);
    });
});