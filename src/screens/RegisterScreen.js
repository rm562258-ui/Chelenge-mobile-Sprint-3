import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigation } from '@react-navigation/native';
import { Controller, useForm } from 'react-hook-form';
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import { z } from 'zod';

import AppButton from '../../components/AppButton';
import AppInput from '../../components/AppInput';
import { useAuth } from '../hooks/useAuth';

const registerSchema = z.object({
    email: z.string().trim().email('Informe um e-mail válido.'),
    password: z.string().min(6, 'A senha deve ter pelo menos 6 caracteres.'),
    confirmPassword: z.string().min(6, 'Confirme sua senha.'),
}).refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: 'As senhas não coincidem.',
});

export default function RegisterScreen() {
    const navigation = useNavigation();
    const { signUp, loading } = useAuth();

    const {
        control,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            email: '',
            password: '',
            confirmPassword: '',
        },
    });

    const onSubmit = async (data) => {
        await signUp(data.email, data.password);
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
                <Text style={styles.title}>Criar conta</Text>
                <Text style={styles.subtitle}>Cadastre-se para começar a acompanhar seu pet</Text>

                <Controller
                    control={control}
                    name="email"
                    render={({ field: { onChange, value } }) => (
                        <AppInput
                            label="E-mail"
                            placeholder="seu@email.com"
                            keyboardType="email-address"
                            value={value}
                            onChangeText={onChange}
                            error={errors.email?.message}
                            leftIcon="✉️"
                        />
                    )}
                />

                <Controller
                    control={control}
                    name="password"
                    render={({ field: { onChange, value } }) => (
                        <AppInput
                            label="Senha"
                            placeholder="********"
                            secureTextEntry
                            value={value}
                            onChangeText={onChange}
                            error={errors.password?.message}
                            leftIcon="🔒"
                        />
                    )}
                />

                <Controller
                    control={control}
                    name="confirmPassword"
                    render={({ field: { onChange, value } }) => (
                        <AppInput
                            label="Confirmar senha"
                            placeholder="********"
                            secureTextEntry
                            value={value}
                            onChangeText={onChange}
                            error={errors.confirmPassword?.message}
                            leftIcon="🔐"
                        />
                    )}
                />

                <AppButton
                    title="Cadastrar"
                    onPress={handleSubmit(onSubmit)}
                    loading={loading || isSubmitting}
                    disabled={loading || isSubmitting}
                    style={{ width: '100%', marginTop: 16 }}
                />

                <View style={styles.inlineRow}>
                    <Text style={styles.bottomText}>Já possui conta?</Text>
                    <Text style={styles.linkText} onPress={() => navigation.navigate('Login')}>
                        Entrar
                    </Text>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: { flex: 1, backgroundColor: '#F6FEFA' },
    container: { flexGrow: 1, justifyContent: 'center', padding: 24 },
    title: { fontSize: 30, fontWeight: '800', color: '#0F172A', textAlign: 'center', marginBottom: 8 },
    subtitle: { fontSize: 16, color: '#475569', textAlign: 'center', marginBottom: 18 },
    linkText: { color: '#2563EB', fontWeight: '700', marginTop: 12, textAlign: 'right' },
    bottomText: { color: '#475569', marginRight: 6 },
    inlineRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 20 },
});
