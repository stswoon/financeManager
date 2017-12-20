import moment from "moment/moment";
import constants from "../../utils/constants";
import {Table} from "antd";
import React from "react";
import isEqual from "lodash/isEqual";
const lodash = {isEqual};

let parseData = (operations) => {
    return operations.map((item) => {
        return {...item, key: item.id};
    });
};

let parseColumns = (showEditOperationPopup, handleRemove) => {
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
                    <a href="#" onClick={() => showEditOperationPopup(data)}>Edit</a>
                    <span className="ant-divider"/>
                    <a href="#" onClick={() => handleRemove(data.id)}>Remove</a>
                </span>
        ) //todo remove () from click
    }];
    return columns;
}

function formatDate(date) {
    //todo: https://learn.javascript.ru/datetime
    //https://stackoverflow.com/questions/3552461/how-to-format-a-javascript-date
    //!! https://momentjs.com/docs/#/displaying/format/
    let result = moment(date).format(constants.dateFormat);
    return result;
}

class TableBody extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    shouldComponentUpdate(nextProps, nextState) {
        return !(lodash.isEqual(nextProps, this.props) && lodash.isEqual(nextState, this.state));
    }

    render() {
        const data = parseData(this.props.operations);
        const columns = parseColumns(this.props.showEditOperationPopup, this.props.handleRemove);
        return (
            <Table columns={columns} dataSource={data}/>
        );
    }
}

export default TableBody;