import { Alert, Platform, ToastAndroid } from 'react-native';

type ToastType = 'success' | 'error' | 'info';
type ToastListener = (message: string, type: ToastType) => void;
const listeners = new Set<ToastListener>();

export const subscribeToast = (listener: ToastListener) => {
    listeners.add(listener);
    return () => listeners.delete(listener);
};

export const showToast = (message: string, type: 'success' | 'error' | 'info' = 'info') => {
    if (listeners.size > 0) {
        listeners.forEach((listener) => listener(message, type));
        return;
    }

    if (Platform.OS === 'android') {
        ToastAndroid.showWithGravity(
            message,
            ToastAndroid.SHORT,
            ToastAndroid.BOTTOM,
        );
        return;
    }

    const title = type === 'error' ? 'Erro' : type === 'success' ? 'Sucesso' : 'Aviso';
    Alert.alert(title, message);
};
