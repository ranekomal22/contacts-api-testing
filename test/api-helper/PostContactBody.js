class PostContactBody {
  getBody(phoneNumber) {
    return {
      "firstName": "John",
      "lastName": "Doe",
      "phones": [
        {
          "type": "home",
          "number": phoneNumber,
          "countryCode": 1
        }
      ],
      "company": "nm",
      "street": "riverlwlk",
      "city": "ny",
      "state": "az",
      "zipcode": 11230
    }
  }
}

module.exports = new PostContactBody();