/*
 * Usage : configuration file 
 * Author : vaibhavs 
 */ 
// Here i am creating the custom fixture, so that i can use this fixtures as default fixtures page,browser

const base =  require("@playwright/test");

exports.customtest = base.test.extend(
{
    restApidetails : {
        "url" : "https://da94527f-98c7-458a-9457-ccc69acbc0b6.mock.pstmn.io",
        "user" : "apiuser",
        "password" : "mypwd"
    }

})