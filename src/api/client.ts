import AsyncStorage from '@react-native-async-storage/async-storage';
import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';

import { API_BASE_URL, API_TIMEOUT_MS, AUTH_STORAGE_KEY } from '../constants/api';

const api = axios.create({
    baseURL: API_BASE_URL,
    timeout: API_TIMEOUT_MS,
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
    },
});

const readAuthToken = async () => {
    try {
        return await AsyncStorage.getItem(AUTH_STORAGE_KEY);
    } catch (error) {
        console.warn('Erro ao ler token de autenticação', error);
        return null;
    }
};

api.interceptors.request.use(async (config: InternalAxiosRequestConfig) => {
    const token = await readAuthToken();

    if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});

api.interceptors.response.use(
    (response) => response,
    async (error: AxiosError) => {
        if (error.response?.status === 401) {
            await AsyncStorage.removeItem(AUTH_STORAGE_KEY);
        }

        return Promise.reject(error);
    }
);

export const setAuthToken = async (token: string | null) => {
    if (!token) {
        await AsyncStorage.removeItem(AUTH_STORAGE_KEY);
        return;
    }

    await AsyncStorage.setItem(AUTH_STORAGE_KEY, token);
};

export default api;
