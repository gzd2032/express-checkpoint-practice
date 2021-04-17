var express = require('express');
var router = express.Router();
const movieController = require('../controller/movie')


/* GET users listing. */
router.get('/', movieController.mainMovies);
router.get('/:id', movieController.findMovie);
router.post('/', movieController.addMovie);
router.delete('/:id', movieController.deleteMovie);

module.exports = router;
