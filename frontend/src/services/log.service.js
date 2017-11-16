import Request from "./request.service";

async function send(data) {
    if (!sendServerLogs) {
        return;
    }
    try {
        await new Request("POST", "/logs", data).send(true);
    } catch (e) {
        originalConsole.error("Failed to send logs", e); //use original only
    }
}

const originalConsole = {
    log: console.log,
    debug: console.debug,
    error: console.error,
    info: console.info
};

let integrated = false;
let sendServerLogs = true;

const Logger = {
    setSendServerLogs: function(flag) {
        sendServerLogs = flag;
    },

    integrate: function() {
        if (integrated) {
            originalConsole.error("Already integrated");
        }

        console.debug = function() {
            originalConsole.debug(arguments);
            send(arguments);
        };
        console.log = function() {
            originalConsole.log(arguments);
            send(arguments);
        };
        console.info = function() {
            originalConsole.info(arguments);
            send(arguments);
        };
        console.error = function() {
            originalConsole.error(arguments);
            send(arguments);
        };

        console.trace("anneq-test");
    }
};

export default Logger;