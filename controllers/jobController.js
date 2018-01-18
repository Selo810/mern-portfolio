var Job = require('../model/Job');

//get method for listing all jobs in our database
exports.job_list = function(req, res) {
    //looks at our Job Schema
    Job.find(function(err, jobs) {
      if (err)
        res.send(err);
      //responds with a json object of our database jobs.
      res.json(jobs)
    });
  }

  //get one job details
  exports.job_details = function(req, res) {

    Job.find({_id: req.params.job_id}, function(err, job) {
      if (err)
      res.send(err)

      res.json(job)
    });
  }

  //post method for adding a job to our database
  exports.job_create_post = function(req, res) {
  
    Job.create(req.body, function (err, job) {
      if (err) 
      res.json({ message: err })

      res.json({job})
    });
  }

  //update method for updating a job from our database
  exports.job_update = function(req, res) {
    Job.findById(req.params.job_id, function(err, job) {
      if (err)
        res.send(err);
      //setting the new author and text to whatever was changed. If nothing was changed
      // we will not alter the field.
      (req.body.job_title) ? job.job_title = req.body.job_title : null;
      (req.body.company_name) ? job.company_name = req.body.company_name : null;
      (req.body.city) ? job.city = req.body.city : null;
      (req.body.state) ? job.state = req.body.state : null;
      (req.body.descriptions) ? job.descriptions = req.body.descriptions : null;
      (req.body.image) ? job.image = req.body.image : null;
      (req.body.start_date) ? job.start_date = req.body.start_date : null;

      //save comment
      job.save(function(err) {
        if (err)
          res.send(err);
        res.json({ message: 'Job has been updated' });
      });
    });
  }

  //delete method for removing a job from our database
  exports.job_delete = function(req, res) {
    //selects the job by its ID, then removes it.
    Job.remove({ _id: req.params.job_id }, function(err, job) {
      if (err)
        res.send(err);
      res.json({ message: 'Job has been deleted' })
    })
  }