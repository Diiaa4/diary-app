import React from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import DiaryCard from '../components/DiaryCard';
import DiaryHeader from '../components/DiaryHeader';

const userAvatar = require('../../assets/avatars/user.png');

const diaryEntries = [
    {
        id: 1,
        title: 'Pagi Yang Tenang',
        date: '2026-10-07',
        preview: 'Hari ini aku bangun dengan perasaan yang tenang. Matahari bersinar lembut melalui jendela kamar, dan udara pagi terasa segar. Aku memutuskan untuk berjalan-jalan di taman dekat rumah...',
        mood: 'happy',
        moodImage: require('../../assets/moods/happy.png'),
    },
    {
        id: 2,
        title: 'Produktif di Kampus',
        date: '2026-10-07',
        preview: 'Menikmati senja sambil membaca buku favorit. warna langit sangat indah...',
        mood: 'calm',
        moodUri: 'https://picsum.photos/seed/calm/80',
    },
    {
        id: 3,
        title: 'Hari yang Sibuk',
        date: '2026-10-07',
        preview: 'Pagi ini aku memulai hari dengan jadwal yang padat. Banyak tugas yang harus diselesaikan, dan aku merasa sedikit kewalahan. Namun, aku mencoba untuk tetap fokus dan menyelesaikan satu per satu...',
        mood: 'busy',
        moodUri: 'https://picsum.photos/seed/busy/80',
    },
    {
        id: 4,
        title: 'Petualangan di Alam',
        date: '2026-10-07',
        preview: 'Hari ini aku pergi berpetualang ke alam. Menikmati pemandangan indah, udara segar, dan suara alam yang menenangkan. Rasanya menyegarkan pikiran dan tubuh setelah beberapa hari bekerja...',
        mood: 'adventure',
        moodUri: 'https://picsum.photos/seed/adventure/80',
    },
    {
        id: 5,
        title: 'Menikmati senja di Pantai',
        date: '2026-10-07',
        preview: 'Hari ini perasaanku bercampur antara kebahagiaan dan rasa sedih. Karena matahari melihatkan sisi indahnya sebelum dia pergi menghilang dan hanya menyisakan kenangan....',
        mood: 'sunset',
        moodImage: require('../../assets/moods/sunset.png'),
    },
];

export default function DiaryListScreen() {
    return (
        <ScrollView style={styles.container} contentContainerStyle={styles.content}>
            <DiaryHeader title="Buku Harian" avatarSource={userAvatar} />
            {diaryEntries.map((entry) => (
                <DiaryCard
                    key={entry.id}
                    title={entry.title}
                    date={entry.date}
                    preview={entry.preview}
                    mood={entry.mood}
                    moodUri={entry.moodUri}
                    moodImage={entry.moodImage}
                />
            ))}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
    },
    content: {
        padding: 16,
    },
});
