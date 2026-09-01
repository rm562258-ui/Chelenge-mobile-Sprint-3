import api from '../api/client';
import { API_ENDPOINTS } from '../api/endpoints';

export type LoginPayload = {
    email: string;
    password: string;
};

export const authService = {
    login: (payload: LoginPayload) => api.post(API_ENDPOINTS.auth.login, payload),
    register: (payload: Record<string, unknown>) => api.post(API_ENDPOINTS.auth.register, payload),
    me: () => api.get(API_ENDPOINTS.auth.me),
    logout: () => api.post(API_ENDPOINTS.auth.logout),
};

export default authService;
