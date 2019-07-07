import React from 'react';
import {cleanup,fireEvent,render, act} from '@testing-library/react';
import MainDumbViewLayer from "./MainDumbViewLayer.jsx";
import Observable from "../helpers/Observable";
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
    ({ getByTestId } = render(<MainDumbViewLayer
        unsavedDrops = {[]}
        getSelectedDrops = {noop}
        drops = {[]]}
        isSyncing = {false}
        username = {""}
        pushNewStatusMessage = {noop}
        createDrop = {noop}
        deleteDrop = {noop}
    />, div) );
});