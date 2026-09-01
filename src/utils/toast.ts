import { Alert, Platform, ToastAndroid } from 'react-native';

export const showToast = (message: string, type: 'success' | 'error' | 'info' = 'info') => {
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
