let LinksApi = require('../../routest/links.js');

describe("List links tests", function() {
  var Links = new LinksApi();
  var id = '584d818e7ca997747ac35483';
  var pre_result_data;
  var post_result_data;

  var title = "New item ";
  var description = "Add a new item for our test";
  var uri = "https://what.com";
  var tags = ["tag1","tag2"];

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
          pre_result_data = JSON.parse(result.response);
          pre_result_data.code = result.code;
        })
        .finally(next)
    })

    beforeAll(function(next) {
      Links.create({
          body: {
            "title": title,
            "description": description,
            "url": uri,
            "tags": tags
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

    beforeAll(function(next) {
      Links.list({
        })
        .finished
        .then(function(result){
          // result data
          post_result_data = JSON.parse(result.response);
          post_result_data.code = result.code;
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

    

    it("should return the following data", function(){
      expect(result_data.data[0]._id).not.toBe("");
      expect(result_data.data[0].title).toBe(title);
      expect(result_data.data[0].description).toBe(description);
      expect(result_data.data[0].url).toBe(uri);


      expect(result_data.data[0].tags).toBeArray();
      expect(result_data.data[0].tags[0]).toBe("tag1");
      expect(result_data.data[0].tags[1]).toBe("tag2");
    });

    it("should return 1 more record after adding", function(){
      expect(pre_result_data.data.length + 1).toBe(post_result_data.data.length);
    });

  });
});
