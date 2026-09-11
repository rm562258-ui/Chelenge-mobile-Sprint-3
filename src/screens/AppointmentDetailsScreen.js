import { Alert, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import AppButton from '../../components/AppButton';
import ProfileCard from '../../components/ProfileCard';
import { useAppointments, useDeleteAppointment } from '../hooks/useAppointments';

export default function AppointmentDetailsScreen({ route, navigation }) {
    const { id } = route.params || {};
    const { data } = useAppointments();
    const appointment = Array.isArray(data) ? data.find((a) => a.id === id) : null;
    const deleteMutation = useDeleteAppointment();

    const handleDelete = () => {
        Alert.alert('Confirmar', 'Deseja excluir esta consulta?', [
            { text: 'Cancelar', style: 'cancel' },
            {
                text: 'Excluir', style: 'destructive', onPress: async () => {
                    try {
                        await deleteMutation.mutateAsync(id);
                        navigation.navigate('AgendaCuidados');
                    } catch { }
                }
            }
        ]);
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#F6FEFA' }}>
            <ScrollView contentContainerStyle={styles.container}>
                <ProfileCard title={appointment?.title || 'Consulta'} icon="📌">
                    <Text style={{ color: '#475569' }}>{appointment?.type || '-'} • {appointment?.status || '-'}</Text>
                    <Text style={{ marginTop: 8 }}>Data: {appointment?.date || '-'}</Text>
                    <Text style={{ marginTop: 8 }}>{appointment?.notes || ''}</Text>
                </ProfileCard>

                <View style={{ height: 12 }} />
                <AppButton title="Editar" onPress={() => navigation.navigate('AppointmentForm', { id })} />
                <View style={{ height: 8 }} />
                <AppButton title="Excluir" variant="outline" onPress={handleDelete} />
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({ container: { padding: 16 } });
