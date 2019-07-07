import React from 'react';
import ReactDOM from 'react-dom';
import {cleanup,fireEvent,render} from '@testing-library/react';
import LoginLayer from "./LoginLayer.jsx";
import $ from "jquery";


afterEach(cleanup)

let getByTestId;
let container;
let noop = ()=>{};
let div;
let setProps = () => {}


beforeEach(()=>{
    div = document.createElement('div');
    setProps();
})

afterEach(() => {
    cleanup();
});

test('renders without crashing', () => {
    render(<LoginLayer 
    />, div);
});