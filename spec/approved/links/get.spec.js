let LinksApi = require('../../routest/links.js');

describe("Get links tests", function() {
  var Links = new LinksApi();
  var id = '584d81ca7ca997747ac35486';

  describe("Get a single link", function() {
    beforeAll(function(next) {
      reset_common_vars();
      next();
    });

    beforeAll(function(next){
      load_fixture('default', 'skunks')
        .finally(next)
    });

    beforeAll(function(next) {
      Links.get({
          route: {
            id: id
          }
        })
        .finished
        .then(function(result){
          // result data
          result_data = JSON.parse(result.response);
          result_data.code = result.code;
        })
        .finally(next)
    })
    
    it("should return status code - 200", function(){
      expect(result_data.code).toBe(200);
    });
    
    it("should return an Object", function(){
      expect(result_data).toBeObject();
    });

    it("should return an data Object", function(){
      expect(result_data.data).toBeObject();
    });

    it("should return no errors", function(){
      expect(result_data.error.length).toBe(0);
    });

    it("should return the following data", function(){
      expect(result_data.data._id).toBe(id);
      expect(result_data.data.title).toBe("HTTP2 Test");
      expect(result_data.data.description).toBe("Check if your webpage has HTTP2 support");
      expect(result_data.data.url).toBe("https://tools.keycdn.com/http2-test");


      expect(result_data.data.tags).toBeArray();
      expect(result_data.data.tags[0]).toBe("speed");
      expect(result_data.data.tags[1]).toBe("testing");
    });
  });
});
