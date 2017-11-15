import React from "react";
import Highcharts from 'highcharts';

import "highcharts/css/highcharts.css"
import Diagram from "../components/diagram/Diagram";
import {Spin} from "antd";
import Request from "../services/request.service";
import constants from "../utils/constants";


class DiagramContainer extends React.Component {
    constructor(props) {
        super(props);
    }

    async componentDidMount() {
        this.setState({
            ready: this.props.projectId == this.state.projectId,
            projectId: this.props.projectId
        });
        let request = new Request("GET", constants.statisticsUrl.replace("{projectId}", this.props.projectId);
        let response = await request.send();
        this.setState({...response, ready: true})
    }

    render() {
        if (!this.state.ready) {
            return (<Spin size="large"/>);
        }

        return (
            <Diagram
                categories={this.state.categories || []}
                incomesData={this.state.data || []}
            />
        );
    }
}

export default DiagramContainer;