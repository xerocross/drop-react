import React from 'react';
import {cleanup,fireEvent,render, act} from '@testing-library/react';
import MainDumbViewLayer from "./MainDumbViewLayer.jsx";
import DropHashtagIntersect from "../helpers/DropHashtagIntersect.js";
import $ from "jquery";
import Store from "../store.js";
import { Provider } from "react-redux";
import {NEW_DROPTEXT, UPDATE_DROPS} from "../actions.js";

let div;
let getByTestId;
let queryByTestId;
let container;

let noop = () => {};
let setProps = () => {
}
let store;
let unsavedDrops = [];
let trySaveUnsavedDrops = noop;

beforeEach(() => {
    store = Store();
    setProps();
    div = document.createElement('div');
})

afterEach(() => {
    cleanup();
});
let updateDroptext = noop;

let drops = [];
let hashtags = [];

function renderWithOptions (config) {
    return render(<Provider store={store}><MainDumbViewLayer
        droptext = {config.droptext || ""}
        unsavedDrops = {config.unsavedDrops || []}
        hashtags = {config.hashtags || []}
        selectedDrops = {config.selectedDrops || drops}
        drops = {config.drops || drops}
        isSyncing = {config.isSyncing || false}
        username = {config.username || "adam"}
        pushNewStatusMessage = {config.pushNewStatusMessage || noop}
        updateDroptext = {config.updateDroptext || noop}
        createDrop = {config.createDrop || noop}
        deleteDrop = {config.deleteDrop||  noop}
        dropsFailedToSave = {config.dropsFailedToSave || []}
    /></Provider>, div);
}



test('renders without crashing', () => {
    ({ getByTestId } = renderWithOptions({}));
});

describe("renders UnsavedDrops correctly", () => {
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
        ({ getByTestId, queryByTestId } = renderWithOptions({
            unsavedDrops : unsavedDrops
        }) );
    
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
        ({ getByTestId, queryByTestId } = renderWithOptions({
            unsavedDrops : unsavedDrops
        }) );
    
        let unsavedDropsDiv = queryByTestId("unsaved-drops");
        let dropItems = $(".drop-item",unsavedDropsDiv);
        expect(dropItems).toHaveLength(2);
    });

    test('if there are no unsaved drops, then it does not render UnsavedDrops', () => {
        unsavedDrops = [];
        ({ getByTestId, queryByTestId } = renderWithOptions({
            unsavedDrops : unsavedDrops
        }) );
        let unsavedDropsDiv = queryByTestId("unsaved-drops");
        expect(unsavedDropsDiv).toBeFalsy();
    });
    
    // test('clicking tryAgain button calls trySaveUnsavedDrops', (done) => {
    //     trySaveUnsavedDrops = function() {
    //         done();
    //     };
    //     unsavedDrops = [
    //         {
    //             text: "happy",
    //             hashtags : [],
    //             key : "happy"
    //         },
    //         {
    //             text: "day",
    //             hashtags : [],
    //             key : "day"
    //         }
    //     ];
    //     ({ getByTestId } = render(<Provider store={store}><MainDumbViewLayer
    //         droptext = {""}
    //         hashtags = {[]}
    //         unsavedDrops = {unsavedDrops}
    //         selectedDrops = {drops}
    //         drops = {drops}
    //         isSyncing = {false}
    //         username = {"adam"}
    //         trySaveUnsavedDrops = {trySaveUnsavedDrops}
    //         pushNewStatusMessage = {noop}
    //         updateDroptext = {noop}
    //         createDrop = {noop}
    //         deleteDrop = {noop}
    //     /></ Provider>, div) );
    
    //     let button = getByTestId("unsaved-drops-try-again");
    //     fireEvent.click(button);
    // });
});

describe("renders dropsearch correctly", () => {
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
        ({ getByTestId, queryByTestId } = renderWithOptions({
            drops : drops
        }) );
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
        ({ getByTestId, queryByTestId } = renderWithOptions({
            drops : drops
        }) );
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
        ({ getByTestId, queryByTestId } = renderWithOptions({
            drops : drops
        }) );
        let dropSearchElement = queryByTestId("drop-search");
        let dropListElement = $("[data-testid='drop-list']", dropSearchElement);
        let dropItems = $(".drop-item",dropListElement);
        expect(dropItems).toHaveLength(3)
    });

});

describe("renders MainTextInput correctly",() => {
    test('renders MainTextInput', () => {
        ({ getByTestId, queryByTestId } = renderWithOptions({
        }) );
        let mainTextInputElt = queryByTestId("main-text-input");
        expect(mainTextInputElt).toBeTruthy();
    });
    
    test('editing text in main textarea fires updateDroptext', () => {
        updateDroptext = jest.fn();
        ({ getByTestId, queryByTestId } = renderWithOptions({
            updateDroptext : updateDroptext
        }) );
        let mainTextarea = getByTestId("main-drop-textarea");
        fireEvent.change(mainTextarea, { target: { value: "apple #candy" } })
        expect(updateDroptext.mock.calls.length).toBe(1);
    });
    test('clicking drop button calls createDrop prop', () => {
        let createDrop = jest.fn();
        ({ getByTestId, queryByTestId } = renderWithOptions({
            createDrop : createDrop
        }) );
        let mainTextarea = getByTestId("main-drop-textarea");
        fireEvent.change(mainTextarea, { target: { value: "apple #candy" } })
        let dropButton = getByTestId("drop-button");
        fireEvent.click(dropButton);
        expect(createDrop.mock.calls.length).toBe(1);
    });
    test('renders MainTextInput with text from droptext state', () => {
        ({ getByTestId, queryByTestId } = renderWithOptions({
            droptext : "apple"
        }) );
        let mainTextInputElt = getByTestId("main-text-input");
        let textInput = $("[data-testid='main-drop-textarea']", mainTextInputElt).eq(0);
        expect(textInput.val()).toBe("apple");
    });

});