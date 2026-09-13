import { Alert, SafeAreaView, ScrollView, StyleSheet, Switch, Text, View } from 'react-native';
import AppButton from '../../components/AppButton';
import ProfileCard from '../../components/ProfileCard';
import { useAppointments, useDeleteAppointment, useUpdateAppointment } from '../hooks/useAppointments';

const formatDate = (value = '') => {
    const match = value.match(/^(\d{4})-(\d{2})-(\d{2})/);
    return match ? `${match[3]}/${match[2]}/${match[1].slice(-2)}` : value;
};

export default function AppointmentDetailsScreen({ route, navigation }) {
    const { id } = route.params || {};
    const { data } = useAppointments();
    const appointment = Array.isArray(data) ? data.find((a) => a.id === id) : null;
    const deleteMutation = useDeleteAppointment();
    const updateMutation = useUpdateAppointment();

    const handleStatusChange = async (completed) => {
        try {
            await updateMutation.mutateAsync({
                id,
                payload: { status: completed ? 'Concluída' : 'Agendada' },
            });
        } catch {
            Alert.alert('Erro', 'Não foi possível atualizar o status da consulta.');
        }
    };

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
                    <Text style={{ color: '#475569', marginTop: 8 }}>Pet: {appointment?.petName || '-'}</Text>
                    <Text style={{ marginTop: 8 }}>Data: {formatDate(appointment?.date || '') || '-'}</Text>
                    {appointment ? (
                        <View style={styles.statusRow}>
                            <Text style={styles.statusLabel}>{appointment.status === 'Concluída' ? 'Concluída' : appointment.status === 'Atrasada' ? 'Atrasada' : 'Agendada'}</Text>
                            <Switch
                                value={appointment.status === 'Concluída'}
                                onValueChange={handleStatusChange}
                                disabled={updateMutation.isPending}
                                trackColor={{ false: '#CBD5E1', true: '#22C55E' }}
                                thumbColor={appointment.status === 'Concluída' ? '#15803D' : '#F8FAFC'}
                            />
                        </View>
                    ) : null}
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

const styles = StyleSheet.create({
    container: { padding: 16 },
    statusRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 12 },
    statusLabel: { color: '#0F172A', fontSize: 14, fontWeight: '700' },
});
