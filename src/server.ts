import Fastify from "fastify"
import { TypeBoxTypeProvider } from "@fastify/type-provider-typebox"
import { releasesRoutes } from "./modules/releases/route"
import { artistsRoutes } from "./modules/artists/route"
import { genresRoutes } from "./modules/genres/route"
const app = Fastify({ logger: true }).withTypeProvider<TypeBoxTypeProvider>()

app.get("/health", async () => ({ status: "ok" }))
app.register(releasesRoutes)
app.register(artistsRoutes)
app.register(genresRoutes)

const port = Number(process.env.PORT) || 3000
app.listen({ port, host: "0.0.0.0" })
    .then(() => app.log.info(`HTTP server running on :${port}`))
    .catch((err) => { app.log.error(err); process.exit(1) })
