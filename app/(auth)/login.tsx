import React, { useEffect } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { Link, useRouter } from 'expo-router';
import { useForm, Controller } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { PrimaryButton } from '@/components/ui/PrimaryButton';
import { Input } from '@/components/ui/Input';
import { PasswordInput } from '@/components/ui/PasswordInput';
import { useAuth } from '@/context/AuthProvider';
import { useToast } from '@/context/ToastProvider';

const loginSchema = z.object({
  email: z.string().email('Digite um e-mail válido.'),
  password: z.string().min(6, 'A senha deve ter pelo menos 6 caracteres.'),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function LoginScreen() {
  const router = useRouter();
  const { login, isAuthenticated, isLoading } = useAuth();
  const { showToast } = useToast();

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  useEffect(() => {
    if (isAuthenticated) {
      router.replace('/(app)/home');
    }
  }, [isAuthenticated, router]);

  const onSubmit = async (values: LoginFormData) => {
    try {
      await login(values.email.trim(), values.password);
      showToast('Login realizado com sucesso!', 'success');
      router.replace('/(app)/home');
    } catch (error: any) {
      const message = error?.message ?? 'Não foi possível entrar agora.';
      showToast(message, 'error');
    }
  };

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1, backgroundColor: '#F8FAFC', padding: 24, justifyContent: 'center' }}>
      <Text style={{ color: '#0F172A', fontSize: 32, fontWeight: '800' }}>Bem-vindo</Text>
      <Text style={{ color: '#64748B', fontSize: 16, marginTop: 8 }}>Acesse sua conta da CLYVO VET</Text>

      <View style={{ gap: 16, marginTop: 28 }}>
        <Controller
          control={control}
          name="email"
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              label="E-mail"
              value={value}
              onBlur={onBlur}
              onChangeText={onChange}
              placeholder="seu@email.com"
              keyboardType="email-address"
              error={errors.email?.message}
            />
          )}
        />

        <Controller
          control={control}
          name="password"
          render={({ field: { onChange, onBlur, value } }) => (
            <PasswordInput
              label="Senha"
              value={value}
              onBlur={onBlur}
              onChangeText={onChange}
              placeholder="Sua senha"
              error={errors.password?.message}
            />
          )}
        />

        <Link href="/(auth)/recuperar-senha" asChild>
          <Text style={{ color: '#0F766E', textAlign: 'right', fontWeight: '600' }}>Esqueci a senha</Text>
        </Link>

        <PrimaryButton label={isSubmitting || isLoading ? 'Entrando...' : 'Entrar'} onPress={() => handleSubmit(onSubmit)()} />
      </View>

      <Text style={{ textAlign: 'center', color: '#64748B', marginTop: 24 }}>
        Ainda não tem conta?{' '}
        <Link href="/(auth)/cadastro" asChild>
          <Text style={{ color: '#16A34A', fontWeight: '700' }}>Cadastre-se</Text>
        </Link>
      </Text>
    </ScrollView>
  );
}
