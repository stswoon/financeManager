import React from "react";
import Diagram from "../components/diagram/Diagram";
import Request from "../services/request.service";
import constants from "../utils/constants";

import "./diagram-container.less"

class DiagramContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    async componentDidMount() {
        this.setState({
            ready: this.props.projectId === this.state.projectId,
            projectId: this.props.projectId
        });
        if (window.__initialData__ && window.__initialData__.statistic) {
            this.setState({...window.__initialData__.statistic, ready: true});
            window.__initialData__.statistic = null;
        } else {
            let request = new Request("GET", constants.statisticsUrl.replace("{projectId}", this.props.projectId));
            let response = await request.send();
            this.setState({...response, ready: true});
        }
    }

    render() {
        let modificator = this.state.ready ? "" : " _inprogress";
        return (
            <div className={"diagramContainer" + modificator}>
                <Diagram
                    className="diagramContainer__diagram"
                    placeholderId="statistics"
                    categories={this.state.categories || []}
                    data={this.state.data || []}
                />
            </div>
        );
    }
}

export default DiagramContainer;