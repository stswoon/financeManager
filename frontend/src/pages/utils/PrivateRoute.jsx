import React from 'react';
import {Route, Redirect} from 'react-router-dom';
import {connect} from "react-redux";

//from https://github.com/cornflourblue/react-redux-registration-login-example
const PrivateRoute = ({component: Component, ...rest}) => {
    let authenticated = rest.authenticated;
    //console.log("anneq304::SSR - PrivateRoute::authenticated="+authenticated);
    return (
        <Route {...rest} render={
            (props) => {
                console.debug("PrivateRoute authenticated=" + authenticated);
                return (
                    authenticated //localStorage.getItem('user')
                        ? <Component {...props} />
                        : <Redirect to={{pathname: '/', state: {from: props.location}}}/>
                )
            }
        }/>
    )
};

function mapStateToProps(state) {
    const {loginReducer} = state;
    return {authenticated: !!loginReducer.authData};
}

const connected = connect(mapStateToProps)(PrivateRoute);
export {connected as PrivateRoute};


//from https://github.com/cornflourblue/react-redux-registration-login-example
// export const PrivateRoute = ({ component: Component, ...rest }) => (
//     <Route {...rest} render={props => (
//         localStorage.getItem('user')
//             ? <Component {...props} />
//             : <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
//     )} />
// );