
/*
 * Usage : Rest API service class 
 * Author : vaibhavs 
 */ 

const{expect} = require("@playwright/test");
// Added request constant for API request
const{request} = require("@playwright/test");

class RestAPIService {

    constructor(){
      //constructor(page){
      //  this.page = page;
        this.apiContext = request.newContext();
    }    

  async getRestApiContext(){
    const apiContext = await request.newContext();
    return apiContext;
    } 

  async getDefaultHeader(mockCode){

    // Define the JSON header
     const jsonHeader = {
        'x-mock-response-code': mockCode,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
         };
     return jsonHeader;
   } 

   async getHeaderWithToken(mockCode,token){
    // Define the JSON header
     const jsonHeader = {
        'x-mock-response-code': mockCode,
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Cookie' : "JSESSIONID="+token
         };
     return jsonHeader;
   } 

 
}
module.exports = {RestAPIService};