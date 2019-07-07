import React from 'react';
import ReactDOM from 'react-dom';
import {cleanup,fireEvent,render} from '@testing-library/react';
import DropDisplay from "./DropDisplay.jsx";
import $ from "jquery";


afterEach(cleanup)

let getByTestId;
let container;
let noop = ()=>{};
let div;
let setProps = () => {
}
let drop = {
    text : "#apple",
    hashtags : ["#apple"],
    _id : "0"
};

beforeEach(()=>{
    div = document.createElement('div');
    setProps();
})

afterEach(() => {
    cleanup();
});

test('renders without crashing', () => {
    render(<DropDisplay 
        drop = {drop}
    />, div);
});


test('shows correct drop html with two hashtags', () => {
    let drop = {
        text : "some #tag1 and some other #tag2",
        hashtags : ["#tag1", "#tag2"],
        _id : "0"
    };
    ({ getByTestId, container } = render(<DropDisplay 
        drop = {drop}
    />, div));
    let elt = $(".drop-display", container);
    let tagSpans = $(".tag", elt);
    expect(tagSpans).toHaveLength(2);
});
