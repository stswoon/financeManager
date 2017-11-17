import Request from "./request.service";

async function send(data) {
    if (!sendServerLogs) {
        return;
    }
    try {
        await new Request("POST", "/logs", data).send(true);
    } catch (e) {
        console._error("Failed to send logs", e); //use original only
    }
}

let integrated = false;
let sendServerLogs = true;

const Logger = {
    setSendServerLogs: function(flag) {
        sendServerLogs = flag;
    },

    integrate: function() {
        if (integrated) {
            console._error("Already integrated");
        }
        if (true) return; //todo

        //https://stackoverflow.com/questions/326596/how-do-i-wrap-a-function-in-javascript
        console._debug =console.debug;
        console._log = console.log;
        console._info = console.info;
        console._error = console.error;

        console.debug = function() {
            console._debug(arguments);
            send(arguments);
        };
        console.log = function() {
            console._log(arguments);
            send(arguments);
        };
        console.info = function() {
            console._info(arguments);
            send(arguments);
        };
        console.error = function() {
            console._error(arguments);
            send(arguments);
        };

        console.trace("anneq-test");
    }
};

export default Logger;