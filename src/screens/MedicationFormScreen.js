import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { SafeAreaView, ScrollView, StyleSheet, View } from 'react-native';
import * as z from 'zod';
import AppButton from '../../components/AppButton';
import AppInput from '../../components/AppInput';
import ProfileCard from '../../components/ProfileCard';
import { useCreateMedication, useMedications, useUpdateMedication } from '../hooks/useMedications';

const schema = z.object({ name: z.string().min(1), petId: z.string().min(1), frequency: z.string().optional(), dosage: z.string().optional(), startDate: z.string().optional(), endDate: z.string().optional(), notes: z.string().optional() });

export default function MedicationFormScreen({ route, navigation }) {
    const { id } = route.params || {};
    const { data } = useMedications();

    const { control, handleSubmit, reset } = useForm({ resolver: zodResolver(schema), defaultValues: {} });

    useEffect(() => {
        if (id && data) {
            const m = data.find((x) => x.id === id);
            if (m) reset(m);
        }
    }, [id, data, reset]);

    const createMutation = useCreateMedication();
    const updateMutation = useUpdateMedication();

    const onSubmit = async (values) => {
        try {
            if (id) {
                await updateMutation.mutateAsync({ id, payload: values });
            } else {
                await createMutation.mutateAsync(values);
            }
            navigation.navigate('Medications');
        } catch { }
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#F6FEFA' }}>
            <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
                <ProfileCard title={id ? 'Editar Medicamento' : 'Novo Medicamento'} icon="💊">
                    <Controller control={control} name="name" render={({ field }) => <AppInput label="Nome" value={field.value} onChangeText={field.onChange} />} />
                    <Controller control={control} name="petId" render={({ field }) => <AppInput label="Pet ID" value={field.value} onChangeText={field.onChange} />} />
                    <Controller control={control} name="frequency" render={({ field }) => <AppInput label="Frequência" value={field.value} onChangeText={field.onChange} />} />
                    <Controller control={control} name="dosage" render={({ field }) => <AppInput label="Dosagem" value={field.value} onChangeText={field.onChange} />} />
                    <Controller control={control} name="startDate" render={({ field }) => <AppInput label="Início do tratamento" value={field.value} onChangeText={field.onChange} placeholder="YYYY-MM-DD" />} />
                    <Controller control={control} name="endDate" render={({ field }) => <AppInput label="Fim do tratamento" value={field.value} onChangeText={field.onChange} placeholder="YYYY-MM-DD" />} />
                    <Controller control={control} name="notes" render={({ field }) => <AppInput label="Notas" value={field.value} onChangeText={field.onChange} />} />
                    <View style={{ height: 12 }} />
                    <AppButton title={id ? 'Salvar' : 'Registrar'} onPress={handleSubmit(onSubmit)} />
                </ProfileCard>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({ container: { padding: 16 } });
