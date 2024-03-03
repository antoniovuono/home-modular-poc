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
}
