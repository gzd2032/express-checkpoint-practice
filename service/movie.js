const { db } = require('../db/db.js');

class MovieService {
    async getAllMovies() {
        try { 
            const allMovies = await db.select('*').from('movies');
            return allMovies;
        } catch (err) {
            console.log(`Could not get movies: ${err}`);
        }
    }

    async searchMovies(searchObj) {
        try {
            const filteredMovies = await db.select('*').from('movies').where('title', 'ilike', '%' + searchObj.title + '%');
            return filteredMovies;
        } catch (err) {
            console.log(`Could not find movies: ${err}`);
        }

    }

    async findMovie(id) {
        try{
            const movie = await db.select('*').from('movies').where({id:id});
            return movie;
        } catch (err) {
            console.log(`Could not find movie: ${err}`);
        }
    }

    async createMovie(movie) {
        try {
            const newId = await db('movies').insert(movie, ['id']);
            const newList = await db.select('*').from('movies');
            return newList;
        } catch (err) {
            console.log(`Could not add movie.`)
        }
    }

    async deleteMovie(id) {
        try {
            const newId = await db('movies').where('id', id).del(['id']);
            const newList = await db.select('*').from('movies');
            return newList;
        } catch (err) {
            console.log(`Could not delete movie.`)
        }
    }
}

module.exports = new MovieService()