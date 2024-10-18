import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, Image } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'; // For icons
import { useFonts } from 'expo-font'; 
import { useNavigation } from '@react-navigation/native'; 
import { ActivityIndicator } from 'react-native';

export default function PinjamScreen() {
  const navigation = useNavigation();
  const [activeTab, setActiveTab] = useState('kelas'); // State to manage active tab
  const [fontsLoaded] = useFonts({
    'Poppins': require('./assets/fonts/Poppins-Regular.ttf'),
    'Poppins-Bold': require('./assets/fonts/Poppins-Bold.ttf'),
  });

  if (!fontsLoaded) {
    return <ActivityIndicator size="large" color="#2fa5d8" />; // Show loading indicator
  }

  return (
    <View style={styles.container}>
      {/* First Container - Header */}
      <View style={styles.headerContainer}>
      <Icon name="arrow-back" size={24} color="white" style={styles.icon} 
        onPress={() => navigation.navigate('Beranda')}/>
        <TextInput
          style={styles.searchInput}
          placeholder="Cari di sini..."
          placeholderTextColor="#999"
        />
        <Icon name="notifications-outline" size={24} color="white" style={styles.icon} 
        onPress={() => navigation.navigate('Notif')}/>
      </View>

      {/* Second Container - Main Content */}
      <View style={styles.contentContainer}>
        <Text style={styles.title}>Pilih Ruangan</Text>
        
        {/* Button Row for Ruang Kelas and Ruang Meeting */}
        <View style={styles.buttonRow}>
          <TouchableOpacity
            style={[styles.roomButton, activeTab === 'kelas' ? styles.activeButton : styles.inactiveButton]}
            onPress={() => setActiveTab('kelas')}
          >
            <Text style={[styles.buttonText, activeTab === 'kelas' ? styles.activeButtonText : styles.inactiveButtonText]}>
              Ruang Kelas
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.roomButton, activeTab === 'meeting' ? styles.activeButton : styles.inactiveButton]}
            onPress={() => setActiveTab('meeting')}
          >
            <Text style={[styles.buttonText, activeTab === 'meeting' ? styles.activeButtonText : styles.inactiveButtonText]}>
              Ruang Meeting
            </Text>
          </TouchableOpacity>
        </View>

        {/* Room List */}
        <ScrollView style={styles.scrollView}>
          {[...Array(5)].map((_, index) => (
            <View key={index} style={styles.roomCard}>
              <Image
                source={{ uri: 'https://via.placeholder.com/80' }} // Replace with your image URL
                style={styles.roomImage}
              />
              <View style={styles.roomDetails}>
                <Text style={styles.roomName}>Ruang {activeTab === 'kelas' ? 'Kelas' : 'Meeting'} {index + 1}</Text>
                <Text style={styles.roomCapacity}>Kapasitas: {30 + index} Orang</Text>
                <Text style={styles.roomCampus}>Kampus: Kampus A</Text>
              </View>

              <TouchableOpacity style={styles.borrowButton} onPress={() => navigation.navigate('FormPinjam')}>
                <Icon name="book-outline" size={24} color="white" padding={5} />
              </TouchableOpacity>

            </View>
          ))}
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2fa5d8',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
  },
  searchInput: {
    flex: 1,
    marginTop: 60,
    marginBottom: 40,
    marginHorizontal: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 20,
    paddingHorizontal: 15,
    height: 40,
  },
  icon: {
    padding: 10,
    marginTop: 60,
    marginBottom: 40,
  },
  contentContainer: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 18,
    fontFamily: 'Poppins-Bold',
    marginBottom: 10,
  },
  buttonRow: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  roomButton: {
    flex: 1,
    paddingVertical: 10,
    marginRight: 10,
    borderRadius: 20,
    alignItems: 'center',
  },
  activeButton: {
    backgroundColor: '#7d7d7d', // Gray background for active button
  },
  inactiveButton: {
    backgroundColor: '#ffffff', // White background for inactive button
  },
  buttonText: {
    fontFamily: 'Poppins',
    fontSize: 14,
  },
  activeButtonText: {
    color: 'white', // White text for active button
  },
  inactiveButtonText: {
    color: 'black', // Black text for inactive button
  },
  scrollView: {
    flex: 1,
  },
  roomCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2fa5d8',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  roomImage: {
    width: 80,
    height: 80,
    borderRadius: 10,
  },
  roomDetails: {
    flex: 1,
    marginLeft: 10,
  },
  roomName: {
    fontSize: 16,
    fontFamily: 'Poppins-Bold',
    color: 'white',
  },
  roomCapacity: {
    color: 'white',
    fontFamily: 'Poppins',
  },
  roomCampus: {
    color: 'white',
    fontFamily: 'Poppins',
  },
  borrowButton: {
    backgroundColor: '#FFC727', // Button color
    justifyContent: 'center',
    alignItems: 'center',
    width: 40, // Fixed width for square button
    height: 40, // Fixed height for square button
    borderRadius: 10, // Adjust radius for rounding corners if desired
    marginLeft: 10, // Space between button and other elements
  },
  borrowButtonText: {
    color: 'white',
    fontFamily: 'Poppins-Bold',
  },
});
