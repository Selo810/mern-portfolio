var express = require('express');
var router = express.Router();

// Require controller modules
var job_controller = require('../controllers/jobController');


/// JOB ROUTES ///

/* Get request for listing all jobs. */
router.get('/jobs', job_controller.job_list);

/* Get request for listing one job. */
router.get('/jobs/:job_id', job_controller.job_details);

// POST request for creating job
router.post('/jobs', job_controller.job_create_post);

// PUT request to update job
router.put('/jobs/:job_id', job_controller.job_update);

/* DELETE request for removing one job. */
router.delete('/jobs/:job_id', job_controller.job_delete);

module.exports = router;