import React, { Component } from "react";
import "./DropDisplay.scss";

export default class DropDisplay extends Component {

    get innerHTML () {
        let hashtags = this.props.drop.hashtags;
        let rawHTML = this.props.drop.text;
        for (let tag of hashtags) {
            let pattern = new RegExp(tag, 'g');
            rawHTML = rawHTML.replace(pattern, `<span class = 'tag'>${tag}</span>`)
        }
        return rawHTML;
    }

    render () {
        return (
            <div 
                className = "drop-display"
                dangerouslySetInnerHTML={{ __html: this.innerHTML }}>
            </div>
        )
    }
}