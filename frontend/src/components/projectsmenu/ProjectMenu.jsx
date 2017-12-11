import React from "react";
import {Button, Icon, Menu, Dropdown, Modal} from 'antd';
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

    onProjectRemove = (event, projectId) => {
        event.stopPropagation();
        this.setState({removing: true, removedProjectId: projectId});
    };

    cancelRemove = () => this.setState({removing: false, removedProjectId: null});

    confirmRemove = () => {
        this.props.onProjectRemove(this.state.removedProjectId);
        this.cancelRemove();
    };

    render() {
        let menuItems = this.props.projects.map(project => (
            <Menu.Item key={project.id}>
                <div className="projectMenu__item">
                    <span className="projectMenu__item-text">{project.name}</span>
                    <Button className="projectMenu__item-button" type="danger" shape="circle" icon="delete"
                            onClick={(event) => this.onProjectRemove(event, project.id)}/>
                </div>
            </Menu.Item>)
        );
        menuItems.push((<Menu.Divider key="divider"/>));
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
            <div className="ProjectMenu">
                <Dropdown overlay={menu} trigger={['click']}
                          onVisibleChange={this.handleVisibleChange}
                          visible={this.state.visibility}>
                    <a className="ant-dropdown-link" href="#">
                        Projects<Icon type="down"/>
                    </a>
                </Dropdown>
                {
                    this.state.removing &&
                    <Modal title="" visible={true}
                           onOk={this.confirmRemove} onCancel={this.cancelRemove}
                           okText="Yes" cancelText="No">
                        <span>Are you sure delete this project?</span>
                    </Modal>
                }
            </div>
        );
    }
}

ProjectMenu.defaultProps = {
    projects: []
};

export default ProjectMenu;