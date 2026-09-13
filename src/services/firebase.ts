import AsyncStorage from '@react-native-async-storage/async-storage';
import { getApp, getApps, initializeApp } from 'firebase/app';
import * as firebaseAuth from 'firebase/auth';
import { getAuth, initializeAuth, type Auth } from 'firebase/auth';

type FirebasePersistence = NonNullable<Parameters<typeof initializeAuth>[1]>['persistence'];

const getReactNativePersistence = (
    firebaseAuth as typeof firebaseAuth & {
        getReactNativePersistence: (storage: typeof AsyncStorage) => FirebasePersistence;
    }
).getReactNativePersistence;

const requiredEnvironmentVariables = {
    EXPO_PUBLIC_FIREBASE_API_KEY: process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
    EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN: process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN,
    EXPO_PUBLIC_FIREBASE_PROJECT_ID: process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID,
    EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET: process.env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET,
    EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID: process.env.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    EXPO_PUBLIC_FIREBASE_APP_ID: process.env.EXPO_PUBLIC_FIREBASE_APP_ID,
} as const;

const isPlaceholder = (value: string) => /your[-_ ]|YOUR[-_ ]|FIREBASE_|<[^>]+>|demo[-_]/.test(value);

const missingOrInvalidVariables = Object.entries(requiredEnvironmentVariables)
    .filter(([, value]) => !value?.trim() || isPlaceholder(value))
    .map(([name]) => name);

if (missingOrInvalidVariables.length > 0) {
    const errorMessage = [
        'Configuração do Firebase incompleta ou inválida.',
        `Variáveis ausentes ou com placeholder: ${missingOrInvalidVariables.join(', ')}.`,
        'Crie um arquivo .env na raiz usando .env.example e informe os valores reais do Firebase Console.',
    ].join(' ');

    console.error('=== FIREBASE CONFIGURATION ERROR ===');
    console.error(errorMessage);
    throw new Error(errorMessage);
}

const loadedEnvironmentVariables = requiredEnvironmentVariables as {
    [VariableName in keyof typeof requiredEnvironmentVariables]: string;
};

export const firebaseConfig = {
    apiKey: loadedEnvironmentVariables.EXPO_PUBLIC_FIREBASE_API_KEY,
    authDomain: loadedEnvironmentVariables.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: loadedEnvironmentVariables.EXPO_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: loadedEnvironmentVariables.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: loadedEnvironmentVariables.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: loadedEnvironmentVariables.EXPO_PUBLIC_FIREBASE_APP_ID,
};

export const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);

try {
    initializeAuth(app, {
        persistence: getReactNativePersistence(AsyncStorage),
    });
} catch (error) {
    if ((error as { code?: string })?.code !== 'auth/already-initialized') {
        throw error;
    }
}

export const auth: Auth = getAuth(app);

const maskValue = (value: string) =>
    value.length > 8 ? `${value.slice(0, 4)}...${value.slice(-4)}` : '***';

export const firebaseHealthCheck = async () => {
    const environmentVariablesLoaded = missingOrInvalidVariables.length === 0;

    const report = {
        firebaseInitialized: getApps().length > 0,
        projectId: firebaseConfig.projectId,
        authAvailable: Boolean(auth),
        environmentVariablesLoaded,
        apiKey: maskValue(firebaseConfig.apiKey),
    };

    console.log('=== FIREBASE HEALTH CHECK ===');
    console.log('Firebase inicializado:', report.firebaseInitialized);
    console.log('Project ID:', report.projectId);
    console.log('Auth Domain:', firebaseConfig.authDomain);
    console.log('Auth disponível:', report.authAvailable);
    console.log('Environment variables carregadas:', report.environmentVariablesLoaded);
    console.log('API Key (mascarada):', report.apiKey);
    console.log('Usuário autenticado:', auth.currentUser?.email ?? 'nenhum');

    return report;
};

export const firebaseErrorMessage = (error: unknown) => {
    const code = (error as { code?: string })?.code ?? '';

    switch (code) {
        case 'auth/invalid-api-key':
            return 'A configuração do Firebase está incompleta. Informe as credenciais do projeto.';
        case 'auth/operation-not-allowed':
            return 'O cadastro por e-mail não está habilitado no Firebase.';
        case 'auth/configuration-not-found':
            return 'A configuração do Firebase Authentication não foi encontrada.';
        case 'auth/invalid-email':
            return 'Informe um e-mail válido.';
        case 'auth/user-disabled':
            return 'Esta conta foi desativada.';
        case 'auth/user-not-found':
            return 'Usuário não encontrado.';
        case 'auth/wrong-password':
            return 'Senha incorreta.';
        case 'auth/invalid-credential':
            return 'E-mail ou senha incorretos.';
        case 'auth/missing-password':
            return 'Informe sua senha.';
        case 'auth/email-already-in-use':
            return 'Este e-mail já está em uso.';
        case 'auth/credential-already-in-use':
            return 'Esta credencial já está vinculada a outra conta.';
        case 'auth/weak-password':
            return 'A senha deve ter pelo menos 6 caracteres.';
        case 'auth/network-request-failed':
            return 'Falha de rede. Verifique sua conexão.';
        case 'auth/too-many-requests':
            return 'Muitas tentativas. Tente novamente mais tarde.';
        case 'auth/user-token-expired':
            return 'Sua sessão expirou. Faça login novamente.';
        case 'auth/invalid-user-token':
            return 'Sua sessão é inválida. Faça login novamente.';
        case 'auth/requires-recent-login':
            return 'Faça login novamente para concluir esta ação.';
        default:
            return 'Não foi possível concluir a operação. Tente novamente.';
    }
};

export const AUTH_SESSION_KEY = '@clyvocare:auth-session';
