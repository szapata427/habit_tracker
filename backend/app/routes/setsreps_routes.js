var ObjectID = require('mongodb').ObjectID;


module.exports = function(app, db) {
    app.get('/setsreps', (req, res) => {
      db.collection('setsreps').find().toArray((err, result) => {
        res.send(result)
      })
    })
  
  
        const collection = app.post('/setsreps', (req, res) => {
        const setsreps = 
  
        { 
          setnumber: req.body.setnumber,
          weights: req.body.weights, 
          reps: req.body.reps, 
          workoutid: req.body.workoutid
        }
  
        db.collection('setsreps').insertOne(setsreps, (err, result) => {
          if (err) {
            res.send({ 'error' : "An error has occurred"})
          }
          else {
            res.send(result.ops[0])
          }
        })
      });
  
  }