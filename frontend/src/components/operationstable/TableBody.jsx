import moment from 'moment/moment';
import constants from '../../utils/constants';
import {Table} from 'antd';
import React from 'react';
import isEqual from 'lodash/isEqual';
import WithLocaleHOC from '../localization/WithLocaleHOC';

const lodash = {isEqual};

let parseData = (operations) => {
    return operations.map((item) => {
        return {...item, key: item.id};
    });
};

let parseColumns = (showEditOperationPopup, handleRemove, locale) => {
    const columns = [{
        title: locale.commentLabel,
        key: 'comment',
        dataIndex: 'comment'
    }, {
        title: locale.valueLabel,
        key: 'value',
        render: (data) => {
            return (
                <span>
                    {(data.operationType === 'MINUS' ? '-' : '+') + data.value} &#8381;
                </span>    //&#8381 - ruble sign
            )
        }
    }, {
        title: locale.dateLabel,
        key: 'date',
        dataIndex: 'date',
        render: date => (<span>{formatDate(date)}</span>)
    }, {
        title: locale.actionLabel,
        key: 'action',
        render: (data) => (
            <span>
                    <a href="#" onClick={() => showEditOperationPopup(data)}>{locale.editLabel}</a>
                    <span className="ant-divider"/>
                    <a href="#" onClick={() => handleRemove(data.id)}>{locale.removeLabel}</a>
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
        //return true;
    }

    render() {
        const commentLabel = this.props.i18next.t('table.comment') || constants.defaultLabels.table.comment;
        const valueLabel = this.props.i18next.t('table.value') || constants.defaultLabels.table.value;
        const dateLabel = this.props.i18next.t('table.date') || constants.defaultLabels.table.date;
        const actionLabel = this.props.i18next.t('table.action') || constants.defaultLabels.table.action;
        const editLabel = this.props.i18next.t('table.edit') || constants.defaultLabels.table.edit;
        const removeLabel = this.props.i18next.t('table.remove') || constants.defaultLabels.table.remove;
        const locale = {commentLabel, valueLabel, dateLabel, actionLabel, editLabel, removeLabel};

        const data = parseData(this.props.operations);
        const columns = parseColumns(this.props.showEditOperationPopup, this.props.handleRemove, locale);
        return (
            <Table columns={columns} dataSource={data}/>
        );
    }
}

export default WithLocaleHOC()(TableBody);