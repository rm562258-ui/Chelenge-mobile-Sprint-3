import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { SafeAreaView, ScrollView, StyleSheet, View } from 'react-native';
import * as z from 'zod';
import AppButton from '../../components/AppButton';
import AppInput from '../../components/AppInput';
import ProfileCard from '../../components/ProfileCard';
import { useCreatePet, usePet, useUpdatePet } from '../hooks/usePets';

const schema = z.object({
    petNome: z.string().min(1, 'Nome obrigatório'),
    especie: z.string().optional(),
    raca: z.string().optional(),
    idade: z.union([z.string(), z.number()]).optional(),
    peso: z.union([z.string(), z.number()]).optional(),
});

export default function PetFormScreen({ route, navigation }) {
    const { id } = route.params || {};
    const { data: pet } = usePet(id);

    const { control, handleSubmit, reset } = useForm({ resolver: zodResolver(schema), defaultValues: {} });

    useEffect(() => {
        if (pet) reset(pet);
    }, [pet, reset]);

    const createMutation = useCreatePet();
    const updateMutation = useUpdatePet();

    const onSubmit = async (values) => {
        try {
            if (id) {
                await updateMutation.mutateAsync({ id, payload: values });
            } else {
                await createMutation.mutateAsync(values);
            }
            navigation.navigate('Pets');
        } catch {
        }
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#F6FEFA' }}>
            <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
                <ProfileCard title={id ? 'Editar Pet' : 'Novo Pet'} icon="📝">
                    <Controller control={control} name="petNome" render={({ field }) => (
                        <AppInput label="Nome do pet" value={field.value} onChangeText={field.onChange} placeholder="Nome" />
                    )} />

                    <Controller control={control} name="especie" render={({ field }) => (
                        <AppInput label="Espécie" value={field.value} onChangeText={field.onChange} placeholder="Cão / Gato" />
                    )} />

                    <Controller control={control} name="raca" render={({ field }) => (
                        <AppInput label="Raça" value={field.value} onChangeText={field.onChange} placeholder="SRD / Labrador" />
                    )} />

                    <View style={{ height: 12 }} />
                    <AppButton title={id ? 'Salvar alterações' : 'Criar pet'} onPress={handleSubmit(onSubmit)} />
                </ProfileCard>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({ container: { padding: 16 } });
