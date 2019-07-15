import React, { Component } from "react";
import "./MainTextInput.scss";
import HashtagList from "./HashtagList.jsx";
import { connect } from "react-redux";
import COPY from "../configuration/messages-copy.js";
class MainTextInput extends Component {

    constructor () {
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
            <div className = "main-text-input"
                data-testid="main-text-input"
            >
                <form>
                    <textarea 
                        className = "drop-textarea"
                        data-testid = "main-drop-textarea"
                        onChange = {e => this.handleTextChange(e)} 
                        value = {this.props.droptext}
                        placeholder = {COPY.DROP_INPUT_PLACEHOLDER}
                    >
                    </textarea>
                </form>
                <div>
                    <button 
                        className = "button"
                        data-testid = "drop-button"
                        onClick = {this.dropDrop}
                    >
                        save
                    </button>
                </div>
                <HashtagList />
            </div>
        )
    }

}
const mapStateToProps = (state, ownProps) => ({
    droptext : ownProps.droptext
})
const mapDispatchToProps = {
}
export default connect(mapStateToProps, mapDispatchToProps)(MainTextInput);