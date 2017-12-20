import React from "react";
import constants from "../../utils/constants";
import {Button} from "antd";

const Toolbar = (props) => (
    <div className="operation-table__title">
        <h4 className="operation-table__title-name">{constants.operations}</h4>
        <Button className="operation-table__button"
                onClick={props.onRefresh}
                icon="reload" shape="circle"
                loading={props.loading}>
        </Button>
        <Button className="operation-table__button"
                onClick={props.showCreateOperationPopup}
                icon="plus-circle">
            {constants.newOperation}
        </Button>
    </div>
);

export default Toolbar;