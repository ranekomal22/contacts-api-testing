const apiCall = require('../../api-helper/ApiCall');
const postBody = require('../../api-helper/PostContactBody');
const expect = require("chai").expect;
const randomstring = require("randomstring");


describe("PUT /contacts", function () {

    let reqBody;
 
    let sameMoobileNumber;

    before(async function() {
        // runs once before the first test in this block
        // Get latest epoch (i.e current time in Milliseconds)
        const randomNumber = Date.now();

        // Get request body for making contacts/ post request
        reqBody = postBody.getBody(randomNumber);

        // Make post API call for creating contact
       const createResponse = await apiCall.postContact(reqBody);

        expect(createResponse.status).to.eql(201);
        reqBody.id = createResponse.body.id;
    });
    
    after(async function() {
        // runs once after the last test in this block
        // Delete created contact
        const deleteResponse = await apiCall.deleteContact(reqBody.id );
        expect(deleteResponse.status).to.eql(204);
    });

    it("update all fields successfully, response 200", async function () {

        reqBody.firstName = "Komal";
        reqBody.lastName = "Rane";
        reqBody.company = "Hexaware";
        reqBody.street = "millenium";
        reqBody.city = "Kalyan";
        reqBody.state = "Maharashtra";
        reqBody.zipcode = 23094;
        reqBody.phones[0].type = "Home";
        reqBody.phones[0].number = Date.now();
        reqBody.phones[0].countryCode = 2;

        const createResponse = await apiCall.putContact(reqBody);
        //console.log(createResponse.body);
        
        // verify updated resposne
        expect(createResponse.status).to.eql(200);
        expect(createResponse.body.id).to.eql(reqBody.id);
        expect(createResponse.body.firstName).to.eql(reqBody.firstName);
        expect(createResponse.body.lastName).to.eql(reqBody.lastName);
        expect(createResponse.body.phones[0].type).to.eql(reqBody.phones[0].type);
        expect(createResponse.body.phones[0].number).to.eql(reqBody.phones[0].number);
        expect(createResponse.body.phones[0].countryCode).to.eql(reqBody.phones[0].countryCode);
        expect(createResponse.body.company).to.eql(reqBody.company);
        expect(createResponse.body.street).to.eql(reqBody.street);
        expect(createResponse.body.city).to.eql(reqBody.city);
        expect(createResponse.body.state).to.eql(reqBody.state);
        expect(createResponse.body.zipcode).to.eql(reqBody.zipcode);
        expect(createResponse.body.street).to.eql(reqBody.street);
        
    });

    it("Update phones array successfully, response 200", async function () {

        sameMoobileNumber = Date.now();

        // Update phones array in contact
        reqBody.phones.push({type: "Home", number: sameMoobileNumber,countryCode: 3}) ;

        // Make put call for updating contact
        const createResponse = await apiCall.putContact(reqBody); 

        // verify phone array updated successfully
        expect(createResponse.status).to.eql(200);
        expect(createResponse.body.phones[1].type).to.eql(reqBody.phones[1].type);
        expect(createResponse.body.phones[1].number).to.eql(reqBody.phones[1].number);
        expect(createResponse.body.phones[1].countryCode).to.eql(reqBody.phones[1].countryCode);
    });

// Negative Scenario
    
    it("Update same phones Number in body , response 412", async function () {

        reqBody.phones.push({type: "Home", number: sameMoobileNumber, countryCode: 3}) ;

        // Make put call for updating contact
        const createResponse = await apiCall.putContact(reqBody);

        //Verify status code 412
        expect(createResponse.status).to.eql(412);  
        
    });

    it("Enter invalid id , response 404", async function () {
        
        const idNumber = 999;
       // console.log(createResponse.body.id);

        if (reqBody.id == idNumber){
            idNumber++;
        }

        // to delete test data, need to store reqBody.id
        const tempid = reqBody.id;

        reqBody.id = idNumber ;
        
        // Make put call for updating contact
        createResponse = await apiCall.putContact(reqBody); 
        
        //Verify status code 404
        expect(createResponse.status).to.eql(404);
        
        //delete data testdata using reqBody.id 
        reqBody.id = tempid;
    });
});
