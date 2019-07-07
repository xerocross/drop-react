import React from 'react';
import {cleanup,fireEvent,render} from '@testing-library/react';
import MainTextInput from "./MainTextInput.jsx";
import $ from "jquery";


afterEach(cleanup)

let getByTestId;
let noop = ()=>{};
let setProps = () => {
}

beforeEach(()=>{
    setProps();
})

afterEach(() => {
    cleanup();
});

test('renders without crashing', () => {
    const div = document.createElement('div');
    render(<MainTextInput 
        hashTags = {[]}
    />, div);
});

test('changing textarea calls updateDropText ', (done) => {
    let testVal = "apple";
    let updateDroptext = (text) => {
        expect(text).toBe(testVal);
        done();
    }
    ({ getByTestId } = render(<MainTextInput
        hashTags = {[]}
        dropDrop = { noop }
        updateDroptext = {updateDroptext}
    />));
    let textarea = getByTestId("main-drop-textarea");
    fireEvent.change(textarea, { target: { value: testVal } });
});

test('drop button calls dropDrop prop', (done) => {
    let testHashtag = "#pear";
    let testVal = `apple ${testHashtag} brandy`;
    let dropDrop = () => {
        done();
    }
    ({ getByTestId } = render(<MainTextInput
        hashTags = {[]}
        dropDrop = { dropDrop }
        updateDroptext = {noop}
    />));
    let textarea = getByTestId("main-drop-textarea");
    let dropButton = getByTestId("drop-button");
    fireEvent.change(textarea, { target: { value: testVal } });
    fireEvent.click(dropButton)
});


test('list of hashtags displayed', () => {
    let hashTags = ["#apple", "#pear"];
    ({ getByTestId } = render(<MainTextInput
        hashTags = {hashTags}
        dropDrop = { noop }
        updateDroptext = {noop}
    />));
    let rawElt = getByTestId("hashtag-list").container;
    let hashtagNodes = $(".hashtag", rawElt);
    expect(hashtagNodes).toHaveLength(2);
});

test('list of hashtags displayed has right number (3)', () => {
    let hashTags = ["#apple", "#pear", "#rich"];
    ({ getByTestId } = render(<MainTextInput
        hashTags = {hashTags}
        dropDrop = { noop }
        updateDroptext = {noop}
    />));
    let rawElt = getByTestId("hashtag-list").container;
    let hashtagNodes = $(".hashtag", rawElt);
    expect(hashtagNodes).toHaveLength(3);
});