import React from "react";
import {Input, Button, Icon, Menu, Dropdown} from 'antd';
import {Table} from 'antd';
import jQuery from "jquery";
import NewOperation from "./NewOperation";

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
        this.state = {
            operations: []
        };
    }

    showOperationCreatePopup = () => {
        this.setState({showOperationCreatePopup: true});
    };

    handleCreate = async (newOperation) => {
        let close = await this.props.onOperationCreate(newOperation);
        this.setState({showOperationCreatePopup: close});
    };

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
                {this.state.showOperationCreatePopup && <OperationCreatePopup
                    visible={this.state.newOperation}
                    onCreate={this.handleCreate}
                />}
            </div>
        );
    }
}

export default OperationTable;