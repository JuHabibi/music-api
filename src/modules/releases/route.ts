import { FastifyInstance } from "fastify"
import { ReleasesQuerySchema, CreateReleaseBody } from "./schemas"
import { listReleases, createRelease } from "./repo.prisma"

export async function releasesRoutes(app: FastifyInstance) {
    app.get("/releases", { schema: { querystring: ReleasesQuerySchema } }, async (req) => {
        const q = req.query as {
            genre?: string; artist?: string; year?: number; type?: "ALBUM" | "EP" | "SINGLE";
            limit?: number; offset?: number
        }

        const norm = (s?: string) => s?.trim().toLowerCase()
        app.log.info(
            { year: q.year, typeofYear: typeof q.year, limit: q.limit, offset: q.offset },
            'DEBUG query after TypeBox'
        )
        return listReleases({
            genre: norm(q.genre),
            artist: norm(q.artist),
            year: q.year,
            type: q.type as any,
            limit: q.limit ?? 20,
            offset: q.offset ?? 0
        })
    })

    app.post('/releases', { schema: { body: CreateReleaseBody } }, async (req, reply) => {
        const b = req.body as {
            title: string
            year: number
            type: 'ALBUM' | 'EP' | 'SINGLE'
            artists: string[]
            genres: string[]
            releasedAt?: string
        }

        const norm = (s: string) => s.trim().toLowerCase()

        const created = await createRelease({
            title: b.title,
            year: b.year,
            type: b.type,
            artists: b.artists.map(norm),
            genres: b.genres.map(norm),
            releasedAt: b.releasedAt
        })

        return reply.code(201).send(created)
    })
}
