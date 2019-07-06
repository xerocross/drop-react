import React from 'react';
import {cleanup,fireEvent,render, act} from '@testing-library/react';
import DropMain from "./DropMain.jsx";
import Observable from "./Observable";
import $ from "jquery";

let div;
let getByTestId;
let container;

let noop = ()=>{};
let setProps = () => {
}

const DropBackendService = {
    getUserDrops :  ()=> (new Observable((observer)=> {

    }))
};

beforeEach(()=>{
    setProps();
    div = document.createElement('div');
})

afterEach(() => {
    cleanup();
});

test('renders without crashing', () => {
    ({ getByTestId } = render(<DropMain
        username = {"adam"}
        pushNewStatusMessage = {noop}
        changeUser = {noop}
        DropBackendService = {DropBackendService}
    />, div) );
});

test('calls getUserDrops on mount', (done) => {
    DropBackendService.getUserDrops = ()=> {
        done();
        return new Observable((observer)=> {
        })
    };
    ({ getByTestId } = render(<DropMain
        username = {"adam"}
        pushNewStatusMessage = {noop}
        changeUser = {noop}
        DropBackendService = {DropBackendService}
    />, div));
});

test('calls getUserDrops on mount with the username that was passed in', (done) => {
    DropBackendService.getUserDrops = (username)=> {
        expect(username).toBe("adam");
        done();
        return new Observable((observer)=> {
        })
    };
    ({ getByTestId } = render(<DropMain
        username = {"adam"}
        pushNewStatusMessage = {noop}
        changeUser = {noop}
        DropBackendService = {DropBackendService}
    />, div));
});

test('calls getUserDrops on mount and subscribes to observable', (done) => {
    DropBackendService.getUserDrops = (username)=> {
        return new Observable((observer)=> {
            done();
        })
    };
    ({ getByTestId } = render(<DropMain
        username = {"adam"}
        pushNewStatusMessage = {noop}
        changeUser = {noop}
        DropBackendService = {DropBackendService}
    />, div));
});

test('clicking drop button calls DropBackendService.saveNewDrop', (done) => {
    DropBackendService.saveNewDrop = (drop)=> {
        return new Observable((observer)=> {
            done();
        })
    };
    ({ getByTestId } = render(<DropMain
        username = {"adam"}
        pushNewStatusMessage = {noop}
        changeUser = {noop}
        DropBackendService = {DropBackendService}
    />, div));
    let mainTextarea = getByTestId("main-drop-textarea");
    fireEvent.change(mainTextarea, { target: { value: "apple #candy" } })
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
    ({ getByTestId } = render(<DropMain
        username = {"adam"}
        pushNewStatusMessage = {noop}
        changeUser = {noop}
        DropBackendService = {DropBackendService}
    />, div));
    let mainTextarea = getByTestId("main-drop-textarea");
    fireEvent.change(mainTextarea, { target: { value: "apple #candy" } })
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
                        _id : "0"
                    }
                ]});
        })
    };
    act(()=>{
        ({ getByTestId, container } = render(<DropMain
            username = {"adam"}
            pushNewStatusMessage = {noop}
            changeUser = {noop}
            DropBackendService = {DropBackendService}
        />, div));
    });
    setTimeout(()=>{
        let dropItems = $(".drop-search", container).find(".drop-item");
        expect(dropItems).toHaveLength(1);
        done();
    },10);
});

test('updates drops array if getUserDrops returns drops data: has right number of items (3)', (done) => {
    DropBackendService.getUserDrops = (username)=> {
        return new Observable((observer)=> {
            observer.next({
                status: "SUCCESS",
                data: [
                    {
                        text: "candy #apple",
                        hashtags : ["#apple"],
                        _id : "0"
                    },
                    {
                        text: "candy #apple",
                        hashtags : ["#apple"],
                        _id : "1"
                    },
                    {
                        text: "candy #apple",
                        hashtags : ["#apple"],
                        _id : "2"
                    }
                ]});
        })
    };
    act(()=>{
        ({ getByTestId, container } = render(<DropMain
            username = {"adam"}
            pushNewStatusMessage = {noop}
            changeUser = {noop}
            DropBackendService = {DropBackendService}
        />, div));
    });
    setTimeout(()=>{
        let dropItems = $(".drop-search", container).find(".drop-item");
        expect(dropItems).toHaveLength(3);
        done();
    },10);
});

test('clicking to delete a drop calls DropBackendService.getUserDrops', (done) => {
    DropBackendService.getUserDrops = (username)=> {
        return new Observable((observer)=> {
            observer.next({
                status: "SUCCESS",
                data: [
                    {
                        text: "candy #apple",
                        hashtags : ["#apple"],
                        _id : "syrup"
                    },
                    {
                        text: "candy #apple",
                        hashtags : ["#apple"],
                        _id : "apple"
                    }
                ]});
        })
    };
    DropBackendService.deleteDrop = (id)=>{
        return  new Observable((observer)=> {
            expect(id).toBe("syrup");
            done();
        })
    }
    act(()=>{
        ({ getByTestId, container } = render(<DropMain
            username = {"adam"}
            pushNewStatusMessage = {noop}
            changeUser = {noop}
            DropBackendService = {DropBackendService}
        />, div));
    });
    setTimeout(()=>{
        window.confirm = ()=> (true);
        let deleteButton = $(".drop-search", container).find(".del-button").get(0);
        fireEvent.click(deleteButton);
    },10);
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
    act(()=>{
        ({ getByTestId, container } = render(<DropMain
            username = {"adam"}
            pushNewStatusMessage = {noop}
            setFatalError = {setFatalError}
            changeUser = {noop}
            DropBackendService = {DropBackendService}
        />, div));
    });


});