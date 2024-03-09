import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { knex } from '../database'
import { randomUUID } from 'node:crypto'

export const createSceenRoutes = async (app: FastifyInstance) => {
  app.post('/', async (request: FastifyRequest, reply: FastifyReply) => {
    const screenSchema = z.object({
      name: z.string(),
      componentA: z.boolean(),
      componentB: z.boolean(),
      componentC: z.boolean(),
    })

    const { name, componentA, componentB, componentC } = screenSchema.parse(
      request.body,
    )

    const nameAlreadyExists = await knex('screens').where({ name }).first()

    if (nameAlreadyExists) {
      return reply.status(400).send({ message: 'screens already exists!' })
    }

    await knex('screens').insert({
      id: randomUUID(),
      name,
      component_a: componentA,
      component_b: componentB,
      component_c: componentC,
    })

    return reply.status(201).send()
  })

  app.get('/', async (request: FastifyRequest, reply: FastifyReply) => {
    const screens = await knex('screens').select()

    return reply.status(201).send(screens)
  })

  app.get('/screen1', async (request: FastifyRequest, reply: FastifyReply) => {
    const screen = await knex('screens').where({ name: 'screen1' }).first()

    return reply.status(201).send(screen)
  })

  app.get('/screen2', async (request: FastifyRequest, reply: FastifyReply) => {
    const screen = await knex('screens').where({ name: 'screen2' }).first()

    return reply.status(201).send(screen)
  })

  app.get('/screen3', async (request: FastifyRequest, reply: FastifyReply) => {
    const screen = await knex('screens').where({ name: 'screen3' }).first()

    return reply.status(201).send(screen)
  })

  app.get('/screen4', async (request: FastifyRequest, reply: FastifyReply) => {
    const screen = await knex('screens').where({ name: 'screen4' }).first()

    return reply.status(201).send(screen)
  })
}
