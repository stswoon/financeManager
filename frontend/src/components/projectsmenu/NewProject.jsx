import React from "react";
import {Input, Button} from "antd";

class NewProject extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    handleInputChange = (event) => {
        const target = event.target;
        const value = target.value;
        this.setState({projectName: value});
    };

    showEdit = () => {
        this.setState({edit: true});
    };

    hideEdit = () => {
        this.setState({edit: false});
    };

    onProjectCreate = () => {
        this.props.onProjectCreate(this.state.projectName);
        this.hideEdit();
    };

    render() {
        let result;
        if (!this.state.edit) {
            result = (
                <span onClick={this.showEdit}>New Project...</span>
            );
        } else {
            result = (
                <div>
                    <Input placeholder="My Project"
                           value={this.state.projectName} //todo ref
                           onChange={this.handleInputChange}
                    />
                    <Button type="primary" shape="circle" icon="plus"
                            onClick={this.onProjectCreate}
                    />
                    <Button shape="circle" icon="close"
                            onClick={this.hideEdit}
                    />
                </div>
            );
        }
        return (<div>{result}</div>)
    }
}

export default NewProject;