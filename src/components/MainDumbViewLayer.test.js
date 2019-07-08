import React from 'react';
import {cleanup,fireEvent,render, act} from '@testing-library/react';
import MainDumbViewLayer from "./MainDumbViewLayer.jsx";
import DropHashtagIntersect from "../helpers/DropHashtagIntersect.js";
import $ from "jquery";

let div;
let getByTestId;
let queryByTestId;
let container;

let noop = ()=>{};
let setProps = () => {
}
let unsavedDrops = [];
let trySaveUnsavedDrops = noop;

beforeEach(()=>{
    setProps();
    div = document.createElement('div');
})

afterEach(() => {
    cleanup();
});
let updateDroptext = noop;

let drops = [];
let hashtags = [];

test('renders without crashing', () => {
    ({ getByTestId } = render(<MainDumbViewLayer
        droptext = {""}
        unsavedDrops = {[]}
        hashtags = {[]}
        selectedDrops = {drops}
        drops = {drops}
        isSyncing = {false}
        username = {"adam"}
        pushNewStatusMessage = {noop}
        updateDroptext = {noop}
        createDrop = {noop}
        deleteDrop = {noop}
    />, div) );
});
describe("renders UnsavedDrops correctly", ()=>{
    test('if there are unsaved drops, then it renders UnsavedDrops', () => {
        unsavedDrops = [
            {
                text: "happy",
                hashtags : [],
                key : "happy"
            },
            {
                text: "day",
                hashtags : [],
                key : "day"
            }
        ];
        ({ getByTestId, queryByTestId } = render(<MainDumbViewLayer
            droptext = {""}
            hashtags = {[]}
            unsavedDrops = {unsavedDrops}
            selectedDrops = {drops}
            drops = {drops}
            isSyncing = {false}
            username = {"adam"}
            trySaveUnsavedDrops = {trySaveUnsavedDrops}
            pushNewStatusMessage = {noop}
            updateDroptext = {noop}
            createDrop = {noop}
            deleteDrop = {noop}
        />, div) );
    
        let unsavedDropsDiv = queryByTestId("unsaved-drops");
        expect(unsavedDropsDiv).toBeTruthy();
    });
    test('renders correct number of unsaved drops (2)', () => {
        unsavedDrops = [
            {
                text: "happy",
                hashtags : [],
                key : "happy"
            },
            {
                text: "day",
                hashtags : [],
                key : "day"
            }
        ];
        ({ getByTestId, queryByTestId } = render(<MainDumbViewLayer
            droptext = {""}
            hashtags = {[]}
            unsavedDrops = {unsavedDrops}
            selectedDrops = {drops}
            drops = {drops}
            isSyncing = {false}
            username = {"adam"}
            trySaveUnsavedDrops = {trySaveUnsavedDrops}
            pushNewStatusMessage = {noop}
            updateDroptext = {noop}
            createDrop = {noop}
            deleteDrop = {noop}
        />, div) );
    
        let unsavedDropsDiv = queryByTestId("unsaved-drops");
        let dropItems = $(".drop-item",unsavedDropsDiv);
        expect(dropItems).toHaveLength(2);
    });

    test('if there are no unsaved drops, then it does not render UnsavedDrops', () => {
        unsavedDrops = [];
        ({ getByTestId, queryByTestId } = render(<MainDumbViewLayer
            droptext = {""}
            hashtags = {[]}
            unsavedDrops = {unsavedDrops}
            selectedDrops = {drops}
            drops = {drops}
            isSyncing = {false}
            username = {"adam"}
            trySaveUnsavedDrops = {trySaveUnsavedDrops}
            pushNewStatusMessage = {noop}
            updateDroptext = {noop}
            createDrop = {noop}
            deleteDrop = {noop}
        />, div) );
    
        let unsavedDropsDiv = queryByTestId("unsaved-drops");
        expect(unsavedDropsDiv).toBeFalsy();
    });
    
    test('clicking tryAgain button calls trySaveUnsavedDrops', (done) => {
        trySaveUnsavedDrops = function() {
            done();
        };
        unsavedDrops = [
            {
                text: "happy",
                hashtags : [],
                key : "happy"
            },
            {
                text: "day",
                hashtags : [],
                key : "day"
            }
        ];
        ({ getByTestId } = render(<MainDumbViewLayer
            droptext = {""}
            hashtags = {[]}
            unsavedDrops = {unsavedDrops}
            selectedDrops = {drops}
            drops = {drops}
            isSyncing = {false}
            username = {"adam"}
            trySaveUnsavedDrops = {trySaveUnsavedDrops}
            pushNewStatusMessage = {noop}
            updateDroptext = {noop}
            createDrop = {noop}
            deleteDrop = {noop}
        />, div) );
    
        let button = getByTestId("unsaved-drops-try-again");
        fireEvent.click(button);
    });
});







