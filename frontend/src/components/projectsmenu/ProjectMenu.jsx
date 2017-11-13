import React from "react";
import {Input, Button, Icon, Menu, Dropdown} from 'antd';
import NewProject from "./NewProject";

import "./project-menu.less"

class ProjectMenu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    handleMenuItemClick = (menuItem) => {
        //console.log(menuItem);
        if (menuItem.key === "new") {
            this.setState({editProjectMode: true});
        } else {
            this.props.changeProject(menuItem.key);
        }
    };

    handleVisibleChange = (visibility) =>
        (visibility || !this.state.editProjectMode) && this.setState({visibility}); //check not to close in case of edit mode

    handleCancelNewProject = () => this.setState({editProjectMode: false});

    onProjectRemove = () => {}; //todo chaeck popup with confirm input project name

    render() {
        let menuItems = this.props.projects.map(project => (
            <Menu.Item key={project.id}>
                <span className="projectMenu__item-text">{project.name}</span>
                <Button className="projectMenu__item-button" type="danger" shape="circle" icon="delete"
                        onClick={this.onProjectRemove}/>
            </Menu.Item>)
        );
        menuItems.push((<Menu.Divider/>));
        menuItems.push((
            <Menu.Item key="new">
                <NewProject edit={this.state.editProjectMode}
                            onCancel={this.handleCancelNewProject}
                            onProjectCreate={this.props.onProjectCreate}
                />
            </Menu.Item>
        ));

        let menu = (<Menu className="projectMenu" onClick={this.handleMenuItemClick}>{menuItems}</Menu>);
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