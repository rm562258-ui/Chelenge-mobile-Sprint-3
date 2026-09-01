import AsyncStorage from '@react-native-async-storage/async-storage';
import {
    createUserWithEmailAndPassword,
    onAuthStateChanged,
    sendPasswordResetEmail,
    signInWithEmailAndPassword,
    signOut,
    type User,
} from 'firebase/auth';
import { createContext, useEffect, useMemo, useState, type ReactNode } from 'react';

import { auth, AUTH_SESSION_KEY, firebaseErrorMessage } from '../services/firebase';
import { showToast } from '../utils/toast';

type AuthContextValue = {
    user: User | null;
    loading: boolean;
    isAuthenticated: boolean;
    signIn: (email: string, password: string) => Promise<void>;
    signUp: (email: string, password: string) => Promise<void>;
    resetPassword: (email: string) => Promise<void>;
    logout: () => Promise<void>;
};

export const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
            setUser(firebaseUser);

            try {
                if (firebaseUser) {
                    await AsyncStorage.setItem(
                        AUTH_SESSION_KEY,
                        JSON.stringify({
                            uid: firebaseUser.uid,
                            email: firebaseUser.email ?? '',
                        })
                    );
                } else {
                    await AsyncStorage.removeItem(AUTH_SESSION_KEY);
                }
            } catch (error) {
                console.warn('Erro ao persistir sessão do usuário', error);
            }

            setLoading(false);
        });

        return unsubscribe;
    }, []);

    const signIn = async (email: string, password: string) => {
        setLoading(true);

        try {
            const result = await signInWithEmailAndPassword(auth, email.trim(), password);
            setUser(result.user);
            showToast('Login realizado com sucesso.', 'success');
        } catch (error) {
            const message = firebaseErrorMessage(error);
            showToast(message, 'error');
            throw new Error(message);
        } finally {
            setLoading(false);
        }
    };

    const signUp = async (email: string, password: string) => {
        setLoading(true);

        try {
            const result = await createUserWithEmailAndPassword(auth, email.trim(), password);
            setUser(result.user);
            showToast('Cadastro realizado com sucesso.', 'success');
        } catch (error) {
            const message = firebaseErrorMessage(error);
            showToast(message, 'error');
            throw new Error(message);
        } finally {
            setLoading(false);
        }
    };

    const resetPassword = async (email: string) => {
        setLoading(true);

        try {
            await sendPasswordResetEmail(auth, email.trim());
            showToast('E-mail de recuperação enviado.', 'success');
        } catch (error) {
            const message = firebaseErrorMessage(error);
            showToast(message, 'error');
            throw new Error(message);
        } finally {
            setLoading(false);
        }
    };

    const logout = async () => {
        setLoading(true);

        try {
            await signOut(auth);
            setUser(null);
            await AsyncStorage.removeItem(AUTH_SESSION_KEY);
            showToast('Sessão encerrada.', 'info');
        } catch (error) {
            const message = firebaseErrorMessage(error);
            showToast(message, 'error');
            throw new Error(message);
        } finally {
            setLoading(false);
        }
    };

    const value = useMemo<AuthContextValue>(
        () => ({
            user,
            loading,
            isAuthenticated: !!user,
            signIn,
            signUp,
            resetPassword,
            logout,
        }),
        [user, loading]
    );

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
