import React from 'react';
import {cleanup,fireEvent,render} from '@testing-library/react';
import BackendCommunicationLayer from "./BackendCommunicationLayer.jsx";
import Observable from "../helpers/Observable";
import $ from "jquery";
import Store from "../store.js";
import { Provider } from "react-redux";
import {NEW_DROPTEXT} from "../actions.js";
import COPY from "../configuration/messages-copy.js";

let div;
let getByTestId;
let droptext = "apple #candy";
let store;
let queryByTestId;

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
    describe("communication with DropBackendService", () => {
        it('calls DropBackendService.saveNewDrop if text is set and user clicks "drop" button', (done) => {
            DropBackendService.saveNewDrop = (drop) => {
                return new Observable((observer) => {
                    done();
                })
            };
            store.dispatch(NEW_DROPTEXT(droptext));
            ({ getByTestId } = renderWithOptions({}));
            let dropButton = getByTestId("drop-button");
            fireEvent.click(dropButton);
        });
        it('passes droptext into saveNewDrop function', (done) => {
            DropBackendService.saveNewDrop = (drop) => {
                expect(drop.text).toBe("apple #candy");
                return new Observable((observer) => {
                    done();
                })
            };
            store.dispatch(NEW_DROPTEXT(droptext));
            ({ getByTestId } = renderWithOptions({}));
            let dropButton = getByTestId("drop-button");
            fireEvent.click(dropButton);
        });
        test('passes current username into saveNewDrop as .username', (done) => {
            let testname =  "adamzap";
            DropBackendService.saveNewDrop = (drop) => {
                expect(drop.username).toBe(testname);
                return new Observable((observer) => {
                    done();
                })
            };
            store.dispatch(NEW_DROPTEXT(droptext));
            ({ getByTestId } = renderWithOptions({
                username : testname
            }));
            let dropButton = getByTestId("drop-button");
            fireEvent.click(dropButton);
        });
    });

    describe("attempting...", () => {

        it("dispatches ATTEMPT_SAVE_DROP with drop payload when it begins attempting to save a new drop to backend", (done) => {
            store.dispatch(NEW_DROPTEXT(droptext));
            store.dispatch = jest.fn(store.dispatch);
            ({ getByTestId } = renderWithOptions({
            }));
            let dropButton = getByTestId("drop-button");
            store.dispatch.mockClear();
            fireEvent.click(dropButton);
            let calls = store.dispatch.mock.calls;
            calls.forEach(call => {
                if (call[0].type === "ATTEMPT_SAVE_DROP") {
                    expect(call[0].payload.text).toBe(droptext);
                    done();
                }
            });
        });
        it("pushes SENDING_DROP status when attempting to save drop", () => {
            let pushNewStatusMessage = jest.fn();
            store.dispatch(NEW_DROPTEXT(droptext));
            ({ getByTestId } = renderWithOptions({
                pushNewStatusMessage : pushNewStatusMessage
            }));
            let dropButton = getByTestId("drop-button");
            pushNewStatusMessage.mockClear();
            fireEvent.click(dropButton);
            expect(pushNewStatusMessage.mock.calls[0][0]).toBe(COPY.SENDING_DROP)
        });
        it("adds drop to 'unsavedDrops' when user clicks to save new drop", () => {
            store.dispatch(NEW_DROPTEXT(droptext));
            ({ getByTestId } = renderWithOptions({
            }));
            let dropButton = getByTestId("drop-button");
            fireEvent.click(dropButton);
            let unsavedDropsElt = getByTestId("unsaved-drops");
            let unsavedDropsList = $(".drop-row", unsavedDropsElt);
            expect(unsavedDropsList).toHaveLength(1);
        });
        it("does not immediately add new drop to 'drops' when user clicks to save new drop", () => {
            DropBackendService.saveNewDrop = (username) => {
                return new Observable((observer) => {
                })
            };
            store.dispatch(NEW_DROPTEXT(droptext));
            ({ getByTestId } = renderWithOptions({
            }));
            let dropButton = getByTestId("drop-button");
            fireEvent.click(dropButton);
            let dropsearchElt = getByTestId("drop-search");
            let dropList = $(".drop-row", dropsearchElt);
            expect(dropList).toHaveLength(0);
        });
        it("pushes the SERVER_RESPONSE_ERROR status if create a drop on the server has a failed attempt",() => {
            let localObserver;
            DropBackendService.saveNewDrop = (username) => {
                return new Observable((observer) => {
                    localObserver = observer;
                })
            };
            let pushNewStatusMessage = jest.fn();
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

    describe("failure...",() => {
        it("dispatches DROP_FAILED_TO_SAVE if a drop save is unsuccessful", (done) => {
            let localObserver;
            DropBackendService.saveNewDrop = (username) => {
                return new Observable((observer) => {
                    localObserver = observer;
                })
            };
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
            let calls = store.dispatch.mock.calls;
            calls.forEach(call => {
                if(call[0].type === "DROP_FAILED_TO_SAVE") {
                    expect(call[0].payload.text).toBe(droptext);
                    done();
                }
            });
        });
        it("adds drop to the FailedToSave list if saving fails", () => {
            let localObserver;
            DropBackendService.saveNewDrop = (username) => {
                return new Observable((observer) => {
                    localObserver = observer;
                })
            };
            store.dispatch(NEW_DROPTEXT(droptext));
            ({ getByTestId, queryByTestId } = renderWithOptions({
            }));
            let dropButton = getByTestId("drop-button");
            fireEvent.click(dropButton);
            localObserver.next({
                status: "FAIL",
            });
            let FailedToSaveElt = queryByTestId("FailedToSave");
            let dropsFailedToSave = $(".drop-row", FailedToSaveElt);
            expect(dropsFailedToSave).toHaveLength(1);
        });
        it("removes drop from the UnsavedDrop list if saving fails", () => {
            let localObserver;
            DropBackendService.saveNewDrop = (username) => {
                return new Observable((observer) => {
                    localObserver = observer;
                })
            };
            store.dispatch(NEW_DROPTEXT(droptext));
            ({ getByTestId, queryByTestId } = renderWithOptions({
            }));
            let dropButton = getByTestId("drop-button");
            fireEvent.click(dropButton);
            localObserver.next({
                status: "FAIL",
            });
            let unsavedDropsElt = queryByTestId("unsaved-drops");
            expect(unsavedDropsElt).toBeFalsy();
        });
        it("pushes the POST_DROP_FAILED status if create a drop on the server fails",() => {
            let localObserver;
            DropBackendService.saveNewDrop = (username) => {
                return new Observable((observer) => {
                    localObserver = observer;
                })
            };
            let pushNewStatusMessage = jest.fn();
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
        test('calls setFatalError on failure', () => {
            let setFatalError = jest.fn();
            DropBackendService.saveNewDrop = (username) => {
                return new Observable((observer) => {
                    observer.next({
                        status: "FAIL",
                    });
                })
            };
            store.dispatch(NEW_DROPTEXT(droptext));
            ({ getByTestId } = renderWithOptions({
                setFatalError : setFatalError
            }));
            let dropButton = getByTestId("drop-button");
            fireEvent.click(dropButton);
            expect(setFatalError.mock.calls).toHaveLength(1);
        });
    });


    describe("success...", () => {
        it("dispatches DROP_SUCCESSFULLY_SAVED if a drop is saved successfully", () => {
            let localObserver;
            DropBackendService.saveNewDrop = (username) => {
                return new Observable((observer) => {
                    localObserver = observer;
                })
            };
            store.dispatch(NEW_DROPTEXT(droptext));
            store.dispatch = jest.fn(store.dispatch);
            ({ getByTestId } = renderWithOptions({
            }));
            let dropButton = getByTestId("drop-button");
            fireEvent.click(dropButton);
            store.dispatch.mockClear();
            localObserver.next({
                status: "SUCCESS",
            });
            expect(store.dispatch.mock.calls[0][0].type).toBe("DROP_SUCCESSFULLY_SAVED")
        });
        it("DROP_SUCCESSFULLY_SAVED receives the drop as payload", () => {
            let localObserver;
            DropBackendService.saveNewDrop = (username) => {
                return new Observable((observer) => {
                    localObserver = observer;
                })
            };
            store.dispatch(NEW_DROPTEXT(droptext));
            store.dispatch = jest.fn(store.dispatch);
            ({ getByTestId } = renderWithOptions({
            }));
            let dropButton = getByTestId("drop-button");
            fireEvent.click(dropButton);
            store.dispatch.mockClear();
            localObserver.next({
                status: "SUCCESS",
            });
            let payload = store.dispatch.mock.calls[0][0].payload;
            expect(payload.text).toBe(droptext);
        });
        it("adds drop to list of 'drops' if drop is saved successfully", () => {
            let localObserver;
            DropBackendService.saveNewDrop = (username) => {
                return new Observable((observer) => {
                    localObserver = observer;
                })
            };
            store.dispatch(NEW_DROPTEXT(droptext));
            ({ getByTestId } = renderWithOptions({
            }));
            let dropButton = getByTestId("drop-button");
            fireEvent.click(dropButton);
            let dropsearchElt = getByTestId("drop-search");
            let dropList;
            dropList = $(".drop-row", dropsearchElt);
            expect(dropList).toHaveLength(0);
            localObserver.next({
                status: "SUCCESS"
            });
            dropList = $(".drop-row", dropsearchElt);
            expect(dropList).toHaveLength(1);
        });
        it("removes drop from unsavedDrops list if drop is saved successfully", () => {
            let localObserver;
            DropBackendService.saveNewDrop = (username) => {
                return new Observable((observer) => {
                    localObserver = observer;
                })
            };
            store.dispatch(NEW_DROPTEXT(droptext));
            ({ getByTestId, queryByTestId } = renderWithOptions({
            }));
            let dropButton = getByTestId("drop-button");
            fireEvent.click(dropButton);
            localObserver.next({
                status: "SUCCESS"
            });
            let unsavedDropsElt = queryByTestId("unsaved-drops");
            expect(unsavedDropsElt).toBeFalsy();
        });
        it("pushes the DROP_SAVED_SUCCESS status if create a drop on the server succeeds",() => {
            let localObserver;
            DropBackendService.saveNewDrop = (username) => {
                return new Observable((observer) => {
                    localObserver = observer;
                })
            };
            let pushNewStatusMessage = jest.fn();
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

    });
});