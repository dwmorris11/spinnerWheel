const xss = require('xss');
const validate = require('validate.js');
const { ModuleFilenameHelpers } = require('webpack');

const validateUser = function(username, password) {
    const cleanedUsername = xss(username);
    const cleanedPassword = xss(password);

    const constraints = {
        username: {
            presence: true,
            length: {minimum: 8},
            format: {
                pattern: /^[a-zA-Z0-9]+$/,  // alpha-num
                message: function(value, attribute, validatorOptions, attributes, globalOptions) {
                    return validate.format(
                        "^%{user} is not a valid username.  Must contain only letters and/or numbers and 8 characters long."
                        ,
                        {
                            user: cleanedUsername,
                        });
                }
            }
        },
        password: {
        presence: true,
        length: {minimum: 8},
        format: {
            // minimum 2 upper, 2 lower, 2 numbers, 2 special characters
            pattern: /\A(?=.*[A-Z].*[A-Z])(?=.*[a-z].*[a-z])(?=.*[0-9].*[0-9])(?=.*[^a-zA-Z0-9].*[^a-zA-Z0-9])/,
            message: function(value, attribute, validatorOptions, attributes, globalOptions) {
                return validate.format(
                    "^%{pass} isnot a valid password.  Must contain 8 chars, 2 numbers, 2 upper case letters, 2 lower case letters, and 2 special characters."
                    ,
                    {
                        pass: cleanedPassword,
                    });
                }
            }
        }
    };

    return validate({username: cleanedUsername, password: cleanedPassword});
};

const validateWheelValue = function(id, listId, wheelValue){
    const cleanedId = xss(id);
    const cleanedListId = xss(listId);
    const cleanedWheelValue = xss(wheelValue);
    const wheelValueConstraints = {
        id: {
            presence: true,
        },
        listId: {
            presence: true,
        },
        wheelValue: {
            presence: true,
            length: {maximum: 15},
            format: {
                pattern: /^[a-zA-Z0-9]+$/, // alpha-num
                message: function(value, attribute, validatorOptions, attributes, globalOptions) {
                    return validate.format(
                        "^%{value} is not a valid.  Only alpha-numeric."
                        ,
                        {
                            value: cleanedWheelValue,
                        }
                    );
                }
            }
        }
    }

    return validate({id: cleanedId, listId: cleanedListId, wheelValue: cleanedWheelValue});
 };

 const validateEmail = function(username, email){
     const cleanedUserName = xss(username);
     const cleanedEmail = xss(email);
     const constraints = {
         username: {
             presence: true,
         },
         email: {
             email: true,
         }
     };

     return validate({username: cleanedUserName, email: cleanedEmail});
 }

module.exports.validateUser = validateUser;
module.exports.validateWheelValue = validateWheelValue;
module.exports.validateEmail = validateEmail;