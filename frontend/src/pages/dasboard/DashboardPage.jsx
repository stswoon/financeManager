import React from "react";
import {connect} from "react-redux";
import {message} from "antd";
import {bindActionCreators} from 'redux';
import Redirect from "react-router-dom/es/Redirect";

import NotificationCollector from "../../components/notifications/NotificationCollector";
import ProjectMenu from "../../components/projectsmenu/ProjectMenu";
import OperationTable from "../../components/operationstable/OperationTable";
import User from "../../components/user/User";
import Request from "../../services/request.service";
import constants from "../../../src/utils/constants";
import {dashboardActions} from "./dashboard.actions";

import "./dashboardPage.less";

function mapStateToProps(state) {
    const {loginReducer, dashboardReducer} = state;
    return {
        userId: loginReducer.authData.userId,
        username: loginReducer.authData.username,
        projects: dashboardReducer.projects,
        currentProjectId: dashboardReducer.currentProjectId,
        operations: dashboardReducer.operations
    };
}

function mapDispatchToProps(dispatch) {
    return {actions: bindActionCreators(dashboardActions, dispatch)};
}

@connect(mapStateToProps, mapDispatchToProps)
export class DashboardPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            projects: [],
            operations: []
        };
    }

    componentWillMount() {
        let projectId = this.props.match.params.projectId;
        if (projectId) {
            console.info("Set project from url projectId=" + projectId);
            this.props.actions.setCurrentProject(projectId);
        } else {
            this.props.actions.restoreCurrentProject();
        }

        this.props.actions.loadProjects(this.props.userId);
    }

    handleNewProject = (name) => {
        new Request("PUT", envData.gateway + "/backend/project/" + this.props.userId, {name: name}).send()
            .then(response => this.setState({projects: [...this.state.projects, response]}))
            .catch(alert);
    };

    handleOperationCreate = (operationData) => {
        this.props.actions.createOperation(operationData, this.props.currentProjectId);
    };

    handleOperationUpdate = (operationData) => {
        this.props.actions.updateOperation(operationData);
    };

    handleOperationRemove = (operationId) => {
        this.props.actions.removeOperation(operationId);
    };

    render() {
        console.debug("projectId=" + this.props.currentProjectId);
        const currentProjectId = parseInt(this.props.currentProjectId);
        const urlProjectId = this.props.match.params.projectId;
        if (currentProjectId != urlProjectId) {
            return (<Redirect to={"/dashboard/" + currentProjectId}/>);
        }

        let operations = this.props.operations || [];

        return (
            <div>
                <div className="navigation">
                    <div className="navigation_item">
                        <ProjectMenu projects={this.props.projects}
                                     onProjectCreate={this.handleNewProject}
                                     changeProject={this.props.actions.setCurrentProject}
                        />
                    </div>
                    <div className="navigation_right-block">
                        {/*<div className="navigation_item">*/}
                            {/*<NotificationCollector/>*/}
                        {/*</div>*/}
                        <div className="navigation_item">
                            <User userName={this.props.username}/>
                        </div>
                    </div>
                </div>
                <div className="content">
                    {/*<MoneySummary/>*/}
                    {/*<Diagram/>*/}
                    {currentProjectId && <OperationTable operations={operations}
                                                         onOperationCreate={this.handleOperationCreate}
                                                         onOperationUpdate={this.handleOperationUpdate}
                                                         onOperationRemove={this.handleOperationRemove}
                    />}
                </div>
            </div>
        )
    }
}



//const connected = connect(mapStateToProps)(DashboardPage);
//export {connected as DashboardPage};
// https://stackoverflow.com/questions/31079081/programmatically-navigate-using-react-router
// this.props.history.push('/dashboard/' + projectId);
// //context.history.push('/dashboard/' + projectId);
// https://stackoverflow.com/questions/31079081/programmatically-navigate-using-react-router
// Dashboard.contextTypes = {
//     history: React.PropTypes.shape({
//         push: React.PropTypes.func.isRequired
//     })
// }
//export default withRouter(Dashboard); //https://stackoverflow.com/questions/42701129/how-to-push-to-history-in-react-router-v4