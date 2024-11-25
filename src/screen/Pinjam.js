import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, Image, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useFonts } from 'expo-font';
import { useNavigation } from '@react-navigation/native';
import { ref, onValue } from 'firebase/database';
import { database } from '../../src/screen/firebase.js';

export default function PinjamScreen() {
  const navigation = useNavigation();
  const [activeTab, setActiveTab] = useState('kelas'); // State to manage active tab
  const [ruangan, setRooms] = useState([]);
  
  // Load fonts
  const [fontsLoaded] = useFonts({
    'Poppins': require('../../src/assets/fonts/Poppins-Regular.ttf'),
    'Poppins-Bold': require('../../src/assets/fonts/Poppins-Bold.ttf'),
  });

  // Return early if fonts aren't loaded
  if (!fontsLoaded) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#2fa5d8" />
      </View>
    );
  }

  // Fetch data from Realtime Database
  useEffect(() => {
    const roomRef = ref(database, 'ruangan'); // Reference to the "ruangan" collection
    const unsubscribe = onValue(roomRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        // Convert data into array
        const roomList = Object.keys(data).map((key) => ({
          id: key,
          ...data[key],
        }));
        setRooms(roomList);
      }
    });

    return () => unsubscribe(); // Clean up listener on unmount
  }, []);

  // Filter rooms based on activeTab
  const filteredRuangan = ruangan.filter((ruangan) => ruangan.jenis_ruang === activeTab);

  return (
    <View style={styles.container}>
      {/* First Container - Header */}
      <View style={styles.headerContainer}>
        <Icon
          name="arrow-back"
          size={24}
          color="white"
          style={styles.icon}
          onPress={() => navigation.navigate('Beranda')}
        />
        <TextInput
          style={styles.searchInput}
          placeholder="Cari di sini..."
          placeholderTextColor="#999"
        />
        <Icon
          name="notifications-outline"
          size={24}
          color="white"
          style={styles.icon}
          onPress={() => navigation.navigate('Notif')}
        />
      </View>

      {/* Second Container - Main Content */}
      <View style={styles.contentContainer}>
        <Text style={styles.title}>Pilih Ruangan</Text>

        {/* Button Row for Ruang Kelas and Ruang Meeting */}
        <View style={styles.buttonRow}>
          <TouchableOpacity
            style={[
              styles.roomButton,
              activeTab === 'kelas' ? styles.activeButton : styles.inactiveButton,
            ]}
            onPress={() => setActiveTab('kelas')}
          >
            <Text
              style={[
                styles.buttonText,
                activeTab === 'kelas' ? styles.activeButtonText : styles.inactiveButtonText,
              ]}
            >
              Ruang Kelas
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.roomButton,
              activeTab === 'meeting' ? styles.activeButton : styles.inactiveButton,
            ]}
            onPress={() => setActiveTab('meeting')}
          >
            <Text
              style={[
                styles.buttonText,
                activeTab === 'meeting' ? styles.activeButtonText : styles.inactiveButtonText,
              ]}
            >
              Ruang Meeting
            </Text>
          </TouchableOpacity>
        </View>

        {/* Room List */}
        <ScrollView style={styles.scrollView}>
          {filteredRuangan.map((ruangan) => (
            <View key={ruangan.id} style={styles.roomCard}>
              <Image
                source={require('../../src/screen/images/kelas.jpg')}
                style={styles.roomImage}
              />
              <View style={styles.roomDetails}>
                <Text style={styles.roomName}>Ruang {ruangan.nama}</Text>
                <Text style={styles.roomCapacity}>Kapasitas: {ruangan.kapasitas} Orang</Text>
                <Text style={styles.roomCampus}>Kampus: {ruangan.kampus}</Text>
              </View>

              <TouchableOpacity
                style={styles.borrowButton}
                onPress={() => navigation.navigate('FormPinjam', { namaRuangan: ruangan.nama })}
              >
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
