const express = require('express');
const router = express.Router();
const { getAllIceCreams, createIceCream } = require('../controllers/iceCreamController');

router.get('/', getAllIceCreams);
router.post('/', createIceCream);

module.exports = router;
