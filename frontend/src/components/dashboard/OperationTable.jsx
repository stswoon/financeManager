import React from "react";
import {Input, Button, Icon, Menu, Dropdown} from 'antd';
import {Table} from 'antd';
import jQuery from "jquery";
import NewOperation from "./NewOperation";

class OperationTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            operations: []
        };
    }

    componentDidMount() {
        var request = {
            type: "GET",
            url: envData.gateway + "/backend/operation/" + this.props.projectId,
            headers: {
                'Accept': 'application/json;charset=UTF-8',
                'Content-Type': 'application/json;charset=UTF-8'
            }
        };
        jQuery.ajax(request)
            .then(response => {
                const operations = response;
                this.setState({operations})
            })
            .catch(alert);
    }



    handleNewOperation = () => {
      this.setState({newOperation: true});
    };

    handleCreate = () => {
        this.componentDidMount();
        //this.setState({newOperation: false});
    };

    render() {
        //this.state.operations //todo: make map to data
        //[{id: 1, comment: "Breakfast", operationType: "MINUS", value: 150, date: 1506643200000}]

        const data = this.state.operations.map((item) => {
            return {
                comment: item.comment,
                value: {type: item.operationType, value: item.value},
                date: item.date
            }
        });

        const formatDate = function (date) {
            //todo: https://learn.javascript.ru/datetime or https://stackoverflow.com/questions/3552461/how-to-format-a-javascript-date
            var day = date.getDate();
            var monthIndex = date.getMonth();
            var year = date.getFullYear();

            return day + '.' + monthIndex + '.' + year;
        };

        const columns = [{
            title: 'Comment',
            dataIndex: 'comment',
            key: 'comment',
        }, {
            title: 'Value',
            dataIndex: 'value',
            key: 'value',
            render: (data) => {
                //todo element
                return (
                    <span>
                        {(data.type === "MINUS" ? "-" : "+") + data.value} &#8381;
                    </span>    //rubles
                )
            }
        }, {
            title: 'Date',
            dataIndex: 'date',
            key: 'date',
            render: data => (
                <span>{formatDate(new Date(data))}</span> //todo: element
            )
        }, {
            title: 'Action',
            key: 'action',
            render: (text, record) => (
                <span>
                    <a href="#">Edit</a>
                    <span className="ant-divider"/>
                    <a href="#">Delete</a>
                </span>
            )
        }];

        //todo insert 'New operation' button in first data row
        return (
            <opeartion-table>
                <Button onClick={this.handleNewOperation}>New operation</Button>
                <Table columns={columns} dataSource={data}/>
                {this.state.newOperation && <NewOperation
                    visible={this.state.newOperation}
                    projectId={this.props.projectId}
                    onCreate={this.handleCreate}
                />} //todo
            </opeartion-table>
        );
    }
}

export default OperationTable;