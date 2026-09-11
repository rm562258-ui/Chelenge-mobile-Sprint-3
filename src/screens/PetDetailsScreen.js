import { Alert, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import AppButton from '../../components/AppButton';
import ProfileCard from '../../components/ProfileCard';
import { useDeletePet, usePet } from '../hooks/usePets';

export default function PetDetailsScreen({ route, navigation }) {
    const { id } = route.params || {};
    const { data: pet } = usePet(id);
    const deleteMutation = useDeletePet();

    const handleDelete = () => {
        Alert.alert('Confirmar', 'Deseja excluir este pet?', [
            { text: 'Cancelar', style: 'cancel' },
            {
                text: 'Excluir', style: 'destructive', onPress: async () => {
                    try {
                        await deleteMutation.mutateAsync(id);
                        navigation.navigate('Pets');
                    } catch (_err) {
                        Alert.alert('Erro', 'Não foi possível excluir o pet.');
                    }
                }
            }
        ]);
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#F6FEFA' }}>
            <ScrollView contentContainerStyle={styles.container}>
                <ProfileCard title={pet?.petNome || '—'} icon="🐾">
                    <Text style={{ color: '#475569' }}>{pet?.especie || '-'} • {pet?.raca || '-'}</Text>
                    <Text style={{ marginTop: 8 }}>Idade: {pet?.idade || '-'}</Text>
                    <Text>Peso: {pet?.peso || '-'}</Text>
                </ProfileCard>

                <View style={{ height: 12 }} />
                <AppButton title="Editar" onPress={() => navigation.navigate('CadastroPet', { id })} />
                <View style={{ height: 8 }} />
                <AppButton title="Excluir" variant="outline" onPress={handleDelete} />
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({ container: { padding: 16 } });
