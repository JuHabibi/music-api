import { PrismaClient, ReleaseType } from '@prisma/client'
const prisma = new PrismaClient()

const norm = (s?: string) => s?.trim().toLowerCase()
export async function listReleases(params: {
    genre?: string; artist?: string; year?: number; type?: ReleaseType; limit: number; offset: number
}) {
    const { genre, artist, year, type, limit, offset } = params
    return prisma.release.findMany({
        where: {
            year: year ?? undefined,
            type: type ?? undefined,
            genres: genre ? { some: { name: { contains: norm(genre) } } } : undefined,
            artists: artist ? { some: { name: { contains: norm(artist) } } } : undefined,
        },
        include: { artists: true, genres: true },
        orderBy: { createdAt: 'desc' },
        take: limit,
        skip: offset
    })
}
