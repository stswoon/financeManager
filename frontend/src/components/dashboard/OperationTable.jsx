import React from "react";
import {Input, Button, Icon, Menu, Dropdown} from 'antd';
import {Table} from 'antd';
import jQuery from "jQuery";

class OperationTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        var request = {
            type: "GET",
            url: envData.gateway + "/backend/operation/" + this.props.projectId,
            headers: {
                'Accept': 'application/json;charset=UTF-8',
                'Content-Type': 'application/json;charset=UTF-8'
            },
        };
        jQuery.ajax(request)
            .then(response => {
                const operations = response;
                this.setState({operations})
            })
            .catch(alert);
    }

    render() {
        //this.state.operations //todo: make map to data
        //[{id: 1, comment: "Breakfast", operationType: "MINUS", value: 150, date: 1506643200000}]


        const columns = [{
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            render: (text) => (<a href="#">{text}</a>)
        }, {
            title: 'Age',
            dataIndex: 'age',
            key: 'age'
        }, {
            title: 'Address',
            dataIndex: 'address',
            key: 'address'
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

        const data = [{
            key: '1',
            name: 'John Brown',
            age: 32,
            address: 'New York No. 1 Lake Park',
        }, {
            key: '2',
            name: 'Jim Green',
            age: 42,
            address: 'London No. 1 Lake Park',
        }, {
            key: '3',
            name: 'Joe Black',
            age: 32,
            address: 'Sidney No. 1 Lake Park',
        }];

        return (<Table columns={columns} dataSource={data}/>);
    }
}

export default OperationTable;