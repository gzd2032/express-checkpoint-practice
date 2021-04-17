const MovieService = require('../service/movie.js')

class MovieController {
    async mainMovies(req, res) {
        const searchObj = req.query;
        if (searchObj.title) {
            const data = await MovieService.searchMovies(searchObj);
            if(data.length < 1) {
                return res.status(404).json({message: `Movie not with string "${searchObj.title}" in the title.`})
            }
            return res.status(200).json(data);
        }
        const data = await MovieService.getAllMovies();
        return res.status(200).json(data);
    }

    async findMovie(req, res) {
        const movieId = req.params.id;
        const data = await MovieService.findMovie(movieId);
        if(data.length < 1) {
            return res.status(404).json({message: `Movie not found with id: ${movieId}.`})
        }
        return res.status(200).json(data);
    }
    
    async addMovie(req, res) {

        const newMovie = req.body;
        const data = await MovieService.createMovie(newMovie);
        return res.status(200).json(data);
    }

    async deleteMovie(req, res) {

        const id = req.params.id;
        const data = await MovieService.deleteMovie(id);
        return res.status(200).json(data);
    }
}

module.exports = new MovieController();