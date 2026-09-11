import React from 'react';
import { Text, TextInput, TextInputProps, View } from 'react-native';

type InputProps = TextInputProps & {
  label?: string;
  error?: string;
};

export function Input({ label, error, ...props }: InputProps) {
  return (
    <View style={{ gap: 8 }}>
      {label ? (
        <Text style={{ color: '#0F172A', fontSize: 14, fontWeight: '600' }}>{label}</Text>
      ) : null}
      <TextInput
        {...props}
        placeholderTextColor="#94A3B8"
        style={{
          borderWidth: 1,
          borderColor: error ? '#EF4444' : '#E2E8F0',
          backgroundColor: '#FFFFFF',
          borderRadius: 12,
          paddingHorizontal: 14,
          paddingVertical: 12,
          fontSize: 16,
          color: '#0F172A',
        }}
      />
      {error ? <Text style={{ color: '#EF4444', fontSize: 12 }}>{error}</Text> : null}
    </View>
  );
}