describe("renders dropsearch correctly", ()=> {
    test('renders DropSearch', () => {
        drops = [
            {
                text: "happy",
                hashtags : [],
                key : "happy"
            },
            {
                text: "day",
                hashtags : [],
                key : "day"
            }
        ];
        ({ getByTestId, queryByTestId } = render(<MainDumbViewLayer
            droptext = {""}
            hashtags = {[]}
            unsavedDrops = {[]}
            selectedDrops = {drops}
            drops = {drops}
            isSyncing = {false}
            username = {"adam"}
            pushNewStatusMessage = {noop}
            createDrop = {noop}
            deleteDrop = {noop}
            updateDroptext = {updateDroptext}
        />, div));
        let dropSearchElement = queryByTestId("drop-search");
        expect(dropSearchElement).toBeTruthy();
    });

    test('renders DropSearch with correct number of drops (2)', () => {
        drops = [
            {
                text: "happy",
                hashtags : [],
                key : "happy"
            },
            {
                text: "day",
                hashtags : [],
                key : "day"
            }
        ];
        ({ getByTestId, queryByTestId } = render(<MainDumbViewLayer
            droptext = {""}
            hashtags = {[]}
            unsavedDrops = {[]}
            selectedDrops = {drops}
            drops = {drops}
            isSyncing = {false}
            username = {"adam"}
            pushNewStatusMessage = {noop}
            createDrop = {noop}
            deleteDrop = {noop}
            updateDroptext = {updateDroptext}
        />, div));
        let dropSearchElement = queryByTestId("drop-search");
        let dropListElement = $("[data-testid='drop-list']", dropSearchElement);
        let dropItems = $(".drop-item",dropListElement);
        expect(dropItems).toHaveLength(2)
    });

    test('renders DropSearch with correct number of drops (3)', () => {
        drops = [
            {
                text: "happy",
                hashtags : [],
                key : "happy"
            },
            {
                text: "day",
                hashtags : [],
                key : "day"
            },
            {
                text: "time",
                hashtags : [],
                key : "time"
            }
        ];
        ({ getByTestId, queryByTestId } = render(<MainDumbViewLayer
            droptext = {""}
            hashtags = {[]}
            unsavedDrops = {[]}
            selectedDrops = {drops}
            drops = {drops}
            isSyncing = {false}
            username = {"adam"}
            pushNewStatusMessage = {noop}
            createDrop = {noop}
            deleteDrop = {noop}
            updateDroptext = {updateDroptext}
        />, div));
        let dropSearchElement = queryByTestId("drop-search");
        let dropListElement = $("[data-testid='drop-list']", dropSearchElement);
        let dropItems = $(".drop-item",dropListElement);
        expect(dropItems).toHaveLength(3)
    });

});

describe("renders MainTextInput correctly",()=>{
    test('renders MainTextInput', () => {
        ({ getByTestId, queryByTestId } = render(<MainDumbViewLayer
            droptext = {""}
            hashtags = {[]}
            unsavedDrops = {[]}
            selectedDrops = {drops}
            drops = {drops}
            isSyncing = {false}
            username = {"adam"}
            pushNewStatusMessage = {noop}
            createDrop = {noop}
            deleteDrop = {noop}
            updateDroptext = {updateDroptext}
        />, div));
        let mainTextInputElt = queryByTestId("main-text-input");
        expect(mainTextInputElt).toBeTruthy();
    });
    
    test('editing text in main textarea fires updateDroptext', (done) => {
        let updateDroptext = function () {
            done();
        };
        ({ getByTestId } = render(<MainDumbViewLayer
            droptext = {""}
            hashtags = {[]}
            unsavedDrops = {[]}
            selectedDrops = {drops}
            drops = {[]}
            isSyncing = {false}
            username = {"adam"}
            pushNewStatusMessage = {noop}
            createDrop = {noop}
            deleteDrop = {noop}
            updateDroptext = {updateDroptext}
        />, div));
        let mainTextarea = getByTestId("main-drop-textarea");
        fireEvent.change(mainTextarea, { target: { value: "apple #candy" } })
    });
    test('clicking drop button calls createDrop prop', (done) => {
        let createDrop = function () {
            done();
        };
        ({ getByTestId } = render(<MainDumbViewLayer
            droptext = {""}
            hashtags = {[]}
            unsavedDrops = {[]}
            selectedDrops = {drops}
            drops = {[]}
            isSyncing = {false}
            username = {"adam"}
            updateDroptext = {updateDroptext}
            pushNewStatusMessage = {noop}
            createDrop = {createDrop}
            deleteDrop = {noop}
        />, div));
        let mainTextarea = getByTestId("main-drop-textarea");
        fireEvent.change(mainTextarea, { target: { value: "apple #candy" } })
        let dropButton = getByTestId("drop-button");
        fireEvent.click(dropButton);
    });
    test('renders MainTextInput with text from droptext state', () => {
        ({ getByTestId, queryByTestId } = render(<MainDumbViewLayer
            droptext = "apple"
            hashtags = {[]}
            unsavedDrops = {[]}
            selectedDrops = {drops}
            drops = {drops}
            isSyncing = {false}
            username = {"adam"}
            pushNewStatusMessage = {noop}
            createDrop = {noop}
            deleteDrop = {noop}
            updateDroptext = {updateDroptext}
        />, div));
        let mainTextInputElt = getByTestId("main-text-input");
        let textInput = $("[data-testid='main-drop-textarea']", mainTextInputElt).eq(0);
        expect(textInput.val()).toBe("apple");
    });

});