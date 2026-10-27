import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { COLORS, SPACE, RADIUS, TYPO } from '../styles/tokens';
import avatar from '../../assets/photos/avatar.png';

export default function AppHeader({ title = 'Buku Harian' }) {
  return (
    <View style={styles.row}>
      <Text style={styles.title}>{title}</Text>
      <Image source={avatar} style={styles.avatar} accessibilityLabel="Foto profil pengguna" />
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: SPACE.l,
    paddingVertical: SPACE.m,
    backgroundColor: COLORS.surface,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  title: { fontSize: TYPO.h1, fontWeight: '700', color: COLORS.text },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: RADIUS.avatar,
    borderWidth: 2,
    borderColor: COLORS.accent,
  },
});