import { PrismaClient, ReleaseType } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
    const electronic = await prisma.genre.upsert({
        where: { name: 'Electronic' },
        update: {},
        create: { name: 'Electronic' }
    })

    const c2c = await prisma.artist.upsert({
        where: { name: 'C2C' },
        update: {},
        create: { name: 'C2C' }
    })

    await prisma.release.upsert({
        where: { title_year: { title: 'Tetra', year: 2012 } },
        update: {},
        create: {
            title: 'Tetra',
            year: 2012,
            type: ReleaseType.ALBUM,
            artists: { connect: [{ id: c2c.id }] },
            genres: { connect: [{ id: electronic.id }] }
        }
    })
}

main().finally(() => prisma.$disconnect())
