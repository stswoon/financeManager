import React from "react";

export default class Hello extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <span>
                <h1>Hello, world {this.props.staticContext}</h1>
                <span>And hello form state {this.state.hello}</span>
            </span>
        );

        //todo https://github.com/cassiozen/ReactCasts/blob/master/episode13/episode-source-code/src/shared/news/News.js
    }

    componentDidMount() {
        fetch("https://stswoon-fm-gateway.herokuapp.com/backend/hello/me")
            .then((response) =>  {
                console.log(response);
                return response.text();
                // console.lresponse.json()
            })
            .then((data) => {
                console.log(data);
                this.setState({hello:data});
                alert("See console. And response is '" + data + "'");
            });
    }
}
