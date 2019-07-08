import React from "react";
import BaseComponent from "./BaseComponent.jsx";
import DropList from "./DropList.jsx";

export default class UnsavedDrops extends BaseComponent {
    render () {
        return (
            <div className = "unsaved-drops"
                data-testid = "unsaved-drops"
            >
                <div className = "unsaved-drops-bar">
                    <h2>Unsaved Drops</h2>
                        
                    <button 
                        onClick = {this.props.trySaveUnsavedDrops}
                        data-testid="unsaved-drops-try-again"
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
        )
    }
}