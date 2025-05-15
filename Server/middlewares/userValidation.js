const Joi = require('joi');

const userValidationSchema = Joi.object({
    role: Joi.string().optional(),
    name: Joi.string()
        .required()
        .messages({
            'any.required': 'Name is required',
        }),
    email: Joi.string()
        .email()
        .required()
        .messages({
            'any.required': 'Email is required',
            'string.email': 'Email must be a valid email address',
        }),
    phone: Joi.number()
        .required()
        .messages({
            'any.required': 'Phone Number is required',
        }),
    password: Joi.string().required(),
    clientId: Joi.string().required(),
    status: Joi.string().required(),
});

module.exports = userValidationSchema;