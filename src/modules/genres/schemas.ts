import { Type } from "@sinclair/typebox"


export const CreateGenreBody = Type.Object({
    name: Type.String({ minLength: 1 })
})