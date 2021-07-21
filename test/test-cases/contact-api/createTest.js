const apiCall = require('../../api-helper/ApiCall');
const postBody = require('../../api-helper/PostContactBody');
const expect = require("chai").expect;

describe("POST /contacts", function () {
  
  it("create Contact successfully", async function () {
    
    // Get latest epoch (i.e current time in Milliseconds)
    const randomNumber = Date.now();

    // Get request body for making contacts/ post request
    const reqBody = postBody.getBody(randomNumber);

    // Make post API call for creating contact
    const createResponse = await apiCall.postContact(reqBody);

    // Perform Assertions on API createResponse
    expect(createResponse.status).to.eql(201);
    expect(createResponse.body.id).to.not.be.null;
    expect(createResponse.body.createdDate).to.not.be.null;
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
    
    // Delete created contact
    const deleteResponse = await apiCall.deleteContact(createResponse.body.id);
    expect(deleteResponse.status).to.eql(204);
  });


  it("With NO FirstName, response 412 ", async function () {
    
    // Get latest epoch (i.e current time in Milliseconds)
    const randomNumber = Date.now();

    // Get request body for making contacts/ post request
    const reqBody = postBody.getBody(randomNumber);

    // Delete FirstName from requestbody
    delete reqBody.firstName;

    // Make post API call for creating contact
    const createResponse = await apiCall.postContact(reqBody);

    // Perform Assertions on API createResponse
    expect(createResponse.status).to.eql(412);
    //assertTrue(createResponse.text).to.eql("First name cannot be null");
    expect(createResponse.text).to.have.string("First name cannot be null");
      
  });

  it("With NO lastName, response 412 ", async function () {
    
    // Get latest epoch (i.e current time in Milliseconds)
    const randomNumber = Date.now();

    // Get request body for making contacts/ post request
    const reqBody = postBody.getBody(randomNumber);

    // Delete FirstName from requestbody
    delete reqBody.lastName;

    // Make post API call for creating contact
    const createResponse = await apiCall.postContact(reqBody);

    // Perform Assertions on API createResponse
    expect(createResponse.status).to.eql(412);
    expect(createResponse.text).to.have.string("Last name cannot be null");
  });

  it("With NO PhoneNumber, response 412 ", async function () {
    
    // Get latest epoch (i.e current time in Milliseconds)
    const randomNumber = Date.now();

    // Get request body for making contacts/ post request
    const reqBody = postBody.getBody(randomNumber);

    // Delete FirstName from requestbody
    delete reqBody.phones[0].number;

    // Make post API call for creating contact
    const createResponse = await apiCall.postContact(reqBody);

    // Perform Assertions on API createResponse
    expect(createResponse.status).to.eql(412);
  
  });

  // Negative Scenario

  it("With NO ID, response 412 ", async function () {
    
    // Get latest epoch (i.e current time in Milliseconds)
    const randomNumber = Date.now();

    // Get request body for making contacts/ post request
    const reqBody = postBody.getBody(randomNumber);
    
    //set request Body ID 
    reqBody.id = 123;

    // Make post API call for creating contact
    const createResponse = await apiCall.postContact(reqBody);

    // Perform Assertions on API createResponse
    expect(createResponse.status).to.eql(412);
    expect(createResponse.text).to.have.string("Id must be null");

  });

  it("If enter string in Zip code, response 500 ", async function () {
    
    // Get latest epoch (i.e current time in Milliseconds)
    const randomNumber = Date.now();

    // Get request body for making contacts/ post request
    const reqBody = postBody.getBody(randomNumber);
    
    reqBody.zipcode = 'ABC';
    // Make post API call for creating contact
    const createResponse = await apiCall.postContact(reqBody);

    // Perform Assertions on API createResponse
    expect(createResponse.status).to.eql(500);
    

  });

  it("If Zip code is grater than five integer, response 412 ", async function () {
    
    // Get latest epoch (i.e current time in Milliseconds)
    const randomNumber = Date.now();

    // Get request body for making contacts/ post request
    const reqBody = postBody.getBody(randomNumber);
    
    reqBody.zipcode = 123456;

    // Make post API call for creating contact
    const createResponse = await apiCall.postContact(reqBody);

    // Perform Assertions on API createResponse
    expect(createResponse.status).to.eql(412);
    expect(createResponse.text).to.have.string("could not execute statement");

  });

});