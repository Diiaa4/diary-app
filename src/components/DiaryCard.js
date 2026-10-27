import React from 'react';
import { View, Text, Image, StyleSheet, Pressable } from 'react-native';
import { COLORS, SPACE, RADIUS, TYPO, MOODS } from '../styles/tokens';

// Presentational component: hanya menerima data & callback lewat props.
// Tidak ada useState di sini. Status like dimiliki parent.
export default function DiaryCard({
  title,
  date,
  preview,
  moodImage,
  mood = 'neutral',
  liked = false,
  variant = 'list',
  onPress = () => {},
  onToggleLike = () => {},
}) {
  const theme = MOODS[mood] || MOODS.neutral;
  const isGrid = variant === 'grid';

  return (
    <Pressable
      onPress={onPress}
      android_ripple={{ color: COLORS.border }}
      style={({ pressed }) => [{ opacity: pressed ? 0.85 : 1 }]}
      accessible
      accessibilityRole="button"
      accessibilityLabel={`Entri ${title} tanggal ${date}, suasana ${theme.label}${liked ? ', disukai' : ''}`}
      accessibilityHint="Ketuk untuk membuka detail entri"
    >
      <View
        style={[
          styles.card,
          { borderColor: theme.border, backgroundColor: theme.bg },
          isGrid && styles.cardGrid,
        ]}
      >
        <Image
          source={moodImage}
          style={[styles.mood, isGrid && styles.moodGrid, { borderColor: theme.border }]}
        />
        <View style={styles.content}>
          <View style={styles.titleRow}>
            <Text style={styles.title} numberOfLines={1}>
              {title}
            </Text>
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
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    gap: SPACE.m,
    padding: SPACE.m,
    borderWidth: 1,
    borderLeftWidth: 6,
    borderRadius: RADIUS.card,
    minHeight: 44,
  },
  cardGrid: { flexDirection: 'column' },
  mood: {
    width: 64,
    height: 64,
    borderRadius: RADIUS.avatar,
    borderWidth: 2,
    backgroundColor: COLORS.placeholder,
  },
  moodGrid: {
    width: '100%',
    height: undefined,
    aspectRatio: 16 / 9,
    borderRadius: RADIUS.card,
    resizeMode: 'contain',
  },
  content: { flex: 1 },
  titleRow: { flexDirection: 'row', alignItems: 'center', gap: SPACE.s },
  title: { flex: 1, fontSize: TYPO.title, fontWeight: '700', color: COLORS.text },
  likeBtn: { minWidth: 32, minHeight: 32, alignItems: 'center', justifyContent: 'center' },
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
