import React from 'react';
import ReactDOM from 'react-dom';
import {cleanup,fireEvent,render} from '@testing-library/react';
import App from "./App.jsx";

let div;
let getByTestId;

let setProps = () => {
}

beforeEach(()=>{
    setProps();
    div = document.createElement('div');
})

afterEach(() => {
    ReactDOM.unmountComponentAtNode(div);
});

test('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<App />, div);
    ReactDOM.unmountComponentAtNode(div);
});

// test('renders without crashing', () => {
//     const div = document.createElement('div');
//     ReactDOM.render(<App />, div);
//     ReactDOM.unmountComponentAtNode(div);
// });