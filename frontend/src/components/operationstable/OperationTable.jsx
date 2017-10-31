import React from "react";
import {Button} from 'antd';
import {Table} from 'antd';

import OperationPopup from "./OperationPopup";

function formatDate(date) {
    //todo: https://learn.javascript.ru/datetime or https://stackoverflow.com/questions/3552461/how-to-format-a-javascript-date
    let day = date.getDate();
    let monthIndex = date.getMonth();
    let year = date.getFullYear();
    return day + '.' + monthIndex + '.' + year;
}

class OperationTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    showOperationCreatePopup = () => this.setState({showOperationCreatePopup: true});

    handleCreate = (newOperationData) => {
        this.props.onOperationCreate(newOperationData);
        this.setState({showOperationCreatePopup: false});
    };

    handleCancel = () => this.setState({showOperationCreatePopup: false});

    render() {
        const data = this.props.operations.map((item) => {
            return {
                id: item.id,
                comment: item.comment,
                value: {type: item.operationType, value: item.value},
                date: item.date
            }
        });

        const columns = [{
            title: 'Comment',
            dataIndex: 'comment',
            key: 'comment',
        }, {
            title: 'Value',
            dataIndex: 'value',
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
            dataIndex: 'date',
            key: 'date',
            render: data => (
                <span>{formatDate(new Date(data))}</span>
            )
        }, {
            title: 'Action',
            key: 'action',
            render: (text, record) => (
                <span>
                    <a href="#">Edit</a>
                    <span className="ant-divider"/>
                    <a href="#">Remove</a>
                </span>
            )
        }];

        //todo insert 'New operation' button in first data row
        //<operation-table/> - bad for verstka
        return (
            <div className={"operation-table"}>
                <Button onClick={this.showOperationCreatePopup}>New operation</Button>
                <Table columns={columns} dataSource={data}/>
                {this.state.showOperationCreatePopup &&
                <OperationPopup onOk={this.handleCreate} onCancel={this.handleCancel}/>}
            </div>
        );
    }
}

export default OperationTable;