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


describe("if no username in local storage...", () => {
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
    
    

    describe("if user logs in...", () => {
        it("shows MainDumbViewLayer when user logs in",() => {
            DropBackendService.getUserDrops.mockReturnValueOnce(
                new Observable((observer) => {
                    observer.next({
                        status: "SUCCESS",
                        data: exampleData()
                    });
                }));
            ({ getByTestId, queryByTestId } =   render(<App />, div));
            let elt = queryByTestId("username-input");
            expect($(elt).val()).toBe("");
            fireEvent.change(elt, { target: { value: "adam" } });
            let loginButton = getByTestId("login-done-button");
            fireEvent.click(loginButton);
            let MainDumbViewLayerElt = queryByTestId("MainDumbViewLayer");
            expect(MainDumbViewLayerElt).toBeTruthy();
        });
        it("calls getUserDrops when user logs in",(done) => {
            DropBackendService.getUserDrops.mockReturnValueOnce(
                new Observable((observer) => {
                    done();
                    observer.next({
                        status: "SUCCESS",
                        data: exampleData()
                    });
                }));
            ({ getByTestId, queryByTestId } =   render(<App />, div));
            let elt = queryByTestId("username-input");
            expect($(elt).val()).toBe("");
            fireEvent.change(elt, { target: { value: "adam" } });
            let loginButton = getByTestId("login-done-button");
            fireEvent.click(loginButton);
        });
        it("saves username to local storage",(done) => {
            LoginHelper.setLocalUsername = jest.fn();
            DropBackendService.getUserDrops.mockReturnValueOnce(
                new Observable((observer) => {
                    done();
                    observer.next({
                        status: "SUCCESS",
                        data: exampleData()
                    });
                }));
            ({ getByTestId, queryByTestId } =   render(<App />, div));
            let elt = queryByTestId("username-input");
            expect($(elt).val()).toBe("");
            fireEvent.change(elt, { target: { value: "adam" } });
            let loginButton = getByTestId("login-done-button");
            fireEvent.click(loginButton);
            expect(LoginHelper.setLocalUsername.mock.calls[0][0]).toBe("adam");
        });
        it("shows list of drop received from backend",(done) => {
            DropBackendService.getUserDrops.mockReturnValueOnce(
                new Observable((observer) => {
                    done();
                    observer.next({
                        status: "SUCCESS",
                        data: exampleData()
                    });
                }));
            ({ getByTestId, queryByTestId } =   render(<App />, div));
            let elt = queryByTestId("username-input");
            expect($(elt).val()).toBe("");
            fireEvent.change(elt, { target: { value: "adam" } });
            let loginButton = getByTestId("login-done-button");
            fireEvent.click(loginButton);
            let dropSearch = getByTestId("drop-search");
            let dropElts = $(".drop-row", dropSearch);
            expect(dropElts.length).toBeGreaterThan(0);
        });
        it("shows logout button",(done) => {
            DropBackendService.getUserDrops.mockReturnValueOnce(
                new Observable((observer) => {
                    done();
                    observer.next({
                        status: "SUCCESS",
                        data: exampleData()
                    });
                }));
            ({ getByTestId, queryByTestId } =   render(<App />, div));
            let elt = queryByTestId("username-input");
            expect($(elt).val()).toBe("");
            fireEvent.change(elt, { target: { value: "adam" } });
            let loginButton = getByTestId("login-done-button");
            fireEvent.click(loginButton);
            let logoutButton = queryByTestId("logout-button");
            expect(logoutButton).toBeTruthy();
        });
        describe("...then logs out ...",() => {
            it("hides MainDumbViewLayer again",(done) => {
                LoginHelper.unsetLocalUsername = jest.fn();
                DropBackendService.getUserDrops.mockReturnValueOnce(
                    new Observable((observer) => {
                        done();
                        observer.next({
                            status: "SUCCESS",
                            data: exampleData()
                        });
                    }));
                ({ getByTestId, queryByTestId } =   render(<App />, div));
                let elt = queryByTestId("username-input");
                expect($(elt).val()).toBe("");
                fireEvent.change(elt, { target: { value: "adam" } });
                let loginButton = getByTestId("login-done-button");
                fireEvent.click(loginButton);
                let logoutButton = getByTestId("logout-button");
                fireEvent.click(logoutButton);
                let MainDumbViewLayerElt = queryByTestId("MainDumbViewLayer")
                expect(MainDumbViewLayerElt).toBeFalsy();
            });
            it("calls unsetLocalUsername",(done) => {
                LoginHelper.unsetLocalUsername = jest.fn();
                DropBackendService.getUserDrops.mockReturnValueOnce(
                    new Observable((observer) => {
                        done();
                        observer.next({
                            status: "SUCCESS",
                            data: exampleData()
                        });
                    }));
                ({ getByTestId, queryByTestId } =   render(<App />, div));
                let elt = queryByTestId("username-input");
                expect($(elt).val()).toBe("");
                fireEvent.change(elt, { target: { value: "adam" } });
                let loginButton = getByTestId("login-done-button");
                fireEvent.click(loginButton);
                let logoutButton = getByTestId("logout-button");
                fireEvent.click(logoutButton);
                expect(LoginHelper.unsetLocalUsername.mock.calls).toHaveLength(1);
            });
        });
    });
    
});

describe("if username found in local storage...", () => {
    it('renders without crashing', () => {
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
    it('renders MainDumbViewLayer', () => {
        LoginHelper.tryToGetUsernameFromStorage.mockReturnValueOnce("adam");
        DropBackendService.getUserDrops.mockReturnValueOnce(
            new Observable((observer) => {
                observer.next({
                    status: "SUCCESS",
                    data: exampleData()
                });
            }));
        ({ getByTestId } =   render(<App />, div));
        let elt = queryByTestId("MainDumbViewLayer");
        expect(elt).toBeTruthy();
    });
    it('renders LoginBar', () => {
        LoginHelper.tryToGetUsernameFromStorage.mockReturnValueOnce("adam");
        DropBackendService.getUserDrops.mockReturnValueOnce(
            new Observable((observer) => {
                observer.next({
                    status: "SUCCESS",
                    data: exampleData()
                });
            }));
        ({ getByTestId } =   render(<App />, div));
        let elt = queryByTestId("LoginBar");
        expect(elt).toBeTruthy();
    });
});
