import React from "react";
import {Spin} from "antd";

//https://www.youtube.com/watch?v=LTunyI2Oyzw
const LoadingHOC = (WrappedComponent) => (props) => {
    return props.data.length === 0 ?
        <Spin size="large"/> : <WrappedComponent {...props}/>
};

export default LoadingHOC;