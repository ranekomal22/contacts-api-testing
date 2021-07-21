const apiCall = require('../../api-helper/ApiCall');
const postBody = require('../../api-helper/PostContactBody');
const randomstring = require("randomstring");
const expect = require("chai").expect;

describe("Get by string /contacts/contact?keyword=string", function () {

    const numberOfEntries = 3;
    let testDataArray = [];
    const keyword = randomstring.generate(10);

    before(async function() {

        // runs once before the first test in this block
        for (let index = 0; index < numberOfEntries; index++) {

            // Get request body for making contacts/ post request
            reqBody = postBody.getBody(Date.now());

            if (index == 0) {
                reqBody.firstName = keyword;
            } else if (index == 1) {
                reqBody.lastName = keyword;
            }

            // Make post API call for creating contact
            const createResponse = await apiCall.postContact(reqBody);

            expect(createResponse.status).to.eql(201);
            reqBody.id = createResponse.body.id;
            testDataArray.push(reqBody);
            
        }
    });
    
    after(async function() {

        // runs once after the last test in this block
        // Delete created contact
        for (let index = 0; index < numberOfEntries; index++) {
            const deleteResponse = await apiCall.deleteContact(testDataArray[index].id);
            expect(deleteResponse.status).to.eql(204);
        }
    });
    

    it("Get response if full string enter, repsonse 200", async function () {
        
        const searchKeyword = keyword;
        const getResponse = await apiCall.getContact(searchKeyword);

        expect(getResponse.status).to.eql(200);
        expect(getResponse.body.length).to.eql(2);

        for (let index = 0; index < getResponse.body.length; index++) {
            expect(getResponse.body[index].id).to.eql(testDataArray[index].id);
            expect(getResponse.body[index].firstName).to.eql(testDataArray[index].firstName);
            expect(getResponse.body[index].lastName).to.eql(testDataArray[index].lastName);
            expect(getResponse.body[index].phones[0].type).to.eql(testDataArray[index].phones[0].type);
            expect(getResponse.body[index].phones[0].number).to.eql(testDataArray[index].phones[0].number);
            expect(getResponse.body[index].phones[0].countryCode).to.eql(testDataArray[index].phones[0].countryCode);
            expect(getResponse.body[index].company).to.eql(testDataArray[index].company);
            expect(getResponse.body[index].street).to.eql(testDataArray[index].street);
            expect(getResponse.body[index].city).to.eql(testDataArray[index].city);
            expect(getResponse.body[index].state).to.eql(testDataArray[index].state);
            expect(getResponse.body[index].zipcode).to.eql(testDataArray[index].zipcode);
            expect(getResponse.body[index].street).to.eql(testDataArray[index].street);
        }
    });

    it("Get response if partial string enter, repsonse 200", async function () {
        
        const searchKeyword = keyword.substring(1, 5);
        const getResponse = await apiCall.getContact(searchKeyword);

        expect(getResponse.status).to.eql(200);
        expect(getResponse.body.length).to.eql(2);

        for (let index = 0; index < getResponse.body.length; index++) {
            expect(getResponse.body[index].id).to.eql(testDataArray[index].id);
            expect(getResponse.body[index].firstName).to.eql(testDataArray[index].firstName);
            expect(getResponse.body[index].lastName).to.eql(testDataArray[index].lastName);
            expect(getResponse.body[index].phones[0].type).to.eql(testDataArray[index].phones[0].type);
            expect(getResponse.body[index].phones[0].number).to.eql(testDataArray[index].phones[0].number);
            expect(getResponse.body[index].phones[0].countryCode).to.eql(testDataArray[index].phones[0].countryCode);
            expect(getResponse.body[index].company).to.eql(testDataArray[index].company);
            expect(getResponse.body[index].street).to.eql(testDataArray[index].street);
            expect(getResponse.body[index].city).to.eql(testDataArray[index].city);
            expect(getResponse.body[index].state).to.eql(testDataArray[index].state);
            expect(getResponse.body[index].zipcode).to.eql(testDataArray[index].zipcode);
            expect(getResponse.body[index].street).to.eql(testDataArray[index].street);
        }
    });

    it("Get single response unique firstname string enter, repsonse 200", async function () {
        
        const searchKeyword = randomstring.generate(10);
        const getResponse = await apiCall.getContact(searchKeyword);
        expect(getResponse.status).to.eql(200);
        expect(getResponse.body.length).to.eql(0);

    });

});