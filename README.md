# ClyvoCare Pet

Aplicativo mobile demonstrativo desenvolvido para o Challenge CLYVO VET — solução chamada **ClyvoCare Pet** que ajuda tutores a manterem a continuidade do cuidado dos seus pets (vacinas, retornos, exames e medicações).

## Problema escolhido
Esquecimento e baixa adesão a cuidados preventivos e clínicos de pets, resultando em riscos sanitários e piora de condições crônicas.

## Solução proposta
Um app leve que permite cadastrar o pet, registrar dados do tutor e condição principal, exibir uma agenda de cuidados (mock) e alertas/recomendações simuladas. Fornece preview dinâmico enquanto o tutor digita e persiste os dados localmente com AsyncStorage.

## Tecnologias
- React Native + Expo
- React Navigation (Stack)
- @react-native-async-storage/async-storage

## Como instalar
No diretório do projeto execute:

```bash
npm install
```

## Como executar
Inicie o Metro/Expo:

```bash
npx expo start
```

Abra no emulador Android/iOS ou em dispositivo físico (recomendado para demonstração). A demonstração deve ser feita em emulador ou dispositivo físico — não dependa apenas do Expo Web.

## Rotas / Telas
- `Home` — Tela inicial com resumo e navegação
- `CadastroPet` — Formulário de cadastro do pet (useState, preview dinâmico)
- `PerfilPet` — Exibe dados salvos do pet e tutor
- `AgendaCuidados` — Lista mockada de cuidados preventivos
- `Alertas` — Alertas e recomendações simuladas
- `Equipe` — Tela da equipe do projeto

## Formulário e uso de `useState`
O formulário em `src/screens/pagCadastro.js` usa `useState` para todos os campos (nome do pet, espécie, raça, idade, peso, nome do tutor, contato, clínica, cuidado principal). Enquanto o usuário digita, uma área de pré-visualização atualiza em tempo real mostrando os valores informados.

Há botões para `Salvar` (persiste os dados) e `Limpar` (limpa os campos do formulário). Há também um botão para apagar os dados persistidos.

## Persistência com AsyncStorage
O contexto `src/context/UserContext.js` persiste o perfil usando a chave `@clyvocare_pet_profile_v1`. Ao salvar pelo formulário, os dados são gravados via `AsyncStorage.setItem`. Ao iniciar o app, o contexto carrega automaticamente os dados salvos com `AsyncStorage.getItem` e restaura o estado para uso nas telas.

## Como testar persistência
1. Abra o app no emulador/dispositivo.
2. Vá em `CadastroPet`, preencha o formulário e pressione `Salvar`.
3. Navegue para `PerfilPet` e confirme que os dados aparecem.
4. Pare o app (ou recarregue) e reinicie com `npx expo start` → abrir novamente; o perfil deve ser restaurado automaticamente.
5. Para limpar os dados persistidos, use o botão `Limpar dados` na tela `PerfilPet`.

## Gravar vídeo de demonstração
- Abra o emulador ou dispositivo físico.
- Execute o fluxo: Home → CadastroPet (preenchimento com preview) → Salvar → PerfilPet → Agenda e Alertas.
- Mostre que ao reiniciar o app os dados persistidos são restaurados.
- Recomenda-se gravação em 720p/1080p, narrando as ações e destacando que os dados estão sendo persistidos localmente.

## Observações
- O app não depende de backend — todos os dados são locais ou mockados.
- As telas e textos foram adaptados para o tema saúde pet (tons de verde e azul para destaque).

---
Projeto pronto para envio ao GitHub Classroom.
