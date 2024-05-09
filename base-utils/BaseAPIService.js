/*
 * Usage : Base API service class 
 * Author : vaibhavs 
 */ 

const{expect,request} = require("@playwright/test");
const{RestAPIService} =  require("../base-utils/RestAPIService");
const sessionStorage = require('node-sessionstorage');

class BaseAPIService extends RestAPIService{

    constructor(){
    //constructor(page){
        super();
       // this.apiContext= super.apiContext;
    }    
    
    /*
     * Method : Token Generate
     */
    async getToken(url,user,pwd){
        const loginpayload = await this.loginPayload(user,pwd);
        const defaultheader = await this.getDefaultHeader(200);
        const apiContext = await this.getRestApiContext()
       
        const loginResponse = await apiContext.post(url+'/rest/auth/1/session',
        {
        data: loginpayload,
        header: defaultheader
        });

        // here checking response 200, 201 (i.e. successful response)
        expect(loginResponse.ok()).toBeTruthy();

        const loginResponseJson = await loginResponse.json();
        //console.log("Login Response JSON : " +loginResponseJson);
        const token = loginResponseJson.session.value;
        console.log("Generated Login Token : "+token);

        //set the token value into storage
        await this.setTokenIntoStorage(token);

        return token;
   }

     /*
     * Method : login Payload
     */
    async loginPayload(user,pwd){
        const payload = {
            username: user,
            password: pwd
            };
        return JSON.stringify(payload);
   }

    /*
     * Method : Store the token value into session storge 
     */
    async setTokenIntoStorage(token){
        // Store the token value in session storage
        try {
            sessionStorage.setItem('token', token);
        } catch (error) {
            if (error instanceof ReferenceError) {
                console.log("Is 'npm install node-fetch node-sessionstorage' installed?");
                console.log('ReferenceError:', error.message);
              } else {
                console.log('Error:', error.message);
              }
        }
    }

    /*
     * Method : Read token value from session storge 
     */
    async getTokenFromStorage(){
        // Store the token value in session storage
        return sessionStorage.getItem('token');
    }


    /*
     * Method : PostCall
     */
      async postCall(mockCode,payload,url){
        const authSecret = await this.getTokenFromStorage();             
        const defaultheader = await this.getHeaderWithToken(mockCode,authSecret);
        const apiContext = await this.getRestApiContext()
    
        const reqResponse = await apiContext.post(url,
        {
            data: payload,
            header: defaultheader
        });

 
         //console.log(reqResponse)
        // here checking response 200, 201 (i.e. successful response)
        expect(reqResponse.ok()).toBeTruthy();


        const reqResponseJson = await reqResponse.json();
       // console.log("POST Response JSON : " +reqResponseJson);
       // const id = reqResponseJson.id;
       // console.log("Generated ID : "+id);
        return reqResponseJson;
   }
 
    /*
     * Method : PutCall
     */
     async putCall(mockCode,payload,url){
        const authSecret = await this.getTokenFromStorage();       
        const defaultheader = await this.getHeaderWithToken(mockCode,authSecret);
        const apiContext = await this.getRestApiContext()
    
        const reqResponse = await apiContext.put(url,
        {
            data: payload,
            header: defaultheader
        });

        //console.log(reqResponse)

        // here checking response 200, 201 (i.e. successful response)
        expect(reqResponse.ok()).toBeTruthy();

        const putResponseJson = await reqResponse.json();
        return putResponseJson;
   }

   /*
     * Method : GetCall
     */
   async getCall(mockCode,url){
    const authSecret = await this.getTokenFromStorage();       
    const defaultheader = await this.getHeaderWithToken(mockCode,authSecret);
    const apiContext = await this.getRestApiContext()

    const reqResponse = await apiContext.get(url,
    {
        header: defaultheader
    });

    console.log(reqResponse)

    // here checking response 200, 201 (i.e. successful response)
    expect(reqResponse.ok()).toBeTruthy();

    const reqResponseJson = await reqResponse.json();
    return reqResponseJson;
}



}
module.exports = {BaseAPIService};

