var migrit = require('migrit');

load_fixture = function(fixture, database){
  
  var fixture  = fixture || 'default';
  var database = database || 'skunks';

  return migrit.config
    .then(function(config){
      var additive  = false
        , quiet     = true
        ;
      return migrit.importer(config, database, fixture, additive, quiet);
    });
}
