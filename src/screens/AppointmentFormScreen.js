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
    petId: z.string().min(1),
    date: z.string().min(1),
    type: z.string().optional(),
    status: z.string().optional(),
    notes: z.string().optional(),
});

export default function AppointmentFormScreen({ route, navigation }) {
    const { id } = route.params || {};

    const { data } = useAppointments();
    const { control, handleSubmit, reset } = useForm({ resolver: zodResolver(schema), defaultValues: {} });

    useEffect(() => {
        if (id && data) {
            const appointment = data.find((item) => item.id === id);
            if (appointment) reset(appointment);
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
                    <Controller control={control} name="petId" render={({ field }) => (
                        <AppInput label="Pet ID" value={field.value} onChangeText={field.onChange} placeholder="ID do pet" />
                    )} />

                    <Controller control={control} name="date" render={({ field }) => (
                        <AppInput label="Data" value={field.value} onChangeText={field.onChange} placeholder="YYYY-MM-DD" />
                    )} />

                    <Controller control={control} name="type" render={({ field }) => (
                        <AppInput label="Tipo" value={field.value} onChangeText={field.onChange} placeholder="Consulta / Retorno" />
                    )} />

                    <Controller control={control} name="status" render={({ field }) => (
                        <AppInput label="Status" value={field.value} onChangeText={field.onChange} placeholder="Agendada / Concluída" />
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

const styles = StyleSheet.create({ container: { padding: 16 } });
