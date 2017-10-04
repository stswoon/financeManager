const constants = {
    //loginUrl: "https://stswoon-fm-auth.herokuapp.com" + "/auth/oauth/token?grant_type=password&username={login}&password={password}";
    loginUrl: "/auth/oauth/token?grant_type=password&username={login}&password={password}",

    unexpectedErrorMessage: "Unexpected error, please contact your administrator",

    authenticationCookieName: "authentication"
};

export default constants;