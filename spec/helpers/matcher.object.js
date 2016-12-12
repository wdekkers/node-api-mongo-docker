beforeEach(function() {
  var matcher = {
    toBeObject: function(util, customEqualityTesters) {
      return {
        compare: function(actual, expected) {
          var result = {};
          
          result.pass = Object.prototype.toString.call(actual) === '[object Object]';

          if (result.pass) {
            result.message = "Expected value is a an Object";
          } else {
            result.message = "Expected " + typeof actual + " to be of type Object";
          }

          return result;
        }
      };
    }
  };

  jasmine.addMatchers(matcher);
});
