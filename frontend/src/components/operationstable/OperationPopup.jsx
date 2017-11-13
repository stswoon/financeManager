import React from "react";
import {Input, Select, DatePicker, Form, InputNumber, LocaleProvider, Button} from 'antd';
import {Modal} from 'antd';
import moment from 'moment';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import locales from 'antd/lib/locale-provider/en_US';

const FormItem = Form.Item;

import constants from "../../utils/constants";

import './operation-popup.less'

class OperationPopup extends React.Component {
    constructor(props) {
        super(props);
        const now = moment();
        this.state = {
            comment: "",
            value: 0,
            type: "MINUS",
            date: now
        };
        let state = this.state;
        let inputData = this.props.inputData;
        let date = moment(inputData.date);
        this.state = {...state, ...inputData, date}; //todo maybe move to will receive props
    }

    handleOk = (e) => {
        console.log(e);
        let data = {
            id: this.props.inputData && this.props.inputData.id,
            comment: this.state.comment,
            value: this.state.value,
            operationType: this.state.type,
            date: this.state.date.toDate().getTime()
        };
        this.props.onOk(data);
    };

    handleInputChange = (event) => {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        this.setState({[name]: value});
    };

    handleNumberInputChange = (value) => this.setState({value});

    handleTypeInputChange = () => {
        if (this.state.type == "PLUS") {
            this.setState({type: "MINUS"});
        } else {
            this.setState({type: "PLUS"});
        }
    };

    handleDateChange = (date) => this.setState({date});

    render() {
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
        //animation beetween is hard - https://stackoverflow.com/questions/33426539/react-animate-transition-between-components
        formItems.push(
            <FormItem>
                <div className="moneyInput">
                    <div className="plusMinusButton__wrapper">
                        <ReactCSSTransitionGroup
                            transitionName="plusMinusButton"
                            transitionEnterTimeout={500}
                            transitionLeaveTimeout={500}
                            transitionAppear={true}
                            transitionLeave={true}>
                            {this.state.type == "PLUS" && <Button className="plusMinusButton__button _plus" icon="plus"
                                                                  onClick={this.handleTypeInputChange}></Button>}
                            {this.state.type == "MINUS" && <Button className="plusMinusButton__button _minus" icon="minus"
                                                                   onClick={this.handleTypeInputChange}></Button>}


                            {/*<Select defaultValue={this.state.type}*/}
                            {/*name="type"*/}
                            {/*style={{width: 120}}*/}
                            {/*onChange={this.handleTypeInputChange}>*/}
                            {/*<Option value="PLUS">+</Option>*/}
                            {/*<Option value="MINUS">-</Option>*/}
                            {/*</Select>*/}
                        </ReactCSSTransitionGroup>
                    </div>
                    <InputNumber min={0}
                                 defaultValue={0}
                                 name="value"
                                 value={this.state.value}
                                 onChange={this.handleNumberInputChange}
                    />
                </div>
            </FormItem>
        );
        //https://github.com/ant-design/ant-design/issues/4284
        formItems.push(
            <FormItem>
                <LocaleProvider locale={locales}>
                    <DatePicker defaultValue={this.state.date} format={constants.dateFormat}
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
                       visible={true}
                       footer={[
                           <Button key="Cancel" onClick={this.props.onCancel}>Cancel</Button>,
                           <Button key="Submit" type="primary"
                                   loading={this.props.loading}
                                   onClick={this.handleOk}>
                               {this.props.okText}
                           </Button>
                       ]}
                >
                    {form}
                </Modal>
            </div>
        );
    }
}

export default OperationPopup;