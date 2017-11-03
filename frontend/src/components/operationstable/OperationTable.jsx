import React from "react";
import {Button, Modal} from 'antd';
import {Table} from 'antd';
const confirm = Modal.confirm;
import moment from 'moment';

import OperationPopup from "./OperationPopup";
import constants from "../../utils/constants";

import './operation-table.less';



function formatDate(date) {
    //todo: https://learn.javascript.ru/datetime
    //https://stackoverflow.com/questions/3552461/how-to-format-a-javascript-date
    //!! https://momentjs.com/docs/#/displaying/format/
    let result = moment(date).format(constants.dateFormat);
    return result;
}

class OperationTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
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
        const data = this.props.operations.map((item) => {
            return {
                key: item.id,
                id: item.id,
                comment: item.comment,
                type: item.operationType,
                value: item.value,
                date: item.date
            }
        });

        const columns = [{
            title: 'Comment',
            key: 'comment',
            dataIndex: 'comment'
        }, {
            title: 'Value',
            key: 'value',
            render: (data) => {
                return (
                    <span>
                        {(data.type === "MINUS" ? "-" : "+") + data.value} &#8381;
                    </span>    //&#8381 - ruble sign
                )
            }
        }, {
            title: 'Date',
            key: 'date',
            dataIndex: 'date',
            render: date => (<span>{formatDate(date)}</span>)
        }, {
            title: 'Action',
            key: 'action',
            render: (data) => (
                <span>
                    <a href="#" onClick={() => this.showEditOperationPopup(data)}>Edit</a>
                    <span className="ant-divider"/>
                    <a href="#" onClick={() => this.handleRemove(data.id)}>Remove</a>
                </span>
            ) //todo remove () from click
        }];

        let operationPopup =
            (<OperationPopup onOk={this.state.operationPopupMode == "create" ? this.handleCreate : this.handleEdit}
                             okText={this.state.operationPopupMode == "create" ?
                                 constants.operationPopup.create : constants.operationPopup.update}
                             onCancel={this.handleCancel}
                             inputData={this.state.inputOperationData}
            />);
        //todo insert 'New operation' button in first data row
        //<operation-table/> - bad for verstka
        return (
            <div className="operation-table">
                <Button onClick={this.showCreateOperationPopup}>New operation</Button>
                <Table columns={columns} dataSource={data}/>
                {this.state.showOperationPopup && operationPopup}
            </div>
        );
    }
}

export default OperationTable;