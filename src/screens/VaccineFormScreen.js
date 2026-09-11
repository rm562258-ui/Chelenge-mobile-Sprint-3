import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { SafeAreaView, ScrollView, StyleSheet, View } from 'react-native';
import * as z from 'zod';
import AppButton from '../../components/AppButton';
import AppInput from '../../components/AppInput';
import ProfileCard from '../../components/ProfileCard';
import { useCreateVaccine, useUpdateVaccine, useVaccines } from '../hooks/useVaccines';

const schema = z.object({ name: z.string().min(1), petId: z.string().min(1), date: z.string().min(1), dose: z.string().optional(), boosterDate: z.string().optional(), notes: z.string().optional() });

export default function VaccineFormScreen({ route, navigation }) {
    const { id } = route.params || {};
    const { data } = useVaccines();

    const { control, handleSubmit, reset } = useForm({ resolver: zodResolver(schema), defaultValues: {} });

    useEffect(() => {
        if (id && data) {
            const v = data.find((x) => x.id === id);
            if (v) reset(v);
        }
    }, [id, data, reset]);

    const createMutation = useCreateVaccine();
    const updateMutation = useUpdateVaccine();

    const onSubmit = async (values) => {
        try {
            if (id) {
                await updateMutation.mutateAsync({ id, payload: values });
            } else {
                await createMutation.mutateAsync(values);
            }
            navigation.navigate('Vaccines');
        } catch { }
    };


    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#F6FEFA' }}>
            <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
                <ProfileCard title={id ? 'Editar Vacina' : 'Nova Vacina'} icon="💉">
                    <Controller control={control} name="name" render={({ field }) => <AppInput label="Vacina" value={field.value} onChangeText={field.onChange} />} />
                    <Controller control={control} name="petId" render={({ field }) => <AppInput label="Pet ID" value={field.value} onChangeText={field.onChange} />} />
                    <Controller control={control} name="date" render={({ field }) => <AppInput label="Data" value={field.value} onChangeText={field.onChange} placeholder="YYYY-MM-DD" />} />
                    <Controller control={control} name="dose" render={({ field }) => <AppInput label="Dose" value={field.value} onChangeText={field.onChange} placeholder="1ª dose / reforço" />} />
                    <Controller control={control} name="boosterDate" render={({ field }) => <AppInput label="Próximo reforço" value={field.value} onChangeText={field.onChange} placeholder="YYYY-MM-DD" />} />
                    <Controller control={control} name="notes" render={({ field }) => <AppInput label="Notas" value={field.value} onChangeText={field.onChange} />} />
                    <View style={{ height: 12 }} />
                    <AppButton title={id ? 'Salvar' : 'Registrar'} onPress={handleSubmit(onSubmit)} />
                </ProfileCard>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({ container: { padding: 16 } });
