import React from "react";
import {Avatar} from "antd";

const User = ({userName, onLogout}) => {
    return (
        <div>
            <Avatar>{userName}</Avatar>
            <a href="#" onClick={onLogout}>log out</a>
        </div>
    )
};
export default User;

