import fastify from 'fastify'
import { createSceenRoutes } from './routes/createScreen'

export const app = fastify()

app.register(createSceenRoutes, {
  prefix: '/screens',
})
