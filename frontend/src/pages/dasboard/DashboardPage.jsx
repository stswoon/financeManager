import React from "react";
import {connect} from "react-redux";
import {bindActionCreators} from 'redux';
import Redirect from "react-router-dom/es/Redirect";
import isEqual from "lodash/isEqual";
const lodash = {isEqual};

import ProjectMenu from "../../components/projectsmenu/ProjectMenu";
import OperationTable from "../../components/operationstable/OperationTable";
import User from "../../components/user/User";
import {dashboardActions} from "./dashboard.actions";

import "./dashboardPage.less";
import DiagramContainer from "../../containers/DiagramContainer";

function mapStateToProps(state) {
    const {loginReducer, dashboardReducer} = state;

    return {
        userId: loginReducer.authData.userId,
        username: loginReducer.authData.username,
        projects: dashboardReducer.projects,
        currentProjectId: dashboardReducer.currentProjectId,
        operations: dashboardReducer.operations,
        createUpdateLoading: dashboardReducer.createUpdateLoading,
        loading: dashboardReducer.loading
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

    shouldComponentUpdate(nextProps, nextState) {
        return !(lodash.isEqual(nextProps, this.props) && lodash.isEqual(nextState, this.state));
    }

    componentDidMount() {
        let projectId = this.props.match.params.projectId; //from url
        const currentProjectId = this.props.currentProjectId == null ? null : parseInt(this.props.currentProjectId);
        console.log("anneq411::currentProjectId="+currentProjectId+" projectId="+projectId);
        if (projectId && currentProjectId != projectId) {
            console.info("Set project from url projectId=" + projectId);
            this.props.actions.setCurrentProject(projectId);
        } else {
            if (currentProjectId == null) {
                this.props.actions.restoreCurrentProject();
            }
        }

        console.log("anneq411::this.props.projects="+this.props.projects);
        if (this.props.projects.length === 0) { //SSR
            this.props.actions.loadProjects(this.props.userId);
        }
    }

    handleCreateProject = (name) => this.props.actions.createProject(name, this.props.userId);

    handleOperationCreate = (operationData) => {
        this.props.actions.createOperation(operationData, this.props.currentProjectId);
    };

    handleOperationUpdate = (operationData) => {
        this.props.actions.updateOperation(operationData);
    };

    handleOperationRemove = (operationId) => {
        this.props.actions.removeOperation(operationId);
    };

    logout = () => {
        this.props.actions.logout()
        //this.props.dispatch(loginActions.logout());
    };

    refresh = () => this.props.actions.loadOperations(this.props.userId);

    render() {
        //console.log("anneq302::SSR - dashboard");

        console.debug("projectId=" + this.props.currentProjectId);
        const currentProjectId = this.props.currentProjectId == null ? null : parseInt(this.props.currentProjectId);
        const urlProjectId = this.props.match.params.projectId;
        if (currentProjectId != null && currentProjectId != urlProjectId) {
            return (<Redirect to={"/dashboard/" + currentProjectId}/>);
        }

        let operations = this.props.operations || [];

        //console.log("anneq301::SSR - dashboard::operations.length="+operations.length);
        //console.log("anneq301::SSR - dashboard::currentProjectId="+currentProjectId);
        return (
            <div>
                <div className="navigation">
                    <div className="navigation_item">
                        <ProjectMenu projects={this.props.projects}
                                     onProjectCreate={this.handleCreateProject}
                                     onProjectRemove={this.props.actions.removeProject}
                                     changeProject={this.props.actions.setCurrentProject}
                        />
                    </div>
                    <div className="navigation_right-block">
                        <div className="navigation_item">
                            <User userName={this.props.username} onLogout={this.logout}/>
                        </div>
                    </div>
                </div>
                <div className="content">
                    {/*<MoneySummary/> todo*/}
                    {currentProjectId && <DiagramContainer projectId={currentProjectId} />}
                    {currentProjectId &&
                    <OperationTable operations={operations}
                                    onRefresh={this.refresh}
                                    loading={this.props.loading}
                                    onOperationCreate={this.handleOperationCreate}
                                    onOperationUpdate={this.handleOperationUpdate}
                                    createUpdateLoading={this.props.createUpdateLoading}
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