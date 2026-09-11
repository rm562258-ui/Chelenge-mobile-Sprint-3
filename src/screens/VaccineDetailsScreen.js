import { Alert, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import AppButton from '../../components/AppButton';
import ProfileCard from '../../components/ProfileCard';
import { useDeleteVaccine, useVaccines } from '../hooks/useVaccines';

export default function VaccineDetailsScreen({ route, navigation }) {
    const { id } = route.params || {};
    const { data } = useVaccines();
    const vaccine = Array.isArray(data) ? data.find((v) => v.id === id) : null;
    const deleteMutation = useDeleteVaccine();

    const handleDelete = () => {
        Alert.alert('Confirmar', 'Deseja excluir este registro vacinal?', [
            { text: 'Cancelar', style: 'cancel' },
            { text: 'Excluir', style: 'destructive', onPress: async () => { try { await deleteMutation.mutateAsync(id); navigation.navigate('Vaccines'); } catch { } } }
        ]);
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#F6FEFA' }}>
            <ScrollView contentContainerStyle={styles.container}>
                <ProfileCard title={vaccine?.name || 'Vacina'} icon="💉">
                    <Text style={{ color: '#475569' }}>Pet: {vaccine?.petId || '-'}</Text>
                    <Text style={{ marginTop: 8 }}>Data: {vaccine?.date || '-'}</Text>
                    <Text style={{ marginTop: 8 }}>{vaccine?.notes || ''}</Text>
                </ProfileCard>
                <View style={{ height: 12 }} />
                <AppButton title="Editar" onPress={() => navigation.navigate('VaccineForm', { id })} />
                <View style={{ height: 8 }} />
                <AppButton title="Excluir" variant="outline" onPress={handleDelete} />
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({ container: { padding: 16 } });
