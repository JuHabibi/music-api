import { PrismaClient, Artist } from '@prisma/client'
const prisma = new PrismaClient()

const norm = (s: string): string => s.trim().toLowerCase()

export async function createArtist(name: string): Promise<Artist> {
    return prisma.artist.create({
        data: {
            name: norm(name)
        }
    })
}
