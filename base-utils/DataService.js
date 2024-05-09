
/*
 * Usage : DataService class 
 * Author : vaibhavs 
 */ 

const{expect,request} = require("@playwright/test");
const{BaseAPIService} =  require("../base-utils/BaseAPIService");
const{JsonReader} = require("../base-utils/JsonReader");
const sessionStorage = require('node-sessionstorage');


class DataService extends BaseAPIService{

    constructor(page){
    //constructor(page){
        super();
       // this.apiContext= super.apiContext;
    }    

    async loginPostCall(url,user,password){
        const loginToken = await this.getToken(url,user,password);
        console.log("Generated Token : "+loginToken);
    }

    async addJiraTicketPostCall(mockResponseCode,url) {
       const parsedTestData = this.readJsonFromFile("add_jira_ticket") ;
  
       const testdata = await this.postCall(200,parsedTestData,url);
      // console.log("Add Jira ticket response : "+testdata.id);
       return testdata;

    }

    async getJiraTicketGetCall(mockResponseCode,url) {
        const testdata = await this.getCall(200,url);
        //console.log("testdata", testdata.project.projectCategory.name);
        return testdata;

    }

    async putJiraTicketPutCall(mockResponseCode,url){
          const parsedTestData =  this.readJsonFromFile("update_jira_ticket");
          const testdata = this.putCall(200,parsedTestData,url)
         // console.log("Updated Jira ticket response : "+testdata.id);
          return testdata;
    }

    async readJsonFromFile(filename){
        const jsonReaderService =  new JsonReader();
        const jsonPayload = await jsonReaderService.readJsonFile(filename);
        return jsonPayload;
    }


} 
module.exports = {DataService};