import React, { useEffect } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { Link, useRouter } from 'expo-router';
import { useForm, Controller } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/Input';
import { PasswordInput } from '@/components/ui/PasswordInput';
import { PrimaryButton } from '@/components/ui/PrimaryButton';
import { useAuth } from '@/context/AuthProvider';
import { useToast } from '@/context/ToastProvider';

const registerSchema = z
  .object({
    name: z.string().min(2, 'Informe seu nome completo.'),
    email: z.string().email('Digite um e-mail válido.'),
    password: z.string().min(6, 'A senha deve ter pelo menos 6 caracteres.'),
    confirmPassword: z.string().min(6, 'Confirme sua senha.'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: 'As senhas não coincidem.',
  });

type RegisterFormData = z.infer<typeof registerSchema>;

export default function CadastroScreen() {
  const router = useRouter();
  const { register, isAuthenticated, isLoading } = useAuth();
  const { showToast } = useToast();

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  useEffect(() => {
    if (isAuthenticated) {
      router.replace('/(app)/home');
    }
  }, [isAuthenticated, router]);

  const onSubmit = async (values: RegisterFormData) => {
    try {
      await register(values.name.trim(), values.email.trim(), values.password);
      showToast('Conta criada com sucesso!', 'success');
      router.replace('/(app)/home');
    } catch (error: any) {
      const message = error?.message ?? 'Não foi possível criar sua conta.';
      showToast(message, 'error');
    }
  };

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1, backgroundColor: '#F8FAFC', padding: 24, justifyContent: 'center' }}>
      <Text style={{ color: '#0F172A', fontSize: 30, fontWeight: '800' }}>Criar conta</Text>
      <Text style={{ color: '#64748B', fontSize: 16, marginTop: 8 }}>Cadastre-se para acompanhar seu pet.</Text>

      <View style={{ gap: 16, marginTop: 28 }}>
        <Controller
          control={control}
          name="name"
          render={({ field: { onChange, onBlur, value } }) => (
            <Input label="Nome" value={value} onBlur={onBlur} onChangeText={onChange} placeholder="Seu nome" error={errors.name?.message} />
          )}
        />

        <Controller
          control={control}
          name="email"
          render={({ field: { onChange, onBlur, value } }) => (
            <Input label="E-mail" value={value} onBlur={onBlur} onChangeText={onChange} placeholder="seu@email.com" keyboardType="email-address" error={errors.email?.message} />
          )}
        />

        <Controller
          control={control}
          name="password"
          render={({ field: { onChange, onBlur, value } }) => (
            <PasswordInput label="Senha" value={value} onBlur={onBlur} onChangeText={onChange} placeholder="Crie uma senha" error={errors.password?.message} />
          )}
        />

        <Controller
          control={control}
          name="confirmPassword"
          render={({ field: { onChange, onBlur, value } }) => (
            <PasswordInput label="Confirmar senha" value={value} onBlur={onBlur} onChangeText={onChange} placeholder="Confirme a senha" error={errors.confirmPassword?.message} />
          )}
        />

        <PrimaryButton label={isSubmitting || isLoading ? 'Cadastrando...' : 'Cadastrar'} onPress={() => handleSubmit(onSubmit)()} />
      </View>

      <Text style={{ textAlign: 'center', color: '#64748B', marginTop: 24 }}>
        Já possui conta?{' '}
        <Link href="/(auth)/login" asChild>
          <Text style={{ color: '#16A34A', fontWeight: '700' }}>Entrar</Text>
        </Link>
      </Text>
    </ScrollView>
  );
}
