# Diary App - Praktikum 2

- Nama    : Aldiana Putra
- Nim     : 2330511001
- Mata kuliah: Mobile Programming, Universitas Muhammadiyah Sukabumi
- Github  : [Repository](https://github.com/Diiaa4/diary-app)

## Cara menjalankan

1. Buka proyek `diary-app`,
2. Buka diterminal / cmd,
3. Ketikan `npx expo --version` setelah dijalankan ketik `y` maka akan menginstall package yang diperlukan.
4. lanjut ketikan `npx expo install react-native-safe-area-context` untuk install Library yang akan digunakan.
5. ketik `npx expo start` untuk menjalankan server.

# Praktikum 2
## Fitur yang diselesaikan

- Halaman Buku Harian dengan 5 entri (minimal 5 sesuai tugas).
- Komponen reusable `DiaryCard` di `src/components`.
- Satu gambar mood memakai gambar lokal (`assets/moods/happy.png`), sisanya gambar remote.
- Avatar pengguna pada header (`assets/avatar.png`).
- Variasi tampilan kartu berdasarkan mood (warna border, warna latar, ketebalan border) lewat `src/styles/moodTheme.js`.
- Layout memakai View, Text, Image, ScrollView, StyleSheet, dan Flexbox.

# Praktikum 3
## Fitur yang diselesaikan

- Design tokens (`src/styles/tokens.js`): warna, spacing, radius, tipografi, breakpoint, dan tema mood. Seluruh komponen memakai token, tanpa angka atau warna yang ditulis langsung.
- `DiaryCard` memakai `Pressable`, `accessibilityLabel`, `accessibilityRole`, `accessibilityHint`, dan prop `variant` (`list` atau `grid`).
- `DiaryDetailModal`: hero image dengan `aspectRatio: 16 / 9`, isi entri, dan tombol Tutup. Tombol back Android juga menutup modal.
- `DiaryListScreen` berbasis `FlatList` responsif: 1 kolom di ponsel, 2 kolom saat lebar >= 600 px.
- 7 entri diary (lebih dari 2 entri baru dari modul).
- Tantangan opsional: badge mood berwarna, empty state informatif.
- Dari Pertemuan 2 tetap dipertahankan: gambar mood lokal, avatar di header, variasi warna kartu per mood.

# Praktikum 4
## Fitur yang diselesaikan

- Pencarian: `SearchBar` memfilter daftar berdasarkan judul, ringkasan, atau tanggal.
- Like: ikon hati pada kartu mengubah status suka tanpa reload. Jumlah entri dan jumlah suka tampil di atas daftar.
- Detail: kartu yang ditekan membuka `DiaryDetailModal`.
- Tambah entri: `EntryForm` (form terkontrol) menambah entri baru di posisi teratas. Memilih gambar dilocal untuk entri yang baru dibuat, Mood dipilih lewat tombol pilihan. 
- Header: Didalam detail entri, Header tetap ada seperti diawal.

Form ditampilkan lewat tombol "+ Tambah Entri" agar daftar tetap punya ruang di layar kecil. Setelah Simpan, form menutup sendiri.

## Penjelasan props dan state

### Props
Props adalah data atau fungsi yang dikirim dari parent ke child. Child hanya membaca props dan tidak mengubahnya.

`DiaryCard` adalah presentational component. Ia menerima `title`, `date`, `preview`, `moodImage`, `mood`, `liked` (data) serta `onPress` dan `onToggleLike` (callback). `DiaryCard` tidak punya `useState`. Status suka dimiliki parent.

### State
State adalah data yang boleh berubah dan memicu render ulang saat setter dipanggil.

| State / nilai | Lokasi | Jenis | Fungsi |
|---|---|---|---|
| `entries` | `DiaryListScreen` | state utama | Seluruh data diary |
| `query` | `DiaryListScreen` | state utama | Kata kunci dari `SearchBar` |
| `likedIds` | `DiaryListScreen` | state utama | ID entri yang disukai (`Set`) |
| `selected` | `DiaryListScreen` | state utama | Entri yang sedang dibuka di modal |
| `showForm` | `DiaryListScreen` | state utama | Tampil atau sembunyi form |
| `filtered` | `DiaryListScreen` | derived state | Hasil `entries` difilter `query`, dihitung `useMemo` |
| `queryText` | `SearchBar` | local state | Isi input pencarian |
| `title`, `date`, `preview`, `mood` | `EntryForm` | local state | Isi input form |

UPDATE GITHUB
- git status
- git add .
- git commit -m "pesan perubahan"
- git push
Setelah berhasil cek di Github