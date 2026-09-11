import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { subscribeToast } from '../utils/toast';
import { Animated, Text } from 'react-native';

type ToastType = 'success' | 'error' | 'info';

type ToastContextValue = {
  showToast: (message: string, type?: ToastType) => void;
};

const ToastContext = createContext<ToastContextValue | undefined>(undefined);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [message, setMessage] = useState<string | null>(null);
  const [type, setType] = useState<ToastType>('info');
  const [opacity] = useState(new Animated.Value(0));

  useEffect(() => {
    if (!message) {
      return;
    }

    Animated.sequence([
      Animated.timing(opacity, { toValue: 1, duration: 200, useNativeDriver: true }),
      Animated.delay(2200),
      Animated.timing(opacity, { toValue: 0, duration: 250, useNativeDriver: true }),
    ]).start(() => setMessage(null));
  }, [message, opacity]);

  useEffect(() => subscribeToast((nextMessage, nextType) => {
    setType(nextType);
    setMessage(nextMessage);
  }), []);

  const showToast = (nextMessage: string, nextType: ToastType = 'info') => {
    setType(nextType);
    setMessage(nextMessage);
  };

  const value = useMemo(
    () => ({
      showToast,
    }),
    [],
  );

  const colors = {
    success: '#16A34A',
    error: '#EF4444',
    info: '#0F766E',
  };

  return (
    <ToastContext.Provider value={value}>
      {children}
      {message ? (
        <Animated.View
          pointerEvents="none"
          style={{
            position: 'absolute',
            left: 20,
            right: 20,
            bottom: 90,
            opacity,
            backgroundColor: colors[type],
            borderRadius: 14,
            paddingVertical: 12,
            paddingHorizontal: 16,
            shadowColor: '#000',
            shadowOpacity: 0.12,
            shadowRadius: 12,
            shadowOffset: { width: 0, height: 4 },
          }}
        >
          <Text style={{ color: '#FFFFFF', fontWeight: '700', textAlign: 'center' }}>{message}</Text>
        </Animated.View>
      ) : null}
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);

  if (!context) {
    throw new Error('useToast must be used within ToastProvider');
  }

  return context;
}
