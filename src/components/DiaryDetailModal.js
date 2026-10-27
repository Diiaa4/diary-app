import React, { useEffect, useState } from 'react';
import {
  Modal,
  View,
  Text,
  Image,
  StyleSheet,
  Pressable,
  ScrollView,
  useWindowDimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS, SPACE, RADIUS, TYPO, MOODS } from '../styles/tokens';
import DiaryHeader from './DiaryHeader';

const DEFAULT_RATIO = 16 / 9;

export default function DiaryDetailModal({ visible, onClose, entry, liked = false }) {
  const { height } = useWindowDimensions();
  const [ratio, setRatio] = useState(DEFAULT_RATIO);

  useEffect(() => {
    if (!entry) return;
    const src = entry.moodImage;
    const clamp = (w, h) => Math.min(2, Math.max(0.5, w / h));

    if (typeof src === 'number') {
      const a = Image.resolveAssetSource(src);
      setRatio(a?.width && a?.height ? clamp(a.width, a.height) : DEFAULT_RATIO);
    } else if (src?.uri) {
      Image.getSize(
        src.uri,
        (w, h) => setRatio(clamp(w, h)),
        () => setRatio(DEFAULT_RATIO)
      );
    } else {
      setRatio(DEFAULT_RATIO);
    }
  }, [entry]);

  if (!entry) return null;

  const { title, date, body, moodImage, mood = 'neutral' } = entry;
  const theme = MOODS[mood] || MOODS.neutral;

  return (
    <Modal visible={visible} animationType="slide" onRequestClose={onClose}>
      <SafeAreaView style={styles.safe} edges={['top', 'left', 'right']}>
        {/* Header tetap di atas, tidak ikut scroll */}
        <DiaryHeader />

        <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent}>
          <Image
            source={moodImage}
            resizeMode="cover"
            style={[
              styles.hero,
              { aspectRatio: ratio, maxHeight: height * 0.35, backgroundColor: theme.bg },
            ]}
          />
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