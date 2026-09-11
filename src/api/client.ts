import AsyncStorage from '@react-native-async-storage/async-storage';
import * as axios from 'axios';
import type { AxiosError, InternalAxiosRequestConfig } from 'axios';

import { API_BASE_URL, API_TIMEOUT_MS, AUTH_STORAGE_KEY } from '../constants/api';
import { setNetworkOffline } from '../utils/networkStatus';
import { showToast } from '../utils/toast';

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
    } catch {
        showToast('Não foi possível recuperar a sessão.', 'error');
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
    (response) => {
        setNetworkOffline(false);
        return response;
    },
    async (error: AxiosError) => {
        if (!error.response) {
            setNetworkOffline(true);
            showToast('Sem conexão com a internet.', 'error');
        } else if (error.response.status >= 500) {
            showToast('O servidor está indisponível no momento.', 'error');
        }

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
