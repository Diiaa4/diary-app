import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { COLORS, SPACE, RADIUS, TYPO, MOODS } from '../styles/tokens';
import EntryImage from './EntryImage';

// Presentational component: hanya menerima data & callback lewat props.
// Tombol like TIDAK boleh di dalam Pressable kartu (di web jadi button di dalam button).
// Jadi: kartu = View, berisi dua Pressable bersaudara (sibling).
export default function DiaryCard({
  title,
  date,
  preview,
  photo,
  photoFocus = 'center',
  mood = 'neutral',
  liked = false,
  variant = 'list',
  onPress = () => {},
  onToggleLike = () => {},
}) {
  const theme = MOODS[mood] || MOODS.neutral;
  const isGrid = variant === 'grid';

  return (
    <View style={[styles.card, { borderColor: theme.border, backgroundColor: theme.bg }]}>
      {/* Pressable 1: area kartu, buka modal */}
      <Pressable
        onPress={onPress}
        android_ripple={{ color: COLORS.border }}
        style={({ pressed }) => [
          styles.body,
          isGrid && styles.bodyGrid,
          { opacity: pressed ? 0.85 : 1 },
        ]}
        accessible
        accessibilityRole="button"
        accessibilityLabel={`Entri ${title} tanggal ${date}, suasana ${theme.label}${liked ? ', disukai' : ''}`}
        accessibilityHint="Ketuk untuk membuka detail entri"
      >
        <EntryImage
          photo={photo}
          focus={photoFocus}
          mood={mood}
          style={[styles.mood, isGrid && styles.moodGrid, { borderColor: theme.border }]}
        />
        <View style={styles.content}>
          <Text style={styles.title} numberOfLines={1}>
            {title}
          </Text>
          <View style={styles.metaRow}>
            <Text style={styles.date}>{date}</Text>
            <View style={[styles.badge, { borderColor: theme.border }]}>
              <Text style={[styles.badgeText, { color: theme.color }]}>{theme.label}</Text>
            </View>
          </View>
          <Text style={styles.preview} numberOfLines={3} ellipsizeMode="tail">
            {preview}
          </Text>
        </View>
      </Pressable>

      {/* Pressable 2: tombol like, SIBLING dari Pressable 1, bukan di dalamnya */}
      <Pressable
        onPress={onToggleLike}
        hitSlop={8}
        style={styles.likeBtn}
        accessibilityRole="button"
        accessibilityLabel={liked ? `Batal suka ${title}` : `Suka ${title}`}
      >
        <Text style={styles.like}>{liked ? '❤️' : '🤍'}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    borderRadius: RADIUS.card,
    minHeight: 44,
    overflow: 'hidden',
  },
  body: {
    flexDirection: 'row',
    gap: SPACE.m,
    padding: SPACE.m,
  },
  bodyGrid: { flexDirection: 'column' },
  mood: {
    width: 64,
    height: 64,
    borderRadius: RADIUS.avatar,
    borderWidth: 2,
  },
  moodGrid: {
    width: '100%',
    height: undefined,
    aspectRatio: 16 / 9,
    borderRadius: RADIUS.card,
  },
  content: { flex: 1, paddingRight: 36 }, // ruang untuk tombol like
  title: { fontSize: TYPO.title, fontWeight: '700', color: COLORS.text },
  likeBtn: {
    position: 'absolute',
    top: SPACE.s,
    right: SPACE.s,
    minWidth: 36,
    minHeight: 36,
    alignItems: 'center',
    justifyContent: 'center',
  },
  like: { fontSize: 22 },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACE.s,
    marginBottom: SPACE.s,
  },
  date: { fontSize: TYPO.caption, color: COLORS.muted },
  badge: {
    borderWidth: 1,
    borderRadius: RADIUS.card,
    paddingHorizontal: SPACE.s,
    paddingVertical: 1,
    backgroundColor: COLORS.surface,
  },
  badgeText: { fontSize: TYPO.caption, fontWeight: '700' },
  preview: { fontSize: TYPO.body, color: COLORS.text },
});