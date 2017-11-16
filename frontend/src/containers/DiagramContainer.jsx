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

    async componentWillMount() {
        this.setState({
            ready: this.props.projectId === this.state.projectId,
            projectId: this.props.projectId
        });
        let request = new Request("GET", constants.statisticsUrl.replace("{projectId}", this.props.projectId));
        let response = await request.send();
        this.setState({...response, ready: true})
    }

    render() {
        return (
            <div className="diagramContainer">
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