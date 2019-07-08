import React, { Component } from "react";
import COPY from "../configuration/messages-copy.js";
export default class BaseComponent extends Component {
    // constructor(props) {
    //     super(props);
        
    // }
    log (str) {
        console.log(str);
    }
    bindOwn (keyArr) {
        for (let key of keyArr) {
            if (typeof this[key] === "function") {
                this[key] = this[key].bind(this);
            } else {
                debugger;
            }
        }
    }
    COPY = COPY;
    noop = ()=>{};
    // baseProps = ["drops", "droptext", "isSyncing", "unsavedDrops"];
    isBasePropsDefined() {
        return !(!this.props.drops || !this.props.droptext || !this.props.isSyncing);
    }
    validateBaseProps() {
        let notDefined = [];
        for (let key of this.baseProps) {
            if (typeof this.props[key] === "undefined") {
                notDefined.push(key);
            }
        }
        return notDefined;
    }
    runRenderValidation = this.noop
    // runRenderValidation () {
    //     let undefinedProps = this.validateBaseProps();
    //     if (undefinedProps.length > 0) {
    //         this.log(undefinedProps);
    //         debugger;
    //         throw new Error("props not defined");
    //     }
    // }
}