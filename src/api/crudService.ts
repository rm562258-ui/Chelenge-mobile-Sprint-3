import api from './client';

export type ResourceEndpoints = {
    list: string;
    create: string;
    detail: (id: string) => string;
    update: (id: string) => string;
    delete: (id: string) => string;
};

export const createCrudService = <TPayload>(endpoints: ResourceEndpoints) => ({
    getAll: () => api.get(endpoints.list),
    getById: (id: string) => api.get(endpoints.detail(id)),
    create: (payload: TPayload) => api.post(endpoints.create, payload),
    update: (id: string, payload: Partial<TPayload>) => api.put(endpoints.update(id), payload),
    delete: (id: string) => api.delete(endpoints.delete(id)),
});
