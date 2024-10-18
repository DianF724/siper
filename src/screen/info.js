import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native'; 

export default function Info() {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        {/* Gambar di bagian atas */}
        <Image
          source={require('./images/kelas.jpg')} // Ganti dengan URL gambar atau local image
          style={styles.image}
        />
        
        {/* Tombol Kembali, di dalam gambar */}
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate('Beranda')}>
          <Icon name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
      </View>

      {/* Nama Ruangan */}
      <View style={styles.roomInfo}>
        <Text style={styles.roomName}>Advancing Class</Text>
      </View>

      {/* Fasilitas Ruangan */}
      <View style={styles.facilityContainer}>
        <Text style={styles.facilityTitle}>Fasilitas Ruangan</Text>

        <View style={styles.facilityGrid}>
          {/* Fasilitas: TV */}
          <View style={styles.facilityItem}>
            <Image
              source={{ uri: 'https://example.com/path-to-tv-image.jpg' }} // Ganti dengan URL gambar TV
              style={styles.facilityImage}
            />
            <Text style={styles.facilityText}>1 TV</Text>
          </View>

          {/* Fasilitas: Kursi */}
          <View style={styles.facilityItem}>
            <Image
              source={{ uri: 'https://example.com/path-to-chair-image.jpg' }} // Ganti dengan URL gambar Kursi
              style={styles.facilityImage}
            />
            <Text style={styles.facilityText}>150 Kursi</Text>
          </View>

          {/* Fasilitas: Meja */}
          <View style={styles.facilityItem}>
            <Image
              source={{ uri: 'https://example.com/path-to-table-image.jpg' }} // Ganti dengan URL gambar Meja
              style={styles.facilityImage}
            />
            <Text style={styles.facilityText}>2 Meja</Text>
          </View>

          {/* Fasilitas: Papan Tulis */}
          <View style={styles.facilityItem}>
            <Image
              source={{ uri: 'https://example.com/path-to-board-image.jpg' }} // Ganti dengan URL gambar Papan Tulis
              style={styles.facilityImage}
            />
            <Text style={styles.facilityText}>1 Papan Tulis</Text>
          </View>

          {/* Fasilitas: Spidol */}
          <View style={styles.facilityItem}>
            <Image
              source={{ uri: 'https://example.com/path-to-marker-image.jpg' }} // Ganti dengan URL gambar Spidol
              style={styles.facilityImage}
            />
            <Text style={styles.facilityText}>6 Spidol</Text>
          </View>

          {/* Fasilitas: Penghapus */}
          <View style={styles.facilityItem}>
            <Image
              source={{ uri: 'https://example.com/path-to-eraser-image.jpg' }} // Ganti dengan URL gambar Penghapus
              style={styles.facilityImage}
            />
            <Text style={styles.facilityText}>3 Penghapus</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    position: 'relative', // Set posisi relative untuk parent view agar child (backButton) bisa diatur posisinya
  },
  image: {
    width: '100%',
    height: 200,
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
  },
  backButton: {
    position: 'absolute', // Mengatur posisi absolut agar tombol berada di dalam gambar
    top: 40,
    left: 20,
    backgroundColor: '#2fa5d8',
    padding: 10,
    borderRadius: 20,
  },
  roomInfo: {
    alignItems: 'center',
    marginVertical: 20,
  },
  roomName: {
    fontSize: 22,
    fontFamily: 'Poppins-Bold',
    color: 'black',
  },
  facilityContainer: {
    backgroundColor: '#2fa5d8',
    padding: 20,
    borderRadius: 20,
    marginHorizontal: 20,
  },
  facilityTitle: {
    fontSize: 18,
    fontFamily: 'Poppins-Bold',
    color: 'white',
    marginBottom: 10,
    textAlign: 'center',
  },
  facilityGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  facilityItem: {
    width: '30%',
    alignItems: 'center',
    marginVertical: 10,
  },
  facilityImage: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
  },
  facilityText: {
    marginTop: 5,
    fontSize: 14,
    fontFamily: 'Poppins',
    color: 'white',
    textAlign: 'center',
  },
});
