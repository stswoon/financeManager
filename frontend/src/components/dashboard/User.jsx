import React from "react";
import {Avatar} from "antd";
import "./user.less"

const User = ({userName, onLogout}) => {
    return (
        <div className="user-nav">
            <Avatar>{userName}</Avatar>
            <a className="user-nav_logout" href="#" onClick={onLogout}>log out</a>
        </div>
    )
};
export default User;

