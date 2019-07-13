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




describe("handles saveNewDrop correctly", () => {
        
    describe("status messages", () => {
        it("pushes the POST_DROP_FAILED status if create a drop on the server fails",() => {
            let localObserver;
            DropBackendService.saveNewDrop = (username) => {
                return new Observable((observer) => {
                    localObserver = observer;
                })
            };
            let pushNewStatusMessage = jest.fn();
            let droptext = "apple #candy";
            store.dispatch(NEW_DROPTEXT(droptext));
            ({ getByTestId } = renderWithOptions({
                pushNewStatusMessage : pushNewStatusMessage
            }));
            let dropButton = getByTestId("drop-button");
            fireEvent.click(dropButton);
            pushNewStatusMessage.mockClear();
            localObserver.next({
                status: "FAIL",
            });
            expect(pushNewStatusMessage.mock.calls[0][0]).toBe(COPY.POST_DROP_FAILED)
        });
        it("pushes the DROP_SAVED_SUCCESS status if create a drop on the server succeeds",() => {
            let localObserver;
            DropBackendService.saveNewDrop = (username) => {
                return new Observable((observer) => {
                    localObserver = observer;
                })
            };
            let pushNewStatusMessage = jest.fn();
            let droptext = "apple #candy";
            store.dispatch(NEW_DROPTEXT(droptext));
            ({ getByTestId } = renderWithOptions({
                pushNewStatusMessage : pushNewStatusMessage
            }));
            let dropButton = getByTestId("drop-button");
            fireEvent.click(dropButton);
            pushNewStatusMessage.mockClear();
            localObserver.next({
                status: "SUCCESS",
            });
            expect(pushNewStatusMessage.mock.calls[0][0]).toBe(COPY.DROP_SAVED_SUCCESS)
        });
        it("pushes the SERVER_RESPONSE_ERROR status if create a drop on the server has a failed attempt",() => {
            let localObserver;
            DropBackendService.saveNewDrop = (username) => {
                return new Observable((observer) => {
                    localObserver = observer;
                })
            };
            let pushNewStatusMessage = jest.fn();
            let droptext = "apple #candy";
            store.dispatch(NEW_DROPTEXT(droptext));
            ({ getByTestId } = renderWithOptions({
                pushNewStatusMessage : pushNewStatusMessage
            }));
            let dropButton = getByTestId("drop-button");
            fireEvent.click(dropButton);
            pushNewStatusMessage.mockClear();
            localObserver.next({
                status: "FAILED_ATTEMPT",
            });
            expect(pushNewStatusMessage.mock.calls[0][0]).toBe(COPY.SERVER_RESPONSE_ERROR)
        });
    });

    it("dispatches ADD_UNSAVED_DROP if saving drop fails",() => {
        let localObserver;
        DropBackendService.saveNewDrop = (username) => {
            return new Observable((observer) => {
                localObserver = observer;
            })
        };
        let droptext = "apple #candy";
        store.dispatch(NEW_DROPTEXT(droptext));
        store.dispatch = jest.fn(store.dispatch);
        ({ getByTestId } = renderWithOptions({
        }));
        let dropButton = getByTestId("drop-button");
        fireEvent.click(dropButton);
        store.dispatch.mockClear();
        localObserver.next({
            status: "FAIL",
        });
        expect(store.dispatch.mock.calls.length).toBe(1);
        expect(store.dispatch.mock.calls[0][0].type).toBe("ADD_UNSAVED_DROP");
    });

    test('calls DropBackendService.saveNewDrop if text is set and user clicks "drop" button', (done) => {
        DropBackendService.saveNewDrop = (drop) => {
            return new Observable((observer) => {
                done();
            })
        };
        let droptext = "apple #candy";
        store.dispatch(NEW_DROPTEXT(droptext));
        ({ getByTestId } = renderWithOptions({}));
        let dropButton = getByTestId("drop-button");
        fireEvent.click(dropButton);
    });

    


    test('calls setFatalError if call to DropBackendService.saveNewDrop returns status "FAIL"', (done) => {
        let setFatalError = () => {
            done();
        }
        DropBackendService.saveNewDrop = (username) => {
            return new Observable((observer) => {
                observer.next({
                    status: "FAIL",
                });
            })
        };
        let droptext = "apple #candy";
        store.dispatch(NEW_DROPTEXT(droptext));
        ({ getByTestId, container } = renderWithOptions({
            setFatalError : setFatalError
        }));
        let dropButton = getByTestId("drop-button");
        fireEvent.click(dropButton);
    });

    test('passes droptext into saveNewDrop function', (done) => {
        DropBackendService.saveNewDrop = (drop) => {
            expect(drop.text).toBe("apple #candy");
            return new Observable((observer) => {
                done();
            })
        };
        let droptext = "apple #candy";
        store.dispatch(NEW_DROPTEXT(droptext));
        ({ getByTestId } = renderWithOptions({}));
        let dropButton = getByTestId("drop-button");
        fireEvent.click(dropButton);
    });

    test('passes current username into saveNewDrop as .username', (done) => {
        DropBackendService.saveNewDrop = (drop) => {
            expect(drop.username).toBe("adamzap");
            return new Observable((observer) => {
                done();
            })
        };
        let droptext = "apple #candy";
        store.dispatch(NEW_DROPTEXT(droptext));
        ({ getByTestId } = renderWithOptions({
            username : "adamzap"
        }));
        let dropButton = getByTestId("drop-button");
        fireEvent.click(dropButton);
    });
});