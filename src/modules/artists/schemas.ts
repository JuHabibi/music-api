import { Type } from "@sinclair/typebox"


export const CreateArtistBody = Type.Object({
    name: Type.String({ minLength: 1 })
})