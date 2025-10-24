import {getGenres} from "../services/getMovies.ts";

const genresObjName = await getGenres()
export const getGenreById = async (genreId: number[]):Promise<string[]> => {
    const genresName: string[] = []

    for (let i = 0; i < genreId.length; i++) {

        for (const genre of genresObjName) {
            if (genreId[i] === genre.id) {
                genresName.push(genre.name)
            }
        }
    }
    return genresName
}