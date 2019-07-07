import React, { Component } from "react";
import "./MainTextInput.scss";

export default class MainTextInput extends Component {

    constructor() {
        super();
        this.handleTextChange = this.handleTextChange.bind(this);
        this.dropDrop = this.dropDrop.bind(this);
    }

    handleTextChange (e) {
        this.props.updateDroptext(e.target.value);
    }

    dropDrop () {
        this.props.dropDrop();
    }

    render () {
        return (
            <div className = "main-text-input">
                <h2><label>Create/Search Drops</label></h2>
                <p className = "info">
                    Use <span className = "highlight">#hashtags</span> to tag all the keywords.  Search is based on hashtags.
                </p>
                <form>
                    <textarea 
                        className = "drop-textarea"
                        data-testid = "main-drop-textarea"
                        onChange = {e=>this.handleTextChange(e)} 
                        value = {this.props.droptext}
                    >
                    </textarea>
                </form>
                <div>
                    <button 
                        className = "button"
                        data-testid = "drop-button"
                        onClick = {this.dropDrop}
                    >
                        drop
                    </button>
                </div>
                <div 
                    data-testid="hashtag-list"
                    className="hashtag-list"
                >
                    {
                        this.props.hashTags.map(tag=> {
                            return (
                                <span key = {tag} data-testid="hashtag" className="hashtag">{tag}</span>
                            );
                        })
                    }
                </div>
            </div>
        )
    }

}