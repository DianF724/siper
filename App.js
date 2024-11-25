import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { useFonts } from 'expo-font'; 
import Icon from 'react-native-vector-icons/Ionicons'; // Ikon untuk navbar
import { View, ActivityIndicator } from 'react-native';


// Mengimpor screen dari file lain
import { Beranda, Histori, Pinjam,  Aduan, Perlengkapan, Notif, FormPinjam, Info, Sukses } from './src/screen'; // Ganti sesuai jalur file Beranda.js, Histori.js, Pinjam.js


const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

// Fungsi untuk Bottom Tab Navigator
function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Beranda') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Pinjam') {
            iconName = focused ? 'book' : 'book-outline';
          } else if (route.name === 'Aduan') {
            iconName = focused ? 'megaphone' : 'megaphone-outline';
          }

          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#FFC727',
        tabBarInactiveTintColor: 'white',
        tabBarStyle: {
          backgroundColor: '#2fa5d8',
          borderTopWidth: 0,
          height: 50,
          padding: 5
        },
        tabBarLabelStyle: {
          fontFamily: 'Poppins',
          fontSize: 12,
        },
      })}
    >
      <Tab.Screen 
        name="Beranda" 
        component={Beranda} 
        options={{ headerShown: false }} 
      />
      <Tab.Screen 
        name="Pinjam" 
        component={Pinjam} 
        options={{ headerShown: false }} 
      />
      <Tab.Screen 
        name="Aduan" 
        component={Aduan} 
        options={{ headerShown: false }} 
      />
    </Tab.Navigator>
  );
}

export default function App() {
  const [fontsLoaded] = useFonts({
    'Poppins': require('./src/assets/fonts/Poppins-Regular.ttf'), // Pastikan jalur ke font Poppins sesuai
  });

  if (!fontsLoaded) {
    return (
      <View style={{ 
        flex: 1, 
        justifyContent: 'center', 
        alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#2fa5d8" /> 
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Beranda">
        <Stack.Screen 
          name="Beranda" 
          component={TabNavigator} 
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="Pinjam" 
          component={Pinjam} 
          options={{ headerShown: false }}
        />
        <Stack.Screen 
          name="Histori" 
          component={Histori} 
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="Perlengkapan" 
          component={Perlengkapan} 
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="Notif" 
          component={Notif} 
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="FormPinjam" 
          component={FormPinjam} 
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="Info" 
          component={Info} 
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="Sukses" 
          component={Sukses} 
          options={{ headerShown: false }} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
