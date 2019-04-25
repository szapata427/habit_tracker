var ObjectID = require('mongodb').ObjectID;


module.exports = function(app, db) {

  app.get('/workouts', (req, res) => {
    db.collection('workouts').find().toArray((err, result) => {
      res.send(result)
    })
  })

  app.get('/workouts/:id', (req, res) => {
        const id = req.params.id;
          const details = { '_id': new ObjectID(id) };
          db.collection('workouts').findOne(details, (err, item) => {
            if (err) {
              res.send({'error':'An error has occurred'});
            } else {
              res.send(item);
            }
          });
       });

       const collection = app.post('/workouts', (req, res) => {
      const habit = 
      { 
        workoutname: req.body.workoutname,
        muscle: req.body.muscle, 
        reps: req.body.reps, 
        secondaryMuscle: req.body.secondaryMuscle, 
        sets: req.body.sets,
        workoutComment: req.body.workoutComment,
        workoutDate: req.body.workoutDate
      }
      db.collection('workouts').insertOne(habit, (err, result) => {
        if (err) {
          res.send({ 'error' : "An error has occurred"})
        }
        else {
          res.send(result.ops[0])
        }
      })
    });

    app.delete('/workouts/:id', (req, res) => {
      const id = req.params.id;
      const details = { '_id': new ObjectID(id) };
      db.collection('workouts').deleteOne(details, (err, item) =>{
        if (err) {
          res.send({'error':'An error has occurred'});
        } else {
          res.send('workout ' + id + ' deleted!');
        }
      })
    })

    app.put('/workouts/:id', (req, res) => {
      const id = req.params.id
      const details = { '_id': new ObjectID(id) }
      const habit = 
      { 
        workoutname: req.body.workoutname,
        muscle: req.body.muscle, 
        reps: req.body.reps, 
        secondaryMuscle: req.body.secondaryMuscle, 
        sets: req.body.sets,
        workoutComment: req.body.workoutComment,
        workoutDate: req.body.workoutDate
      }

      db.collection('workouts').update(details, habit, (err, item) => {
        if (err) {
          res.send({ 'error' : "An error has occurred"})
        }
        else {
          console.log(habit)
          res.send(habit)
        }
      })
    })


};
