import { Type } from "@sinclair/typebox"


export const ReleaseType = Type.Union([
    Type.Literal("ALBUM"),
    Type.Literal("EP"),
    Type.Literal("SINGLE"),
])


export const CreateReleaseBody = Type.Object({
    title: Type.String({ minLength: 1 }),
    year: Type.Integer(),
    type: ReleaseType,
    artists: Type.Array(Type.String(), { minItems: 1 }),
    genres: Type.Array(Type.String(), { minItems: 1 }),
    releasedAt: Type.Optional(Type.String()),
})

export const ReleasesQuerySchema = Type.Object({
    genre: Type.Optional(Type.String()),
    artist: Type.Optional(Type.String()),
    year: Type.Optional(Type.Integer()),
    type: Type.Optional(ReleaseType),
    limit: Type.Optional(Type.Integer({ minimum: 1, maximum: 100, default: 20 })),
    offset: Type.Optional(Type.Integer({ minimum: 0, default: 0 })),
})

export const ReleaseDto = Type.Object({
    id: Type.Integer(),
    title: Type.String(),
    year: Type.Integer(),
    type: ReleaseType,
    createdAt: Type.String(),
    artists: Type.Array(Type.Object({ id: Type.Integer(), name: Type.String() })),
    genres: Type.Array(Type.Object({ id: Type.Integer(), name: Type.String() })),
})

export const ReleasesListResponseSchema = Type.Array(ReleaseDto)
