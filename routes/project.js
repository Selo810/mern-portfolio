var express = require('express');
var router = express.Router();

// Require controller modules
var project_controller = require('../controllers/projectController');


//now  we can set the route path & initialize the API
router.get('/', function(req, res) {
    res.json({ message: 'API Initialized!'});
  });  

/// PROJECT ROUTES ///

/* Get request for listing all projects. */
router.get('/projects', project_controller.project_list);

/* Get request for listing one project. */
router.get('/projects/:project_id', project_controller.project_details);

// POST request for creating project
router.post('/projects', project_controller.project_create_post);

// PUT request to update project
router.put('/projects/:project_id', project_controller.project_update);

/* DELETE request for removing one project. */
router.delete('/projects/:project_id', project_controller.project_delete);

module.exports = router;