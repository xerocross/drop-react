import React from 'react';
import ReactDOM from 'react-dom';
import {cleanup,fireEvent,render} from '@testing-library/react';
import DropList from "./DropList.jsx";
import $ from "jquery";

let div;
let container;
afterEach(cleanup)

let getByTestId;
let noop = ()=>{};
let setProps = () => {
};

beforeEach(()=>{
    setProps();
    div = document.createElement('div');
})

afterEach(() => {
    cleanup();
});

test('renders without crashing', () => {
    const div = document.createElement('div');
    render(<DropList 
        drops = {[]}
        deleteDrop = {noop}
        isSyncing = {false}
    />, div);
});

test('shows right number of "drop" elements (1)', () => {
    let drops = [{
        text : "#apple",
        hashtags : ["#apple"],
        _id : "0",
        key : "0"
    }];

    ({ getByTestId, container } = render(<DropList 
        drops = { drops }
        deleteDrop = {noop}
        isSyncing = {false}
    />, div));

    let dropRows = $(".drop-row",container);
    expect(dropRows).toHaveLength(1);
});

test('shows right number of "drop" elements (2)', () => {
    let drops = [{
        text : "#apple",
        hashtags : ["#apple"],
        _id : "0",
        key : "0",
    },
    {
        text : "#pear",
        hashtags : ["#pear"],
        _id : "1",
        key : "1",
    }];

    ({ getByTestId, container } = render(<DropList 
        drops = { drops }
        deleteDrop = {noop}
        isSyncing = {false}
    />, div));

    let dropRows = $(".drop-row",container);
    expect(dropRows).toHaveLength(2);
});

test('indicates busy if isSyncing true', () => {
    ({ getByTestId, container } = render(<DropList 
        drops = { [] }
        deleteDrop = {noop}
        isSyncing = {true}
    />, div));
    expect($(".syncing-bar", container)).toHaveLength(1);
});


test('does not indicate busy if isSyncing false', () => {
    ({ getByTestId, container } = render(<DropList 
        drops = { [] }
        deleteDrop = {noop}
        isSyncing = {false}
    />, div));
    expect($(".syncing-bar", container)).toHaveLength(0);
});

test('clicking delete fires deleteDrop function', (done) => {
    let drops = [{
        text : "#apple",
        hashtags : ["#apple"],
        key : "0",
        _id : "0"
    }];
    let deleteDrop = (drop)=> {
        done();
    }
    ({ getByTestId, container } = render(<DropList 
        drops = { drops }
        deleteDrop = {deleteDrop}
        isSyncing = {false}
    />, div));
    let deleteButton0 = $(".drop-row",container).eq(0).find(".del-button")[0];
    fireEvent.click(deleteButton0);
});

test('clicking delete sends appropriate drop to deleteDrop function (0)', (done) => {
    let drops = [{
        text : "#apple",
        hashtags : ["#apple"],
        key : "0",
        _id : "0"
    },
    {
        text : "#pear",
        hashtags : ["#pear"],
        key : "1",
        _id : "1"
    }];
    let deleteDrop = (drop)=> {
        expect(drop._id).toBe("0");
        done();
    }
    ({ getByTestId, container } = render(<DropList 
        drops = { drops }
        deleteDrop = {deleteDrop}
        isSyncing = {false}
    />, div));
    let deleteButton0 = $(".drop-row",container).eq(0).find(".del-button")[0];
    fireEvent.click(deleteButton0);
});

test('clicking delete sends appropriate drop to deleteDrop function (1)', (done) => {
    let drops = [{
        text : "#apple",
        key : "0",
        hashtags : ["#apple"],
        _id : "0"
    },
    {
        text : "#pear",
        hashtags : ["#pear"],
        key : "1",
        _id : "pear"
    }];
    let deleteDrop = (drop)=> {
        expect(drop._id).toBe("pear");
        done();
    }
    ({ getByTestId, container } = render(<DropList 
        drops = { drops }
        deleteDrop = {deleteDrop}
        isSyncing = {false}
    />, div));
    let deleteButton0 = $(".drop-row",container).eq(1).find(".del-button")[0];
    fireEvent.click(deleteButton0);
});