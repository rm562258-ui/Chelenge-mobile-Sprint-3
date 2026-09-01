import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useEffect, useState } from "react";

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
      } catch (err) {
        console.warn("Falha ao carregar perfil persistido", err);
      }
    })();
  }, []);

  const setUser = async (newUser) => {
    const merged = { ...initial, ...newUser };
    setProfileState(merged);
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(merged));
    } catch (err) {
      console.warn("Falha ao salvar perfil", err);
    }
  };

  const clearUser = async () => {
    setProfileState(initial);
    try {
      await AsyncStorage.removeItem(STORAGE_KEY);
    } catch (err) {
      console.warn("Falha ao limpar perfil", err);
    }
  };

  return (
    <UserContext.Provider value={{ user, setUser, clearUser }}>
      {children}
    </UserContext.Provider>
  );
};
