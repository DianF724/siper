import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'; // For icons
import { useNavigation } from '@react-navigation/native';
import { useFonts } from 'expo-font'; 

export default function HistoriScreen() {
  const navigation = useNavigation();
  const [activeTab, setActiveTab] = useState('peminjaman');
  const [fontsLoaded] = useFonts({
    'Poppins': require('./assets/fonts/Poppins-Regular.ttf'), 
    'Poppins-Bold': require('./assets/fonts/Poppins-Bold.ttf'), 
  }); 

  if (!fontsLoaded) {
    return <ActivityIndicator size="large" color="#2fa5d8" />; // Show loading indicator
  }

  return (
    <View style={styles.container}>
      {/* Header section */}
      <View style={styles.header}>
        <Icon name="arrow-back" size={24} color="white" style={styles.icon} 
          onPress={() => navigation.goBack()} 
        />
        <TextInput
          style={styles.searchInput}
          placeholder="Cari di sini..."
          placeholderTextColor="#999"
        />
        <Icon name="notifications-outline" size={24} color="white" style={styles.icon} 
          onPress={() => navigation.navigate('Notif')} 
        />
      </View>

      {/* Button row for Borrowing History and Complaint History */}
      <View style={styles.buttonRow}>
        <TouchableOpacity
          style={[styles.titleButton, activeTab === 'peminjaman' ? styles.activeTab : styles.inactiveTab]}
          onPress={() => setActiveTab('peminjaman')} // Set active tab to 'peminjaman'
        >
          <Text style={[styles.buttonText, activeTab === 'peminjaman' ? styles.activeText : styles.inactiveText]}>
            Histori Peminjaman
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.aduanButton, activeTab === 'pengaduan' ? styles.activeTab : styles.inactiveTab]}
          onPress={() => setActiveTab('pengaduan')} // Set active tab to 'pengaduan'
        >
          <Text style={[styles.buttonText, activeTab === 'pengaduan' ? styles.activeText : styles.inactiveText]}>
            Histori Pengaduan
          </Text>
        </TouchableOpacity>
      </View>

      {/* Main content (history list) */}
      <ScrollView style={styles.scrollView}>
        {activeTab === 'peminjaman' ? (
          // Content for Borrowing History
          <>
            <View style={styles.card}>
              <Text style={styles.cardText}>Peminjaman #03</Text>
              <Text style={styles.cardDetail}>Ruang: D 1.1</Text>
              <Text style={styles.cardDetail}>Waktu Peminjaman: 21/02/2024 09:00</Text>
              <Text style={styles.cardDetail}>Waktu Pengembalian: 21/02/2024 14:00</Text>
              <View style={styles.statusContainer('Menunggu Konfirmasi')}>
                <Text style={styles.cardStatus}>Menunggu Konfirmasi</Text>
              </View>
            </View>

            <View style={styles.card}>
              <Text style={styles.cardText}>Peminjaman #02</Text>
              <Text style={styles.cardDetail}>Ruang: D 1.3</Text>
              <Text style={styles.cardDetail}>Waktu Peminjaman: 19/02/2024 09:00</Text>
              <Text style={styles.cardDetail}>Waktu Pengembalian: 19/02/2024 14:00</Text>
              <View style={styles.statusContainer('Telah Dikonfirmasi')}>
                <Text style={styles.cardStatus}>Telah Dikonfirmasi</Text>
              </View>
            </View>

            <View style={styles.card}>
              <Text style={styles.cardText}>Peminjaman #01</Text>
              <Text style={styles.cardDetail}>Ruang: Advancing Class Lt.1</Text>
              <Text style={styles.cardDetail}>Waktu Peminjaman: 18/02/2024 08:00</Text>
              <Text style={styles.cardDetail}>Waktu Pengembalian: 18/02/2024 14:00</Text>
              <View style={styles.statusContainer('Telah Dikonfirmasi')}>
                <Text style={styles.cardStatus}>Telah Dikonfirmasi</Text>
              </View>
            </View>
          </>
        ) : (
          // Content for Complaint History
          <>
            <View style={styles.card}>
              <View style={styles.cardHeader}>
                <Icon name="person-circle-outline" size={24} color="white" style={styles.userIcon} />
                <Text style={styles.cardText}>Pengaduan #02</Text>
              </View>
              <Text style={styles.cardDetail2}>Ruang      : D 1.2</Text>
              <Text style={styles.cardDetail2}>Masalah   : AC tidak menyala, tolong benarkan</Text>
              <Text style={styles.cardDetail2}>Bukti       : image.png</Text>

              {/* Status and Date at the bottom */}
              <View style={styles.cardFooter2}>
                <Text style={styles.cardDate}>23/02/2024</Text>
                <View style={styles.statusContainer('Sedang Ditindaklanjuti')}>
                  <Text style={styles.cardStatus2}>Sedang Ditindaklanjuti</Text>
                </View>
              </View>
            </View>

            <View style={styles.card}>
              <View style={styles.cardHeader}>
                <Icon name="person-circle-outline" size={24} color="white" style={styles.userIcon} />
                <Text style={styles.cardText}>Pengaduan #01</Text>
              </View>
              <Text style={styles.cardDetail2}>Ruang      : D 1.2</Text>
              <Text style={styles.cardDetail2}>Masalah   : AC tidak menyala, tolong benarkan</Text>
              <Text style={styles.cardDetail2}>Bukti       : image.png</Text>

              {/* Status and Date at the bottom */}
              <View style={styles.cardFooter2}>
                <Text style={styles.cardDate}>23/02/2024</Text>
                <View style={styles.statusContainer('Sedang Ditindaklanjuti')}>
                  <Text style={styles.cardStatus2}>Sedang Ditindaklanjuti</Text>
                </View>
              </View>
            </View>
          </>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2fa5d8',
    paddingHorizontal: 0,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    justifyContent: 'space-between',
    paddingVertical: 10,
    width: '100%',
    paddingHorizontal: 20,
  },
  searchInput: {
    flex: 1,
    marginTop: 60,
    marginHorizontal: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 20,
    paddingHorizontal: 15,
    height: 40,
  },
  icon: {
    padding: 10,
    marginTop: 60,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    width: '100%',
    paddingHorizontal: 20,
  },
  titleButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    width: '48%',
    alignItems: 'center',
  },
  aduanButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    width: '48%',
    alignItems: 'center',
  },
  activeTab: {
    backgroundColor: '#7d7d7d', // Gray background for active tab
  },
  inactiveTab: {
    backgroundColor: '#ffffff', // White background for inactive tab
  },
  buttonText: {
    fontFamily: 'Poppins-Bold',
    fontSize: 11
  },
  activeText: {
    color: 'white', // White text for active tab
  },
  inactiveText: {
    color: 'black', // Black text for inactive tab
  },
  scrollView: {
    width: '100%',
    flex: 1,
    backgroundColor: 'white',
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    paddingTop: 20,
    paddingHorizontal: 20,
  },
  card: {
    backgroundColor: '#2fa5d8',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    width: '100%',
  },
  cardText: {
    fontFamily: 'Poppins-Bold',
    color: 'white',
  },
  cardDetail: {
    fontFamily: 'Poppins',
    color: '#f0f0f0',
    marginTop: 5,
  },
  statusContainer: (status) => ({
    backgroundColor: status === 'Menunggu Konfirmasi' ? '#FFB233' : '#A1C63D' ,
    borderRadius: 10,
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginTop: 10,
    alignSelf: 'flex-start', // Aligns to the left
  }),
  cardStatus: {
    color: 'white',
    fontFamily: 'Poppins-Bold',
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  userIcon: {
    marginRight: 10,
  },
  cardDetail2: {
    fontFamily: 'Poppins',
    color: '#f0f0f0',
    marginTop: 5,
  },
  cardFooter2: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
  cardDate: {
    fontFamily: 'Poppins',
    color: '#f0f0f0',
  },
  cardStatus2: {
    color: 'white',
    fontFamily: 'Poppins-Bold',
  },
});
