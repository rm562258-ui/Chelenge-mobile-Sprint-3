import { useState } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import AppButton from '../../components/AppButton';
import AppInput from '../../components/AppInput';
import HeaderSection from '../../components/HeaderSection';
import ProfileCard from '../../components/ProfileCard';
import { useAiRecommendation } from '../hooks/useAiRecommendation';
import { useAI } from '../hooks/useAiRecommendation';
import { showToast } from '../utils/toast';

const QUICK_QUESTIONS = [
  'Quais sinais indicam que meu pet precisa de um veterinário?',
  'Como manter a carteira vacinal do meu pet em dia?',
  'Quais cuidados ajudam na prevenção de pulgas e carrapatos?',
];

const getRecommendationText = (data) => {
  if (typeof data === 'string') return data;
  return data?.recommendation || data?.answer || data?.response || data?.message || 'A recomendação foi recebida, mas não possui texto para exibição.';
};

export default function IaVeterinariaScreen() {
  const [question, setQuestion] = useState('');
  const [messages, setMessages] = useState([]);
  const [lastQuestion, setLastQuestion] = useState('');
  const recommendationMutation = useAiRecommendation();
  const { data: history = [], isLoading: isHistoryLoading, isError: isHistoryError, refetch: refetchHistory } = useAI();

  const askQuestion = async (value = question) => {
    const normalizedQuestion = value.trim();
    if (!normalizedQuestion || recommendationMutation.isPending) return;

    setLastQuestion(normalizedQuestion);
    setQuestion('');
    setMessages((current) => [...current, { role: 'user', text: normalizedQuestion }]);

    try {
      const data = await recommendationMutation.mutateAsync({ question: normalizedQuestion, createdAt: new Date().toISOString() });
      const answer = getRecommendationText(data);
      setMessages((current) => [...current, { role: 'assistant', text: answer }]);
    } catch {
      showToast('Não foi possível consultar a IA veterinária.', 'error');
    }
  };

  const showHistoryEntry = (entry) => {
    setMessages([
      { role: 'user', text: entry.question },
      { role: 'assistant', text: entry.answer },
    ]);
    setLastQuestion(entry.question);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView style={styles.flex} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
          <HeaderSection title="IA Veterinária" subtitle="Orientações preparadas para conversar com um profissional" />

          <ProfileCard title="Perguntas rápidas" icon="💡">
            <View style={styles.quickQuestions}>
              {QUICK_QUESTIONS.map((item) => (
                <AppButton key={item} title={item} variant="outline" onPress={() => askQuestion(item)} disabled={recommendationMutation.isPending} style={styles.quickButton} />
              ))}
            </View>
          </ProfileCard>

          <ProfileCard title="Conversa" icon="💬">
            {messages.length === 0 ? <Text style={styles.emptyText}>Envie uma pergunta para começar.</Text> : null}
            {messages.map((message, index) => (
              <View key={`${message.role}-${index}`} style={[styles.message, message.role === 'user' ? styles.userMessage : styles.assistantMessage]}>
                <Text style={styles.messageLabel}>{message.role === 'user' ? 'Você' : 'IA Veterinária'}</Text>
                <Text style={styles.messageText}>{message.text}</Text>
              </View>
            ))}
            {recommendationMutation.isPending ? <Text style={styles.loadingText}>Consultando orientação...</Text> : null}
            {recommendationMutation.isError ? (
              <View style={styles.errorBox}>
                <Text style={styles.errorText}>Não foi possível consultar a IA agora.</Text>
                <AppButton title="Tentar novamente" variant="outline" onPress={() => askQuestion(lastQuestion)} />
              </View>
            ) : null}
          </ProfileCard>

          <AppInput label="Pergunte para a IA" value={question} onChangeText={setQuestion} placeholder="Descreva sua dúvida sobre seu pet" />
          <AppButton title="Enviar pergunta" onPress={() => askQuestion()} loading={recommendationMutation.isPending} disabled={!question.trim()} icon="➤" />

          <ProfileCard title="Histórico" icon="🕘">
            {isHistoryLoading ? <Text style={styles.loadingText}>Carregando histórico...</Text> : null}
            {isHistoryError ? <AppButton title="Tentar novamente" variant="outline" onPress={refetchHistory} /> : null}
            {!isHistoryLoading && !isHistoryError && history.length === 0 ? <Text style={styles.emptyText}>Suas perguntas respondidas aparecerão aqui.</Text> : null}
            {history.map((entry, index) => (
              <AppButton key={`${entry.createdAt}-${index}`} title={entry.question} variant="outline" onPress={() => showHistoryEntry(entry)} style={styles.historyButton} />
            ))}
          </ProfileCard>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#F6FEFA' },
  flex: { flex: 1 },
  container: { padding: 16, paddingBottom: 32 },
  quickQuestions: { gap: 8 },
  quickButton: { alignItems: 'flex-start' },
  message: { borderRadius: 14, padding: 12, marginBottom: 10 },
  userMessage: { backgroundColor: '#DBEAFE', alignSelf: 'flex-end', width: '90%' },
  assistantMessage: { backgroundColor: '#ECFDF5', alignSelf: 'flex-start', width: '95%' },
  messageLabel: { color: '#475569', fontSize: 12, fontWeight: '700', marginBottom: 4 },
  messageText: { color: '#0F172A', lineHeight: 21 },
  emptyText: { color: '#64748B', marginBottom: 8 },
  loadingText: { color: '#2563EB', fontWeight: '600', marginTop: 4 },
  errorBox: { backgroundColor: '#FEF2F2', borderRadius: 12, padding: 12, gap: 8 },
  errorText: { color: '#B91C1C', marginBottom: 4 },
  historyButton: { alignItems: 'flex-start', marginBottom: 8 },
});
