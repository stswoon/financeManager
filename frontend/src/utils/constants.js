const constants = {
    //loginUrl: "https://stswoon-fm-auth.herokuapp.com" + "/auth/oauth/token?grant_type=password&username={login}&password={password}";
    loginUrl: "/auth/oauth/token?grant_type=password&username={login}&password={password}",
    checkTokenUrl: "/auth/oauth/check_token?token={token}",

    incorrectCredentialsMessage: "Login or password are incorrect",
    unexpectedErrorMessage: "Unexpected error, please contact your administrator",

    authenticationCookieName: "authentication",

    actionTypes: {
            LOGIN_LOADING: 'LOGIN_LOADING',
            LOGIN_SUCCESS: 'LOGIN_SUCCESS',
            LOGIN_ERROR: 'LOGIN_ERROR',
            LOGIN_LOGOUT: 'LOGIN_LOGOUT',
            LOGIN_CHECK: 'LOGIN_CHECK'
    }
};

export default constants;