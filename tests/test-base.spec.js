

const{test,expect} = require("@playwright/test");

//*** Here creating constant for customtest fixture
const{customtest} = require("../resources/config.base");
const{DataService} = require("../base-utils/DataService");

customtest.describe.configure('Test Suite', { mode: 'serial' });
customtest.describe('Test Suite', () => {

     let jiraTicketId;

     // Jira ticket Addition as per request
     // @api tag is added for test cases grouping
     customtest("Test-001 : Add Jira Ticket TestCase",{ tag: '@api',},async({page,restApidetails}) => {
          const dataService =  new DataService();
          const recToken = await dataService.getToken(restApidetails.url,restApidetails.user,restApidetails.password);

           const postJiraTicketResponse = await dataService.addJiraTicketPostCall(200,restApidetails.url+'/rest/api/2/issue');
          jiraTicketId=postJiraTicketResponse.id;
          console.log("Post Jira Ticket Response : "+ postJiraTicketResponse.id);
          expect(postJiraTicketResponse.id).toBeTruthy();
     });

     // Get Details of Created Jira ticket
     // @api tag is added for test cases grouping
     customtest("Test-002 : Get Jira Ticket Details Testcase",{ tag: '@api',}, async({page,restApidetails})=>{
          const dataService = new DataService();
          const getJiraTicketResponse = await dataService.getJiraTicketGetCall(200,restApidetails.url+'/rest/api/2/issue/'+jiraTicketId);  
          expect(getJiraTicketResponse.project.projectCategory.name,"Project CategoryName is not matching").toEqual("FIRST");
     });

     //Update the Jira ticket Details
     // @api tag is added for test cases grouping
     customtest("Test-003 : Update Jira Ticket Deatils Testcase",{ tag: '@api',}, async({page,restApidetails})=>{
         const dataService = new DataService();
         const putJiraTicketResponse =  await dataService.putJiraTicketPutCall(200,restApidetails.url+'/rest/api/2/issue/'+jiraTicketId);  
         jiraTicketId=putJiraTicketResponse.id;
         console.log("Put Jira Ticket Response : "+ putJiraTicketResponse.id);
         expect(putJiraTicketResponse.id).toBeTruthy();
     });

});
