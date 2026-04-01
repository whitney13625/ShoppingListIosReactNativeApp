import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native';

const HOST = Platform.OS === 'android' 
  ? process.env.EXPO_PUBLIC_API_HOST_ANDROID 
  : process.env.EXPO_PUBLIC_API_HOST_IOS;
const PORT = process.env.EXPO_PUBLIC_API_PORT;
const BASE_URL = `http://${HOST}:${PORT}/api`;
const TOKEN_KEY = 'auth_token';

let onUnauthorized: (() => void) | null = null;

export function setUnauthorizedHandler(handler: () => void) {
  onUnauthorized = handler;
}

export const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use(async (config) => {
  const token = await AsyncStorage.getItem(TOKEN_KEY);
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      await AsyncStorage.removeItem(TOKEN_KEY);
      onUnauthorized?.(); 
    }
    return Promise.reject(error);
  }
);

// Token management helper functions
export const tokenStorage = {
  save: (token: string) => AsyncStorage.setItem(TOKEN_KEY, token),
  get: () => AsyncStorage.getItem(TOKEN_KEY),
  remove: () => AsyncStorage.removeItem(TOKEN_KEY),
};