import { createCrudService } from '../api/crudService';
import { API_ENDPOINTS } from '../api/endpoints';

export type AiRecommendationPayload = {
    question: string;
    answer?: string;
    createdAt?: string;
};

const crud = createCrudService<AiRecommendationPayload>(API_ENDPOINTS.ai.history);
export const aiService = { ...crud, recommend: crud.create, list: crud.getAll, detail: crud.getById };

export default aiService;
