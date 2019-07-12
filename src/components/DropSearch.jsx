import React, { Component } from "react";
import DropList from "./DropList";
import { connect } from "react-redux";
class DropSearch extends Component {
    render () {
        return (
            <div className = "drop-search"
                data-testid = "drop-search"
            >
                <DropList 
                    drops = {this.props.selectedDrops}
                    deleteDrop = {this.props.deleteDrop}
                    isSyncing = {this.props.isSyncing}
                />
            </div>
        )
    }
}
const mapStateToProps = (state, ownProps) => ({
    selectedDrops : ownProps.selectedDrops
})
const mapDispatchToProps = {
}
export default connect(mapStateToProps, mapDispatchToProps)(DropSearch);