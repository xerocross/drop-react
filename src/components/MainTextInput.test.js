import React from 'react';
import {cleanup,fireEvent,render} from '@testing-library/react';
import MainTextInput from "./MainTextInput.jsx";
import $ from "jquery";
import Store from "../store.js";
import { Provider } from "react-redux";
import {NEW_DROPTEXT, UPDATE_DROPS} from "../actions.js";

afterEach(cleanup)

let getByTestId;
let noop = () => {};
let setProps = () => {}
let store;

beforeEach(() => {
    store = Store();
    setProps();
})

afterEach(() => {
    cleanup();
});

test('renders without crashing', () => {
    const div = document.createElement('div');
    render(<Provider store={store}><MainTextInput 
        hashtags = {[]}
    /></Provider>, div);
});

test('changing textarea calls updateDropText ', (done) => {
    let testVal = "apple";
    let updateDroptext = (text) => {
        expect(text).toBe(testVal);
        done();
    }
    ({ getByTestId } = render(<Provider store={store}><MainTextInput
        hashtags = {[]}
        dropDrop = { noop }
        updateDroptext = {updateDroptext}
    /></Provider>));
    let textarea = getByTestId("main-drop-textarea");
    fireEvent.change(textarea, { target: { value: testVal } });
});

test('drop button calls dropDrop prop', (done) => {
    let testHashtag = "#pear";
    let testVal = `apple ${testHashtag} brandy`;
    let dropDrop = () => {
        done();
    }
    ({ getByTestId } = render(<Provider store={store}><MainTextInput
        hashtags = {[]}
        dropDrop = { dropDrop }
        updateDroptext = {noop}
    /></Provider>));
    let textarea = getByTestId("main-drop-textarea");
    let dropButton = getByTestId("drop-button");
    fireEvent.change(textarea, { target: { value: testVal } });
    fireEvent.click(dropButton)
});


test('list of hashtags displayed', () => {
    store.dispatch(NEW_DROPTEXT("#apple #pear"));
    ({ getByTestId } = render(<Provider store={store}><MainTextInput
        dropDrop = { noop }
        updateDroptext = {noop}
    /></Provider>));
    let elt = getByTestId("hashtag-list");
    let hashtagNodes = $(".hashtag", elt);
    expect(hashtagNodes).toHaveLength(2);
});

test('list of hashtags displayed has right number (3)', () => {
    store.dispatch(NEW_DROPTEXT("#apple #pear #rich"));
    ({ getByTestId } = render(<Provider store={store}><MainTextInput
        dropDrop = { noop }
        updateDroptext = {noop}
    /></Provider>));
    let rawElt = getByTestId("hashtag-list").container;
    let hashtagNodes = $(".hashtag", rawElt);
    expect(hashtagNodes).toHaveLength(3);
});