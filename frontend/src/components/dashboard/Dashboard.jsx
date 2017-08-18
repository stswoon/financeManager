import React from "react";
import NotificationCollector from "./NotificationCollector";
import ProjectMenu from "./ProjectMenu";
import User from "./User";
import "./dashboard.less";

class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div>
                <div className="navigation">
                    <div className="navigation_item">
                        <ProjectMenu/>
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