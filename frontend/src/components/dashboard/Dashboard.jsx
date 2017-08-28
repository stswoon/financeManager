import React from "react";
import NotificationCollector from "./NotificationCollector";
import ProjectMenu from "./ProjectMenu";
import User from "./User";
import "./dashboard.less";
import jQuery from "jQuery"

class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            projects: []
        };
    }

    userId = 1; //todo

    componentDidMount() {

        //use axios - https://daveceddia.com/ajax-requests-in-react/

        var request = {
            type: "GET",
            url: envData.gateway + "/backend/project/" + this.userId,
            headers: {
                'Accept': 'application/json;charset=UTF-8',
                'Content-Type': 'application/json;charset=UTF-8'
            },
        };
        jQuery.ajax(request)
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

    render() {
        return (
            <div>
                <div className="navigation">
                    <div className="navigation_item">
                        <ProjectMenu projects={this.state.projects}
                                     onProjectCreate={this.handleNewProject}
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
                    {/*<OperationTable/>*/}
                </div>
            </div>
        )
    }
}

export default Dashboard;