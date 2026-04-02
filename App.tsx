import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { ActivityIndicator, View } from 'react-native';

import LoginScreen from './src/screens/auth/LoginScreen';
import CategoriesScreen from './src/screens/categories/CategoriesScreen';
import CategoriesDetailScreen from './src/screens/categories/CategoriesDetailScreen';
import { ShoppingItem, Category } from './src/types';
import ShoppingItemDetailScreen from './src/screens/shopping/ShoppingItemDetailScreen';
import ShoppingListScreen from './src/screens/shopping/ShoppingListScreen';
import { AuthProvider, useAuth } from './src/context/AuthContext';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import SettingsScreen from './src/screens/settings/SettingsScreen';

export type RootStackParamList = {
  Main: undefined;
  Login: undefined;
  ShoppingItemDetail: { item?: ShoppingItem }; // optional = 新增模式
  CategoriesDetail: { category?: Category };
};

export type TabParamList = {
  ShoppingList: undefined;
  Categories: undefined;
  Settings: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<TabParamList>();

function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: true,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: keyof typeof Ionicons.glyphMap;
          if (route.name === 'ShoppingList') {
            iconName = focused ? 'list' : 'list-outline';
          }
          else if (route.name === 'Categories') {
            iconName = focused ? 'folder' : 'folder-outline';
          }
          else {
            iconName = focused ? 'settings' : 'settings-outline';
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#007AFF',
        tabBarInactiveTintColor: '#8E8E93',
      })}
    >
      <Tab.Screen name="ShoppingList" component={ShoppingListScreen} />
      <Tab.Screen name="Categories" component={CategoriesScreen} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
  );
}

function AppNavigator() {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      {isAuthenticated ? (
        <Stack.Navigator>
          <Stack.Screen name="Main" component={TabNavigator} options={{ headerShown: false }} />
          <Stack.Screen name="ShoppingItemDetail" component={ShoppingItemDetailScreen} />
          <Stack.Screen name="CategoriesDetail" component={CategoriesDetailScreen} />
        </Stack.Navigator>
      ) : (
        <Stack.Navigator>
          <Stack.Screen name="Login" options={{ headerShown: false }}>
            {() => <LoginScreen />}
          </Stack.Screen>
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
}

// App 包上 AuthProvider
export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <AuthProvider>
        <AppNavigator />
      </AuthProvider>
    </GestureHandlerRootView>
  );
}
