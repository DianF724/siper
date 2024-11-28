import React from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'; // Pastikan untuk menginstal react-native-vector-icons
import { useNavigation } from '@react-navigation/native'; 



export default function HomeScreen() {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <Icon name="search" size={20} color="#999" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Cari di sini..."
          placeholderTextColor="#999" // Warna teks placeholder
        />
        <Icon name="notifications-outline" size={20} color="#999" style={styles.notificationIcon} 
        onPress={() => navigation.navigate('Notif')}/>
      </View>

      {/* Kontainer putih */}
      <View style={styles.whiteContainer}>
        <View style={styles.topContainer}>
          <View style={styles.textContainer}>
            <Text style={styles.greetingText}>
              Halo!
            </Text>
            <Text style={styles.welcomeText}>
              Selamat datang di Aplikasi Pengelolaan Ruangan Fasilkom Unsri
            </Text>
          </View>

          {/* Gambar Rumah */}
          <Image
            source={require('./images/lg.jpg')} // Ganti dengan jalur ke gambar rumah yang benar
            style={styles.houseImage}
          />
        </View>

        {/* Bagian Pilihan Menu */}
        <View style={styles.menuContainer}>
          <Text style={styles.menuTitle}>Menu Fitur</Text>

          {/* Tombol-tombol menu */}
          <View style={styles.buttonRow}>
            <TouchableOpacity style={styles.menuButton} onPress={() => navigation.navigate('Pinjam')}>
              <Icon name="book-outline" size={30} color="white" />
              <Text style={styles.buttonText}>Peminjaman Ruangan</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuButton} onPress={() => navigation.navigate('Histori')}>
              <Icon name="time-outline" size={30} color="white" />
              <Text style={styles.buttonText}>Histori Laporan</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.buttonRow}>
            <TouchableOpacity style={styles.menuButton} onPress={() => navigation.navigate('Aduan')}>
              <Icon name="megaphone-outline" size={30} color="white" />
              <Text style={styles.buttonText}>Pengaduan Ruangan</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuButton} onPress={() => navigation.navigate('Perlengkapan')}>
              <Icon name="construct-outline" size={30} color="white" />
              <Text style={styles.buttonText}>Perlengkapan Ruangan</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#2fa5d8',
  },
  whiteContainer: {
    width: '100%',
    height: '100%',
    backgroundColor: 'white',
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: '60%',
    position: 'absolute',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#e3e3e3',
    borderRadius: 20,
    paddingHorizontal: 15,
    width: '80%',
    height: 40,
    marginTop: 60,
  },
  searchInput: {
    flex: 1,
    marginLeft: 10,
    fontFamily: 'Poppins',
  },
  notificationIcon: {
    marginLeft: 10,
  },
  topContainer: {
    flexDirection: 'row', // Menyusun teks dan gambar dalam satu baris
    width: 325,
    height: 149,
    padding: 20,
    justifyContent: 'space-between', // Jarak antara teks dan gambar
    backgroundColor: '#A3A3A3',
    borderRadius: 30,
    marginTop: -60,
    position: 'absolute',
  },
  textContainer: {
    flex: 2,
    justifyContent: 'center',
  },
  greetingText: {
    color: 'white',
    fontFamily: 'Poppins-Bold',
    fontSize: 16,
    marginBottom: 5,
  },
  welcomeText: {
    color: 'white',
    fontFamily: 'Poppins',
    fontSize: 13,
  },
  houseImage: {
    flex: 1, // Gambar akan mengambil sisa ruang yang tersedia
    resizeMode: 'contain', // Agar gambar tidak terpotong
    width: 100,
    height: 100,
    borderRadius: 150,
    borderWidth: 4, // Tebal border
    borderColor: 'white', // Warna border
  },
  menuContainer: {
    marginTop: 100,
    alignItems: 'center',
  },
  menuTitle: {
    color: 'black',
    fontFamily: 'Poppins-Bold',
    fontSize: 16,
    marginTop: 20,
    marginBottom: 20,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '90%',
    marginBottom: 20,
  },
  menuButton: {
    backgroundColor: '#2fa5d8',
    borderRadius: 15,
    paddingVertical: 15,
    paddingHorizontal: 20,
    width: '45%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: 'white',
    fontFamily: 'Poppins',
    fontSize: 13,
    textAlign: 'center',
    marginTop: 5,
  },
});
