import Cookie from "js-cookie";
import Request from "./ajax";
import constants from "./constants";

const isAuthenticated = async () => {
    const bearerToken = (Cookie.getJSON(constants.authenticationCookieName) || {}).bearerToken;
    if (!bearerToken) {
        return false;
    }
    return true;

    //todo check token ans save flag to session storage
    // sessionStorage.getItem(constants.authenticationSessionStorageItemName)
    //
    // const url = constants.checkTokenUrl.replace("{token}", bearerToken);
    // const response = await new Request("GET", url).send();
    //
    // return response.status == 200;
};

const AuthUtils = {isAuthenticated};

export default AuthUtils;