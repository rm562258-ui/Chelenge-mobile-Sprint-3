import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useEffect, useState } from "react";
import { showToast } from '../utils/toast';

export const UserContext = createContext(null);

const STORAGE_KEY = "@clyvocare_pet_profile_v1";

export const UserProvider = ({ children }) => {
  const initial = {
    petNome: '',
    especie: '',
    raca: '',
    idade: '',
    peso: '',
    tutorNome: '',
    contatoTutor: '',
    clinica: '',
    cuidadoPrincipal: '',
    foto: null,
    lembretesAtivos: true,
    canalPreferido: 'WhatsApp',
  };

  const [user, setProfileState] = useState(initial);

  useEffect(() => {
    (async () => {
      try {
        const raw = await AsyncStorage.getItem(STORAGE_KEY);
        if (raw) {
          setProfileState(JSON.parse(raw));
        }
      } catch {
        showToast("Não foi possível carregar o perfil salvo.", 'error');
      }
    })();
  }, []);

  const setUser = async (newUser) => {
    const merged = { ...initial, ...newUser };
    setProfileState(merged);
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(merged));
    } catch {
      showToast("Não foi possível salvar o perfil.", 'error');
    }
  };

  const clearUser = async () => {
    setProfileState(initial);
    try {
      await AsyncStorage.removeItem(STORAGE_KEY);
    } catch {
      showToast("Não foi possível limpar o perfil.", 'error');
    }
  };

  return (
    <UserContext.Provider value={{ user, setUser, clearUser }}>
      {children}
    </UserContext.Provider>
  );
};
