var ObjectID = require('mongodb').ObjectID;

module.exports = function(app, db) {

  app.get('/teachers', (req, res) => {
    db.collection('teachers').find().toArray((err, result) => {
      res.send(result)
    })
  })

  app.get('/teachers/:id', (req, res) => {
        const id = req.params.id;
          const details = { '_id': new ObjectID(id) };
          db.collection('teachers').findOne(details, (err, item) => {
            if (err) {
              res.send({'error':'An error has occurred'});
            } else {
              res.send(item);
            }
          });
       });


       const collection = app.post('/teachers', (req, res) => {
      const teacher = { name: req.body.name, descripton: req.body.description, location: req.body.location}
      db.collection('teachers').insert(teacher, (err, result) => {
        if (err) {
          res.send({ 'error' : "An error has occurred"})
        }
        else {
          res.send(result.ops[0])
        }
      })
    });

    app.put('/teachers/:id', (req, res) => {
      const id = req.params.id
      const details = { '_id': new ObjectID(id) }
      const teacher = { name: req.body.name, descripton: req.body.description, location: req.body.location}
      db.collection('teachers').update(details, teacher, (err, item) => {
        if (err) {
          res.send({ 'error' : "An error has occurred"})
        }
        else {
          console.log(teacher)
          res.send(teacher)
        }
      })
    })


};
