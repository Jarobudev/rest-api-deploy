// movies.js (validador del post)
const z = require ('zod')

const movieSchema = z.object({
    title: z.string({
        invalid_type_error: 'Movie title must be a string',
        required_error: 'Movie title is required.'
    }),
    year: z.number().int().min(1980).max(2024),
    director: z.string({
        message: 'Director must be a string'
    }),
    duration: z.number().int().positive(),
    rate: z.number().min(0).max(10),
    genre: z.array(
        z.enum(['Action', 'Drama', 'Crime', 'Adventure', 'Sci-Fi', 'Fantasy']),
        {
            required_error: 'genre is required.',
            invalid_type_error: 'Movie genre must be an array of enum genre'
        }
    ),
    rate: z.number().default(5)
})

function validateMovie(object) {
    return movieSchema.safeParse(object)
}

// partial : hacer que todas las propiedades (movieSchema) se harán opcionales.
function validatePartialMovie (input) {
    return movieSchema.partial().safeParse(input)
}

module.exports = {
    validateMovie,
    validatePartialMovie
}