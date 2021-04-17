const knex = require('knex');
const config = require('./knexfile.js');

const db = knex(config.development);

async function dropDatabase () {
    // drop the database using the existing connection pool
    await db.destroy();
    console.info('Database has been dropped');
    return;
}
  
module.exports = { 
    db,
    dropDatabase
};