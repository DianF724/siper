import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'; // Untuk ikon
import { useNavigation } from '@react-navigation/native'; // Untuk navigasi

export default function AduanHistoriScreen() {
  const navigation = useNavigation();
  const [activeButton, setActiveButton] = useState('aduan'); // State untuk menentukan tombol aktif

  const handleNavigate = (screen) => {
    setActiveButton(screen); // Set tombol aktif berdasarkan layar yang dituju
    navigation.navigate(screen); // Navigasi ke layar yang dituju
  };

  return (
    <View style={styles.container}>
      {/* Bagian header */}
      <View style={styles.header}>
        <Icon name="arrow-back" size={24} color="white" style={styles.icon} onPress={() => navigation.goBack()} />
        <TextInput
          style={styles.searchInput}
          placeholder="Cari di sini..."
          placeholderTextColor="#999"
        />
        <Icon name="notifications-outline" size={24} color="white" style={styles.icon} onPress={() => navigation.navigate('Notif')} />
      </View>

      {/* Baris untuk tombol Histori dan tombol Aduan */}
      <View style={styles.buttonRow}>
        <TouchableOpacity
          style={[styles.titleButton, activeButton === 'Histori' && styles.activeButton]} // Tambahkan gaya aktif
          onPress={() => handleNavigate('Histori')}
        >
          <Text style={styles.buttonText}>Histori Peminjaman</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.aduanButton, activeButton === 'aduan_histori' && styles.activeButton]} // Tambahkan gaya aktif
          onPress={() => handleNavigate('aduan_histori')}
        >
          <Text style={styles.buttonText}>Histori Pengaduan</Text>
        </TouchableOpacity>
      </View>

      {/* Konten utama (daftar histori) */}
      <ScrollView style={styles.scrollView}>
        {/* Daftar histori */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Icon name="person-circle-outline" size={24} color="white" style={styles.userIcon} />
            <Text style={styles.cardText}>Pengaduan #02</Text>
          </View>
          <Text style={styles.cardDetail}>Ruang      : D 1.2</Text>
          <Text style={styles.cardDetail}>Masalah   : AC tidak menyala, tolong benarkan</Text>
          <Text style={styles.cardDetail}>Bukti       : image.png</Text>

          {/* Status dan Tanggal di bagian bawah */}
          <View style={styles.cardFooter}>
            <Text style={styles.cardDate}>23/02/2024</Text>
            <Text style={styles.cardStatus}>Sedang Ditindaklanjuti</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2fa5d8',
    paddingHorizontal: 0,  // Ubah padding menjadi 0 agar sesuai dengan layar penuh
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    justifyContent: 'space-between',
    paddingVertical: 10,
    width: '100%', // Lebar penuh untuk header
    paddingHorizontal: 20, // Berikan padding horizontal agar tidak terlalu rapat dengan tepi layar
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
    width: '100%', // Lebar penuh untuk tombol baris
    paddingHorizontal: 20, // Berikan padding horizontal agar tidak terlalu rapat dengan tepi layar
  },
  titleButton: {
    backgroundColor: '#ffffff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    width: '48%',
    alignItems: 'center',
  },
  aduanButton: {
    backgroundColor: '#ffffff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    width: '48%',
    alignItems: 'center',
  },
  buttonText: {
    fontWeight: 'bold',
    color: 'black',
  },
  activeButton: {
    backgroundColor: '#2fa5d8', // Gaya tombol aktif
    borderColor: 'white',
    borderWidth: 1,
  },
  scrollView: {
    width: '100%', // Lebar penuh untuk scrollView
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
    width: '100%', // Lebar penuh untuk kartu
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  userIcon: {
    marginRight: 10,
  },
  cardText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white', 
  },
  cardDetail: {
    color: 'white',
    marginBottom: 5,
    lineHeight: 20,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
  cardDate: {
    color: 'white',
    fontSize: 12,
  },
  cardStatus: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 12,
  },
});
