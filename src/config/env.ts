import Constants from 'expo-constants';

type ExtraConfig = Record<string, string | undefined>;

const extra = (Constants.expoConfig?.extra ?? {}) as ExtraConfig;

export const env = {
    apiUrl: extra.API_URL ?? process.env.EXPO_PUBLIC_API_URL ?? 'http://localhost:3333',
    appEnv: extra.APP_ENV ?? 'development',
};

export default env;
