import { PrismaClient, Artist } from '@prisma/client'
const prisma = new PrismaClient()

const norm = (s: string): string => s.trim().toLowerCase()


export async function listArtists() {
    return prisma.artist.findMany({ orderBy: { name: "asc" } })
}

export async function createArtist(name: string): Promise<Artist> {
    const normName = norm(name)
    return prisma.artist.upsert({
        where: { name: normName },
        update: {},
        create: { name: normName }
    })
}
