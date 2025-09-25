import { PrismaClient, Genre } from '@prisma/client'
const prisma = new PrismaClient()


export async function listGenres() {
    return prisma.genre.findMany({ orderBy: { name: "asc" } })
}
export async function createGenre(name: string): Promise<Genre> {
    const norm = name.trim().toLowerCase()

    return prisma.genre.upsert({
        where: { name: norm },
        update: {},
        create: { name: norm }
    })

}