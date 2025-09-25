import { FastifyInstance, FastifyRequest } from "fastify"
import { CreateGenreBody } from "./schemas"
import { listGenres, createGenre } from "./repo.prisma"
import { Static } from "@sinclair/typebox"

type CreateGenreBodyType = Static<typeof CreateGenreBody>


export async function genresRoutes(app: FastifyInstance) {
    app.get('/genres', async () => {
        return listGenres();
    })
    app.post('/genres', { schema: { body: CreateGenreBody } }, async (req: FastifyRequest<{ Body: CreateGenreBodyType }>, reply) => {
        const { name } = req.body;
        const created = await createGenre(name)
        return reply.code(201).send(created)
    })

}