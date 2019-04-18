var ObjectID = require('mongodb').ObjectID;


module.exports = function(app, db) {

  app.get('/habits', (req, res) => {
    db.collection('habits').find().toArray((err, result) => {
      res.send(result)
    })
  })

  app.get('/habits/:id', (req, res) => {
        const id = req.params.id;
          const details = { '_id': new ObjectID(id) };
          db.collection('habits').findOne(details, (err, item) => {
            if (err) {
              res.send({'error':'An error has occurred'});
            } else {
              res.send(item);
            }
          });
       });

       const collection = app.post('/habits', (req, res) => {
      const habit = { habit_name: req.body.habit_name}
      // const habit = { habit_name: req.body.habit_name, reason: req.body.reason, days: req.body.days, progress: req.body.progress}
      db.collection('habits').insertOne(habit, (err, result) => {
        if (err) {
          res.send({ 'error' : "An error has occurred"})
        }
        else {
          res.send(result.ops[0])
        }
      })
    });

    app.put('/habits/:id', (req, res) => {
      const id = req.params.id
      const details = { '_id': new ObjectID(id) }
      const habit = { habit_name: req.body.habit_name, reason: req.body.reason, days: req.body.days, progress: req.body.progress}
      db.collection('habits').update(details, habit, (err, item) => {
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
