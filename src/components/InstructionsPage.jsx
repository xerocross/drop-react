import React from "react";
import BaseComponent from "./BaseComponent.jsx";

class InstructionsPage extends BaseComponent {
    constructor (props) {
        super(props);
        this.bindOwn([]);
    }
    render () {
        return (
            <div className = "InstructionsPage">
                <h2>Instructions</h2>
                <p>Store bits of text data on any subject you want---ad hoc, 
                    as needed.  Find it later using powerful, simple search features.
                </p>
                <h3>Searching</h3>
                <p>
                    Saving and searching both happen in the same text
                    input area.  To make a search, you just put a "hash"
                    mark on the word you want to search.  If you type "#apple"
                    then it will search for "apple".  Search is automatic. 
                    It happens if you type a hashtag.  There's no "search" button.
                </p>
                <p>
                    If you enter two or more hashtags, then you will get 
                    the search results that have <em>all</em> of those words
                    in them.  If you enter the search "#apple #pear", the
                    result will only include entires containing both "apple" 
                    and "pear".
                </p>
                <p>
                    Include good hashtags in your posts so they are easy to find later.
                </p>
            </div>
        );
    }
}
export default InstructionsPage;