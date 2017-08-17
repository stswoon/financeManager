import React from "react";
import {Badge, Popover, Icon} from "antd";

class NotificationCollector extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            showNotifications: false,
            messages: []
        };
    }

    handleVisibleChange = (visible) => {
        this.setState({showNotifications : visible});
    };

    render() {
        let messages = this.state.messages.map((message) => {
            return (
                <div>
                    <span>{message.type.toUpperCase() + ":"}</span><span>{message.text}</span>
                </div>
            )
        });
        return (
            <Popover
                content={messages}
                trigger="click"
                visible={this.state.showNotifications}
                onVisibleChange={this.handleVisibleChange}
            >
                <Badge count={this.state.messages.length}>
                    <Icon type="message" onClick={this.toggleNotifications}/>
                </Badge>
            </Popover>
        )
    }
}

export default NotificationCollector;