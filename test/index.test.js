const app = require('../app');
const request = require('supertest')(app);
const { db, dropDatabase } = require('../db/db.js');

describe('Test /movies endpoint', () => {

    beforeAll(async () => {
        // run the migrations and do any other setup here
        await db.migrate.latest()
    });

    afterAll( async (done) => {
        await dropDatabase()
        done()
     });

    it('should return a list of movies', async () => {
        let movies = await request.get('/movies');
        expect(movies.status).toBe(200);
        expect(movies.body.length).toBe(4);
    });

    it('should return a movie given an id', async () => {
        const expectedMovie = [{id: 1, title: 'Midnight In Paris', runtime: 96, release_year: 2011, director: 'Woody Allen'}];
        let movie = await request.get('/movies/1');
        expect(movie.status).toBe(200);
        expect(movie.body).toEqual(expectedMovie);
    });

    it('should return an error given an id not in the database', async () => {
        const id = 99;
        let movie = await request.get(`/movies/${id}`);
        expect(movie.status).toBe(404);
        expect(movie.body.message).toBe(`Movie not found with id: ${id}.`);
    });

    it('should return a list of movies given a title search string', async () => {
        let movie = await request.get('/movies?title=paris');
        expect(movie.status).toBe(200);
        expect(movie.body.length).toBe(2);
    });

    it('should return an error if no movies are found', async () => {
        let movie = await request.get('/movies?title=caveman');
        expect(movie.status).toBe(404);
        expect(movie.body.length).toBe(undefined);
    });

    it('should create a new movie', async () => {
        const newMovie =  {title: 'the terminator', runtime: 124, release_year: 1997, director: 'James Cameron'};
        const currentState = await request.get('/movies');
        const currentLength = currentState.body.length;
        let movie = await request.post('/movies').send(newMovie);
        expect(movie.status).toBe(200);
        expect(movie.body.length).toBe(currentLength + 1);
    });

    it('should delete a new movie', async () => {
        const currentState = await request.get('/movies');
        const currentLength = currentState.body.length;
        let movie = await request.delete('/movies/2')
        expect(movie.status).toBe(200);
        expect(movie.body.length).toBe(currentLength - 1);
    });

});