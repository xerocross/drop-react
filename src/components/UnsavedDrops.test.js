import React from "react";
import {cleanup,fireEvent,render, act} from '@testing-library/react';
import UnsavedDrops from "./UnsavedDrops.jsx";
import $ from "jquery";


let div;
let getByTestId;
let queryByTestId;
let container;

let noop = () => {};
let setProps = () => {
}
let unsavedDrops = [];
let trySaveUnsavedDrops = noop;

beforeEach(() => {
    setProps();
    div = document.createElement('div');
})

afterEach(() => {
    cleanup();
});

test('renders without crashing', () => {
    ({ getByTestId } = render(<UnsavedDrops
        unsavedDrops = {unsavedDrops}
        trySaveUnsavedDrops = {trySaveUnsavedDrops}
    />, div) );
});

test('renders DropList', () => {
    ({ getByTestId, queryByTestId } = render(<UnsavedDrops
        unsavedDrops = {unsavedDrops}
        trySaveUnsavedDrops = {trySaveUnsavedDrops}
    />, div) );
    let elt = queryByTestId("drop-list");
    expect(elt).toBeTruthy();
});


test('renders DropList with correct number of drops (2)', () => {
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
    ({ getByTestId, queryByTestId } = render(<UnsavedDrops
        unsavedDrops = {unsavedDrops}
        trySaveUnsavedDrops = {trySaveUnsavedDrops}
    />, div) );
    let elt = queryByTestId("drop-list");

    let dropitems = $(".drop-row", elt)
    expect(dropitems).toHaveLength(2);
});

test('renders DropList with correct number of drops (6)', () => {
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
        },
        {
            text: "happy0",
            hashtags : [],
            key : "happy0"
        },
        {
            text: "day0",
            hashtags : [],
            key : "day0"
        },
        {
            text: "happy9",
            hashtags : [],
            key : "happy9"
        },
        {
            text: "day9",
            hashtags : [],
            key : "day9"
        }
    ];
    ({ getByTestId, queryByTestId } = render(<UnsavedDrops
        unsavedDrops = {unsavedDrops}
        trySaveUnsavedDrops = {trySaveUnsavedDrops}
    />, div) );
    let elt = queryByTestId("drop-list");

    let dropitems = $(".drop-row", elt)
    expect(dropitems).toHaveLength(6);
});


// test('click try again fires trySaveUnsavedDrops', (done) => {
//     trySaveUnsavedDrops = ()=>{
//         done();
//     }
//     ({ getByTestId, queryByTestId } = render(<UnsavedDrops
//         unsavedDrops = {unsavedDrops}
//         trySaveUnsavedDrops = {trySaveUnsavedDrops}
//     />, div) );
//     let button = getByTestId("unsaved-drops-try-again");
//     fireEvent.click(button);
// });