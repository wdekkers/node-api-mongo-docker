var Routest = require('routest');
var Links = Routest("dev.definition.json"
  , ""
  , {
      get: {
        path: "links/:id"
        , method: "GET"
      },
      list: {
        path: "links"
        , method: "GET"
      },
      update: {
        path: "link/:id"
        , method: "PUT"
      },
      delete: {
        path: "links/:id/"
        , method: "DELETE"
      },
      create: {
        path: "links"
        , method: "POST"
      }
  })

module.exports = Links
