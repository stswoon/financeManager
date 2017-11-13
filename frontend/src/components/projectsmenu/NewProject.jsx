import React from "react";
import {Input, Button} from "antd";

import "./new-project.less"

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

    onProjectCreate = () => this.props.onProjectCreate(this.state.projectName);

    onCancel = (event) => {
        //https://stackoverflow.com/questions/24415631/reactjs-syntheticevent-stoppropagation-only-works-with-react-events
        event.stopPropagation(); //cancel click in menu container
        this.props.onCancel();
    };

    render() {
        if (!this.props.edit) {
            return (<span>{this.props.readModePlaceholder || "New Project..."}</span>);
        }
        return (
            <div className="createInput">
                <div className="createInput__input-wrapper">
                    <Input placeholder={this.props.editModePlaceholder || "My Project"}
                           value={this.state.projectName}
                           onChange={this.handleInputChange}
                           className="createInput__input"
                    />
                </div>
                <Button type="primary" shape="circle" icon="plus" onClick={this.onProjectCreate}/>
                <Button shape="circle" icon="close" onClick={this.onCancel}/>
            </div>
        );
    }
}

export default NewProject;