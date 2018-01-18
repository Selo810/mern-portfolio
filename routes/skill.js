var express = require('express');
var router = express.Router();

// Require controller modules
var skill_controller = require('../controllers/skillController');


/// PROJECT ROUTES ///

/* Get request for listing all skills. */
router.get('/skills', skill_controller.skill_list);

/* get one skill. */
router.get('/skills/:skill_id', skill_controller.get_one_skill);

// POST request for creating skill
router.post('/skills', skill_controller.skill_create_post);

// PUT request to update skill
router.put('/skills/:skill_id', skill_controller.skill_update);

/* DELETE request for removing one skill. */
router.delete('/skills/:skill_id', skill_controller.skill_delete);

module.exports = router;