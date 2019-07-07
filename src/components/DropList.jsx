import React, { Component } from "react";
import DropDisplay from "./DropDisplay";
import StringHash from "../helpers/string-hash.js";
import "./DropList.scss";

export default class DropList extends Component {
    render() {
        return (
            <div className = "drop-list">
                {this.props.isSyncing && 
                    <div className = "syncing-bar"></div>
                }
                <div className = "list">
                    {
                        this.props.drops.map((drop)=> {
                            return (
                                <div className = "drop-row"  key = {drop.key}>
                                    <div className="drop-item">
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