import React from 'react';
import {cleanup,fireEvent,render, act} from '@testing-library/react';
import BackendCommunicationLayer from "./BackendCommunicationLayer.jsx";
import Observable from "../helpers/Observable";
import $ from "jquery";

let div;
let getByTestId, queryByTestId;
let container;


let DropBackendService = {
    getUserDrops :  ()=> (new Observable((observer)=> {

    }))
};


let noop = ()=>{};
let drops = [];
let drops_nonempty = [
    {
        text: "candy #apple",
        hashtags : ["#apple"],
        key : "0"
    },
    {
        text: "candy #pear",
        hashtags : ["#pear"],
        key : "1"
    },
    {
        text: "candy #watermelon",
        hashtags : ["#watermelon"],
        key : "2"
    }
];

beforeEach(()=>{
    div = document.createElement('div');

    DropBackendService = {
        getUserDrops :  ()=> (new Observable((observer)=> {
    
        }))
    };
    
});

afterEach(() => {
    cleanup();
});

test('renders without crashing', () => {
    render(<BackendCommunicationLayer
        username = {"adam"}
        pushNewStatusMessage = {noop}
        changeUser = {noop}
        drops = {[]}
        DropBackendService = {DropBackendService}
        setFatalError = {noop}
        updateDrops = {noop}
        droptext = {""}
        isSyncing = {false}
        unsavedDrops = {[]}
        updateDroptext = {noop}
        createDrop = {noop}
        updateUnsavedDrops = {noop}
        appAlert = {noop}
    />, div);
});


test('calls getUserDrops on mount', (done) => {
    DropBackendService.getUserDrops = ()=> {
        done();
        return new Observable((observer)=> {})
    };
    render(<BackendCommunicationLayer
        username = {"adam"}
        pushNewStatusMessage = {noop}
        changeUser = {noop}
        drops = {[]}
        DropBackendService = {DropBackendService}
        setFatalError = {noop}
        updateDrops = {noop}
        droptext = {""}
        isSyncing = {false}
        unsavedDrops = {[]}
        updateDroptext = {noop}
        createDrop = {noop}
        updateUnsavedDrops = {noop}
        appAlert = {noop}
    />, div);
});


test('calls getUserDrops on mount with the username that was passed in', (done) => {
    DropBackendService.getUserDrops = (username)=> {
        expect(username).toBe("adam");
        done();
        return new Observable((observer)=> {
        })
    };
    render(<BackendCommunicationLayer
        username = {"adam"}
        pushNewStatusMessage = {noop}
        changeUser = {noop}
        drops = {[]}
        DropBackendService = {DropBackendService}
        setFatalError = {noop}
        updateDrops = {noop}
        droptext = {""}
        isSyncing = {false}
        unsavedDrops = {[]}
        updateDroptext = {noop}
        createDrop = {noop}
        updateUnsavedDrops = {noop}
        appAlert = {noop}
    />, div);
});

test('calls getUserDrops on mount and subscribes to observable', (done) => {
    DropBackendService.getUserDrops = (username)=> {
        return new Observable((observer)=> {
            done();
        })
    };
    render(<BackendCommunicationLayer
        username = {"adam"}
        pushNewStatusMessage = {noop}
        changeUser = {noop}
        drops = {[]}
        DropBackendService = {DropBackendService}
        setFatalError = {noop}
        updateDrops = {noop}
        droptext = {""}
        isSyncing = {false}
        unsavedDrops = {[]}
        updateDroptext = {noop}
        createDrop = {noop}
        updateUnsavedDrops = {noop}
        appAlert = {noop}
    />, div);
});

test('clicking drop button and test is set calls DropBackendService.saveNewDrop', (done) => {
    DropBackendService.saveNewDrop = (drop)=> {
        return new Observable((observer)=> {
            done();
        })
    };
    ({ getByTestId } = render(<BackendCommunicationLayer
        username = {"adam"}
        pushNewStatusMessage = {noop}
        changeUser = {noop}
        drops = {[]}
        DropBackendService = {DropBackendService}
        setFatalError = {noop}
        updateDrops = {noop}
        droptext = {"apple #candy"}
        isSyncing = {false}
        unsavedDrops = {[]}
        updateDroptext = {noop}
        createDrop = {noop}
        updateUnsavedDrops = {noop}
        appAlert = {noop}
    />, div));
    let dropButton = getByTestId("drop-button");
    fireEvent.click(dropButton);
});

