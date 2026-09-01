import AsyncStorage from '@react-native-async-storage/async-storage';
import Constants from 'expo-constants';
import { getApp, getApps, initializeApp } from 'firebase/app';
import { initializeAuth, type Auth } from 'firebase/auth';

type ExtraConfig = Record<string, string | undefined>;

const extra = (Constants.expoConfig?.extra ?? {}) as ExtraConfig;

const firebaseConfig = {
    apiKey: extra.FIREBASE_API_KEY ?? 'demo-api-key',
    authDomain: extra.FIREBASE_AUTH_DOMAIN ?? 'demo-project.firebaseapp.com',
    projectId: extra.FIREBASE_PROJECT_ID ?? 'demo-project',
    storageBucket: extra.FIREBASE_STORAGE_BUCKET ?? 'demo-project.appspot.com',
    messagingSenderId: extra.FIREBASE_MESSAGING_SENDER_ID ?? '000000000000',
    appId: extra.FIREBASE_APP_ID ?? '1:000000000000:web:demo-app-id',
};

const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);

const reactNativePersistence = {
    type: 'LOCAL' as const,
    _isAvailable: async () => {
        try {
            await AsyncStorage.setItem('@firebase/auth/available', '1');
            await AsyncStorage.removeItem('@firebase/auth/available');
            return true;
        } catch {
            return false;
        }
    },
    _set: async (key: string, value: unknown) => {
        await AsyncStorage.setItem(key, JSON.stringify(value));
    },
    _get: async <T>(key: string): Promise<T | null> => {
        const value = await AsyncStorage.getItem(key);
        return value ? (JSON.parse(value) as T) : null;
    },
    _remove: async (key: string) => {
        await AsyncStorage.removeItem(key);
    },
    _addListener: () => undefined,
    _removeListener: () => undefined,
} as any;

export const auth: Auth = initializeAuth(app, {
    persistence: reactNativePersistence,
});

export const firebaseErrorMessage = (error: unknown) => {
    const code = (error as { code?: string })?.code ?? '';

    switch (code) {
        case 'auth/invalid-email':
            return 'Informe um e-mail válido.';
        case 'auth/user-disabled':
            return 'Esta conta foi desativada.';
        case 'auth/user-not-found':
            return 'Usuário não encontrado.';
        case 'auth/wrong-password':
            return 'Senha incorreta.';
        case 'auth/email-already-in-use':
            return 'Este e-mail já está em uso.';
        case 'auth/weak-password':
            return 'A senha deve ter pelo menos 6 caracteres.';
        case 'auth/network-request-failed':
            return 'Falha de rede. Verifique sua conexão.';
        case 'auth/too-many-requests':
            return 'Muitas tentativas. Tente novamente mais tarde.';
        case 'auth/requires-recent-login':
            return 'Faça login novamente para concluir esta ação.';
        default:
            return 'Não foi possível concluir a operação. Tente novamente.';
    }
};

export const AUTH_SESSION_KEY = '@clyvocare:auth-session';
