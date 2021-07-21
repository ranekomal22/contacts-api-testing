const request = require("supertest")("https://contacts-api.herokuapp.com/api/v1/contacts");

class ApiCall {

    
    async postContact(reqBody) {
        return request.post("/contact")
                .set("Accept", "application/json")
                .set("Content-Type", "application/json")
                .send(reqBody);
    }

    async deleteContact(id) {
        return request
        .delete("/contact/" + id)
        .set("Accept", "application/json")
        .set("Content-Type", "application/json");
    }

    async getContactById(id) {
        return request.get("/contact/" + id)
                .set("Accept", "application/json")
                .set("Content-Type", "application/json");
    }

    async getContact(searchkeyword) {
        return request.get("/contact/")
                .query({ keyword : searchkeyword })
                .set("Accept", "application/json")
                .set("Content-Type", "application/json");
    }

    async putContact(reqBody) {
        return request.put("/contact")
                .set("Accept", "application/json")
                .set("Content-Type", "application/json")
                .send(reqBody);
    }
}

module.exports = new ApiCall();