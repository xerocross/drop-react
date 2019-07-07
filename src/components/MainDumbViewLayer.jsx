import React from "react";
import BaseComponent from "./BaseComponent.jsx";
import MainTextInput from "./MainTextInput";
import DropSearch from "./DropSearch";
import HashtagHelpers from "../helpers/HashtagHelper";
import DropList from "./DropList";

export default class MainDumbViewLayer extends BaseComponent {
    constructor (props) {
        super(props);
        this.dropDrop = this.dropDrop.bind(this);
        this.createDrop = this.createDrop.bind(this);
        this.deleteDrop = this.deleteDrop.bind(this);
        this.updateDroptext = this.updateDroptext.bind(this);
        this.state = {
            droptext : "",
        }
    }

    get hashTags () {
        return HashtagHelpers.parse(this.state.droptext);
    }

    updateDroptext (droptext) {
        this.setState({
            droptext : droptext
        })
    }

    createDrop (drop) {
        this.log("create_drop", drop);
        this.props.createDrop(drop);
    }

    deleteDrop (drop) {
        this.log("delete", drop);
        debugger;
        this.props.deleteDrop(drop);
    }

    dropDrop () {
        this.createDrop(this.state.droptext);
    }


    render () {
        return (
            <div className="drop-main">
                <div>
                    <MainTextInput 
                        dropDrop = {this.dropDrop}
                        updateDroptext = {this.updateDroptext}
                        hashTags = {this.hashTags}
                    />
                    <DropSearch 
                        drops = {this.props.drops}
                        searchText = {this.state.droptext}
                        getSelectedDrops = {this.props.getSelectedDrops}
                        deleteDrop = {this.deleteDrop}
                        hashTags = {this.hashTags}
                        isSyncing = {this.props.isSyncing}
                    />
                </div>
                { this.props.unsavedDrops.length > 0 &&
                
                <div className = "unsaved-drops">
                    <div className = "unsaved-drops-bar">
                        <h2>Unsaved Drops</h2>
                        
                        <button 
                            onClick = {this.trySaveUnsavedDrops}
                            className = "button"    
                        >
                            try again
                        </button>
                    </div>
                    <DropList 
                        drops = {this.props.unsavedDrops}
                        deleteDrop = {this.props.deleteDrop}
                    />
                </div>
                }
            </div>
        );
    }
}