import React, { useMemo, useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  FlatList,
  Pressable,
  useWindowDimensions,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
} from 'react-native';
import { COLORS, SPACE, RADIUS, TYPO, BREAKPOINTS } from '../styles/tokens';
import { MOOD_IMAGES } from '../data/moodImages';
import DiaryHeader from '../components/DiaryHeader';
import DiaryCard from '../components/DiaryCard';
import DiaryDetailModal from '../components/DiaryDetailModal';
import SearchBar from '../components/SearchBar';
import EntryForm from '../components/EntryForm';

const INITIAL_ENTRIES = [
  {
    id: 1,
    title: 'Pagi yang Tenang',
    date: '2026-10-18',
    mood: 'sad',
    preview: 'Jalan pagi 20 menit dan menikmati udara segar.',
    body: 'Hari ini aku bangun lebih pagi dan berjalan kaki selama 20 menit keliling kompleks. Udara terasa sejuk, jalanan masih sepi, dan kepala terasa ringan.',
  },
  {
    id: 2,
    title: 'Produktif di Kampus',
    date: '2026-10-17',
    mood: 'focus',
    preview: 'Menyelesaikan modul praktikum dan berdiskusi dengan tim.',
    body: 'Hari ini cukup produktif karena beberapa target perkuliahan selesai. Diskusi dengan tim membantu merapikan struktur folder dan pembagian komponen.',
    photoUri: 'https://picsum.photos/seed/calm/80',
  },
  {
    id: 3,
    title: 'Senja di Pantai',
    date: '2026-10-16',
    mood: 'happy',
    preview: 'Sore ini, cukup bernapas.',
    body: 'Hari ini perasaanku bercampur antara kebahagiaan dan rasa sedih. Karena matahari melihatkan sisi indahnya sebelum dia pergi menghilang dan hanya menyisakan kenangan....',
    photo: require('../../assets/photos/sunset.jpg'),
  },
  {
    id: 4,
    title: 'Air Terjun',
    date: '2026-10-15',
    mood: 'calm',
    preview: 'Sejenak hilang dari bisingnya dunia.',
    body: 'Air tak pernah bertanya seberapa tinggi ia harus jatuh, atau seberapa jauh ia harus berjalan. Ia hanya terus mengalir, mengajarkan bahwa hidup tak selalu tentang tujuan, tetapi juga tentang keberanian menjalani perjalanan.',
    photo: require('../../assets/photos/terjun.png')
  },
  {
    id: 5,
    title: 'Mendaki Gunung',
    date: '2026-10-14',
    mood: 'excited',
    preview: 'Menepi sejenak, mengenali diri lebih dekat.',
    body: 'Gunung tidak meninggikan dirinya untuk terlihat agung, ia hanya berdiri sebagaimana mestinya. Barangkali manusia juga perlu belajar demikian, tidak sibuk membuktikan diri kepada dunia, tetapi tetap memiliki nilai meski tak selalu mendapat pengakuan.',
    photo: require('../../assets/photos/gunung.png'),
    photoFocus: 'bottom',
  },
  {
    id: 6,
    title: 'Belajar FlatList',
    date: '2026-10-13',
    mood: 'focus',
    preview: 'Mencoba FlatList dua kolom dan key saat numColumns berubah.',
    body: 'Hari ini mencoba FlatList dengan dua kolom. Properti key perlu diganti ketika numColumns berubah. Setelah dicoba dengan rotasi layar, hasilnya rapi.',
  },
  {
    id: 7,
    title: 'Makan Malam Keluarga',
    date: '2026-10-12',
    mood: 'neutral',
    preview: 'Seluruh keluarga berkumpul, masakan ibu selalu terbaik.',
    body: 'Malam ini seluruh keluarga berkumpul di meja makan. Kami bercerita soal kuliah, pekerjaan, dan rencana liburan. Hal sederhana yang membuat hati hangat.',
  },
];

