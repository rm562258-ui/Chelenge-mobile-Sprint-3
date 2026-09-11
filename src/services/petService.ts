import { createCrudService } from '../api/crudService';
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

const crud = createCrudService<PetPayload>(API_ENDPOINTS.pets);
export const petService = { ...crud, list: crud.getAll, detail: crud.getById };

export default petService;
