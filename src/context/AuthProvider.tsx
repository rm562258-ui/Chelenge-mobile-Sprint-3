import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as SecureStore from 'expo-secure-store';
import {
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  updateProfile,
  type User as FirebaseUser,
} from 'firebase/auth';
import { auth } from '@/services/firebase';
import { queryClient } from '@/context/QueryProvider';
import { User } from '@/types';

type AuthContextValue = {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  refreshUser: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

const firebaseIsConfigured = Boolean(
  process.env.EXPO_PUBLIC_FIREBASE_API_KEY &&
    !process.env.EXPO_PUBLIC_FIREBASE_API_KEY.includes('your'),
);

const mapFirebaseUser = (firebaseUser: FirebaseUser | null): User | null => {
  if (!firebaseUser) {
    return null;
  }

  return {
    id: firebaseUser.uid,
    name: firebaseUser.displayName ?? firebaseUser.email?.split('@')[0] ?? 'Tutor',
    email: firebaseUser.email ?? '',
    avatar: firebaseUser.photoURL ?? undefined,
  };
};

const clearSessionStorage = async () => {
  await AsyncStorage.removeItem('user_session');
  await SecureStore.deleteItemAsync('user');
  await SecureStore.deleteItemAsync('auth_token');
};

const persistSession = async (firebaseUser: FirebaseUser | null) => {
  const currentUser = mapFirebaseUser(firebaseUser);

  if (!firebaseUser || !currentUser) {
    await clearSessionStorage();
    return null;
  }

  const token = await firebaseUser.getIdToken();
  await SecureStore.setItemAsync('auth_token', token);
  await AsyncStorage.setItem('user_session', JSON.stringify(currentUser));
  await SecureStore.setItemAsync('user', JSON.stringify(currentUser));

  return currentUser;
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (firebaseUser) => {
      try {
        const storedUser = await persistSession(firebaseUser);
        setUser(storedUser ?? null);
      } catch {
        setUser(null);
        await clearSessionStorage();
      } finally {
        setIsLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const refreshUser = async () => {
    const firebaseUser = auth.currentUser;

    if (!firebaseUser) {
      setUser(null);
      await clearSessionStorage();
      return;
    }

    await firebaseUser.reload();
    const refreshedUser = await persistSession(firebaseUser);
    setUser(refreshedUser ?? null);
  };

  const login = async (email: string, password: string) => {
    if (!firebaseIsConfigured) {
      const demoUser: User = {
        id: 'demo-user',
        name: email.split('@')[0],
        email,
      };
      setUser(demoUser);
      await AsyncStorage.setItem('user_session', JSON.stringify(demoUser));
      await SecureStore.setItemAsync('user', JSON.stringify(demoUser));
      await SecureStore.setItemAsync('auth_token', 'demo-token');
      return;
    }

    const credential = await signInWithEmailAndPassword(auth, email, password);
    await persistSession(credential.user);
    setUser(mapFirebaseUser(credential.user));
  };

  const register = async (name: string, email: string, password: string) => {
    if (!firebaseIsConfigured) {
      const demoUser: User = {
        id: 'demo-user',
        name,
        email,
      };
      setUser(demoUser);
      await AsyncStorage.setItem('user_session', JSON.stringify(demoUser));
      await SecureStore.setItemAsync('user', JSON.stringify(demoUser));
      await SecureStore.setItemAsync('auth_token', 'demo-token');
      return;
    }

    const credential = await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(credential.user, { displayName: name });
    await persistSession(credential.user);
    setUser(mapFirebaseUser(credential.user));
  };

  const resetPassword = async (email: string) => {
    if (!firebaseIsConfigured) {
      return;
    }

    await sendPasswordResetEmail(auth, email);
  };

  const logout = async () => {
    if (firebaseIsConfigured) {
      await firebaseSignOut(auth);
    }

    queryClient.clear();
    setUser(null);
    await clearSessionStorage();
  };

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      isAuthenticated: Boolean(user),
      isLoading,
      login,
      register,
      logout,
      resetPassword,
      refreshUser,
    }),
    [user, isLoading],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }

  return context;
}
