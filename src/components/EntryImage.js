import React, { useEffect, useState } from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { MOODS } from '../styles/tokens';
import { MOOD_IMAGES } from '../data/moodImages';

// Titik fokus: x/y 0..1. (0,0) = pojok kiri atas, (1,1) = pojok kanan bawah.
// Bagian yang DIPOTONG adalah sisi yang berlawanan dengan fokus.
const FOCUS = {
  center: { x: 0.5, y: 0.5 },
  top: { x: 0.5, y: 0 },        // atas terlihat, bawah terpotong
  bottom: { x: 0.5, y: 1 },     // bawah terlihat, atas terpotong
  left: { x: 0, y: 0.5 },
  right: { x: 1, y: 0.5 },
  topLeft: { x: 0, y: 0 },
  topRight: { x: 1, y: 0 },
  bottomLeft: { x: 0, y: 1 },
  bottomRight: { x: 1, y: 1 },
};

const clamp01 = (n) => Math.min(1, Math.max(0, n));

function resolveFocus(focus) {
  if (typeof focus === 'string') return FOCUS[focus] || FOCUS.center;
  if (focus && typeof focus === 'object') {
    return { x: clamp01(focus.x ?? 0.5), y: clamp01(focus.y ?? 0.5) };
  }
  return FOCUS.center;
}

// Ukuran asli gambar (lokal via require, atau remote/galeri via uri).
function useImageSize(source) {
  const [state, setState] = useState({ size: null, failed: false });
  const key = typeof source === 'number' ? source : source?.uri;

  useEffect(() => {
    let alive = true;
    if (!source) {
      setState({ size: null, failed: false });
      return undefined;
    }
    if (typeof source === 'number') {
      const a = Image.resolveAssetSource(source);
      setState(
        a?.width && a?.height
          ? { size: { w: a.width, h: a.height }, failed: false }
          : { size: null, failed: true }
      );
    } else if (source.uri) {
      Image.getSize(
        source.uri,
        (w, h) => alive && setState({ size: { w, h }, failed: false }),
        () => alive && setState({ size: null, failed: true })
      );
    }
    return () => {
      alive = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  return state;
}

export default function EntryImage({
  photo,               // require(...) atau { uri }. Kosong = gambar mood (contain)
  focus = 'center',    // 'top' | 'bottom' | 'left' | 'right' | 'center' | sudut | { x, y }
  mood = 'neutral',
  style,               // tentukan ukuran & bentuk dari luar
}) {
  const theme = MOODS[mood] || MOODS.neutral;
  const { size, failed } = useImageSize(photo);
  const [box, setBox] = useState(null);

  const onLayout = (e) => {
    const { width, height } = e.nativeEvent.layout;
    setBox((prev) => (prev && prev.w === width && prev.h === height ? prev : { w: width, h: height }));
  };

  const showPhoto = !!photo && !failed;

  // MODE FOTO: cover + posisi sesuai fokus
  let photoStyle = null;
  if (showPhoto && size && box && box.w > 0 && box.h > 0) {
    const scale = Math.max(box.w / size.w, box.h / size.h); // cover
    const w = size.w * scale;
    const h = size.h * scale;
    const f = resolveFocus(focus);
    photoStyle = {
      position: 'absolute',
      width: w,
      height: h,
      left: -(w - box.w) * f.x,
      top: -(h - box.h) * f.y,
    };
  }

  return (
    <View onLayout={onLayout} style={[styles.box, { backgroundColor: theme.bg }, style]}>
      {showPhoto ? (
        photoStyle && <Image source={photo} style={photoStyle} resizeMode="cover" />
      ) : (
        // MODE TANPA FOTO: gambar mood dari assets/moods, tampil utuh
        <Image
          source={MOOD_IMAGES[mood] || MOOD_IMAGES.neutral}
          style={styles.fill}
          resizeMode="contain"
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  box: {
    overflow: 'hidden', // bagian foto yang keluar kotak terpotong
    alignItems: 'center',
    justifyContent: 'center',
  },
  fill: { width: '100%', height: '100%' },
});