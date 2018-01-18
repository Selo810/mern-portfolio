var Project = require('../model/Project');

//get method for listing all projects in our database
exports.project_list = function(req, res) {
    //looks at our Project Schema
    Project.find(function(err, projects) {
      if (err)
        res.send(err);
      //responds with a json object of our database projects.
      res.json(projects)
    });
  }

  //get one project details
  exports.project_details = function(req, res) {

    Project.find({_id: req.params.project_id}, function(err, project) {
      if (err)
      res.send(err)

      res.json(project)
    });
  }

  //post method for adding a project to our database
  exports.project_create_post = function(req, res) {
  
    Project.create(req.body, function (err, project) {
      if (err) 
      res.json({ message: err })

      res.json({project})
    });
  }

  //update method for updating a project from our database
  exports.project_update = function(req, res) {
    Project.findById(req.params.project_id, function(err, project) {
      if (err)
        res.send(err);
      //setting the new author and text to whatever was changed. If nothing was changed
      // we will not alter the field.
      (req.body.name) ? project.name = req.body.name : null;
      (req.body.image) ? project.image = req.body.image : null;
      (req.body.descriptions) ? project.descriptions = req.body.descriptions : null;
      //save comment
      project.save(function(err) {
        if (err)
          res.send(err);
        res.json({ message: 'Project has been updated' });
      });
    });
  }

  //delete method for removing a project from our database
  exports.project_delete = function(req, res) {
    //selects the project by its ID, then removes it.
    Project.remove({ _id: req.params.project_id }, function(err, project) {
      if (err)
        res.send(err);
      res.json({ message: 'Project has been deleted' })
    })
  }