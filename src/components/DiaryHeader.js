import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

export default function DiaryHeader({ title, avatarSource }) {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>{title}</Text>
            <Image source={avatarSource} style={styles.avatar} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 12,
    },
    title: {
        fontSize: 24,
        fontWeight: '700',
    },
    avatar: {
        width: 40,
        height: 40,
        borderRadius: 20,
        borderWidth: 2,
        borderColor: '#e5e7eb',
    },
});
