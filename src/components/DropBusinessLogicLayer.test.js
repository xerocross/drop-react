import React from 'react';
import {cleanup,fireEvent,render, act} from '@testing-library/react';
import DropBusinessLogicLayer from "./DropBusinessLogicLayer.jsx";
import $ from "jquery";
import Store from "../store.js";
import { Provider } from "react-redux";
import {NEW_DROPTEXT, UPDATE_DROPS, ADD_UNSAVED_DROP} from "../actions.js";

let div;
let getByTestId, queryByTestId;
let container;
let store;

let noop = () => {};
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

beforeEach(() => {
    store = Store();
    div = document.createElement('div');
})

afterEach(() => {
    cleanup();
});

function renderWithOptions (config) {
    return  render(<Provider store={store}><DropBusinessLogicLayer
        deleteDrop = {noop}
        createDrop = {noop}
        refreshDrops = {noop}
        updateDrops = {noop}
        username = {config.username || undefined}
    /></Provider>, div);
}



test('renders without crashing', () => {
    ({ getByTestId } = render(<Provider store={store}><DropBusinessLogicLayer
        unsavedDrops = {[]}
        isSyncing = {false}
        deleteDrop = {noop}
        createDrop = {noop}
        refreshDrops = {noop}
        updateDrops = {noop}
        updateDroptext = {noop}
        username = {"adam"}
        updateUnsavedDrops = {noop}
    /></Provider>, div) );
});

test('renders unsavedDrops if there is one', () => {
    store.dispatch(ADD_UNSAVED_DROP(drops_nonempty[0]));
    ({ getByTestId, queryByTestId } = renderWithOptions({}));
    let elt = queryByTestId("unsaved-drops");
    expect(elt).toBeTruthy();
});

test('does not render unsavedDrops if there arent any', () => {
    ({ getByTestId, queryByTestId } = renderWithOptions({}));
    let elt = queryByTestId("unsaved-drops");
    expect(elt).toBeFalsy();
});

test('dispatches TRY_SAVE_UNSAVED_DROPS if user clicks try again', () => {
    store.dispatch(ADD_UNSAVED_DROP(drops_nonempty[0]));
    store.dispatch = jest.fn(store.dispatch);
    ({ getByTestId, queryByTestId } = renderWithOptions({}));
    let tryAgainButton =  getByTestId("unsaved-drops-try-again");
    store.dispatch.mockClear();
    fireEvent.click(tryAgainButton);
    expect(store.dispatch.mock.calls[0][0].type).toBe("TRY_SAVE_UNSAVED_DROPS");
});

test('renders MainDumbViewLayer', () => {
    ({ getByTestId, queryByTestId } = render(<Provider store={store}><DropBusinessLogicLayer
        unsavedDrops = {[]}
        isSyncing = {false}
        deleteDrop = {noop}
        createDrop = {noop}
        refreshDrops = {noop}
        updateDrops = {noop}
        updateDroptext = {noop}
        username = {"adam"}
        updateUnsavedDrops = {noop}
    /></Provider>, div) );
    let mainDumbViewLayer = queryByTestId("MainDumbViewLayer");
    expect(mainDumbViewLayer).toBeTruthy();
});

test('clicking drop button calls createDrop if some text is set', (done) => {
    store.dispatch(NEW_DROPTEXT("apple"));
    let createDrop = function () {
        done();
    };
    ({ getByTestId, queryByTestId } = render(<Provider store={store}><DropBusinessLogicLayer
        unsavedDrops = {[]}
        appAlert = {noop}
        isSyncing = {false}
        deleteDrop = {noop}
        createDrop = {createDrop}
        refreshDrops = {noop}
        updateDrops = {noop}
        updateDroptext = {noop}
        username = {"adam"}
        updateUnsavedDrops = {noop}
    /></Provider>, div) );

    let dropButton = getByTestId("drop-button");
    fireEvent.click(dropButton);
});

test('clicking drop button triggers alert if text is not set', (done) => {
    let alert = function () {
        done();
    };
    ({ getByTestId, queryByTestId } = render(<Provider store={store}><DropBusinessLogicLayer
        unsavedDrops = {[]}
        isSyncing = {false}
        appAlert = {alert}
        deleteDrop = {noop}
        createDrop = {noop}
        refreshDrops = {noop}
        updateDrops = {noop}
        updateDroptext = {noop}
        username = {"adam"}
        updateUnsavedDrops = {noop}
    /></Provider>, div) );

    let dropButton = getByTestId("drop-button");
    fireEvent.click(dropButton);
});

test('clicking delete button calls deleteDrop', (done) => {
    store.dispatch(UPDATE_DROPS(drops_nonempty));

    let deleteDrop = (drop) => {
        expect(drop.key).toBe("0");
        done();
    }
    ({ getByTestId, queryByTestId } = render(<Provider store={store}><DropBusinessLogicLayer
        unsavedDrops = {[]}
        isSyncing = {false}
        deleteDrop = {deleteDrop}
        createDrop = {noop}
        refreshDrops = {noop}
        updateDrops = {noop}
        updateDroptext = {noop}
        username = {"adam"}
        updateUnsavedDrops = {noop}
    /></Provider>, div) );
    let dropSearchElt = getByTestId("drop-search");
    let dropRows = $(".drop-row", dropSearchElt);
    let delButtons = dropRows.find(".del-button");
    let firstDelButton = delButtons[0];
    fireEvent.click(firstDelButton);
});

