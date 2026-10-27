import React from 'react';
import { Modal, View, Text, StyleSheet, Pressable, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS, SPACE, RADIUS, TYPO, MOODS } from '../styles/tokens';
import DiaryHeader from './DiaryHeader';
import EntryImage from './EntryImage';

const FRAME_RATIO = 4 / 3; // bentuk bingkai foto. 16 / 9 = lebih pendek

export default function DiaryDetailModal({ visible, onClose, entry, liked = false }) {
  if (!entry) return null;

  const { title, date, body, photo, photoFocus = 'center', mood = 'neutral' } = entry;
  const theme = MOODS[mood] || MOODS.neutral;

  return (
    <Modal visible={visible} animationType="slide" onRequestClose={onClose}>
      <SafeAreaView style={styles.safe} edges={['top', 'left', 'right']}>
        <DiaryHeader />

        <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent}>
          <EntryImage photo={photo} focus={photoFocus} mood={mood} style={styles.hero} />

          <View style={styles.content}>
            <Text style={styles.title}>{title}</Text>
            <View style={styles.metaRow}>
              <Text style={styles.date}>{date}</Text>
              <View style={[styles.badge, { borderColor: theme.border, backgroundColor: theme.bg }]}>
                <Text style={[styles.badgeText, { color: theme.color }]}>{theme.label}</Text>
              </View>
              {liked && <Text style={styles.liked}>❤️ Disukai</Text>}
            </View>
            <Text style={styles.body}>{body}</Text>
            <Pressable
              onPress={onClose}
              style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]}
              accessibilityRole="button"
              accessibilityLabel="Tutup detail entri"
            >
              <Text style={styles.buttonText}>Tutup</Text>
            </Pressable>
          </View>
        </ScrollView>
      </SafeAreaView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: COLORS.surface },
  container: { flex: 1 },
  scrollContent: { paddingBottom: SPACE.xl },
  hero: {
    width: '100%',
    aspectRatio: FRAME_RATIO,
    borderBottomLeftRadius: RADIUS.card,
    borderBottomRightRadius: RADIUS.card,
  },
  content: { padding: SPACE.l, gap: SPACE.s },
  title: { fontSize: TYPO.h2, fontWeight: '700', color: COLORS.text },
  metaRow: { flexDirection: 'row', alignItems: 'center', gap: SPACE.s, marginBottom: SPACE.s },
  date: { fontSize: TYPO.caption, color: COLORS.muted },
  badge: {
    borderWidth: 1,
    borderRadius: RADIUS.card,
    paddingHorizontal: SPACE.s,
    paddingVertical: 1,
  },
  badgeText: { fontSize: TYPO.caption, fontWeight: '700' },
  liked: { fontSize: TYPO.caption, color: COLORS.text },
  body: { fontSize: TYPO.body, color: COLORS.text, lineHeight: 20 },
  button: {
    marginTop: SPACE.l,
    padding: SPACE.m,
    minHeight: 44,
    justifyContent: 'center',
    borderRadius: RADIUS.card,
    backgroundColor: COLORS.accent,
    alignItems: 'center',
  },
  buttonPressed: { opacity: 0.85 },
  buttonText: { color: COLORS.onAccent, fontWeight: '700', fontSize: TYPO.title },
});