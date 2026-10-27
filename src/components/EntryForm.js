import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Pressable, Text, Image } from 'react-native';
import { COLORS, SPACE, RADIUS, TYPO, MOODS } from '../styles/tokens';
import * as ImagePicker from 'expo-image-picker';

const MOOD_OPTIONS = ['happy', 'focus', 'calm', 'sad', 'excited'];
const DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/;

const todayISO = () => new Date().toISOString().slice(0, 10);

// Form terkontrol: setiap input punya state lokal.
// Saat Simpan ditekan, data dikirim ke parent lewat onSubmit, lalu form di-reset.
export default function EntryForm({ onSubmit }) {
  const [title, setTitle] = useState('');
  const [date, setDate] = useState(todayISO());
  const [preview, setPreview] = useState('');
  const [mood, setMood] = useState('neutral');
  const [photoUri, setPhotoUri] = useState(null);

  const dateValid = DATE_PATTERN.test(date.trim());
  const canSubmit = title.trim().length > 0 && preview.trim().length > 0 && dateValid;

  const pickPhoto = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      quality: 0.7,
    });
    if (!result.canceled) setPhotoUri(result.assets[0].uri);
  };

  const submit = () => {
    if (!canSubmit) return;
    onSubmit?.({
      id: Date.now(),
      title: title.trim(),
      date: date.trim(),
      preview: preview.trim(),
      body: preview.trim(),
      mood,
      photo: photoUri ? { uri: photoUri } : MOOD_IMAGES[mood],
      photoFocus: 'center',
    });
    setTitle('');
    setDate(todayISO());
    setPreview('');
    setMood('neutral');
    setPhotoUri(null);
  };

  return (
    <View style={styles.form}>
      <Text style={styles.heading}>Tambah Entri</Text>
      <TextInput
        value={title}
        onChangeText={setTitle}
        placeholder="Judul"
        placeholderTextColor={COLORS.muted}
        style={styles.input}
        accessibilityLabel="Judul entri"
      />
      <TextInput
        value={date}
        onChangeText={setDate}
        placeholder="YYYY-MM-DD"
        placeholderTextColor={COLORS.muted}
        style={[styles.input, !dateValid && styles.inputError]}
        accessibilityLabel="Tanggal entri"
      />
      {!dateValid && <Text style={styles.error}>Format tanggal: YYYY-MM-DD</Text>}
      <TextInput
        value={preview}
        onChangeText={setPreview}
        placeholder="Ringkasan..."
        placeholderTextColor={COLORS.muted}
        style={[styles.input, styles.multiline]}
        accessibilityLabel="Ringkasan entri"
        multiline
      />

      <Text style={styles.label}>Mood</Text>
      <View style={styles.moodRow}>
        {MOOD_OPTIONS.map((key) => {
          const m = MOODS[key];
          const active = mood === key;
          return (
            <Pressable
              key={key}
              onPress={() => setMood(key)}
              accessibilityRole="button"
              accessibilityState={{ selected: active }}
              accessibilityLabel={`Mood ${m.label}`}
              style={[
                styles.chip,
                { borderColor: m.border },
                active && { backgroundColor: m.bg, borderWidth: 2 },
              ]}
            >
              <Text style={[styles.chipText, { color: m.color }]}>{m.label}</Text>
            </Pressable>
          );
        })}
      </View>

      <Pressable
        onPress={pickPhoto}
        accessibilityRole="button"
        accessibilityLabel="Pilih foto dari galeri"
        style={styles.photoBtn}
      >
        <Text style={styles.photoBtnText}>
          {photoUri ? 'Ganti Foto' : '+ Pilih Foto'}
        </Text>
        {photoUri && <Image source={{ uri: photoUri }} style={styles.preview} />}
      </Pressable>

      <Pressable
        onPress={submit}
        disabled={!canSubmit}
        accessibilityRole="button"
        accessibilityLabel="Simpan entri"
        style={[styles.button, !canSubmit && styles.buttonDisabled]}
      >
        <Text style={styles.buttonText}>Simpan</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  form: { padding: SPACE.l, gap: SPACE.s },
  heading: {
    fontSize: TYPO.title,
    fontWeight: '700',
    color: COLORS.text,
    marginBottom: SPACE.s,
  },
  input: {
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: RADIUS.card,
    paddingHorizontal: SPACE.m,
    paddingVertical: 10,
    minHeight: 44,
    color: COLORS.text,
    backgroundColor: COLORS.surface,
  },
  inputError: { borderColor: '#DC2626' },
  error: { fontSize: TYPO.caption, color: '#B91C1C' },
  multiline: { minHeight: 80, textAlignVertical: 'top' },
  label: { fontSize: TYPO.caption, color: COLORS.muted, fontWeight: '700' },
  moodRow: { flexDirection: 'row', flexWrap: 'wrap', gap: SPACE.s },
  chip: {
    borderWidth: 1,
    borderRadius: RADIUS.card,
    paddingHorizontal: SPACE.m,
    paddingVertical: SPACE.s,
    minHeight: 36,
    justifyContent: 'center',
    backgroundColor: COLORS.surface,
  },
  chipText: { fontSize: TYPO.body, fontWeight: '700' },
  button: {
    marginTop: SPACE.s,
    padding: SPACE.m,
    minHeight: 44,
    justifyContent: 'center',
    borderRadius: RADIUS.card,
    backgroundColor: COLORS.accent,
    alignItems: 'center',
  },
  photoBtn: {
    marginTop: SPACE.m,
    padding: SPACE.m,
    minHeight: 44,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.accent,
    borderRadius: RADIUS.card,
  },
  photoBtnText: { color: COLORS.accent, fontWeight: '700' },
  preview: { width: '70%', aspectRatio: 16 / 9, borderRadius: RADIUS.card },
  buttonDisabled: { opacity: 0.5 },
  buttonText: { color: COLORS.onAccent, fontWeight: '700', fontSize: TYPO.title },
});
