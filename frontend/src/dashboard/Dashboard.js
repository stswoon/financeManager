import React from "react";
import NotificationCollector from "./NotificationCollector";
import ProjectMenu from "./ProjectMenu";
import User from "./User";
//import "./dashboard.less";
require("./dashboard.less");

class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div>
                <div>
                    <ProjectMenu/>
                    <NotificationCollector/>
                    <User/>
                </div>
                {/*<MoneySummary/>*/}
                {/*<Diagram/>*/}
                {/*<OperationTable/>*/}
            </div>
        )
    }
}

export default Dashboard;