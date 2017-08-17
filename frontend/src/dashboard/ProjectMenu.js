import React from "react";
import {Input, Button, Icon, Menu, Dropdown} from 'antd';

class NewProject extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.value;
        this.setState({projectName: value});
    };

    render() {
        let result;
        if (!this.props.edit) {
            result = <span>New Project...</span>;
        } else {
            result = (
                <div>
                    <Input placeholder="My Project"
                           value={this.state.projectName} //todo ref
                           onChange={this.handleInputChange}
                    />
                    <Button type="primary" shape="circle" icon="plus"
                            onClick={this.props.onProjectCreate()}
                    />
                </div>
            )
        }
        return (
            {result}
        )
    }
}

class ProjectMenu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    handleMenuItemClick = (key) => {
        if (key === "new") {
            this.setState(!this.state.editProjectMode);
        }
        this.props.changeProject(key);
    };

    render() {
        let menuItems = this.props.projects.map(project => <Menu.Item key={project.id}>{project.name}</Menu.Item>);
        menuItems.push((
            <Menu.Item key="new">
                <NewProject edit={this.state.editProjectMode} onNewProject={this.props.handleNewProject}/>
            </Menu.Item>
        ));
        let menu = (
            <Menu onClick={this.handleMenuItemClick}>
                {menuItems}
            </Menu>
        );
        return (
            <Dropdown overlay={menu}>
                <a className="ant-dropdown-link" href="#">
                    Projects <Icon type="down"/>
                </a>
            </Dropdown>
        );
    }
}

ProjectMenu.defaultProps = {
    projects: []
};

export default ProjectMenu;