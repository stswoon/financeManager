import React from "react";
import Highcharts from 'highcharts';

import "highcharts/css/highcharts.css"
import LoaderHOC from "./LoaderHOC";


class Diagram extends React.Component {
    constructor(props) {
        super(props);
    }

    shouldComponentUpdate() {
        return false;
    }

    componentDidMount() {
        const config = {
            chart: {
                type: 'column'
            },
            title: {
                text: ''
            },
            xAxis: {
                categories: this.props.categories
            },
            series: [{
                name: 'Money',
                data: this.props.data
            }]
        };
        Highcharts.chart(this.props.placeholderId, config);
    }

    render() {
        return (
            <div className={this.props.className} id={this.props.placeholderId}/>
        );
    }
}

export default LoaderHOC(Diagram);