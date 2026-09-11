import AsyncStorage from '@react-native-async-storage/async-storage';
import Constants from 'expo-constants';
import { getApp, getApps, initializeApp } from 'firebase/app';
import { getAuth, getReactNativePersistence, initializeAuth, type Auth } from 'firebase/auth';

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

const initializeFirebaseAuth = (): Auth => {
    try {
        return initializeAuth(app, {
            persistence: getReactNativePersistence(AsyncStorage),
        });
    } catch (error) {
        if ((error as { code?: string })?.code === 'auth/already-initialized') {
            return getAuth(app);
        }

        throw error;
    }
};

export const auth: Auth = initializeFirebaseAuth();

export const firebaseErrorMessage = (error: unknown) => {
    const code = (error as { code?: string })?.code ?? '';

    switch (code) {
        case 'auth/invalid-api-key':
            return 'A configuração do Firebase está incompleta. Informe as credenciais do projeto.';
        case 'auth/operation-not-allowed':
            return 'O cadastro por e-mail não está habilitado no Firebase.';
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
