import api from '../api/client';
import { API_ENDPOINTS } from '../api/endpoints';

export type PetPayload = {
    name: string;
    type?: string;
    breed?: string;
    age?: number | string;
    weight?: number | string;
    ownerName?: string;
    contact?: string;
};

export const petService = {
    list: () => api.get(API_ENDPOINTS.pets.list),
    create: (payload: PetPayload) => api.post(API_ENDPOINTS.pets.create, payload),
    detail: (id: string) => api.get(API_ENDPOINTS.pets.detail(id)),
    update: (id: string, payload: Partial<PetPayload>) => api.put(API_ENDPOINTS.pets.update(id), payload),
    delete: (id: string) => api.delete(API_ENDPOINTS.pets.delete(id)),
};

export default petService;
