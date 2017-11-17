import React from "react";
import {Avatar, Popover} from "antd";
import "./user.less"


class User extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            showNotifications: false,
            messages: []
        };
    }

    handleVisibleChange = (visible) => {
        this.setState({showNotifications: visible});
    };

    render() {
        let items = [
            (<a key="logout" className="user-nav_logout" href="#" onClick={this.props.onLogout}>Log Out</a>)
        ];
        return (
            <Popover
                placement="bottomRight"
                content={items}
                trigger="click"
                visible={this.state.showNotifications}
                onVisibleChange={this.handleVisibleChange}
            >
                <div key="user" className="user">
                    <Avatar className="user__avatar" size="large">{this.props.userName}</Avatar>
                </div>
            </Popover>
        )
    }
}

export default User;

