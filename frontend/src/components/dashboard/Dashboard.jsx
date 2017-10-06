import React from "react";
import NotificationCollector from "./NotificationCollector";
import ProjectMenu from "./ProjectMenu";
import OperationTable from "./OperationTable";
import User from "./User";
import "./dashboard.less";
import jQuery from "jquery"
import { Redirect, Route } from 'react-router-dom';
import {withRouter} from "react-router-dom";
import Cookie from "js-cookie";
import Request from "../../../src/utils/ajax";
import constants from "../../../src/utils/constants";

const isAuthenticated = () => (Cookie.getJSON(constants.authenticationCookieName) || {}).bearerToken;

class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            projects: []
        };
    }

    userId = Cookie.get(constants.authenticationCookieName).userId; //todo

    componentDidMount() {

        //use axios - https://daveceddia.com/ajax-requests-in-react/

        var request = new Request({
            url: envData.gateway + "/backend/project/" + this.userId,
        });
        request.send()
            .then(response => {
                const projects = response;
                this.setState({projects})
            })
            .catch(alert);
    }

    handleNewProject = (name) => {
        var request = {
            type: "PUT",
            url: envData.gateway + "/backend/project/" + this.userId,
            headers: {
                'Accept': 'application/json;charset=UTF-8',
                'Content-Type': 'application/json;charset=UTF-8'
            },
            data: JSON.stringify({name: name})
        };
        jQuery.ajax(request)
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
        //todo https://stackoverflow.com/questions/43164554/how-to-implement-authenticated-routes-in-react-router-4
        if (!isAuthenticated()) {
            return <Redirect to="/login" />
        }

        console.log("projectId="+this.props.match.params.projectId);
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

// https://stackoverflow.com/questions/31079081/programmatically-navigate-using-react-router
// Dashboard.contextTypes = {
//     history: React.PropTypes.shape({
//         push: React.PropTypes.func.isRequired
//     })
// }

export default withRouter(Dashboard); //https://stackoverflow.com/questions/42701129/how-to-push-to-history-in-react-router-v4