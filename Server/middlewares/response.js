const appResponse = (msg, success, data = null) => {
    return { message: msg, success: success, data: data };
    if (success) {
    } else {
        return { message: msg, success: success };
    }
};
module.exports = appResponse;
