var Skill = require('../model/Skill');

//get method for listing all comments in our database
exports.skill_list = function(req, res) {
    //looks at our Comment Schema
    Skill.find(function(err, skills) {
      if (err)
        res.send(err);
      //responds with a json object of our database comments.
      res.json(skills)
    });
  }

  //get one skill
  exports.get_one_skill = function(req, res) {
    //selects the skill by its ID, then get it.
    Skill.find({ _id: req.params.skill_id }, function(err, skill) {
      if (err)
        res.send(err);
      res.json(skill)
    })
  }

  //post method for adding a skill to our database
  exports.skill_create_post = function(req, res) {
    Skill.create(req.body, function (err, skill) {
        if (err) 
        res.json({ message: err })
  
        res.json({skill})
      });
  }

  //update method for updating a skill from our database
  exports.skill_update = function(req, res) {
    Skill.findById(req.params.skill_id, function(err, skill) {
      if (err)
        res.send(err);
      //setting the new author and text to whatever was changed. If nothing was changed
      // we will not alter the field.
      (req.body.name) ? skill.name = req.body.name : null;
      (req.body.image) ? skill.image = req.body.image : null;

      //save skill
      skill.save(function(err) {
        if (err)
          res.send(err);
        res.json({ message: 'Skill has been updated' });
      });
    });
  }

  //delete method for removing a skill from our database
  exports.skill_delete = function(req, res) {
    //selects the skill by its ID, then removes it.
    Skill.remove({ _id: req.params.skill_id }, function(err, skill) {
      if (err)
        res.send(err);
      res.json({ message: 'Skill has been deleted' })
    })
  }