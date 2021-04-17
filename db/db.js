const knex = require('knex');
const config = require('./knexfile');

let db = null;

if(process.env.NODE_ENV === "test") {
    db = knex(config.test);
} else {
    db = knex(config.development);
}


const setupDatabase = async () => {
    await db.schema.hasTable('movies').then( exists => {
        if (!exists) {
            return db.schema.createTable('movies', table => {
                table.increments('id').primary();
                table.string('title', 250).notNullable();
                table.integer('runtime');
                table.integer('release_year');
                table.string('director', 250);
            })
            .then(() => {
                console.log(`table created and data added.`)
                return db('movies').insert([
                    {title: 'Midnight In Paris', runtime: 96, release_year: 2011, director: 'Woody Allen'},
                    {title: 'Titanic', runtime: 210, release_year: 1997, director: 'James Cameron'},
                    {title: 'From Paris With Love', runtime: 94, release_year: 2010, director: 'Pierre Morel'},
                    {title: 'Matrix', runtime: 120, release_year: 1980, director: 'The Wakowski\'s'}
                  ]);
            })
        }
    })
    
} 

const dropDatabase = async () => {
    // drop the database using the existing connection pool
    await db.schema.dropTableIfExists('movies');
    await db.destroy();
    console.info('Database has been dropped');
    return;
}
  
module.exports = { 
    db,
    setupDatabase,
    dropDatabase
};