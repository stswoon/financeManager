import React from "react";
import {Input, Button, Icon, Menu, Dropdown} from 'antd';
import NewProject from "./NewProject";

class ProjectMenu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    handleMenuItemClick = (menuItem) => {
        console.log(menuItem);
        if (menuItem.key === "new") {
            this.setState({editProjectMode: true});
        } else {
            this.props.changeProject(menuItem.key);
        }
    };

    handleVisibleChange = (visibility) => {
        if (!this.state.editProjectMode) {
            this.setState({visibility});
        }
    };

    render() {
        let menuItems = this.props.projects.map(project => <Menu.Item key={project.id}>{project.name}</Menu.Item>);
        menuItems.push((<Menu.Divider />));
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
            <Dropdown overlay={menu} trigger={['click']}
                      onVisibleChange={this.handleVisibleChange}
                      visible={this.state.visibility}>
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