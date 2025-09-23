import { FastifyInstance } from "fastify"
import { ReleasesQuerySchema } from "./schemas"
import { listReleases } from "./repo.prisma"

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
}
