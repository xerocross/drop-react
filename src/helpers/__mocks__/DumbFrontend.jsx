import React, { Component } from "react";
export default class DumbFrontent extends Component {
    constructor(props) {
        super(props);
        this.getProps = this.getProps.bind(this);
        console.log("constructing a DumbFrontend mock");
    }
    getProps () {
        return this.props;
    }
    render () {
        return (
            <div></div>
        )
    }
}