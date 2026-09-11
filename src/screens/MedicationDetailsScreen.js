import { Alert, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import AppButton from '../../components/AppButton';
import ProfileCard from '../../components/ProfileCard';
import { useDeleteMedication, useMedications } from '../hooks/useMedications';

export default function MedicationDetailsScreen({ route, navigation }) {
    const { id } = route.params || {};
    const { data } = useMedications();
    const med = Array.isArray(data) ? data.find((m) => m.id === id) : null;
    const deleteMutation = useDeleteMedication();

    const handleDelete = () => {
        Alert.alert('Confirmar', 'Deseja excluir este medicamento?', [
            { text: 'Cancelar', style: 'cancel' },
            { text: 'Excluir', style: 'destructive', onPress: async () => { try { await deleteMutation.mutateAsync(id); navigation.navigate('Medications'); } catch { } } }
        ]);
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#F6FEFA' }}>
            <ScrollView contentContainerStyle={styles.container}>
                <ProfileCard title={med?.name || 'Medicamento'} icon="💊">
                    <Text style={{ color: '#475569' }}>Frequência: {med?.frequency || '-'}</Text>
                    <Text style={{ marginTop: 8 }}>Dosagem: {med?.dosage || '-'}</Text>
                    <Text style={{ marginTop: 8 }}>{med?.notes || ''}</Text>
                </ProfileCard>
                <View style={{ height: 12 }} />
                <AppButton title="Editar" onPress={() => navigation.navigate('MedicationForm', { id })} />
                <View style={{ height: 8 }} />
                <AppButton title="Excluir" variant="outline" onPress={handleDelete} />
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({ container: { padding: 16 } });
