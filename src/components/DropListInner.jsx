import React, { Component } from "react";
import DropDisplay from "./DropDisplay";


export default class DropListInner extends Component {
    render () {
        return (
            <div className = "list">
                {
                    this.props.drops.map((drop) => {
                        return (
                            <div className = "drop-row"  key = {drop.key} data-dropkey={drop.key}>
                                <div className="drop-item"
                                        
                                >
                                    <DropDisplay 
                                        drop = {drop}
                                    />
                                </div>
                                { this.props.isCanDelete && 
                                    <div
                                        className="drop-delete"
                                    >
                                        <button 
                                            onClick = {() => this.props.deleteDrop(drop)}
                                            className = "button del-button"    
                                        >
                                            del
                                        </button>
                                    </div>
                                }
                            </div>
                        );
                    })
                }
            </div>

        )
    }
}