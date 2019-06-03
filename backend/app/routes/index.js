const noteRoutes = require('./habits_routes');
const setsrepsroutes = require('./setsreps_routes');
module.exports = function(app, db) {
  noteRoutes(app, db);
  setsrepsroutes(app, db);
  // Other route groups could go here, in the future
};
