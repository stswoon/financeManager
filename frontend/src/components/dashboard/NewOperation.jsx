import React from "react";
import {Input, Button, Icon, Menu, Dropdown} from 'antd';
import {Table} from 'antd';
import jQuery from "jQuery";
import {Modal} from 'antd';

class NewOperation extends React.Component {
    constructor(props) {
        super(props);
        this.state = {visible: false};
    }

    componentWillReceiveProps(nextProps) {
        this.setState({visible: nextProps.visible});
    }

    handleOk = (e) => {
        console.log(e);
        this.setState({
            visible: false
        });
    };
    handleCancel = (e) => {
        console.log(e);
        this.setState({
            visible: false
        });
    };

    render() { //todo: make operation creation form
        return (
            <div>
                <Modal
                    title="Basic Modal"
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                >
                    <p>Some contents...</p>
                    <p>Some contents...</p>
                    <p>Some contents...</p>
                </Modal>
            </div>
        );
    }
}

export default NewOperation;