import { PrismaClient, ReleaseType } from '@prisma/client'
const prisma = new PrismaClient()

type CreateReleaseInput = {
    title: string
    year: number
    type: ReleaseType
    artists: string[]
    genres: string[]
    releasedAt?: string
}

const norm = (s: string): string => s.trim().toLowerCase()

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

export async function createRelease(data: CreateReleaseInput) {
    const { title, year, type, artists, genres, releasedAt } = data

    return prisma.release.create({
        data: {
            title,
            year,
            type,
            ...(releasedAt ? { createdAt: new Date(releasedAt) } : {}),
            artists: {
                connectOrCreate: artists.map((name) => {
                    const n = norm(name)
                    return {
                        where: { name: n },
                        create: { name: n }
                    }
                })
            },
            genres: {
                connectOrCreate: genres.map((name) => {
                    const n = norm(name)
                    return {
                        where: { name: n },
                        create: { name: n }
                    }
                })
            }
        },
        include: { artists: true, genres: true }
    })
}