export default function DiaryListScreen() {
  const { width } = useWindowDimensions();
  const twoCols = width >= BREAKPOINTS.tablet;
  const keyForCols = twoCols ? 'grid2' : 'list1';

  // STATE UTAMA (single source of truth)
  const [entries, setEntries] = useState(INITIAL_ENTRIES);
  const [query, setQuery] = useState('');
  const [likedIds, setLikedIds] = useState(new Set());
  const [selected, setSelected] = useState(null);
  const [showForm, setShowForm] = useState(false);

  // DERIVED STATE: dihitung dari entries + query, tidak disimpan sebagai state.
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return entries;
    return entries.filter(
      (entry) =>
        entry.title.toLowerCase().includes(q) ||
        entry.preview.toLowerCase().includes(q) ||
        entry.date.toLowerCase().includes(q)
    );
  }, [entries, query]);

  const toggleLike = (id) => {
    setLikedIds((prev) => {
      const next = new Set(prev); // Set baru, bukan mutasi Set lama
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const addEntry = (newEntry) => {
    setEntries((prev) => [newEntry, ...prev]);
    setShowForm(false);
  };

  const renderItem = ({ item }) => (
    <View style={[styles.itemWrap, twoCols && styles.itemWrap2]}>
      <DiaryCard
        title={item.title}
        date={item.date}
        preview={item.preview}
        photo={item.photo}
        photoFocus={item.photoFocus}
        mood={item.mood}
        liked={likedIds.has(item.id)}
        variant={twoCols ? 'grid' : 'list'}
        onToggleLike={() => toggleLike(item.id)}
        onPress={() => setSelected(item)}
      />
    </View>
  );

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <DiaryHeader />

      <SearchBar onChange={setQuery} />

      <View style={styles.toolbar}>
        <Text style={styles.count}>
          {filtered.length} entri • {likedIds.size} disukai
        </Text>
        <Pressable
          onPress={() => setShowForm((v) => !v)}
          style={styles.toggleBtn}
          accessibilityRole="button"
          accessibilityLabel={showForm ? 'Sembunyikan form tambah entri' : 'Tampilkan form tambah entri'}
        >
          <Text style={styles.toggleText}>{showForm ? 'Tutup Form' : '+ Tambah Entri'}</Text>
        </Pressable>
      </View>

      {showForm && (
        <ScrollView style={styles.formWrap} keyboardShouldPersistTaps="handled">
          <EntryForm onSubmit={addEntry} />
        </ScrollView>
      )}

      <FlatList
        key={keyForCols}
        data={filtered}
        numColumns={twoCols ? 2 : 1}
        keyExtractor={(item) => String(item.id)}
        renderItem={renderItem}
        extraData={likedIds}
        keyboardShouldPersistTaps="handled"
        columnWrapperStyle={twoCols ? { gap: SPACE.m } : undefined}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <View style={styles.emptyBox}>
            <Text style={styles.emptyTitle}>
              {query.trim() ? 'Tidak ada hasil' : 'Belum ada entri'}
            </Text>
            <Text style={styles.empty}>
              {query.trim()
                ? `Tidak ada entri yang cocok dengan "${query.trim()}".`
                : 'Tekan "+ Tambah Entri" untuk menulis entri pertama.'}
            </Text>
          </View>
        }
      />

      <DiaryDetailModal
        visible={!!selected}
        entry={selected}
        liked={selected ? likedIds.has(selected.id) : false}
        onClose={() => setSelected(null)}
      />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.surface },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: SPACE.l,
    paddingTop: SPACE.l,
  },
  header: { fontSize: TYPO.h1, fontWeight: '700', color: COLORS.text },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: RADIUS.avatar,
    borderWidth: 2,
    borderColor: COLORS.accent,
  },
  toolbar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: SPACE.l,
  },
  count: { fontSize: TYPO.caption, color: COLORS.muted },
  toggleBtn: {
    minHeight: 44,
    justifyContent: 'center',
    paddingHorizontal: SPACE.m,
  },
  toggleText: { color: COLORS.accent, fontWeight: '700', fontSize: TYPO.body },
  formWrap: {
    maxHeight: 420,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: COLORS.border,
  },
  listContent: {
    padding: SPACE.l,
    gap: SPACE.m,
    paddingTop: SPACE.m,
  },
  itemWrap: { flex: 1 },
  itemWrap2: { flex: 1 / 2 },
  emptyBox: { alignItems: 'center', marginTop: 40, gap: SPACE.s },
  emptyTitle: { fontSize: TYPO.title, fontWeight: '700', color: COLORS.text },
  empty: { textAlign: 'center', color: COLORS.muted },
});
