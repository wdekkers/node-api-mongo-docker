beforeEach(function() {
  var matcher = {
    toBeArray: function(util, customEqualityTesters) {
      return {
        compare: function(actual, expected) {
          var result = {};

          result.pass = Object.prototype.toString.call(actual) === '[object Array]';

          if (result.pass) {
            result.message = "Expected value is a an Array";
          } else {
            result.message = "Expected " + typeof actual + " to be of type Array";
          }

          return result;
        }
      };
    }
  };

  jasmine.addMatchers(matcher);
});
