const nodemailer = require('nodemailer');

function createTransporter({ service = 'gmail', user, pass }) {
    return nodemailer.createTransport({
        service,
        auth: { user, pass }
    });
}

function createMailOptions({ from, to, subject, text }) {
    return { from, to, subject, text };
}

function getWelcomeMailOptions({ to, userId, userPwd, from }) {
    return createMailOptions({
        from,
        to,
        subject: 'Welcome to our service',
        text: `Hi, thank you for registering with us!\nYour login credentials are below\nUser ID: ${userId}\nPassword: ${userPwd}`
    });
}

module.exports = {
    createTransporter,
    createMailOptions,
    getWelcomeMailOptions
};
