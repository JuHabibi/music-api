// prisma/seed.ts
import { PrismaClient, ReleaseType } from "@prisma/client"
const prisma = new PrismaClient()

const norm = (s: string) => s.trim().toLowerCase()

const artists = [
    "C2C",
    "Daft Punk",
    "Justice",
    "John Coltrane",
    "Miles Davis",
    "Dave Brubeck Quartet"
]

const genres = [
    "Electronic",
    "House",
    "French Touch",
    "Jazz"
]

const releases: Array<{
    title: string
    year: number
    type: ReleaseType
    artists: string[]
    genres: string[]
}> = [
        { title: "Tetra", year: 2012, type: "ALBUM", artists: ["C2C"], genres: ["Electronic"] },
        { title: "Random Access Memories", year: 2013, type: "ALBUM", artists: ["Daft Punk"], genres: ["Electronic", "House", "French Touch"] },
        { title: "Cross", year: 2007, type: "ALBUM", artists: ["Justice"], genres: ["Electronic", "French Touch"] },
        { title: "A Love Supreme", year: 1965, type: "ALBUM", artists: ["John Coltrane"], genres: ["Jazz"] },
        { title: "Kind of Blue", year: 1959, type: "ALBUM", artists: ["Miles Davis"], genres: ["Jazz"] },
        { title: "Time Out", year: 1959, type: "ALBUM", artists: ["Dave Brubeck Quartet"], genres: ["Jazz"] },
    ]

async function main() {
    for (const name of artists) {
        await prisma.artist.upsert({
            where: { name: norm(name) },
            update: {},
            create: { name: norm(name) }
        })
    }

    for (const name of genres) {
        await prisma.genre.upsert({
            where: { name: norm(name) },
            update: {},
            create: { name: norm(name) }
        })
    }


    for (const r of releases) {
        await prisma.release.upsert({
            where: { title_year: { title: r.title, year: r.year } }, // nécessite @@unique([title, year])
            update: {},
            create: {
                title: r.title,
                year: r.year,
                type: r.type,
                artists: {
                    connectOrCreate: r.artists.map(a => {
                        const n = norm(a)
                        return { where: { name: n }, create: { name: n } }
                    })
                },
                genres: {
                    connectOrCreate: r.genres.map(g => {
                        const n = norm(g)
                        return { where: { name: n }, create: { name: n } }
                    })
                }
            }
        })
    }
}

main()
    .then(async () => { await prisma.$disconnect(); console.log("✅ Seed done") })
    .catch(async (e) => { console.error(e); await prisma.$disconnect(); process.exit(1) })
