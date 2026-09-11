import { useContext } from "react";
import {
  Alert,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import AppButton from '../../components/AppButton';
import ProfileCard from '../../components/ProfileCard';
import { UserContext } from "../context/UserContext";


export default function PagPerfil({ navigation }) {
  const { user, clearUser } = useContext(UserContext);

  const handleClear = async () => {
    Alert.alert('Confirmar', 'Deseja limpar os dados salvos do pet?', [
      { text: 'Cancelar', style: 'cancel' },
      { text: 'OK', onPress: async () => { if (clearUser) await clearUser(); } }
    ]);
  };

  const empty = !user || !user.petNome;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#F6FEFA' }}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.headerBlock}>
          <View style={styles.headerColor} />
          <View style={styles.avatarWrap}>
            {user?.foto ? (
              <Image source={{ uri: user.foto }} style={styles.avatar} />
            ) : (
              <View style={styles.placeholder}>
                <Text>Sem foto</Text>
              </View>
            )}
          </View>
        </View>

        <View style={styles.mainContent}>
          <Text style={styles.name}>{user?.petNome || 'Nenhum pet cadastrado'}</Text>
          <View style={{ height: 8 }} />

          {empty ? (
            <ProfileCard title="Sem cadastro" icon="ℹ️">
              <Text>Não há perfil de pet salvo. Vá para Cadastro para registrar um pet.</Text>
              <View style={{ height: 8 }} />
              <AppButton title="Cadastrar Pet" onPress={() => navigation.navigate('CadastroPet')} />
            </ProfileCard>
          ) : (
            <>
              <ProfileCard title="Dados do Pet" icon="🐾">
                <Text style={{ color: '#0F172A', fontWeight: '600' }}>{user.petNome}</Text>
                <Text style={{ color: '#475569', marginTop: 4 }}>{user.especie} • {user.raca}</Text>
                <Text style={{ color: '#475569', marginTop: 4 }}>Idade: {user.idade || '-'} • Peso: {user.peso || '-'}</Text>
              </ProfileCard>

              <ProfileCard title="Tutor Responsável" icon="👤">
                <Text style={{ color: '#0F172A', fontWeight: '600' }}>{user.tutorNome}</Text>
                <Text style={{ color: '#475569', marginTop: 4 }}>Contato: {user.contatoTutor || '-'}</Text>
              </ProfileCard>

              <ProfileCard title="Clínica de Referência" icon="🏥">
                <Text style={{ color: '#0F172A', fontWeight: '600' }}>{user.clinica || '-'}</Text>
              </ProfileCard>

              <ProfileCard title="Cuidado Principal" icon="⚕️">
                <Text style={{ color: '#0F172A', fontWeight: '600' }}>{user.cuidadoPrincipal || '-'}</Text>
                <Text style={{ color: '#475569', marginTop: 6 }}>{user.lembretesAtivos ? 'Lembretes ativos' : 'Lembretes desativados'}</Text>
              </ProfileCard>

              <View style={{ height: 8 }} />
              <AppButton title="Agenda de Cuidados" onPress={() => navigation.navigate('AgendaCuidados')} variant="outline" style={{ marginBottom: 12 }} icon="📅" />
              <AppButton title="Alertas e Recomendações" onPress={() => navigation.navigate('Alertas')} variant="outline" style={{ marginBottom: 12 }} icon="⚠️" />
              <AppButton title="Histórico de notificações" onPress={() => navigation.navigate('HistoricoNotificacoes')} variant="outline" style={{ marginBottom: 12 }} icon="🔔" />
              <AppButton title="Configurações" onPress={() => navigation.navigate('Configuracoes')} variant="outline" style={{ marginBottom: 12 }} icon="⚙️" />
              <AppButton title="Limpar dados" onPress={handleClear} variant="outline" icon="🗑️" />
            </>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 0 },
  headerBlock: { height: 200, position: 'relative' },
  headerColor: { backgroundColor: '#10B981', height: '100%' },
  avatarWrap: { position: 'absolute', left: 0, right: 0, top: 120, alignItems: 'center' },
  avatar: { width: 140, height: 140, borderRadius: 70, borderWidth: 6, borderColor: '#fff' },
  placeholder: { width: 140, height: 140, borderRadius: 70, backgroundColor: '#f1f5f9', alignItems: 'center', justifyContent: 'center' },
  mainContent: { padding: 16, marginTop: 36 },
  name: { fontSize: 20, fontWeight: '800', color: '#0F172A', textAlign: 'center' },
});
