import React, { Component } from "react";
import DropDisplay from "./DropDisplay";
import "./DropList.scss";

export default class DropList extends Component {
    render() {
        if (!this.props.drops) {
            console.log("props.drops was not defined");
            console.log(this.props);
            throw new Error("drops not defined");
        }
        return (
            <div className = "drop-list"
                data-testid="drop-list"
            >
                {this.props.isSyncing && 
                    <div className = "syncing-bar"></div>
                }
                <div className = "list">
                    {
                        this.props.drops.map((drop)=> {
                            return (
                                <div className = "drop-row"  key = {drop.key} data-dropkey={drop.key}>
                                    <div className="drop-item"
                                        
                                    >
                                        <DropDisplay 
                                            drop = {drop}
                                        />
                                    </div>
                                    <div
                                        className="drop-delete"
                                    >
                                        <button 
                                            onClick = {()=> this.props.deleteDrop(drop)}
                                            className = "button del-button"    
                                        >
                                        del
                                        </button>
                                    </div>
                                </div>
                            );
                        })
                    }
                </div>
            </div>
        )
    }
}