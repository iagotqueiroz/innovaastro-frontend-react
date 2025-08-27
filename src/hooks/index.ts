import { api } from "../services/api"

export const useApi = () => ({
    getVersion: async () => {
        const response = (await api.get('version'));
        if (response.status !== 200) {
            return response;
        }
        return response.data;
    }
})