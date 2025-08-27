/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Astro } from "../../models/Astro"
import { api } from "../../services/api"

export const useAstro = () => ({
    buscar: async (astro: Astro): Promise<Astro | any> => {
        const response = (await api.post('buscar', astro))
        if (response.status != 200) {
            return response
        }
        return response.data
    }
})