import React from "react";
import {connect} from "react-redux";
import {message} from "antd";
import {bindActionCreators} from 'redux';

import NotificationCollector from "../../components/dashboard/NotificationCollector";
import ProjectMenu from "../../components/dashboard/ProjectMenu";
import OperationTable from "../../components/dashboard/OperationTable";
import User from "../../components/dashboard/User";
import Request from "../../services/request.service";
import constants from "../../../src/utils/constants";
import {dashboardActions} from "./dashboard.actions";

import "./dashboardPage.less";

function mapStateToProps(state) {
    const {loginReducer, dashboardReducer} = state;
    return {
        userId: loginReducer.authData.userId,
        username: loginReducer.authData.username,
        projects: dashboardReducer.projects
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
            projects: []
        };
    }

    componentWidMount() {
        let projectId = this.props.match.params.projectId;
        if (projectId) {
            console.info("Set project from url projectId=" + projectId);
            this.actions.setCurrentProject(projectId);
        } else {
            this.actions.restoreCurrentProject();
        }
    }

    componentDidMount() {
        this.props.actions.loadProjects(this.props.userId);
    }

    handleNewProject = (name) => {
        new Request("PUT", envData.gateway + "/backend/project/" + this.props.userId, {name: name}).send()
            .then(response => this.setState({projects: [...this.state.projects, response]}))
            .catch(alert);
    };

    handleNewOpeartion = () => {
        this.setState({newOpeartion: true});
    };

    render() {
        console.debug("projectId=" + this.props.projectId);
        const projectId = parseInt(this.props.projectId);

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
                        <div className="navigation_item">
                            <NotificationCollector/>
                        </div>
                        <div className="navigation_item">
                            <User/>
                        </div>
                    </div>
                </div>
                <div className="content">
                    {/*<MoneySummary/>*/}
                    {/*<Diagram/>*/}
                    {projectId && <OperationTable projectId={projectId} onNewOpertion={this.handleNewOpeartion}/>}
                </div>
            </div>
        )
    }
}

//todo get last project from local storage


// const connected = connect(mapStateToProps)(DashboardPage);
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

