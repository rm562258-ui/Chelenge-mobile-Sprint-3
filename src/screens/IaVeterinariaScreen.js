import { useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import HeaderSection from '../../components/HeaderSection';
import ProfileCard from '../../components/ProfileCard';

const FAQ_ITEMS = [
  {
    question: 'Como cadastro um pet?',
    answer: 'Acesse Meus Pets, toque em Novo e informe os dados do seu animal para salvar o cadastro.',
  },
  {
    question: 'Como agendo uma consulta?',
    answer: 'Abra a Agenda de Cuidados, escolha a opção de nova consulta e preencha data, horário e clínica.',
  },
  {
    question: 'Onde vejo as vacinas do meu pet?',
    answer: 'A carteira vacinal fica na área Vacinas. Nela você pode consultar registros e próximos vencimentos.',
  },
  {
    question: 'Como acompanho os medicamentos?',
    answer: 'Na seção Medicamentos você encontra os tratamentos cadastrados, dosagens e frequências.',
  },
  {
    question: 'O aplicativo substitui um veterinário?',
    answer: 'Não. O CLYVO VET ajuda na organização dos cuidados, mas situações de saúde devem ser avaliadas por um profissional.',
  },
];

export default function IaVeterinariaScreen() {
  const [openQuestion, setOpenQuestion] = useState(null);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <HeaderSection title="Perguntas frequentes" subtitle="Encontre respostas rápidas sobre os cuidados do seu pet" />

        <ProfileCard title="Dúvidas frequentes" icon="❔">
          {FAQ_ITEMS.map((item, index) => {
            const isOpen = openQuestion === index;

            return (
              <View key={item.question} style={styles.faqItem}>
                <TouchableOpacity style={styles.questionButton} onPress={() => setOpenQuestion(isOpen ? null : index)} activeOpacity={0.75}>
                  <Text style={styles.question}>{item.question}</Text>
                  <Text style={styles.toggle}>{isOpen ? '−' : '+'}</Text>
                </TouchableOpacity>
                {isOpen ? <Text style={styles.answer}>{item.answer}</Text> : null}
              </View>
            );
          })}
        </ProfileCard>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#F6FEFA' },
  container: { padding: 16, paddingBottom: 32 },
  faqItem: { borderBottomWidth: 1, borderBottomColor: '#E2E8F0', paddingVertical: 4 },
  questionButton: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 12 },
  question: { flex: 1, color: '#0F172A', fontWeight: '700', paddingRight: 12 },
  toggle: { color: '#2563EB', fontSize: 24, fontWeight: '400' },
  answer: { color: '#475569', lineHeight: 21, paddingBottom: 14, paddingRight: 12 },
});
