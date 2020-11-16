const xss = require('xss');
const validate = require('validate.js');

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
                        " %{user} is not a valid username.  Must contain only letters and/or numbers and 8 characters long.\n"
                        ,
                        {
                            user: cleanedUsername,
                        });
                }
            }
        },
        password: {
        presence: true,
        length: {minimum: 8, maximum: 16},
        format: {
            pattern: /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[^\w\d\s:])([^\s]){8,16}$/,
            message: function(value, attribute, validatorOptions, attributes, globalOptions) {
                return validate.format(
                    " %{pass} is not a valid password. \n Must contain 8-16 chars, 1 numbers, 1 upper case letters, 1 lower case letters, and 1 special character.\n"
                    ,
                    {
                        pass: cleanedPassword,
                    });
                }
            }
        }
    };
    return validate({username: cleanedUsername, password: cleanedPassword}, constraints, {format: "flat"});
};

const validateWheelValue = function(id, listId, wheelValue){
    const cleanedId = xss(id);
    const cleanedListId = xss(listId);
    const cleanedWheelValue = xss(wheelValue);
    const constraints = {
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
                        " ^%{value} is not a valid.  Only alpha-numeric."
                        ,
                        {
                            value: cleanedWheelValue,
                        }
                    );
                }
            }
        }
    }

    return validate({id: cleanedId, listId: cleanedListId, wheelValue: cleanedWheelValue}, constraints);
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

     return validate({username: cleanedUserName, email: cleanedEmail}, constraints);
 }

module.exports.validateUser = validateUser;
module.exports.validateWheelValue = validateWheelValue;
module.exports.validateEmail = validateEmail;