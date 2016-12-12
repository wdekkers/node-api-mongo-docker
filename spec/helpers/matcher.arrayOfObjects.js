beforeEach(function() {
  var matcher = {
    toBeArrayOfObjects: function(util, customEqualityTesters) {
      return {
        compare: function(actual, expected) {
          var result = {};
          
          var isArray = Object.prototype.toString.call(actual) === '[object Array]';

          var containsObjects = true;
          for (var i = 0, len = actual.length; i < len; i++) {
            if (!Object.prototype.toString.call(actual[i]) === '[object Object]') {
              containsObjects = false;
            }
          }
          result.pass = isArray && containsObjects && actual.length > 0;

          if (result.pass) {
            result.message = "Expected value is a an Array of Objects";
          } else {
            result.message = "Expected " + typeof actual + " to contain Array of Objects";
          }

          return result;
        }
      };
    }
  };

  jasmine.addMatchers(matcher);
});
