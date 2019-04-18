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
      const habit = { workoutname: req.body.workoutname, muscle: req.body.muscle, sets: req.body.sets, reps: req.body.reps, workoutcomment: req.body.workout_comment}
      // const habit = { habit_name: req.body.habit_name, reason: req.body.reason, days: req.body.days, progress: req.body.progress}
      db.collection('workouts').insertOne(habit, (err, result) => {
        if (err) {
          res.send({ 'error' : "An error has occurred"})
        }
        else {
          res.send(result.ops[0])
        }
      })
    });

    app.put('/workouts/:id', (req, res) => {
      const id = req.params.id
      const details = { '_id': new ObjectID(id) }
      const habit = { habit_name: req.body.habit_name, reason: req.body.reason, days: req.body.days, progress: req.body.progress}
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
