/*
 * Usage : DataService class 
 * Author : vaibhavs 
 */ 

const{expect,request} = require("@playwright/test");
const{BaseAPIService} =  require("./BaseAPIService");
const fs = require('fs');

class JsonReader extends BaseAPIService{

   /*
    * Method: searchJsonFile
    */
   async searchJsonFile(fileName){
      const filePath = process.cwd()+"/resources/testdata/"+fileName+".json";
      
      fs.access(filePath, fs.constants.F_OK, (err) => {
        if (err) {
          console.error(fileName+' File does not exist');
          return false;
        }
        console.log(fileName+' is available!');
        return true;
      });
   }


   /*
    * Method: readJsonFile
    */
   async readJsonFile(fileName){
    const filePath = process.cwd()+"/resources/testdata/"+fileName+".json";
        if(this.searchJsonFile(fileName)){
            // Read the JSON payload from the text file
            fs.readFile(filePath, 'utf8', (err, data) => {
                if (err) {
                        console.error('Error reading file:', err);
                        return false;
                    }

                try {
                    // Parse the JSON string into a JavaScript object
                    const payload = JSON.parse(data);
           
                    // Use the payload object as needed
                   // console.log('Payload:', payload);
                   return payload;
                } catch (error) {
                    console.error('Error parsing JSON:', error);
                }
            });
        }
    } 

    async logDirectoryInfo(){
        console.log("directory name : "+__dirname);
        console.log("file name : "+__filename);
        console.log("Actual Directory : "+ process.cwd());
    }
   

}
module.exports={JsonReader};