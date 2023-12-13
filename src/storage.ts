import AsyncStorage from '@react-native-async-storage/async-storage';

function createKey(sulfix: string) {
    return `@be-student/${sulfix}`;
}

export const storage = {
    set: async (key: string, value: string): Promise<void> => {
        return await AsyncStorage.setItem(createKey(key), value);
    },
    get: async (key: string): Promise<string | null> => {
        return await AsyncStorage.getItem(createKey(key));
    }
}