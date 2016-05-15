/*jshint node:true*/
module.exports = function(app) {
  var express = require('express');
  var notesRouter = express.Router();
  app.use('/api/notes', require('body-parser').json());

  var nedb = require('nedb');
  var noteDB = new nedb({ filename : 'notes', autoload: true });

  notesRouter.get('/', function(req, res) {
      noteDB.find(req.query, function(err, notes) {
        res.send({'notes': notes});
      });
  });

  notesRouter.post('/', function(req, res) {
      noteDB.find({}).sort({id : 0}).limit(1).exec(function(err, notes) {
          if(notes.length !== 0) {
              req.body.note.id = notes[0].id + 1;
          } else {
              req.body.note.id = 1;
          }

          noteDB.insert(req.body.note, function(err, newNote) {
            res.status(201);
            res.send(JSON.stringify({ note : newNote }));
          });
      });
  });

  notesRouter.get('/:id', function(req, res) {
      res.send({
          'notes': {
              id: req.params.id
          }
      });
  });

  notesRouter.put('/:id', function(req, res) {
      res.send({
          'notes': {
              id: req.params.id
          }
      });
  });

  notesRouter.delete('/:id', function(req, res) {
      noteDB.remove({id: parseInt(req.params.id)}, {}, function(err, numRemoved) {
          if(err) {
              throw err;
          }
          console.log('Num removed: ' + numRemoved);
          res.status(204).end();
      });
  });

  // The POST and PUT call will not contain a request body
  // because the body-parser is not included by default.
  // To use req.body, run:

  //    npm install --save-dev body-parser

  // After installing, you need to `use` the body-parser for
  // this mock uncommenting the following line:
  //
  //app.use('/api/notes', require('body-parser').json());
  app.use('/api/notes', notesRouter);
};
