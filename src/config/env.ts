import Constants from 'expo-constants';

type ExtraConfig = Record<string, string | undefined>;

const extra = (Constants.expoConfig?.extra ?? {}) as ExtraConfig;

export const env = {
    apiUrl: extra.API_URL ?? 'https://api.example.com',
    appEnv: extra.APP_ENV ?? 'development',
};

export default env;
