import React from 'react';
import { Pressable } from 'react-native';
import { Plus } from 'lucide-react-native';

type FloatingActionButtonProps = {
  onPress?: () => void;
};

export function FloatingActionButton({ onPress }: FloatingActionButtonProps) {
  return (
    <Pressable
      onPress={onPress}
      style={{
        position: 'absolute',
        right: 24,
        bottom: 88,
        width: 62,
        height: 62,
        borderRadius: 31,
        backgroundColor: '#16A34A',
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#16A34A',
        shadowOffset: { width: 0, height: 12 },
        shadowOpacity: 0.24,
        shadowRadius: 18,
        elevation: 6,
      }}
    >
      <Plus size={26} color="#FFFFFF" />
    </Pressable>
  );
}