test('clicking drop button calls DropBackendService.saveNewDrop with drop data', (done) => {
    DropBackendService.saveNewDrop = (drop)=> {
        expect(drop.text).toBe("apple #candy");
        expect(drop.hashtags[0]).toBe("#candy");
        return new Observable((observer)=> {
            done();
        })
    };
    ({ getByTestId } = render(<BackendCommunicationLayer
        username = {"adam"}
        pushNewStatusMessage = {noop}
        changeUser = {noop}
        drops = {[]}
        DropBackendService = {DropBackendService}
        setFatalError = {noop}
        updateDrops = {noop}
        droptext = {"apple #candy"}
        isSyncing = {false}
        unsavedDrops = {[]}
        updateDroptext = {noop}
        createDrop = {noop}
        updateUnsavedDrops = {noop}
        appAlert = {noop}
    />, div));
    let dropButton = getByTestId("drop-button");
    fireEvent.click(dropButton);
});

test('updates drops array if getUserDrops returns drops data: has right number of items (1)', (done) => {
    DropBackendService.getUserDrops = (username)=> {
        return new Observable((observer)=> {
            observer.next({
                status: "SUCCESS",
                data: [
                    {
                        text: "candy #apple",
                        hashtags : ["#apple"],
                        key : "0"
                    }
                ]});
        })
    };
    let updateDrops = (drops)=>{
        expect(drops).toHaveLength(1);
        done();
    }
    ({ getByTestId } = render(<BackendCommunicationLayer
        username = {"adam"}
        pushNewStatusMessage = {noop}
        changeUser = {noop}
        drops = {[]}
        DropBackendService = {DropBackendService}
        setFatalError = {noop}
        updateDrops = {updateDrops}
        droptext = {"apple #candy"}
        isSyncing = {false}
        unsavedDrops = {[]}
        updateDroptext = {noop}
        createDrop = {noop}
        updateUnsavedDrops = {noop}
        appAlert = {noop}
    />, div));
});

test('updates drops array if getUserDrops returns drops data: has right number of items (2)', (done) => {
    DropBackendService.getUserDrops = (username)=> {
        return new Observable((observer)=> {
            observer.next({
                status: "SUCCESS",
                data: [
                    {
                        text: "candy #apple",
                        hashtags : ["#apple"],
                        key : "0"
                    },
                    {
                        text: "candy #apple",
                        hashtags : ["#apple"],
                        key : "1"
                    },
                    {
                        text: "candy #apple",
                        hashtags : ["#apple"],
                        key : "2"
                    }
                ]
            });
        })
    };
    let updateDrops = (drops)=>{
        expect(drops).toHaveLength(3);
        done();
    }
    ({ getByTestId } = render(<BackendCommunicationLayer
        username = {"adam"}
        pushNewStatusMessage = {noop}
        changeUser = {noop}
        drops = {[]}
        DropBackendService = {DropBackendService}
        setFatalError = {noop}
        updateDrops = {updateDrops}
        droptext = {"apple #candy"}
        isSyncing = {false}
        unsavedDrops = {[]}
        updateDroptext = {noop}
        createDrop = {noop}
        updateUnsavedDrops = {noop}
        appAlert = {noop}
    />, div));
});

test('clicking to delete a drop (confirmed) calls DropBackendService.deleteDrop', (done) => {
    let deleteDrop = (drop)=>{
    }
    
    let drops = [
        {
            text: "candy #apple",
            hashtags : ["#apple"],
            key : "syrup",
            _id : "syrup"
        }
    ]
    DropBackendService.deleteDrop = (id)=>{
        expect(id).toBe("syrup");
        return  new Observable((observer)=> {
            done();
        })
    }
    ({ getByTestId, container } = render(<BackendCommunicationLayer
        username = {"adam"}
        pushNewStatusMessage = {noop}
        changeUser = {noop}
        drops = {drops}
        DropBackendService = {DropBackendService}
        setFatalError = {noop}
        updateDrops = {noop}
        droptext = {"apple"}
        isSyncing = {false}
        unsavedDrops = {[]}
        updateDroptext = {noop}
        createDrop = {noop}
        updateUnsavedDrops = {noop}
        appAlert = {noop}
        appConfirm = {()=>(true)}
        deleteDrop = {deleteDrop}
    />, div));
    let deleteButton = $(".drop-search", container).find(".del-button").get(0);
    fireEvent.click(deleteButton);
});

