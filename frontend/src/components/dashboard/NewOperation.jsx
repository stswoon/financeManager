import React from "react";
import {Input, Button, Icon, Menu, Select, DatePicker, Form, InputNumber,LocaleProvider } from 'antd';
import {Table} from 'antd';
import jQuery from "jQuery";
import {Modal} from 'antd';
const FormItem = Form.Item;
import moment from 'moment';
import './new-operation.less';
import locales from 'antd/lib/locale-provider/en_US';

class NewOperation extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            value: 0
        };
    }

    componentWillReceiveProps(nextProps) {
        this.setState({visible: nextProps.visible});
    }

    handleOk = (e) => {
        console.log(e);

        var request = {
            type: "PUT",
            url: envData.gateway + "/backend/operation/" + this.props.projectId,
            headers: {
                'Accept': 'application/json;charset=UTF-8',
                'Content-Type': 'application/json;charset=UTF-8'
            },
            data: JSON.stringify({
                comment: this.state.comment,
                value: this.state.value,
                operationType: this.state.type,
                date: this.state.date
            })
        };
        jQuery.ajax(request)
            .then( () => this.setState({visible: false}) )
            .then(response => this.props.onCreate(response))
            .catch(alert);
    };
    handleCancel = (e) => {
        console.log(e);
        this.setState({
            visible: false
        });
    };

    handleInputChange = (event) => {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        this.setState({[name]: value});
    };

    handleNumberInputChange = (value) => {
        this.setState({value});
    };

    handleTypeInputChange = (type) => {
        this.setState({type});
    };

    handleDateChange = (date) => {
        this.setState({date: date.toDate().getTime()});
    };

    render() { //todo: make operation creation form
        const formItems = [];

        formItems.push(
            <FormItem>
                <Input placeholder="Comment"
                       name="comment"
                       value={this.state.comment}
                       onChange={this.handleInputChange}
                />
            </FormItem>
        );
        formItems.push(
            <FormItem>
                <Select defaultValue="MINUS"
                        name="type"
                        style={{width: 120}}
                        onChange={this.handleTypeInputChange}>
                    <Option value="PLUS">+</Option>
                    <Option value="MINUS">-</Option>
                </Select>
                <InputNumber min={0}
                             defaultValue={0}
                             name="value"
                             value={this.state.value}
                             onChange={this.handleNumberInputChange}
                />
            </FormItem>
        );
        const dateFormat = 'DD-MM-YYYY';
        const now = moment();
        //https://github.com/ant-design/ant-design/issues/4284
        formItems.push(
            <FormItem>
                <LocaleProvider locale={locales}>
                    <DatePicker defaultValue={now} format={dateFormat}
                                onChange={this.handleDateChange}/>
                </LocaleProvider>
            </FormItem>
        );

        const form = (
            <Form layout="horizontal">
                {formItems}
            </Form>
        );


        return (
            <div>
                <Modal width="300"
                       title="Basic Modal"
                       visible={this.state.visible}
                       onOk={this.handleOk}
                       onCancel={this.handleCancel}
                       okText="Create"
                       cancelText="Cancel"
                >
                    {form}
                </Modal>
            </div>
        );
    }
}

export default NewOperation;