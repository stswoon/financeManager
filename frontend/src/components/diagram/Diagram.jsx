import React from "react";
import Highcharts from 'highcharts';

import "highcharts/css/highcharts.css"


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
                name: '',
                data: this.props.data
            }]
        };
        Highcharts.chart(this.props.placeholderId, config);
    }

    render() {
        return (
            <div id={this.props.placeholderId}/>
        );
    }
};

export default Diagram;