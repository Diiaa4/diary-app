// src/styles/tokens.js
export const COLORS = {
  surface: '#FFFFFF',
  border: '#E5E7EB',
  text: '#111827',
  muted: '#6B7280',
  accent: '#2563EB',
  placeholder: '#EEF2FF',
  onAccent: '#FFFFFF',
};

export const SPACE = { xs: 4, s: 8, m: 12, l: 16, xl: 24 };
export const RADIUS = { card: 12, avatar: 32 };
export const TYPO = { h1: 24, h2: 20, title: 16, body: 14, caption: 12 };
export const BREAKPOINTS = { tablet: 600 }; // px

// Tema kartu per mood (tantangan opsional: badge + warna border berbeda).
export const MOODS = {
  happy: { label: 'Senang', color: '#B45309', border: '#F59E0B', bg: '#FFFBEB' },
  focus: { label: 'Fokus', color: '#1D4ED8', border: '#2563EB', bg: '#EFF6FF' },
  calm: { label: 'Tenang', color: '#047857', border: '#10B981', bg: '#ECFDF5' },
  sad: { label: 'Sedih', color: '#4338CA', border: '#6366F1', bg: '#EEF2FF' },
  excited: { label: 'Semangat', color: '#BE185D', border: '#EC4899', bg: '#FDF2F8' },
  neutral: { label: 'Netral', color: '#374151', border: '#E5E7EB', bg: '#FFFFFF' },
};
