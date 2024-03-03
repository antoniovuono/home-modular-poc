import type { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('screens', (table) => {
    table.uuid('id').unique().notNullable().primary()
    table.string('name').notNullable().unique()
    table.boolean('component_a').notNullable()
    table.boolean('component_b').notNullable()
    table.boolean('component_c').notNullable()
  })
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('screens')
}
