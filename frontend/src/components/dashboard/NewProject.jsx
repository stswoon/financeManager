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

    componentWillReceiveProps(nextProps) {
        this.setState({})
    }

    render() {
        let result;
        if (!this.props.edit) {
            result = (
                <span>New Project...</span>
            );
        } else {
            result = (
                <div>
                    <Input placeholder="My Project"
                           value={this.state.projectName} //todo ref
                           onChange={this.handleInputChange}
                    />
                    <Button type="primary" shape="circle" icon="plus"
                            onClick={this.props.onProjectCreate}
                    />
                    <Button type="primary" shape="circle" icon="plus"
                            onClick={this.setState({edit: false})}
                    />
                </div>
            );
        }
        return (<div>{result}</div>)
    }
}

export default NewProject;