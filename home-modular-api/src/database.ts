import { knex as KnexSetup, Knex } from 'knex'

const config: Knex.Config = {
  client: 'sqlite',
  connection: {
    filename: './database/app.db',
  },
  useNullAsDefault: true,
  migrations: {
    extension: 'ts',
    directory: './database/migrations',
  },
}

const knex = KnexSetup(config)

export { config, knex }
