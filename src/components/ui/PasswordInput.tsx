import React, { useState } from 'react';
import { Pressable, Text, TextInput, View } from 'react-native';
import { Eye, EyeOff } from 'lucide-react-native';

type PasswordInputProps = {
  label?: string;
  value: string;
  onChangeText: (text: string) => void;
  onBlur?: () => void;
  placeholder?: string;
  error?: string;
};

export function PasswordInput({ label, value, onChangeText, onBlur, placeholder, error }: PasswordInputProps) {
  const [show, setShow] = useState(false);

  return (
    <View style={{ gap: 8 }}>
      {label ? (
        <Text style={{ color: '#0F172A', fontSize: 14, fontWeight: '600' }}>{label}</Text>
      ) : null}
      <View
        style={{
          borderWidth: 1,
          borderColor: error ? '#EF4444' : '#E2E8F0',
          backgroundColor: '#FFFFFF',
          borderRadius: 12,
          flexDirection: 'row',
          alignItems: 'center',
          paddingHorizontal: 12,
        }}
      >
        <TextInput
          value={value}
          onChangeText={onChangeText}
          onBlur={onBlur}
          placeholder={placeholder}
          placeholderTextColor="#94A3B8"
          secureTextEntry={!show}
          style={{ flex: 1, paddingVertical: 12, fontSize: 16, color: '#0F172A' }}
        />
        <Pressable onPress={() => setShow((current) => !current)} style={{ padding: 8 }}>
          {show ? <EyeOff size={18} color="#334155" /> : <Eye size={18} color="#334155" />}
        </Pressable>
      </View>
      {error ? <Text style={{ color: '#EF4444', fontSize: 12 }}>{error}</Text> : null}
    </View>
  );
}
