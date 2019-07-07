import React, { Component } from "react";
import COPY from "../configuration/messages-copy.js";
export default class BaseComponent extends Component {
    log (str) {
        console.log(str);
    }
    COPY = COPY
}