// Update with your config settings.
const path = require('path');

module.exports = {

  development: {
    client: 'pg',
    connection: {
      host: '127.0.0.1',
      port: 5432,
      database: 'my_movies',
      user:     'postgres',
      password: 'docker'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      directory: path.join(__dirname, "migrations")
    },
    seeds: {
      directory: path.join(__dirname, "seeds")
    }
  },

  test: {
    client: 'pg',
    connection: {
      host: '127.0.0.1',
      port: 5432,
      database: 'test_db',
      user:     'postgres',
      password: 'docker'
    },
    useNullAsDefault: true
  },

  production: {
    client: 'pg',
    connection: {
      database: 'my_db',
      user:     'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }

};
