import { FastifyInstance } from "fastify"
import { CreateArtistBody } from "./schemas"
import { createArtist } from "./repo.prisma"


export async function artistsRoutes(app: FastifyInstance) {

    app.post('/artists', { schema: { body: CreateArtistBody } }, async (req, reply) => {
        const { name } = req.body

        const created = await createArtist(name);
        reply.code(201).send(created);


    })

}