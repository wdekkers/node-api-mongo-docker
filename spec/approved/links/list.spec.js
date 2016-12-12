let LinksApi = require('../../routest/links.js');

describe("List links tests", function() {
  var Links = new LinksApi();
  var id = '584d818e7ca997747ac35483';

  describe("List all links from DB", function() {
    beforeAll(function(next) {
      reset_common_vars();
      next();
    });

    beforeAll(function(next){
      load_fixture('default', 'skunks')
        .finally(next)
    });

    beforeAll(function(next) {
      Links.list({
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

    it("should return an data element with an array of objects", function(){
      expect(result_data.data).toBeArrayOfObjects();
    });

    it("should return no errors", function(){
      expect(result_data.error.length).toBe(0);
    });

    it("should return 6 data records", function(){
      expect(result_data.data.length).toBe(6);
    });

    it("should return the following data", function(){
      expect(result_data.data[0]._id).toBe(id);
      expect(result_data.data[0].title).toBe("Can i use");
      expect(result_data.data[0].description).toBe("Check which browser tools are supported by which browser");
      expect(result_data.data[0].url).toBe("http://caniuse.com/");


      expect(result_data.data[0].tags).toBeArray();
      expect(result_data.data[0].tags[0]).toBe("css");
      expect(result_data.data[0].tags[1]).toBe("js");
    });
  });
});
