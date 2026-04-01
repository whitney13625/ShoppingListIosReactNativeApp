import { StyleSheet } from 'react-native';

export const commonStyles = StyleSheet.create({
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#fff',
    },
    list: {
        flex: 1,
    },
    button: {
        backgroundColor: '#007AFF',
        paddingHorizontal: 24,
        paddingVertical: 12,
        borderRadius: 8,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
    deleteButton: {
        backgroundColor: '#FF3B30',
        justifyContent: 'center',
        alignItems: 'center',
        width: 80,
    },
    deleteText: {
        color: '#fff',
        fontWeight: 'bold',
    },
});