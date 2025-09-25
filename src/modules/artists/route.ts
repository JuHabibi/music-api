import { FastifyInstance, FastifyRequest } from "fastify"
import { CreateArtistBody } from "./schemas"
import { listArtists, createArtist } from "./repo.prisma"
import { Static } from "@sinclair/typebox"

type CreateArtistBodyType = Static<typeof CreateArtistBody>


export async function artistsRoutes(app: FastifyInstance) {
    app.get('/artists', async () => {
        return listArtists();
    })
    app.post('/artists', { schema: { body: CreateArtistBody } }, async (req: FastifyRequest<{ Body: CreateArtistBodyType }>, reply) => {
        const { name } = req.body
        const created = await createArtist(name);
        reply.code(201).send(created);
    })

}