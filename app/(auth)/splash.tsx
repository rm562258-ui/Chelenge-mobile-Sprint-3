import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import { Link, useRouter } from 'expo-router';
import { PrimaryButton } from '@/components/ui/PrimaryButton';
import { useAuth } from '@/context/AuthProvider';

export default function SplashScreen() {
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated) {
      router.replace('/(app)/home');
    }
  }, [isAuthenticated, router]);

  return (
    <View style={{ flex: 1, backgroundColor: '#0F766E', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
      <Text style={{ color: '#FFFFFF', fontSize: 42, fontWeight: '800', textAlign: 'center' }}>CLYVO VET</Text>
      <Text style={{ color: '#D1FAE5', fontSize: 18, marginTop: 12, textAlign: 'center' }}>
        Seu cuidado com o pet em um só lugar.
      </Text>
      <View style={{ width: '100%', marginTop: 32, gap: 12 }}>
        <Link href="/(auth)/login" asChild>
          <PrimaryButton label="Entrar" />
        </Link>
        <Link href="/(auth)/cadastro" asChild>
          <PrimaryButton label="Criar conta" variant="secondary" />
        </Link>
      </View>
    </View>
  );
}