test('clicking to delete a drop (not confirmed) does not call DropBackendService.deleteDrop', (done) => {
    let deleteDrop = (drop)=>{
        done();
    }
    let drops = [
        {
            text: "candy #apple",
            hashtags : ["#apple"],
            key : "syrup",
            _id : "syrup"
        }
    ]
    DropBackendService.deleteDrop = (id)=>{
        expect(false).toBe(true);
        done();
        return  new Observable((observer)=> {
            done();
        })
    }
    ({ getByTestId, container } = render(<BackendCommunicationLayer
        username = {"adam"}
        pushNewStatusMessage = {noop}
        changeUser = {noop}
        drops = {drops}
        DropBackendService = {DropBackendService}
        setFatalError = {noop}
        updateDrops = {noop}
        droptext = {"apple"}
        isSyncing = {false}
        unsavedDrops = {[]}
        updateDroptext = {noop}
        createDrop = {noop}
        updateUnsavedDrops = {noop}
        appAlert = {noop}
        appConfirm = {()=>(false)}
        deleteDrop = {deleteDrop}
    />, div));
    let deleteButton = $(".drop-search", container).find(".del-button").get(0);
    fireEvent.click(deleteButton);
});

test('if call to DropBackendService.getUserDrops fails, calls setFatalError', (done) => {
    let setFatalError = ()=>{
        done();
    }
    DropBackendService.getUserDrops = (username)=> {
        return new Observable((observer)=> {
            observer.next({
                status: "FAIL",
            });
        })
    };
    ({ getByTestId, container } = render(<BackendCommunicationLayer
        username = {"adam"}
        pushNewStatusMessage = {noop}
        changeUser = {noop}
        drops = {drops}
        DropBackendService = {DropBackendService}
        setFatalError = {setFatalError}
        updateDrops = {noop}
        droptext = {"apple"}
        isSyncing = {false}
        unsavedDrops = {[]}
        updateDroptext = {noop}
        createDrop = {noop}
        updateUnsavedDrops = {noop}
        appAlert = {noop}
        appConfirm = {()=>(false)}
        deleteDrop = {noop}
    />, div));
});

test('calls setFatalError if DropBackendService.deleteDrop fails', (done) => {
    let deleteDrop = (drop)=>{
    }
    let drops = [
        {
            text: "candy #apple",
            hashtags : ["#apple"],
            key : "syrup",
            _id : "syrup"
        }
    ]
    let setFatalError = ()=>{
        done();
    }
    DropBackendService.deleteDrop = (id)=>{
        expect(id).toBe("syrup");
        return  new Observable((observer)=> {
            observer.next({
                status: "FAIL",
            });
        })
    }
    ({ getByTestId, container } = render(<BackendCommunicationLayer
        username = {"adam"}
        pushNewStatusMessage = {noop}
        changeUser = {noop}
        drops = {drops}
        DropBackendService = {DropBackendService}
        setFatalError = {setFatalError}
        updateDrops = {noop}
        droptext = {"apple"}
        isSyncing = {false}
        unsavedDrops = {[]}
        updateDroptext = {noop}
        createDrop = {noop}
        updateUnsavedDrops = {noop}
        appAlert = {noop}
        appConfirm = {()=>(true)}
        deleteDrop = {deleteDrop}
    />, div));
    let deleteButton = $(".drop-search", container).find(".del-button").get(0);
    fireEvent.click(deleteButton);
});

test('if call to DropBackendService.saveNewDrop fails, calls setFatalError', (done) => {
    let setFatalError = ()=>{
        done();
    }
    DropBackendService.saveNewDrop = (username)=> {
        return new Observable((observer)=> {
            observer.next({
                status: "FAIL",
            });
        })
    };
    ({ getByTestId, container } = render(<BackendCommunicationLayer
        username = {"adam"}
        pushNewStatusMessage = {noop}
        changeUser = {noop}
        drops = {drops}
        DropBackendService = {DropBackendService}
        setFatalError = {setFatalError}
        updateDrops = {noop}
        droptext = {"apple"}
        isSyncing = {false}
        unsavedDrops = {[]}
        updateDroptext = {noop}
        createDrop = {noop}
        updateUnsavedDrops = {noop}
        appAlert = {noop}
        appConfirm = {()=>(false)}
        deleteDrop = {noop}
    />, div));
    let dropButton = getByTestId("drop-button");
    fireEvent.click(dropButton);
});