import { Hono } from 'hono'

import { users } from './model/user';
import { drizzle } from 'drizzle-orm/d1';

const app = new Hono<{
  Bindings: {
    DB: D1Database
  }
}>()

app.get('/build', async (c) => {
  const db = drizzle(c.env.DB);
  const result = await db.insert(users).values({
    id: "1",
    intModifiers: true,
    textModifiers: "100"
  })

  return c.json(result.results)
})

app.get('/', async (c) => {
  const db = drizzle(c.env.DB);
  const result = await db.select().from(users).all()
  return c.json(result)
})

export default app
