import React from 'react';
import { View, Text } from 'react-native';
import { Link, useRouter } from 'expo-router';
import { useForm, Controller } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/Input';
import { PrimaryButton } from '@/components/ui/PrimaryButton';
import { useAuth } from '@/context/AuthProvider';
import { useToast } from '@/context/ToastProvider';

const resetPasswordSchema = z.object({
  email: z.string().email('Digite um e-mail válido.'),
});

type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>;

export default function RecuperarSenhaScreen() {
  const router = useRouter();
  const { resetPassword } = useAuth();
  const { showToast } = useToast();

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      email: '',
    },
  });

  const onSubmit = async (values: ResetPasswordFormData) => {
    try {
      await resetPassword(values.email.trim());
      showToast('Link de redefinição enviado com sucesso.', 'success');
      router.back();
    } catch (error: any) {
      const message = error?.message ?? 'Não foi possível enviar o link de recuperação.';
      showToast(message, 'error');
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#F8FAFC', padding: 24, justifyContent: 'center' }}>
      <Text style={{ color: '#0F172A', fontSize: 30, fontWeight: '800' }}>Recuperar senha</Text>
      <Text style={{ color: '#64748B', fontSize: 16, marginTop: 8 }}>Informe seu e-mail para receber o link de redefinição.</Text>

      <View style={{ gap: 18, marginTop: 28 }}>
        <Controller
          control={control}
          name="email"
          render={({ field: { onChange, onBlur, value } }) => (
            <Input label="E-mail" value={value} onBlur={onBlur} onChangeText={onChange} placeholder="seu@email.com" keyboardType="email-address" error={errors.email?.message} />
          )}
        />

        <PrimaryButton label={isSubmitting ? 'Enviando...' : 'Enviar link'} onPress={() => handleSubmit(onSubmit)()} />
        <Link href="/(auth)/login" asChild>
          <PrimaryButton label="Voltar ao login" variant="secondary" />
        </Link>
      </View>
    </View>
  );
}
