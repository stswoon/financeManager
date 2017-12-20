import React from "react";
import {Modal} from 'antd';
const confirm = Modal.confirm;
import isEqual from "lodash/isEqual";
const lodash = {isEqual};

import OperationPopup from "./OperationPopup";
import constants from "../../utils/constants";

import './operation-table.less';
import Toolbar from "./Toolbar";
import TableBody from "./TableBody";



class OperationTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    shouldComponentUpdate(nextProps, nextState) {
        return !(lodash.isEqual(nextProps, this.props) && lodash.isEqual(nextState, this.state));
    }

    showCreateOperationPopup = () => this.setState({
        showOperationPopup: true,
        operationPopupMode: "create",
        inputOperationData: {}
    });

    showEditOperationPopup = (data) => this.setState({
        showOperationPopup: true,
        operationPopupMode: "edit",
        inputOperationData: data
    });

    handleCreate = (newOperationData) => {
        this.props.onOperationCreate(newOperationData);
        this.setState({showOperationPopup: false});
    };

    handleEdit = (operationData) => {
        this.props.onOperationUpdate(operationData);
        this.setState({showOperationPopup: false});
    };

    handleCancel = () => this.setState({showOperationPopup: false});

    handleRemove = (operationId) => {
        let self = this;
        confirm({
            title: 'Are you sure delete this operation?',
            okText: 'Yes',
            okType: 'danger',
            cancelText: 'No',
            onOk() {
                self.props.onOperationRemove(operationId);
            }
        });
    };

    render() {
        let operationPopup =
            (<OperationPopup onOk={this.state.operationPopupMode == "create" ? this.handleCreate : this.handleEdit}
                             okText={this.state.operationPopupMode == "create" ?
                                 constants.operationPopup.create : constants.operationPopup.update}
                             onCancel={this.handleCancel}
                             inputData={this.state.inputOperationData}
                             loading={this.props.createUpdateLoading}
            />);

        //console.log("anneq304::SSR - operationTable::operations.length="+this.props.operations.length);
        //<operation-table/> - bad for verstka
        return (
            <div className="operation-table">
                <Toolbar onRefresh={this.props.onRefresh}
                         loading={this.props.loading}
                         showCreateOperationPopup={this.showCreateOperationPopup}
                />
                <TableBody operations={this.props.operations}
                           handleRemove={this.handleRemove}
                           showEditOperationPopup={this.showEditOperationPopup}
                />
                {(this.state.showOperationPopup || this.props.createUpdateLoading) && operationPopup}
            </div>
        );
    }
}

export default OperationTable;