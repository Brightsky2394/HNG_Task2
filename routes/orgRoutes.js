// routes/orgRoutes.js
const express = require('express');
const router = express.Router();
const orgController = require('../controllers/orgController');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/', authMiddleware, orgController.getOrganisations);
router.get('/:orgId', authMiddleware, orgController.getOrganisationById);
router.post('/', authMiddleware, orgController.createOrganisation);

module.exports = router;