describe("hashtag/drop intersection works as expected",() => {

    test('shows only drops matching one hashtag (1)', () => {
        drops = [
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
        store.dispatch(UPDATE_DROPS(drops));
        store.dispatch(NEW_DROPTEXT("this is a #pear test string"));
        ({ getByTestId, queryByTestId } = render(<Provider store={store}><DropBusinessLogicLayer
            unsavedDrops = {[]}
            isSyncing = {false}
            deleteDrop = {noop}
            createDrop = {noop}
            refreshDrops = {noop}
            updateDrops = {noop}
            updateDroptext = {noop}
            username = {"adam"}
            updateUnsavedDrops = {noop}
        /></Provider>, div) );
        let dropSearchElt = getByTestId("drop-search");
        let dropRows = $(".drop-row", dropSearchElt);
        expect(dropRows).toHaveLength(1);
        let elt = dropRows.eq(0);
        expect(elt.attr("data-dropkey")).toBe("1");
    });

    test('shows only drops matching two hashtags', () => {
        drops = [
            {
                text: "candy #apple",
                hashtags : ["#apple"],
                key : "0"
            },
            {
                text: "candy #pear #apple",
                hashtags : ["#pear", "#apple"],
                key : "both"
            },
            {
                text: "candy #pear #watermelon",
                hashtags : ["#watermelon", "#pear"],
                key : "2"
            }
        ];
        store.dispatch(UPDATE_DROPS(drops));
        store.dispatch(NEW_DROPTEXT("this is a #pear test #apple"));
        ({ getByTestId, queryByTestId } = render(<Provider store={store}><DropBusinessLogicLayer
            unsavedDrops = {[]}
            isSyncing = {false}
            deleteDrop = {noop}
            createDrop = {noop}
            refreshDrops = {noop}
            updateDrops = {noop}
            updateDroptext = {noop}
            username = {"adam"}
            updateUnsavedDrops = {noop}
        /></Provider>, div) );
        let dropSearchElt = getByTestId("drop-search");
        let dropRows = $(".drop-row", dropSearchElt);
        expect(dropRows).toHaveLength(1);
        let elt = dropRows.eq(0);
        expect(elt.attr("data-dropkey")).toBe("both");
    });

    test("shows only drops matching one hashtag (2)", () => {
        drops = [
            {
                text: "candy #apple",
                hashtags : ["#apple"],
                key : "apple"
            },
            {
                text: "candy #pear #apple",
                hashtags : ["#pear", "#apple"],
                key : "both"
            },
            {
                text: "candy #pear #watermelon",
                hashtags : ["#watermelon", "#pear"],
                key : "neither"
            }
        ];
        let droptext = "this is a test #apple";
        store.dispatch(UPDATE_DROPS(drops));
        store.dispatch(NEW_DROPTEXT(droptext));
        ({ getByTestId, queryByTestId } = render(<Provider store={store}><DropBusinessLogicLayer
            unsavedDrops = {[]}
            drops = {drops}
            isSyncing = {false}
            deleteDrop = {noop}
            createDrop = {noop}
            refreshDrops = {noop}
            updateDrops = {noop}
            updateDroptext = {noop}
            username = {"adam"}
            updateUnsavedDrops = {noop}
        /></Provider>, div) );
        let dropSearchElt = getByTestId("drop-search");
        let dropRows = $(".drop-row", dropSearchElt);
        expect(dropRows).toHaveLength(2);
        expect(dropRows.eq(0).attr("data-dropkey")).toBe("apple");
        expect(dropRows.eq(1).attr("data-dropkey")).toBe("both");
    });

    test("shows alls drops if text string has no hashtags", () => {
        drops = [
            {
                text: "candy #apple",
                hashtags : ["#apple"],
                key : "apple"
            },
            {
                text: "candy #pear #apple",
                hashtags : ["#pear", "#apple"],
                key : "both"
            },
            {
                text: "candy #pear #watermelon",
                hashtags : ["#watermelon", "#pear"],
                key : "neither"
            }
        ];
        let droptext = "this is a test apple";
        store.dispatch(UPDATE_DROPS(drops));
        store.dispatch(NEW_DROPTEXT(droptext));
        ({ getByTestId, queryByTestId } = render(<Provider store={store}><DropBusinessLogicLayer
            unsavedDrops = {[]}
            isSyncing = {false}
            deleteDrop = {noop}
            createDrop = {noop}
            refreshDrops = {noop}
            updateDrops = {noop}
            updateDroptext = {noop}
            username = {"adam"}
            updateUnsavedDrops = {noop}
        /></Provider>, div) );
        let dropSearchElt = getByTestId("drop-search");
        let dropRows = $(".drop-row", dropSearchElt);
        expect(dropRows).toHaveLength(3);
    });

    test("shows no drops if no drops in intersection", () => {
        drops = [
            {
                text: "candy #apple",
                hashtags : ["#apple"],
                key : "0"
            },
            {
                text: "candy #pear #apple",
                hashtags : ["#pear", "#apple"],
                key : "1"
            },
            {
                text: "candy #watermelon",
                hashtags : ["#watermelon"],
                key : "2"
            }
        ];
        let droptext = "this is a test #pear and #watermelon";
        store.dispatch(UPDATE_DROPS(drops));
        store.dispatch(NEW_DROPTEXT(droptext));
        ({ getByTestId, queryByTestId } = render(<Provider store={store}><DropBusinessLogicLayer
            unsavedDrops = {[]}
            isSyncing = {false}
            deleteDrop = {noop}
            createDrop = {noop}
            refreshDrops = {noop}
            updateDrops = {noop}
            updateDroptext = {noop}
            username = {"adam"}
            updateUnsavedDrops = {noop}
        /></Provider>, div) );
        let dropSearchElt = getByTestId("drop-search");
        let dropRows = $(".drop-row", dropSearchElt);
        expect(dropRows).toHaveLength(0);
    });

});