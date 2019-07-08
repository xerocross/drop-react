import React from 'react';
import {cleanup,fireEvent,render, act} from '@testing-library/react';
import DropBusinessLogicLayer from "./DropBusinessLogicLayer.jsx";
import $ from "jquery";

let div;
let getByTestId, queryByTestId;
let container;

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
})

afterEach(() => {
    cleanup();
});


test('renders without crashing', () => {
    ({ getByTestId } = render(<DropBusinessLogicLayer
        unsavedDrops = {[]}
        drops = {drops}
        isSyncing = {false}
        droptext = {""}
        deleteDrop = {noop}
        createDrop = {noop}
        refreshDrops = {noop}
        updateDrops = {noop}
        updateDroptext = {noop}
        username = {"adam"}
        updateUnsavedDrops = {noop}
    />, div) );
});

test('renders MainDumbViewLayer', () => {
    ({ getByTestId, queryByTestId } = render(<DropBusinessLogicLayer
        unsavedDrops = {[]}
        drops = {drops}
        isSyncing = {false}
        droptext = {""}
        deleteDrop = {noop}
        createDrop = {noop}
        refreshDrops = {noop}
        updateDrops = {noop}
        updateDroptext = {noop}
        username = {"adam"}
        updateUnsavedDrops = {noop}
    />, div) );
    let mainDumbViewLayer = queryByTestId("MainDumbViewLayer");
    expect(mainDumbViewLayer).toBeTruthy();
});

test('clicking drop button calls createDrop if some text is set', (done) => {
    let createDrop = function() {
        done();
    };
    ({ getByTestId, queryByTestId } = render(<DropBusinessLogicLayer
        unsavedDrops = {[]}
        drops = {drops}
        isSyncing = {false}
        droptext = {"apple"}
        deleteDrop = {noop}
        createDrop = {createDrop}
        refreshDrops = {noop}
        updateDrops = {noop}
        updateDroptext = {noop}
        username = {"adam"}
        updateUnsavedDrops = {noop}
    />, div) );

    let dropButton = getByTestId("drop-button");
    fireEvent.click(dropButton);
});

test('clicking drop button triggers alert if text is not set', (done) => {
    let alert = function() {
        done();
    };
    ({ getByTestId, queryByTestId } = render(<DropBusinessLogicLayer
        unsavedDrops = {[]}
        drops = {drops}
        isSyncing = {false}
        droptext = {""}
        appAlert = {alert}
        deleteDrop = {noop}
        createDrop = {noop}
        refreshDrops = {noop}
        updateDrops = {noop}
        updateDroptext = {noop}
        username = {"adam"}
        updateUnsavedDrops = {noop}
    />, div) );

    let dropButton = getByTestId("drop-button");
    fireEvent.click(dropButton);
});

test('clicking delete button calls deleteDrop', (done) => {
    let deleteDrop = (drop) => {
        expect(drop.key).toBe("0");
        done();
    }
    ({ getByTestId, queryByTestId } = render(<DropBusinessLogicLayer
        unsavedDrops = {[]}
        drops = {drops_nonempty}
        isSyncing = {false}
        droptext = {"apple"}
        deleteDrop = {deleteDrop}
        createDrop = {noop}
        refreshDrops = {noop}
        updateDrops = {noop}
        updateDroptext = {noop}
        username = {"adam"}
        updateUnsavedDrops = {noop}
    />, div) );
    let dropSearchElt = getByTestId("drop-search");
    let dropRows = $(".drop-row", dropSearchElt);
    let delButtons = dropRows.find(".del-button");
    let firstDelButton = delButtons[0];
    fireEvent.click(firstDelButton);
});

describe("hashtag/drop intersection works as expected",()=>{

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
        ({ getByTestId, queryByTestId } = render(<DropBusinessLogicLayer
            unsavedDrops = {[]}
            drops = {drops}
            isSyncing = {false}
            droptext = {"this is a #pear test string"}
            deleteDrop = {noop}
            createDrop = {noop}
            refreshDrops = {noop}
            updateDrops = {noop}
            updateDroptext = {noop}
            username = {"adam"}
            updateUnsavedDrops = {noop}
        />, div) );
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
        ({ getByTestId, queryByTestId } = render(<DropBusinessLogicLayer
            unsavedDrops = {[]}
            drops = {drops}
            isSyncing = {false}
            droptext = {"this is a #pear test #apple"}
            deleteDrop = {noop}
            createDrop = {noop}
            refreshDrops = {noop}
            updateDrops = {noop}
            updateDroptext = {noop}
            username = {"adam"}
            updateUnsavedDrops = {noop}
        />, div) );
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
        ({ getByTestId, queryByTestId } = render(<DropBusinessLogicLayer
            unsavedDrops = {[]}
            drops = {drops}
            isSyncing = {false}
            droptext = {"this is a test #apple"}
            deleteDrop = {noop}
            createDrop = {noop}
            refreshDrops = {noop}
            updateDrops = {noop}
            updateDroptext = {noop}
            username = {"adam"}
            updateUnsavedDrops = {noop}
        />, div) );
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
        ({ getByTestId, queryByTestId } = render(<DropBusinessLogicLayer
            unsavedDrops = {[]}
            drops = {drops}
            isSyncing = {false}
            droptext = {"this is a test apple"}
            deleteDrop = {noop}
            createDrop = {noop}
            refreshDrops = {noop}
            updateDrops = {noop}
            updateDroptext = {noop}
            username = {"adam"}
            updateUnsavedDrops = {noop}
        />, div) );
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
        ({ getByTestId, queryByTestId } = render(<DropBusinessLogicLayer
            unsavedDrops = {[]}
            drops = {drops}
            isSyncing = {false}
            droptext = {"this is a test #pear and #watermelon"}
            deleteDrop = {noop}
            createDrop = {noop}
            refreshDrops = {noop}
            updateDrops = {noop}
            updateDroptext = {noop}
            username = {"adam"}
            updateUnsavedDrops = {noop}
        />, div) );
        let dropSearchElt = getByTestId("drop-search");
        let dropRows = $(".drop-row", dropSearchElt);
        expect(dropRows).toHaveLength(0);
    });

});