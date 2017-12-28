import React, {PropTypes} from 'react';
import constants from '../../utils/constants';
import {Button} from 'antd';
import WithLocaleHOC from '../localization/WithLocaleHOC';

const Toolbar = (props) => {
    const operationsLabel = props.i18next.t('operationTable.operations') || constants.defaultLabels.operationTable.operations;
    const newOperationLabel = props.i18next.t('operationTable.newOperation') || constants.defaultLabels.operationTable.newOperation;
    return (
        <div className="operation-table__title">
            <h4 className="operation-table__title-name">{operationsLabel}</h4>
            {/*<div id="i18n-test">{props.i18next.t('test_message')}</div>*/}
            <Button className="operation-table__button"
                    onClick={props.onRefresh}
                    icon="reload" shape="circle"
                    loading={props.loading}>
            </Button>
            <Button className="operation-table__button"
                    onClick={props.showCreateOperationPopup}
                    icon="plus-circle">
                {newOperationLabel}
            </Button>
        </div>
    )
};

export default WithLocaleHOC(Toolbar);