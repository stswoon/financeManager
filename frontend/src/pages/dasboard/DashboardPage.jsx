import React from "react";
import {connect} from "react-redux";

import NotificationCollector from "../../components/dashboard/NotificationCollector";
import ProjectMenu from "../../components/dashboard/ProjectMenu";
import OperationTable from "../../components/dashboard/OperationTable";
import User from "../../components/dashboard/User";
import Request from "../../services/request.service";
import constants from "../../../src/utils/constants";

import "./dashboardPage.less";

class DashboardPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            projects: []
        };
    }

    componentDidMount() {
        var request = new Request("GET", envData.gateway + "/backend/project/" + this.props.userId);
        request.send()
            .then(response => {
                const projects = response;
                this.setState({projects})
            })
            .catch(alert);
    }

    handleNewProject = (name) => {
        new Request("PUT", envData.gateway + "/backend/project/" + this.props.userId, {name: name}).send()
            .then(response => this.setState({projects: [...this.state.projects, response]}))
            .catch(alert);
    };

    handleChangeProject = (projectId) => {
        //https://stackoverflow.com/questions/31079081/programmatically-navigate-using-react-router
        //context.history.push('/dashboard/' + projectId);
        this.props.history.push('/dashboard/' + projectId);
    };

    handleNewOpeartion = () => {
        this.setState({newOpeartion: true});
    };

    render() {
        console.log("projectId=" + this.props.match.params.projectId);
        const projectId = parseInt(this.props.match.params.projectId);

        return (
            <div>
                <div className="navigation">
                    <div className="navigation_item">
                        <ProjectMenu projects={this.state.projects}
                                     onProjectCreate={this.handleNewProject}
                                     changeProject={this.handleChangeProject}
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


function mapStateToProps(state) {
    const {loginReducer} = state;
    return {userId: loginReducer.authData.userId, username: loginReducer.authData.username};
}

const connected = connect(mapStateToProps)(DashboardPage);
export {connected as DashboardPage};

// https://stackoverflow.com/questions/31079081/programmatically-navigate-using-react-router
// Dashboard.contextTypes = {
//     history: React.PropTypes.shape({
//         push: React.PropTypes.func.isRequired
//     })
// }
//export default withRouter(Dashboard); //https://stackoverflow.com/questions/42701129/how-to-push-to-history-in-react-router-v4