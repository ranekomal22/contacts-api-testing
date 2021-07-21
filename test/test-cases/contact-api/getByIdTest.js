const apiCall = require('../../api-helper/ApiCall');
const postBody = require('../../api-helper/PostContactBody');
const expect = require("chai").expect;

describe("Get by Id /contacts/{id}", function () {

    let createdContactId = 0;
    let reqBody;

    before(async function() {
        // runs once before the first test in this block
        // Get latest epoch (i.e current time in Milliseconds)
        const randomNumber = Date.now();

        // Get request body for making contacts/ post request
        reqBody = postBody.getBody(randomNumber);

        // Make post API call for creating contact
        const createResponse = await apiCall.postContact(reqBody);

        expect(createResponse.status).to.eql(201);
        createdContactId = createResponse.body.id;
    });
    
    after(async function() {
        // runs once after the last test in this block
        // Delete created contact
        const deleteResponse = await apiCall.deleteContact(createdContactId);
        expect(deleteResponse.status).to.eql(204);
    });
    

    it("Get Contact successfully", async function () {

        const getResponse = await apiCall.getContactById(createdContactId);
        
        // Verify getResponse using assertion
        expect(getResponse.status).to.eql(200);
        expect(getResponse.body.id).to.eql(createdContactId);
        expect(getResponse.body.firstName).to.eql(reqBody.firstName);
        expect(getResponse.body.lastName).to.eql(reqBody.lastName);
        expect(getResponse.body.phones[0].type).to.eql(reqBody.phones[0].type);
        expect(getResponse.body.phones[0].number).to.eql(reqBody.phones[0].number);
        expect(getResponse.body.phones[0].countryCode).to.eql(reqBody.phones[0].countryCode);
        expect(getResponse.body.company).to.eql(reqBody.company);
        expect(getResponse.body.street).to.eql(reqBody.street);
        expect(getResponse.body.city).to.eql(reqBody.city);
        expect(getResponse.body.state).to.eql(reqBody.state);
        expect(getResponse.body.zipcode).to.eql(reqBody.zipcode);
        expect(getResponse.body.street).to.eql(reqBody.street);
    });

    it("Enter nonexsit id, response 404", async function () {

        const tempId = 99990;
        const getResponse = await apiCall.getContactById(tempId);

        // Verify getResponse using assertion
        expect(getResponse.status).to.eql(404);
        expect(getResponse.text).to.have.string("Contact does not exist for Id: "+ tempId);
    });

});