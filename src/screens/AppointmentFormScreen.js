import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { SafeAreaView, ScrollView, StyleSheet, View } from 'react-native';
import * as z from 'zod';
import AppButton from '../../components/AppButton';
import AppInput from '../../components/AppInput';
import ProfileCard from '../../components/ProfileCard';
import { useAppointments, useCreateAppointment, useUpdateAppointment } from '../hooks/useAppointments';

const schema = z.object({
    petName: z.string().min(1, 'Informe o nome do pet'),
    date: z.string().min(1, 'Informe a data'),
    type: z.string().min(1, 'Informe o tipo da consulta'),
    status: z.enum(['Agendada', 'Concluída', 'Atrasada']),
    notes: z.string().optional(),
});

const formatDateInput = (value = '') => {
    const digits = value.replace(/\D/g, '').slice(0, 6);
    if (digits.length <= 2) return digits;
    if (digits.length <= 4) return `${digits.slice(0, 2)}/${digits.slice(2)}`;
    return `${digits.slice(0, 2)}/${digits.slice(2, 4)}/${digits.slice(4)}`;
};

const formatDateForForm = (value = '') => {
    const isoMatch = value.match(/^(\d{4})-(\d{2})-(\d{2})/);
    return isoMatch ? `${isoMatch[3]}/${isoMatch[2]}/${isoMatch[1].slice(-2)}` : formatDateInput(value);
};

export default function AppointmentFormScreen({ route, navigation }) {
    const { id } = route.params || {};

    const { data } = useAppointments();
    const { control, handleSubmit, reset } = useForm({
        resolver: zodResolver(schema),
        defaultValues: { petName: '', date: '', type: '', status: 'Agendada', notes: '' },
    });

    useEffect(() => {
        if (id && data) {
            const appointment = data.find((item) => item.id === id);
            if (appointment) reset({ ...appointment, date: formatDateForForm(appointment.date) });
        }
    }, [id, data, reset]);

    const createMutation = useCreateAppointment();
    const updateMutation = useUpdateAppointment();

    const onSubmit = async (values) => {
        try {
            if (id) {
                await updateMutation.mutateAsync({ id, payload: values });
            } else {
                await createMutation.mutateAsync(values);
            }
            navigation.navigate('AgendaCuidados');
        } catch { }
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#F6FEFA' }}>
            <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
                <ProfileCard title={id ? 'Editar Consulta' : 'Nova Consulta'} icon="📅">
                    <Controller control={control} name="petName" render={({ field }) => (
                        <AppInput label="Nome do pet" value={field.value} onChangeText={field.onChange} placeholder="Nome do pet" />
                    )} />

                    <Controller control={control} name="date" render={({ field }) => (
                        <AppInput label="Data" value={field.value} onChangeText={(value) => field.onChange(formatDateInput(value))} placeholder="DD/MM/YY" keyboardType="numeric" />
                    )} />

                    <Controller control={control} name="type" render={({ field }) => (
                        <AppInput label="Tipo" value={field.value} onChangeText={field.onChange} placeholder="Consulta / Retorno" />
                    )} />

                    <Controller control={control} name="notes" render={({ field }) => (
                        <AppInput label="Notas" value={field.value} onChangeText={field.onChange} placeholder="Observações" />
                    )} />

                    <View style={{ height: 12 }} />
                    <AppButton title={id ? 'Salvar' : 'Agendar'} onPress={handleSubmit(onSubmit)} />
                </ProfileCard>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: { padding: 16 },
});
