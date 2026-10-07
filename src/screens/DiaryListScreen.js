import React from 'react';
import {View, Text, Image, StyleSheet, ScrollView,} from 'react-native';
import DiaryCard from '../components/DiaryCard';

const diaryEntries = [
    {
        id: 1,
        title: 'Pagi Yang Tenang',
        date: '2026-10-07',
        preview: 'Hari ini aku bangun dengan perasaan yang tenang. Matahari bersinar lembut melalui jendela kamar, dan udara pagi terasa segar. Aku memutuskan untuk berjalan-jalan di taman dekat rumah...',
        moodUri: 'https://picsum.photos/seed/happy/80',
    },
    {
        id: 2,
        title: 'Produktif di Kampus',
        date: '2026-10-07',
        preview: 'Menikmati senja sambil membaca buku favorit. warna langit sangat indah...',
        moodUri: 'https://picsum.photos/seed/calm/80',
    },
    {
        id: 3,
        title: 'Hari yang Sibuk',
        date: '2026-10-07',
        preview: 'Pagi ini aku memulai hari dengan jadwal yang padat. Banyak tugas yang harus diselesaikan, dan aku merasa sedikit kewalahan. Namun, aku mencoba untuk tetap fokus dan menyelesaikan satu per satu...',
        moodUri: 'https://picsum.photos/seed/busy/80',
    },
];

export default function DiaryListScreen() {
    return (
        <ScrollView style={style.container} contentContainerStyle={style.content}>
            <Text style={style.header}>Buku Harian</Text> 
            {diaryEntries.map((entry) => (
                <DiaryCard
                    key={entry.id}
                    title={entry.title}
                    date={entry.date}
                    preview={entry.preview}
                    moodUri={entry.moodUri}
                />
            ))}
        </ScrollView>
    );
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
    },
    content: {
        padding: 16,
    },
    header: {
        fontSize: 24,
        fontWeight: '700',
        marginBottom: 12,
    },
    card: {
        flexDirection: 'row',
        gap: 12,
        padding: 12,
        borderWidth: 1,
        borderColor: '#e5e7eb',
        borderRadius: 12,
        marginBottom: 12,
    },
    mood: {
        width: 64,
        height: 64,
        borderRadius: 32,
    },
    cardContent: {
        flex: 1,
    },
    title: {
        fontSize: 16,
        fontWeight: '700',
    },
    date: {
        fontSize: 12,
        color: '#6b7280',
        marginBottom: 6,
    },
    preview: {
        fontSize: 14,
    },
});